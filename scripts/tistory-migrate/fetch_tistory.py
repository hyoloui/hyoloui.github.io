#!/usr/bin/env python3
"""Tistory 글을 Docusaurus 블로그 이전용 재료로 받아온다. 표준 라이브러리만 사용한다.

  list  <blog_url> <out.tsv>   사이트맵의 모든 글을 id/날짜/카테고리/제목으로 정리 (날짜순)
  fetch <post_url> <blog_dir> <work_dir>
        이미지를 <blog_dir>/YYYY-MM-DD-tistory-<id>/ 에 내려받고,
        정리한 본문 HTML을 <work_dir>/<id>.html 에 저장한 뒤 메타데이터 JSON을 출력한다.
"""
import html
import json
import re
import sys
import urllib.request
from pathlib import Path

UA = {"User-Agent": "Mozilla/5.0"}


def get(url):
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30) as r:
        return r.read(), r.headers.get("Content-Type", "")


def meta(page, prop):
    m = re.search(r'<meta (?:property|name)="%s" content="([^"]*)"' % re.escape(prop), page)
    return html.unescape(m.group(1)) if m else ""


def parse_meta(page, url):
    info = re.search(r"window\.T\.entryInfo = (\{.*?\});", page)
    entry = json.loads(info.group(1)) if info else {}
    published = meta(page, "article:published_time")
    return {
        "id": entry.get("entryId") or url.rstrip("/").split("/")[-1],
        "url": url,
        "title": meta(page, "og:title"),
        "description": meta(page, "og:description"),
        "published": published,
        "date": published[:10],
        "category": entry.get("categoryLabel", ""),
    }


def article_html(page):
    """본문 div(tt_article_useless_p_margin)를 div 짝을 맞춰 잘라낸다."""
    start = page.find("tt_article_useless_p_margin")
    if start < 0:
        raise SystemExit("본문 div를 찾지 못함: 스킨 구조가 다름")
    start = page.find(">", start) + 1
    depth, pos = 1, start
    for m in re.finditer(r"<(/?)div\b", page[start:]):
        depth += -1 if m.group(1) else 1
        if depth == 0:
            pos = start + m.start()
            break
    return page[start:pos]


def clean(body):
    # 링크 카드(opengraph figure)는 단순 링크로
    body = re.sub(
        r'<figure[^>]*data-ke-type="opengraph"[^>]*data-og-title="([^"]*)"[^>]*data-og-source-url="([^"]*)".*?</figure>',
        r'<p><a href="\2">\1</a></p>', body, flags=re.S)
    body = re.sub(r'\s(srcset|style|data-[\w-]+|contenteditable|width|height|loading|onerror)="[^"]*"', "", body)
    body = re.sub(r"<span>\s*(<img[^>]*>)\s*</span>", r"\1", body)
    return body.replace("&nbsp;", " ")


def cmd_list(blog, out):
    xml = get(blog.rstrip("/") + "/sitemap.xml")[0].decode()
    urls = re.findall(r"<loc>(%s/(?:entry/[^<]+|\d+))</loc>" % re.escape(blog.rstrip("/")), xml)
    rows = []
    for u in urls:
        m = parse_meta(get(u)[0].decode("utf-8", "replace"), u)
        rows.append(m)
        print(m["date"], m["id"], m["category"], m["title"], file=sys.stderr)
    rows.sort(key=lambda r: r["published"])
    with open(out, "w", encoding="utf-8") as f:
        for r in rows:
            f.write("\t".join(str(r[k]) for k in ("id", "date", "category", "title", "url")) + "\n")
    print(f"{len(rows)} posts -> {out}")


def cmd_fetch(url, blog_dir, work_dir):
    page = get(url)[0].decode("utf-8", "replace")
    m = parse_meta(page, url)
    post_dir = Path(blog_dir) / f"{m['date']}-tistory-{m['id']}"
    post_dir.mkdir(parents=True, exist_ok=True)
    body = clean(article_html(page))

    images = {}
    for src in re.findall(r'<img[^>]*\ssrc="([^"]+)"', body):
        if src in images:
            continue
        data, ctype = get(html.unescape(src))
        ext = {"image/jpeg": "jpg", "image/gif": "gif", "image/webp": "webp"}.get(ctype.split(";")[0], "png")
        name = f"img-{len(images) + 1:02d}.{ext}"
        (post_dir / name).write_bytes(data)
        images[src] = name
    for src, name in images.items():
        body = body.replace(src, f"./{name}")

    Path(work_dir).mkdir(parents=True, exist_ok=True)
    src_file = Path(work_dir) / f"{m['id']}.html"
    src_file.write_text(body, encoding="utf-8")
    m.update(post_dir=str(post_dir), source_html=str(src_file), images=list(images.values()))
    print(json.dumps(m, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    if len(sys.argv) == 4 and sys.argv[1] == "list":
        cmd_list(sys.argv[2], sys.argv[3])
    elif len(sys.argv) == 5 and sys.argv[1] == "fetch":
        cmd_fetch(*sys.argv[2:])
    else:
        raise SystemExit(__doc__)

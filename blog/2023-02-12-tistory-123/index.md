---
title: "Project: 🚩codefolio - DropDown, PostTitle / as-is to-be : 1"
description: "Next.js 프로젝트의 DropDown 컴포넌트를 data prop으로 options를 만들어 주도록 개선하고, PostTitle 컴포넌트를 작성한 과정."
authors: [hyoloui]
tags: [project]
---

:::note 🎯목적

- DropDown component 생성 > 개선
- PostTitle component 생성

:::

<!--truncate-->

---

## 1. DropDown Layout 만들기

```tsx
const DropDown = ({
  defaultValue,
  options,
}: DropDownProps<string | number>) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
  };

  return (
    <Select onChange={handleChange}>
      {options.map((option) => (
        <option key={option} value={option} defaultValue={defaultValue}>
          {option}
        </option>
      ))}
    </Select>
  );
};

export default DropDown;
```

prop 으로 전달받은 `defaultValue` / `options` 를 활용해 **select-box**로 보여주는 컴포넌트를 작성했다.

처음엔 라이브러리를 가져와서 활용하려고 했으나, toast UI select 박스는 next를 지원하지 않고 SSR 지정을 직접 해줘야하는 번거로움으로 택하지 않고

**styled components** 를 사용해 직접 스타일을 지정하기로 했다.

위 코드를 짜고 나니 컴포넌트를 사용하는데 있어서 불편하겠다는 생각에 잠이 오질 않고 마음이 무거웠다. 부모 컴포넌트에서 직접 배열을 `options`에 전달해줘야 하기 때문.

---

## 2. DropDown component : as-is to-be

```tsx
/**
 * @example
 * <DropDown data="birth_year" />
 * <DropDown data="careerer" />
 * @TODO 컴포넌트별 스타일 분리
 */
const DropDown = ({ data }: DropDownProps) => {
  const [selectValue, setSelectValue] = useState("");

  const options: string[] = [];
  // const thisYears = new Date();
  const years = Array.from(
    { length: new Date().getFullYear() - 1950 + 1 },
    (_, i) => {
      return new Date().getFullYear() - i;
    }
  );
  if (data === "birth_year") {
    years.forEach((year) => options.push(String(year)));
  }
  if (data === "careerer") {
    for (let i = 1; i < 20; i += 1) {
      options.push(`${i}년차`);
    }
    options.unshift("신입");
    options.push("20년차 이상");
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(e.target.value);
  };
  return (
    <Select onChange={handleChange}>
      {options.map((option) => (
        <option key={option} value={option} defaultValue={option}>
          {option}
        </option>
      ))}
    </Select>
  );
};
```

개선안은 이러했다.

부모 컴포넌트에서 사용하고싶은 select box 내용을 데이터 prop 안에 지정해 준다면 내가 만든 컴포넌트에서 **data 를 구분**하여 `options` 를 만들어주는 친절한 컴포넌트 였다.

---

## 3. PostTitle

```tsx
const PostTitle = () => {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");

  return (
    <TitleContainer>
      <TitleInput
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="프로젝트 제목을 입력하세요"
      />
      <SubTitleWrapper>
        <SubTitleInput
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
          placeholder="소제목을 입력하세요"
        />
      </SubTitleWrapper>
    </TitleContainer>
  );
};

export default PostTitle;
```

위 부분은 작업중이다!

별 내용 없이 title과 subtitle의 text를 받아서 state로 가지고있는 내용이다. 추후 submit 시 데이터를 전달 할 때 사용하기 위함이다.

{/* 이 글은 Tistory(https://hyoloui.tistory.com/123)에서 옮겨 온 글입니다. 원문 작성일: 2023-02-12 */}

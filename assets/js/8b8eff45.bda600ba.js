"use strict";(self.webpackChunkhyoloui=self.webpackChunkhyoloui||[]).push([[3093],{76848:(n,e,i)=>{i.r(e),i.d(e,{assets:()=>a,contentTitle:()=>d,default:()=>x,frontMatter:()=>r,metadata:()=>s,toc:()=>h});const s=JSON.parse('{"id":"c-lang/03","title":"scanf() \ud568\uc218\uc640 \uc0b0\uc220\uc5f0\uc0b0\uc790","description":"10\uc9c4\uc218, 2\uc9c4\uc218 \ubcc0\ud658","source":"@site/docs/c-lang/03.md","sourceDirName":"c-lang","slug":"/c-lang/03","permalink":"/docs/c-lang/03","draft":false,"unlisted":false,"editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/c-lang/03.md","tags":[],"version":"current","sidebarPosition":4,"frontMatter":{"sidebar_position":4,"title":"scanf() \ud568\uc218\uc640 \uc0b0\uc220\uc5f0\uc0b0\uc790"},"sidebar":"tutorialSidebar","previous":{"title":"printf() \ud568\uc218 \uc11c\uc2dd \ubb38\uc790","permalink":"/docs/c-lang/02"},"next":{"title":"\uc5f0\uc0b0\uc790 \ud65c\uc6a9\ud558\uae30","permalink":"/docs/c-lang/04"}}');var c=i(74848),l=i(28453);const r={sidebar_position:4,title:"scanf() \ud568\uc218\uc640 \uc0b0\uc220\uc5f0\uc0b0\uc790"},d=void 0,a={},h=[{value:"10\uc9c4\uc218, 2\uc9c4\uc218 \ubcc0\ud658",id:"10\uc9c4\uc218-2\uc9c4\uc218-\ubcc0\ud658",level:3},{value:"2\uc9c4\uc218, 8\uc9c4\uc218, 16\uc9c4\uc218 \uc0c1\ud638 \ubcc0\ud658",id:"2\uc9c4\uc218-8\uc9c4\uc218-16\uc9c4\uc218-\uc0c1\ud638-\ubcc0\ud658",level:3},{value:"scanf( ) \ud568\uc218",id:"scanf--\ud568\uc218",level:3},{value:"\uc0b0\uc220 \uc5f0\uc0b0\uc790",id:"\uc0b0\uc220-\uc5f0\uc0b0\uc790",level:3},{value:"\ub300\uc785 \uc5f0\uc0b0\uc790(=)",id:"\ub300\uc785-\uc5f0\uc0b0\uc790",level:3},{value:"\ub300\uc785 \uc5f0\uc0b0\uc790(+=)",id:"\ub300\uc785-\uc5f0\uc0b0\uc790-1",level:3},{value:"\uc99d\uac00 \uc5f0\uc0b0\uc790(++)",id:"\uc99d\uac00-\uc5f0\uc0b0\uc790",level:3},{value:"\ubb38\uc790 \uc790\ub8cc\ud615 \uc0ac\uc6a9\ud558\uae30",id:"\ubb38\uc790-\uc790\ub8cc\ud615-\uc0ac\uc6a9\ud558\uae30",level:3},{value:"\uc815\uc218 \uc790\ub8cc\ud615 char",id:"\uc815\uc218-\uc790\ub8cc\ud615-char",level:4},{value:"\ubb38\uc790 0\uacfc \uc22b\uc790 0\uc758 \ucc28\uc774",id:"\ubb38\uc790-0\uacfc-\uc22b\uc790-0\uc758-\ucc28\uc774",level:4},{value:"\ubb38\uc790\ub85c \uc5f0\uc0b0\ud558\uae30",id:"\ubb38\uc790\ub85c-\uc5f0\uc0b0\ud558\uae30",level:4},{value:"\uc81c\uc5b4 \ubb38\uc790 \uc0ac\uc6a9\ud558\uae30",id:"\uc81c\uc5b4-\ubb38\uc790-\uc0ac\uc6a9\ud558\uae30",level:4},{value:"\uc22b\uc790 \ubb38\uc790 \uc0ac\uc6a9\ud558\uae30",id:"\uc22b\uc790-\ubb38\uc790-\uc0ac\uc6a9\ud558\uae30",level:4}];function t(n){const e={blockquote:"blockquote",br:"br",code:"code",h3:"h3",h4:"h4",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,l.R)(),...n.components},{Details:i}=e;return i||function(n,e){throw new Error("Expected "+(e?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(e.h3,{id:"10\uc9c4\uc218-2\uc9c4\uc218-\ubcc0\ud658",children:"10\uc9c4\uc218, 2\uc9c4\uc218 \ubcc0\ud658"}),"\n",(0,c.jsxs)(e.ol,{children:["\n",(0,c.jsxs)(e.li,{children:["\n",(0,c.jsx)(e.p,{children:"\ubc29\ubc95 1"}),"\n",(0,c.jsx)(e.p,{children:"\uc815\uc218 \ubd80\ubd84 : 2\ub85c \ub098\ub204\uc5b4 \ub354 \uc774\uc0c1 \ub098\ub220\uc9c0\uc9c0 \uc54a\uc744 \ub54c\uae4c\uc9c0 \ub098\ub204\uace0, \ub098\uba38\uc9c0\ub97c \uc5ed\uc21c\uc73c\ub85c \ud45c\uc2dc\ud568\n\uc18c\uc218 \ubd80\ubd84 : 2\ub97c \uacf1\ud55c \uacb0\uacfc\uc758 \uc815\uc218 \ubd80\ubd84\ub9cc\uc744 \ucc28\ub840\ub85c \ud45c\uc2dc\ud568"}),"\n",(0,c.jsx)(e.p,{children:"10 \uc9c4\uc218 21.6\uc744 2\uc9c4\uc218\ub85c \ubcc0\ud658\ud558\ub294 \uac83\uc740? 10101.1001"}),"\n"]}),"\n",(0,c.jsxs)(e.li,{children:["\n",(0,c.jsx)(e.p,{children:"\ubc29\ubc95 2 : 2\uc9c4\uc218\uc758 \uc790\ub9ac \uac12\uc5d0\uc11c \uac00\uc7a5 \ud070 \uac12\uc744 \ube8c"}),"\n"]}),"\n"]}),"\n",(0,c.jsx)(e.p,{children:"10 \uc9c4\uc218 156\uc744 2\uc9c4\uc218\ub85c \ubcc0\ud658 \uc2dc"}),"\n",(0,c.jsxs)(e.table,{children:[(0,c.jsx)(e.thead,{children:(0,c.jsxs)(e.tr,{children:[(0,c.jsx)(e.th,{children:"128"}),(0,c.jsx)(e.th,{children:"64"}),(0,c.jsx)(e.th,{children:"32"}),(0,c.jsx)(e.th,{children:"16"}),(0,c.jsx)(e.th,{children:"8"}),(0,c.jsx)(e.th,{children:"4"}),(0,c.jsx)(e.th,{children:"2"}),(0,c.jsx)(e.th,{children:"1"})]})}),(0,c.jsx)(e.tbody,{children:(0,c.jsxs)(e.tr,{children:[(0,c.jsx)(e.td,{children:"1"}),(0,c.jsx)(e.td,{children:"0"}),(0,c.jsx)(e.td,{children:"0"}),(0,c.jsx)(e.td,{children:"1"}),(0,c.jsx)(e.td,{children:"1"}),(0,c.jsx)(e.td,{children:"1"}),(0,c.jsx)(e.td,{children:"0"}),(0,c.jsx)(e.td,{children:"0"})]})})]}),"\n",(0,c.jsxs)(e.blockquote,{children:["\n",(0,c.jsxs)(e.ol,{children:["\n",(0,c.jsx)(e.li,{children:"156 - 128 = 28"}),"\n",(0,c.jsx)(e.li,{children:"28 - 16 = 12"}),"\n",(0,c.jsx)(e.li,{children:"12 - 8 = 4"}),"\n",(0,c.jsx)(e.li,{children:"4 - 4 = 0"}),"\n"]}),"\n"]}),"\n",(0,c.jsxs)(e.ol,{start:"3",children:["\n",(0,c.jsx)(e.li,{children:"\ubc29\ubc95 3 : C\uc5b8\uc5b4\ub97c \uc774\uc6a9\ud55c 2\uc9c4\uc218 \ubcc0\ud658"}),"\n"]}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-c",children:'#include <stdio.h>\n\nint main(void){\n  print("%o \\n", 156);\n}\n'})}),"\n",(0,c.jsx)(e.p,{children:"\uacb0\uacfc : 234\n%o\ub294 8\uc9c4\uc218\ub85c \ucd9c\ub825\ud558\ub294 \uc11c\uc2dd \ubb38\uc790\uc784"}),"\n",(0,c.jsxs)(e.ul,{children:["\n",(0,c.jsx)(e.li,{children:"156\uc740 8\uc9c4\uc218\ub85c 234"}),"\n",(0,c.jsx)(e.li,{children:"2\ub97c 3\uc790\ub9ac 2\uc9c4\uc218\ub85c \ubcc0\ud658 : 010"}),"\n",(0,c.jsx)(e.li,{children:"3\uc744 3\uc790\ub9ac 2\uc9c4\uc218\ub85c \ubcc0\ud658 : 011"}),"\n",(0,c.jsx)(e.li,{children:"4\ub97c 3\uc790\ub9ac 2\uc9c4\uc218\ub85c \ubcc0\ud658 : 100"}),"\n"]}),"\n",(0,c.jsx)(e.h3,{id:"2\uc9c4\uc218-8\uc9c4\uc218-16\uc9c4\uc218-\uc0c1\ud638-\ubcc0\ud658",children:"2\uc9c4\uc218, 8\uc9c4\uc218, 16\uc9c4\uc218 \uc0c1\ud638 \ubcc0\ud658"}),"\n",(0,c.jsxs)(e.table,{children:[(0,c.jsx)(e.thead,{children:(0,c.jsxs)(e.tr,{children:[(0,c.jsx)(e.th,{children:"10\uc9c4\uc218"}),(0,c.jsx)(e.th,{children:"8\uc9c4\uc218"}),(0,c.jsx)(e.th,{children:"16\uc9c4\uc218"})]})}),(0,c.jsx)(e.tbody,{children:(0,c.jsxs)(e.tr,{children:[(0,c.jsx)(e.td,{children:"0\ubd80\ud130 9\uae4c\uc9c0 \uc0ac\uc6a9"}),(0,c.jsx)(e.td,{children:"0\ubd80\ud130 7\uae4c\uc9c0 \uc0ac\uc6a9"}),(0,c.jsx)(e.td,{children:"0\ubd80\ud130 15\uae4c\uc9c0 \uc0ac\uc6a9"})]})})]}),"\n",(0,c.jsxs)(e.ul,{children:["\n",(0,c.jsxs)(e.li,{children:["16\uc9c4\uc218 : 9\uc774\uc0c1\uc758 \uc22b\uc790\uac00 \uc5c6\uae30 \ub54c\ubb38\uc5d0",(0,c.jsx)(e.br,{}),"\n","10\uc744 A,",(0,c.jsx)(e.br,{}),"\n","11\uc744 B,",(0,c.jsx)(e.br,{}),"\n","12\ub97c C,\n13\uc744 D,\n14\ub97c E,\n15\ub97c F\n\ub85c \ud45c\uc2dc\ud568"]}),"\n"]}),"\n",(0,c.jsx)(e.p,{children:"16\uc9c4\uc218 A4D\ub974\ub974 8\uc9c4\uc218\ub85c \ubcc0\ud658"}),"\n",(0,c.jsxs)(e.ul,{children:["\n",(0,c.jsx)(e.li,{children:"16\uc9c4\uc218 A4D\ub294 2\uc9c4\uc218\ub85c 1010 0100 1101"}),"\n",(0,c.jsx)(e.li,{children:"8\uc9c4\uc218\ub85c \ubcc0\ud658\ud558\ub824\uba74 \uc544\ub798 \uc790\ub9ac\ubd80\ud130 3\uc790\ub9ac\uc529 \ubcc0\ud658\ud558\uba74 5115\uac00 \ub428"}),"\n"]}),"\n",(0,c.jsx)(e.p,{children:"16\uc9c4\uc218 : A 4 D\n2\uc9c4\uc218 : 1010 0100 1101\n8\uc9c4\uc218 : 101 001 001 101\n=> 5 1 1 5"}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-c",children:'#include <stdio.h>\n\nint main(void){\n  printf("%o \\n", 0xA4D);\n}\n'})}),"\n",(0,c.jsxs)(e.ul,{children:["\n",(0,c.jsxs)(e.li,{children:["\n",(0,c.jsx)(e.p,{children:"%o : 8\uc9c4\uc218\ub85c \ucd9c\ub825\ud558\ub294 \uc11c\uc2dd \ubb38\uc790"}),"\n"]}),"\n",(0,c.jsxs)(e.li,{children:["\n",(0,c.jsx)(e.p,{children:"%x : 16\uc9c4\uc218 \uc18c\ubb38\uc790\ub85c \ucd9c\ub825\ud558\ub294 \uc11c\uc2dd\ubb38\uc790"}),"\n"]}),"\n",(0,c.jsxs)(e.li,{children:["\n",(0,c.jsx)(e.p,{children:"%X : 16\uc9c4\uc218 \ub300\ubb38\uc790\ub85c \ucd9c\ub825\ud558\ub294 \uc11c\uc2dd\ubb38\uc790"}),"\n"]}),"\n",(0,c.jsxs)(e.li,{children:["\n",(0,c.jsx)(e.p,{children:"%d : 10\uc9c4\uc218 \uc815\uc218\ub85c \ucd9c\ub825\ud558\ub294 \uc11c\uc2dd\ubb38\uc790"}),"\n"]}),"\n",(0,c.jsxs)(e.li,{children:["\n",(0,c.jsx)(e.p,{children:"0x : 16\uc9c4\uc218\ub97c \uc758\ubbf8\ud568"}),"\n"]}),"\n",(0,c.jsxs)(e.li,{children:["\n",(0,c.jsx)(e.p,{children:"0b : 2\uc9c4\uc218\ub97c \uc758\ubbf8\ud568"}),"\n"]}),"\n",(0,c.jsxs)(e.li,{children:["\n",(0,c.jsx)(e.p,{children:"0 : 8\uc9c4\uc218\ub97c \uc758\ubbf8\ud568"}),"\n"]}),"\n"]}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-c",children:'#include <stdio.h>\n\nint main(void){\n  printf("%X %x\\n", 235, 235);\n}\n'})}),"\n",(0,c.jsxs)(i,{children:[(0,c.jsx)("summary",{children:"\uc2e4\ud589 \uacb0\uacfc"}),(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-text",children:"    EB eb\n"})})]}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-c",children:'#include <stdio.h>\n\nint main(void){\n  printf("%X\\n", 23);\n  printf("%o\\n", 23);\n  printf("%d\\n", 0b00010111);\n  printf("%d\\n", 0x23);\n  printf("%x\\n", 0b11110111);\n}\n'})}),"\n",(0,c.jsx)(e.h3,{id:"scanf--\ud568\uc218",children:"scanf( ) \ud568\uc218"}),"\n",(0,c.jsxs)(e.blockquote,{children:["\n",(0,c.jsx)(e.p,{children:"\ud0a4\ubcf4\ub4dc\ub85c \ubd80\ud130 \ub370\uc774\ud130\ub97c \uc785\ub825 \ubc1b\uc74c"}),"\n"]}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-c",children:'#include <stdio.h>\n\nint main(void){\n  int score;\n\n  printf("\uc810\uc218\ub97c \uc785\ub825\ud558\uc138\uc694. \\n");\n  scanf("%d", %score);\n\n  printf("\ub2f9\uc2e0\uc758 \uc810\uc218\ub294 %d \uc785\ub2c8\ub2e4. \\n", score);\n}\n'})}),"\n",(0,c.jsxs)(i,{children:[(0,c.jsx)("summary",{children:"\uc2e4\ud589 \uacb0\uacfc"}),(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-text",children:"\uc810\uc218\ub97c \uc785\ub825\ud558\uc138\uc694.\n90\n\ub2f9\uc2e0\uc758 \uc810\uc218\ub294 90 \uc785\ub2c8\ub2e4.\n"})})]}),"\n",(0,c.jsxs)(e.ol,{children:["\n",(0,c.jsx)(e.li,{children:"int(\uc815\uc218) \ud0c0\uc785\uc73c\ub85c score \ubcc0\uc218\ub77c\ub294 \uba54\ubaa8\ub9ac \uacf5\uac04\uc744 \ucc28\uc9c0"}),"\n",(0,c.jsx)(e.li,{children:"printf \ud568\uc218\ub85c \ubb38\uc790\uc5f4 \ucd9c\ub825"}),"\n",(0,c.jsxs)(e.li,{children:["scanf \ud568\uc218\ub85c 10\uc9c4\uc218(%d)\ub97c ",(0,c.jsx)(e.strong,{children:"\ud0a4\ubcf4\ub4dc"}),"\ub85c \ubd80\ud130 \ub370\uc774\ud130 \uc785\ub825 \ubc1b\uace0,",(0,c.jsx)(e.br,{}),"\n","\uc785\ub825\ubc1b\uc740 \ub370\uc774\ud130\ub97c \ubcc0\uc218 ",(0,c.jsx)(e.strong,{children:"score \uba54\ubaa8\ub9ac\uc8fc\uc18c"}),"(&score)\uc5d0 \ud560\ub2f9"]}),"\n",(0,c.jsx)(e.li,{children:"printf \ud568\uc218\ub85c \ubb38\uc790\uc5f4 \ucd9c\ub825 + score \ub370\uc774\ud130 \ucd9c\ub825"}),"\n"]}),"\n",(0,c.jsxs)(e.p,{children:[(0,c.jsx)(e.code,{children:"int score;"})," :\n\uba54\ubaa8\ub9ac\uc5d0 \ubcc0\uc218 score\uac00 \uc815\uc218\ub97c \uc800\uc7a5\ud560 \uacf5\uac04\uc744 \ud655\ubcf4\n\uc8fc\uc18c\ub294 \uc784\uc758\ub85c \ucef4\ud4e8\ud130\uac00 \ud655\ubcf4\n\uc544\uc9c1 \ub370\uc774\ud130\ub294 \uc800\uc7a5\ub418\uc9c0 \uc54a\uc74c\n",(0,c.jsx)(e.code,{children:"&"})," : \uc8fc\uc18c \uc5f0\uc0b0\uc790\n",(0,c.jsx)(e.code,{children:"&score"})," : score\uc758 \uc8fc\uc18c\ub97c \uc758\ubbf8\ud568\n",(0,c.jsx)(e.code,{children:'scanf(" %d", &score);'})," : \ud0a4\ubcf4\ub4dc\ub85c\ubd80\ud130 \uc815\uc218 \ub370\uc774\ud130\ub97c \uc785\ub825 \ubc1b\uc544 \ubcc0\uc218 score\uc5d0 \uc800\uc7a5\ud558\ub294 \uba85\ub839 (50\uc758 2\uc9c4\uc218\uc778 00110010\uc73c\ub85c \ubcc0\ud658\ud558\uc5ec \uc800\uc7a5)"]}),"\n",(0,c.jsx)(e.h3,{id:"\uc0b0\uc220-\uc5f0\uc0b0\uc790",children:"\uc0b0\uc220 \uc5f0\uc0b0\uc790"}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-c",children:'#include <stdio.h>\n\nint main(void){\n  int a = 10, b = 3;\n\n  printf("%d\\n", a+b);\n  printf("%d\\n", a-b);\n  printf("%d\\n", a*b);\n  printf("%d\\n", (a/b))\n  printf("%d\\n", a%b);\n}\n'})}),"\n",(0,c.jsxs)(i,{children:[(0,c.jsx)("summary",{children:"\uc2e4\ud589 \uacb0\uacfc"}),(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-text",children:"  13\n  7\n  30\n  3\n  1\n"})})]}),"\n",(0,c.jsx)(e.p,{children:"/ \uc5f0\uc0b0 : \uc815\uc218\uc778 \uacbd\uc6b0 \ubaab\uc744 \uacc4\uc0b0\n% \uc5f0\uc0b0 : \uc815\uc218\uc778 \uacbd\uc6b0 \ub098\uba38\uc9c0\ub97c \uacc4\uc0b0"}),"\n",(0,c.jsx)(e.p,{children:"\uc2e4\uc218 \uc758 \uacc4\uc0b0"}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-c",children:'#include <stdio.h>\n\nint main(void){\n  float a = 10.0, b = 3.0;\n\n  printf("%f\\n", a/b);\n}\n'})}),"\n",(0,c.jsxs)(i,{children:[(0,c.jsx)("summary",{children:"\uc2e4\ud589 \uacb0\uacfc"}),(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-text",children:"3.333333\n"})})]}),"\n",(0,c.jsx)(e.h3,{id:"\ub300\uc785-\uc5f0\uc0b0\uc790",children:"\ub300\uc785 \uc5f0\uc0b0\uc790(=)"}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-c",children:'#include <stdio.h>\n\nint main(void){\n  int a = 10, b = 5;\n\n  a = b;\n\n  printf("a = %d\\n", a);\n  printf("b = %d\\n", b);\n}\n'})}),"\n",(0,c.jsxs)(i,{children:[(0,c.jsx)("summary",{children:"\uc2e4\ud589 \uacb0\uacfc"}),(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-text",children:"  a = 5\n  b = 5\n"})})]}),"\n",(0,c.jsx)(e.h3,{id:"\ub300\uc785-\uc5f0\uc0b0\uc790-1",children:"\ub300\uc785 \uc5f0\uc0b0\uc790(+=)"}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-c",children:'#include <stdio.h>\n\nint main(void){\n  int a = 10, b = 5;\n\n  a += b;\n\n  printf("a = %d\\n", a);\n  printf("b = %d\\n", b);\n}\n'})}),"\n",(0,c.jsxs)(i,{children:[(0,c.jsx)("summary",{children:"\uc2e4\ud589 \uacb0\uacfc"}),(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-text",children:"  a = 15\n  b = 5\n"})})]}),"\n",(0,c.jsx)(e.h3,{id:"\uc99d\uac00-\uc5f0\uc0b0\uc790",children:"\uc99d\uac00 \uc5f0\uc0b0\uc790(++)"}),"\n",(0,c.jsxs)(e.ol,{children:["\n",(0,c.jsx)(e.li,{children:"\uc120 \uc99d\uac00 (++\ubcc0\uc218);"}),"\n"]}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-c",children:'#include <stdio.h>\n\nint main(void){\n  int a = 10, r = 0;\n\n  r = ++a;\n\n  printf("a = %d\\n", a);\n  printf("b = %d\\n", r);\n}\n'})}),"\n",(0,c.jsxs)(i,{children:[(0,c.jsx)("summary",{children:"\uc2e4\ud589 \uacb0\uacfc"}),(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-text",children:"  a = 11\n  r = 11\n"})})]}),"\n",(0,c.jsxs)(e.ol,{start:"2",children:["\n",(0,c.jsx)(e.li,{children:"\ud6c4 \uc99d\uac00 (\ubcc0\uc218++)"}),"\n"]}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-c",children:'#include <stdio.h>\n\nint main(void){\n  int a = 10, r = 0;\n\n  r = a++;\n\n  printf("a = %d\\n", a);\n  printf("b = %d\\n", r);\n}\n'})}),"\n",(0,c.jsxs)(i,{children:[(0,c.jsx)("summary",{children:"\uc2e4\ud589 \uacb0\uacfc"}),(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-text",children:"  a = 11\n  r = 10\n"})})]}),"\n",(0,c.jsx)(e.h3,{id:"\ubb38\uc790-\uc790\ub8cc\ud615-\uc0ac\uc6a9\ud558\uae30",children:"\ubb38\uc790 \uc790\ub8cc\ud615 \uc0ac\uc6a9\ud558\uae30"}),"\n",(0,c.jsx)(e.h4,{id:"\uc815\uc218-\uc790\ub8cc\ud615-char",children:"\uc815\uc218 \uc790\ub8cc\ud615 char"}),"\n",(0,c.jsx)(e.p,{children:"char\ub294 \ubb38\uc790 \ud55c \uac1c\ub97c \uc800\uc7a5\ud568"}),"\n",(0,c.jsxs)(e.p,{children:["char, signed char ( \ubd80\ud638\uac00 \uc788\uc74c )",(0,c.jsx)(e.br,{}),"\n","\ud06c\uae30: 1\ubc14\uc774\ud2b8",(0,c.jsx)(e.br,{}),"\n","\ubc94\uc704: -128 ~ 127",(0,c.jsx)(e.br,{}),"\n","\ubb38\uc790 \uc800\uc7a5"]}),"\n",(0,c.jsxs)(e.p,{children:["unsigned char ( \ubd80\ud638\uac00 \uc5c6\uc74c )",(0,c.jsx)(e.br,{}),"\n","\ud06c\uae30: 1\ubc14\uc774\ud2b8",(0,c.jsx)(e.br,{}),"\n","\ubc94\uc704: 0 ~ 255",(0,c.jsx)(e.br,{}),"\n","\ubc14\uc774\ud2b8 \ub2e8\uc704 \ub370\uc774\ud130 \uc800\uc7a5"]}),"\n",(0,c.jsxs)(e.ul,{children:["\n",(0,c.jsx)(e.li,{children:"char\uc5d0 \ubb38\uc790\ub97c \uc800\uc7a5\ud560 \ub54c \ubb38\uc790\uc790\uccb4\ub97c \uc800\uc7a5\ud558\ub294 \uac83\uc774 \uc544\ub2cc, \ubb38\uc790\uc5d0 \ud574\ub2f9\ud558\ub294 \uc815\uc22b\uac12\uc744 \uc800\uc7a5"}),"\n",(0,c.jsx)(e.li,{children:"\uc774 \uaddc\uce59\uc744 \uc544\uc2a4\ud0a4(ASCII) \ucf54\ub4dc\ub77c\uace0 \ud568"}),"\n"]}),"\n",(0,c.jsx)(e.p,{children:"\uc791\uc740 \ub530\uc634\ud45c ('a') : \ubb38\uc790 \ud558\ub098\ub9cc \ubb36\uc744 \uc218 \uc788\uc74c"}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-c",children:'#include <stdio.h>\n\nint main(void){\n  char alphabet = \'a\';\n\n  printf("%d\\n", a);\n  printf("%c\\n", a);\n}\n'})}),"\n",(0,c.jsxs)(i,{children:[(0,c.jsx)("summary",{children:"\uc2e4\ud589 \uacb0\uacfc"}),(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-text",children:"  97\n  a\n"})})]}),"\n",(0,c.jsx)(e.h4,{id:"\ubb38\uc790-0\uacfc-\uc22b\uc790-0\uc758-\ucc28\uc774",children:"\ubb38\uc790 0\uacfc \uc22b\uc790 0\uc758 \ucc28\uc774"}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-c",children:'#include <stdio.h>\n\nint main(void){\n  char alphabet1 = \'0\';\n  char alphabet2 = 0;\n\n  printf("%d    %c\\n", alphabet1, alphabet1);\n  printf("%d    %c\\n", alphabet2, alphabet2);\n}\n'})}),"\n",(0,c.jsxs)(i,{children:[(0,c.jsx)("summary",{children:"\uc2e4\ud589 \uacb0\uacfc"}),(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-text",children:"  48 0\n  0\n"})})]}),"\n",(0,c.jsx)(e.h4,{id:"\ubb38\uc790\ub85c-\uc5f0\uc0b0\ud558\uae30",children:"\ubb38\uc790\ub85c \uc5f0\uc0b0\ud558\uae30"}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-c",children:"#include <stdio.h>\n\nint main(void){\n  char alphabet = 'a';\n\n  printf(\"%d    %c\\n\", alphabet, alphabet + 3);\n}\n"})}),"\n",(0,c.jsxs)(i,{children:[(0,c.jsx)("summary",{children:"\uc2e4\ud589 \uacb0\uacfc"}),(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-text",children:"  97 d\n"})})]}),"\n",(0,c.jsx)(e.h4,{id:"\uc81c\uc5b4-\ubb38\uc790-\uc0ac\uc6a9\ud558\uae30",children:"\uc81c\uc5b4 \ubb38\uc790 \uc0ac\uc6a9\ud558\uae30"}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-c",children:"#include <stdio.h>\n\nint main(void){\n  char char1 = 'a';\n  char char2 = '\\t';\n  char char3 = 'A';\n  char char4 = '\\n';\n  char char5 = 'N';\n\n  printf(\"%c%c%c%c%c\\n\", char1, char2, char3, char4, char5);\n}\n"})}),"\n",(0,c.jsxs)(i,{children:[(0,c.jsx)("summary",{children:"\uc2e4\ud589 \uacb0\uacfc"}),(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-text",children:"  H A\n  N\n"})})]}),"\n",(0,c.jsx)(e.h4,{id:"\uc22b\uc790-\ubb38\uc790-\uc0ac\uc6a9\ud558\uae30",children:"\uc22b\uc790 \ubb38\uc790 \uc0ac\uc6a9\ud558\uae30"}),"\n",(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-c",children:"#include <stdio.h>\n\nint main(void){\n  char num1 = 5;\n\n  printf(\"%c%c%c \\n\", numb1 + '0', '\\t', num1 + 48);\n}\n"})}),"\n",(0,c.jsxs)(i,{children:[(0,c.jsx)("summary",{children:"\uc2e4\ud589 \uacb0\uacfc"}),(0,c.jsx)(e.pre,{children:(0,c.jsx)(e.code,{className:"language-text",children:"  5 5\n"})})]})]})}function x(n={}){const{wrapper:e}={...(0,l.R)(),...n.components};return e?(0,c.jsx)(e,{...n,children:(0,c.jsx)(t,{...n})}):t(n)}},28453:(n,e,i)=>{i.d(e,{R:()=>r,x:()=>d});var s=i(96540);const c={},l=s.createContext(c);function r(n){const e=s.useContext(l);return s.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function d(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(c):n.components||c:r(n.components),s.createElement(l.Provider,{value:e},n.children)}}}]);
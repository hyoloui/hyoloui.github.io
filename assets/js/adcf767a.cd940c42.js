"use strict";(self.webpackChunkhyoloui=self.webpackChunkhyoloui||[]).push([[7540],{7455:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>t,contentTitle:()=>l,default:()=>j,frontMatter:()=>i,metadata:()=>c,toc:()=>h});var d=s(4848),r=s(8453);const i={sidebar_position:10,title:"SQL \ud504\ub85c\uadf8\ub798\ubc0d(1)",description:"\uc77c\ubc18 \ud504\ub85c\uadf8\ub798\ubc0d \uc5b8\uc5b4\uc5d0\uc11c \ud65c\uc6a9\ub418\ub294 \ubc29\ubc95\uc744 SQL Server \uc5d0\uc11c \ud65c\uc6a9\ud558\ub3c4\ub85d \ud569\ub2c8\ub2e4"},l=void 0,c={id:"SQL/07_01",title:"SQL \ud504\ub85c\uadf8\ub798\ubc0d(1)",description:"\uc77c\ubc18 \ud504\ub85c\uadf8\ub798\ubc0d \uc5b8\uc5b4\uc5d0\uc11c \ud65c\uc6a9\ub418\ub294 \ubc29\ubc95\uc744 SQL Server \uc5d0\uc11c \ud65c\uc6a9\ud558\ub3c4\ub85d \ud569\ub2c8\ub2e4",source:"@site/docs/SQL/07_01.md",sourceDirName:"SQL",slug:"/SQL/07_01",permalink:"/docs/SQL/07_01",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/SQL/07_01.md",tags:[],version:"current",sidebarPosition:10,frontMatter:{sidebar_position:10,title:"SQL \ud504\ub85c\uadf8\ub798\ubc0d(1)",description:"\uc77c\ubc18 \ud504\ub85c\uadf8\ub798\ubc0d \uc5b8\uc5b4\uc5d0\uc11c \ud65c\uc6a9\ub418\ub294 \ubc29\ubc95\uc744 SQL Server \uc5d0\uc11c \ud65c\uc6a9\ud558\ub3c4\ub85d \ud569\ub2c8\ub2e4"},sidebar:"tutorialSidebar",previous:{title:"JOIN",permalink:"/docs/SQL/06_03"},next:{title:"SQL \ud504\ub85c\uadf8\ub798\ubc0d(2)",permalink:"/docs/SQL/07_02"}},t={},h=[{value:"IF ... ELSE",id:"if--else",level:3},{value:"\uc608\uc81c \ucf54\ub4dc",id:"\uc608\uc81c-\ucf54\ub4dc",level:4},{value:"CASE",id:"case",level:3},{value:"\uc608\uc81c \ucf54\ub4dc",id:"\uc608\uc81c-\ucf54\ub4dc-1",level:4},{value:"\ud65c\uc6a9",id:"\ud65c\uc6a9",level:3},{value:"\uad6c\ub9e4\ub0b4\uc5ed\uc758 \ud68c\uc6d0 \ubcc4 \ucd1d\uc561",id:"\uad6c\ub9e4\ub0b4\uc5ed\uc758-\ud68c\uc6d0-\ubcc4-\ucd1d\uc561",level:4},{value:"\uad6c\ub9e4\ub0b4\uc5ed\uc758 \ud68c\uc6d0(+ name) \ubcc4 \ucd1d\uc561",id:"\uad6c\ub9e4\ub0b4\uc5ed\uc758-\ud68c\uc6d0-name-\ubcc4-\ucd1d\uc561",level:4},{value:"\uad6c\ub9e4\ub0b4\uc5ed\uc758 \ud68c\uc6d0 \ubcc4 \ucd1d\uc561 \ubc0f \ud68c\uc6d0\uc815\ubcf4",id:"\uad6c\ub9e4\ub0b4\uc5ed\uc758-\ud68c\uc6d0-\ubcc4-\ucd1d\uc561-\ubc0f-\ud68c\uc6d0\uc815\ubcf4",level:4},{value:"\uad6c\ub9e4\ub0b4\uc5ed\uc758 \ud68c\uc6d0 \ubcc4 \ub4f1\uae09 \ucc98\ub9ac",id:"\uad6c\ub9e4\ub0b4\uc5ed\uc758-\ud68c\uc6d0-\ubcc4-\ub4f1\uae09-\ucc98\ub9ac",level:4}];function x(e){const n={blockquote:"blockquote",code:"code",em:"em",h3:"h3",h4:"h4",hr:"hr",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,r.R)(),...e.components},{Details:s}=n;return s||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(n.h3,{id:"if--else",children:"IF ... ELSE"}),"\n",(0,d.jsxs)(n.blockquote,{children:["\n",(0,d.jsx)(n.p,{children:"\uc870\uac74\ubb38"}),"\n",(0,d.jsx)(n.p,{children:"\ucc38\uacfc \uac70\uc9d3\uc5d0 \uc758\ud574\uc11c \uc2e4\ud589\ud574\uc57c \ud560 \uad6c\ubb38\uc774 \ub2e4\ub97c \ub54c \uc0ac\uc6a9\ud568"}),"\n"]}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-SQL",children:"IF <\ubd80\uc6b8 \ud45c\ud604\uc2dd>\n    BEGIN -- '{' \uc5ed\ud560\n      SQL\ubb38\uc7a5\ub4e41...\n    END -- '}' \uc5ed\ud560\nELSE\n    BEGIN\n      SQL\ubb38\uc7a5\ub4e42...\n    END\n"})}),"\n",(0,d.jsx)(n.h4,{id:"\uc608\uc81c-\ucf54\ub4dc",children:"\uc608\uc81c \ucf54\ub4dc"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-sql",children:"DECLARE @var1 INT -- @var1\uc5d0 \ubcc0\uc218 \uc120\uc5b8\nSET @var1 = 100 -- \ubcc0\uc218\uc5d0 \uac12 \ub300\uc785\n\nIF @var1 = 100 -- \ub9cc\uc57d @var1\uc774 100\uc774\ub77c\uba74,\n    BEGIN\n        PRINT '@var1\uc774 100\uc774\ub2e4'\n    END\nELSE\n    BEGIN\n        PRINT '@var1dl 100\uc774 \uc544\ub2c8\ub2e4'\n    END\n"})}),"\n",(0,d.jsxs)(s,{children:[(0,d.jsx)("summary",{children:"\uc2e4\ud589 \uacb0\uacfc"}),(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-text",children:"@var1\uc774 100\uc774\ub2e4\n"})})]}),"\n",(0,d.jsx)("br",{}),"\n",(0,d.jsx)(n.hr,{}),"\n",(0,d.jsx)(n.h3,{id:"case",children:"CASE"}),"\n",(0,d.jsxs)(n.blockquote,{children:["\n",(0,d.jsx)(n.p,{children:"\uc5ec\ub7ec \uac1c\uc758 \uacbd\uc6b0\uc5d0 \ub530\ub77c\uc11c \uc11c\ub85c \ub2e4\ub978 \uad6c\ubb38\uc744 \uc218\ud589\ud560 \uacbd\uc6b0\nIF \ubb38\ubcf4\ub2e4 \uac04\uacb0\ud558\uac8c \uc0ac\uc6a9\ud560 \uc218 \uc788\uc74c"}),"\n"]}),"\n",(0,d.jsx)(n.h4,{id:"\uc608\uc81c-\ucf54\ub4dc-1",children:"\uc608\uc81c \ucf54\ub4dc"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-sql",children:"DECLARE point INT, @credit NCHAR(1)\nSET @point = 100\n\nSET @credit =\n  CASE\n    WHEN (@point >= 90) THEN 'A'\n    WHEN (@point >= 80) THEN 'B'\n    WHEN (@point >= 70) THEN 'C'\n    WHEN (@point >= 60) THEN 'D'\n    ELSE 'F'\n  END\n\nPRINT '\ucde8\ub4dd\uc810\uc218 ==>' + CAST(@point AS NCHAR(3)) -- \uc22b\uc790\ub97c \ubb38\uc790\ub85c \ubcc0\ud658\nPRINT '\ud559\uc810 ==>' + @credit\n"})}),"\n",(0,d.jsxs)(s,{children:[(0,d.jsx)("summary",{children:"\uc2e4\ud589 \uacb0\uacfc"}),(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-text",children:"\ucde8\ub4dd\uc810\uc218 ==> 100\n\ud559\uc810 ==> A\n"})})]}),"\n",(0,d.jsx)("br",{}),"\n",(0,d.jsx)(n.hr,{}),"\n",(0,d.jsx)(n.h3,{id:"\ud65c\uc6a9",children:"\ud65c\uc6a9"}),"\n",(0,d.jsx)(n.h4,{id:"\uad6c\ub9e4\ub0b4\uc5ed\uc758-\ud68c\uc6d0-\ubcc4-\ucd1d\uc561",children:"\uad6c\ub9e4\ub0b4\uc5ed\uc758 \ud68c\uc6d0 \ubcc4 \ucd1d\uc561"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-sql",children:"USE sqlDB;\nSELECT userID, SUM(price * amount)\nFROM buyTBL\nGROUP BY userID\nORDER BY SUM(price * amount) DESC;\n"})}),"\n",(0,d.jsxs)(s,{children:[(0,d.jsx)("summary",{children:"\uc2e4\ud589 \uacb0\uacfc"}),(0,d.jsxs)(n.table,{children:[(0,d.jsx)(n.thead,{children:(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.th,{children:"userID"}),(0,d.jsx)(n.th,{})]})}),(0,d.jsxs)(n.tbody,{children:[(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"BBK"}),(0,d.jsx)(n.td,{children:"1920"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"KBS"}),(0,d.jsx)(n.td,{children:"1210"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"JYP"}),(0,d.jsx)(n.td,{children:"200"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"EJW"}),(0,d.jsx)(n.td,{children:"95"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"SSK"}),(0,d.jsx)(n.td,{children:"75"})]})]})]})]}),"\n",(0,d.jsx)("br",{}),"\n",(0,d.jsx)(n.h4,{id:"\uad6c\ub9e4\ub0b4\uc5ed\uc758-\ud68c\uc6d0-name-\ubcc4-\ucd1d\uc561",children:"\uad6c\ub9e4\ub0b4\uc5ed\uc758 \ud68c\uc6d0(+ name) \ubcc4 \ucd1d\uc561"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-sql",children:"USE sqlDB;\nSELECT B.userID, U.name, SUM(B.price * B.amount)\nFROM buyTBL B\n    INNER JOIN userTBL U\n        ON B.userID = U.userID\nGROUP BY B.userID, U.name\nORDER BY SUM(B.price * B.amount) DESC;\n"})}),"\n",(0,d.jsxs)(s,{children:[(0,d.jsx)("summary",{children:"\uc2e4\ud589 \uacb0\uacfc"}),(0,d.jsxs)(n.table,{children:[(0,d.jsx)(n.thead,{children:(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.th,{children:"userID"}),(0,d.jsx)(n.th,{children:"name"}),(0,d.jsx)(n.th,{})]})}),(0,d.jsxs)(n.tbody,{children:[(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"BBK"}),(0,d.jsx)(n.td,{children:"\ubc14\ube44\ud0b4"}),(0,d.jsx)(n.td,{children:"1920"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"KBS"}),(0,d.jsx)(n.td,{children:"\uae40\ubc94\uc218"}),(0,d.jsx)(n.td,{children:"1210"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"JYP"}),(0,d.jsx)(n.td,{children:"\uc870\uc6a9\ud544"}),(0,d.jsx)(n.td,{children:"200"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"EJW"}),(0,d.jsx)(n.td,{children:"\uc740\uc9c0\uc6d0"}),(0,d.jsx)(n.td,{children:"95"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"SSK"}),(0,d.jsx)(n.td,{children:"\uc131\uc2dc\uacbd"}),(0,d.jsx)(n.td,{children:"75"})]})]})]})]}),"\n",(0,d.jsx)("br",{}),"\n",(0,d.jsx)(n.h4,{id:"\uad6c\ub9e4\ub0b4\uc5ed\uc758-\ud68c\uc6d0-\ubcc4-\ucd1d\uc561-\ubc0f-\ud68c\uc6d0\uc815\ubcf4",children:"\uad6c\ub9e4\ub0b4\uc5ed\uc758 \ud68c\uc6d0 \ubcc4 \ucd1d\uc561 \ubc0f \ud68c\uc6d0\uc815\ubcf4"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-sql",children:"USE sqlDB;\nSELECT U.userID, U.name, SUM(B.price * B.amount)\nFROM buyTBL B\n    RIGHT OUTER JOIN userTBL U\n        ON B.userID = U.userID\nGROUP BY U.userID, U.name\nORDER BY SUM(B.price * B.amount) DESC;\n"})}),"\n",(0,d.jsxs)(s,{children:[(0,d.jsx)("summary",{children:"\uc2e4\ud589 \uacb0\uacfc"}),(0,d.jsxs)(n.table,{children:[(0,d.jsx)(n.thead,{children:(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.th,{children:"userID"}),(0,d.jsx)(n.th,{children:"name"}),(0,d.jsx)(n.th,{})]})}),(0,d.jsxs)(n.tbody,{children:[(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"BBK"}),(0,d.jsx)(n.td,{children:"\ubc14\ube44\ud0b4"}),(0,d.jsx)(n.td,{children:"1920"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"KBS"}),(0,d.jsx)(n.td,{children:"\uae40\ubc94\uc218"}),(0,d.jsx)(n.td,{children:"1210"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"JYP"}),(0,d.jsx)(n.td,{children:"\uc870\uc6a9\ud544"}),(0,d.jsx)(n.td,{children:"200"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"EJW"}),(0,d.jsx)(n.td,{children:"\uc740\uc9c0\uc6d0"}),(0,d.jsx)(n.td,{children:"95"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"SSK"}),(0,d.jsx)(n.td,{children:"\uc131\uc2dc\uacbd"}),(0,d.jsx)(n.td,{children:"75"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"YJS"}),(0,d.jsx)(n.td,{children:"\uc724\uc885\uc2e0"}),(0,d.jsx)(n.td,{children:(0,d.jsx)(n.em,{children:"--NULL--"})})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"JKW"}),(0,d.jsx)(n.td,{children:"\uc870\uad00\uc6b0"}),(0,d.jsx)(n.td,{children:(0,d.jsx)(n.em,{children:"--NULL--"})})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"KKH"}),(0,d.jsx)(n.td,{children:"\uae40\uacbd\ud638"}),(0,d.jsx)(n.td,{children:(0,d.jsx)(n.em,{children:"--NULL--"})})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"LJB"}),(0,d.jsx)(n.td,{children:"\uc784\uc7ac\ubc94"}),(0,d.jsx)(n.td,{children:(0,d.jsx)(n.em,{children:"--NULL--"})})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"LJB"}),(0,d.jsx)(n.td,{children:"\uc774\uc2b9\uae30"}),(0,d.jsx)(n.td,{children:(0,d.jsx)(n.em,{children:"--NULL--"})})]})]})]})]}),"\n",(0,d.jsx)("br",{}),"\n",(0,d.jsx)(n.h4,{id:"\uad6c\ub9e4\ub0b4\uc5ed\uc758-\ud68c\uc6d0-\ubcc4-\ub4f1\uae09-\ucc98\ub9ac",children:"\uad6c\ub9e4\ub0b4\uc5ed\uc758 \ud68c\uc6d0 \ubcc4 \ub4f1\uae09 \ucc98\ub9ac"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-sql",children:"USE sqlDB;\nSELECT U.userID, U.name, SUM(B.price * B.amount)\n    CASE\n        WHEN ( SUM(B.price * B.amount ) >= 1500) THEN '\ucd5c\uc6b0\uc218\uace0\uac1d'\n        WHEN ( SUM(B.price * B.amount ) >= 1000) THEN '\uc6b0\uc218\uace0\uac1d'\n        WHEN ( SUM(B.price * B.amount ) >= 1) THEN '\uc77c\ubc18\uace0\uac1d'\n        ELSE '\uc720\ub839\uace0\uac1d'\n    END AS [\uace0\uac1d\ub4f1\uae09]\nFROM buyTBL B\n    RIGHT OUTER JOIN userTBL U\n        ON B.userID = U.userID\nGROUP BY U.userID, U.name\nORDER BY SUM(B.price * B.amount) DESC;\n"})}),"\n",(0,d.jsxs)(s,{children:[(0,d.jsx)("summary",{children:"\uc2e4\ud589 \uacb0\uacfc"}),(0,d.jsxs)(n.table,{children:[(0,d.jsx)(n.thead,{children:(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.th,{children:"userID"}),(0,d.jsx)(n.th,{children:"name"}),(0,d.jsx)(n.th,{}),(0,d.jsx)(n.th,{children:"\uace0\uac1d\ub4f1\uae09"})]})}),(0,d.jsxs)(n.tbody,{children:[(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"BBK"}),(0,d.jsx)(n.td,{children:"\ubc14\ube44\ud0b4"}),(0,d.jsx)(n.td,{children:"1920"}),(0,d.jsx)(n.td,{children:"\ucd5c\uc6b0\uc218\uace0\uac1d"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"KBS"}),(0,d.jsx)(n.td,{children:"\uae40\ubc94\uc218"}),(0,d.jsx)(n.td,{children:"1210"}),(0,d.jsx)(n.td,{children:"\uc6b0\uc218\uace0\uac1d"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"JYP"}),(0,d.jsx)(n.td,{children:"\uc870\uc6a9\ud544"}),(0,d.jsx)(n.td,{children:"200"}),(0,d.jsx)(n.td,{children:"\uc77c\ubc18\uace0\uac1d"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"EJW"}),(0,d.jsx)(n.td,{children:"\uc740\uc9c0\uc6d0"}),(0,d.jsx)(n.td,{children:"95"}),(0,d.jsx)(n.td,{children:"\uc77c\ubc18\uace0\uac1d"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"SSK"}),(0,d.jsx)(n.td,{children:"\uc131\uc2dc\uacbd"}),(0,d.jsx)(n.td,{children:"75"}),(0,d.jsx)(n.td,{children:"\uc77c\ubc18\uace0\uac1d"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"YJS"}),(0,d.jsx)(n.td,{children:"\uc724\uc885\uc2e0"}),(0,d.jsx)(n.td,{children:(0,d.jsx)(n.em,{children:"--NULL--"})}),(0,d.jsx)(n.td,{children:"\uc720\ub839\uace0\uac1d"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"JKW"}),(0,d.jsx)(n.td,{children:"\uc870\uad00\uc6b0"}),(0,d.jsx)(n.td,{children:(0,d.jsx)(n.em,{children:"--NULL--"})}),(0,d.jsx)(n.td,{children:"\uc720\ub839\uace0\uac1d"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"KKH"}),(0,d.jsx)(n.td,{children:"\uae40\uacbd\ud638"}),(0,d.jsx)(n.td,{children:(0,d.jsx)(n.em,{children:"--NULL--"})}),(0,d.jsx)(n.td,{children:"\uc720\ub839\uace0\uac1d"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"LJB"}),(0,d.jsx)(n.td,{children:"\uc784\uc7ac\ubc94"}),(0,d.jsx)(n.td,{children:(0,d.jsx)(n.em,{children:"--NULL--"})}),(0,d.jsx)(n.td,{children:"\uc720\ub839\uace0\uac1d"})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{children:"LJB"}),(0,d.jsx)(n.td,{children:"\uc774\uc2b9\uae30"}),(0,d.jsx)(n.td,{children:(0,d.jsx)(n.em,{children:"--NULL--"})}),(0,d.jsx)(n.td,{children:"\uc720\ub839\uace0\uac1d"})]})]})]})]})]})}function j(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,d.jsx)(n,{...e,children:(0,d.jsx)(x,{...e})}):x(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>l,x:()=>c});var d=s(6540);const r={},i=d.createContext(r);function l(e){const n=d.useContext(i);return d.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:l(e.components),d.createElement(i.Provider,{value:n},e.children)}}}]);
"use strict";(self.webpackChunkhyoloui=self.webpackChunkhyoloui||[]).push([[3095],{2953:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>t,contentTitle:()=>c,default:()=>E,frontMatter:()=>i,metadata:()=>d,toc:()=>h});const d=JSON.parse('{"id":"SQL/05_03","title":"T-SQL \ubd84\ub958 \ubc0f \ub370\uc774\ud130 \ubcc0\uacbd\uc744 \uc704\ud55c SQL \ubb38","description":"\ub370\uc774\ud130 \ubcc0\uacbd\uc5d0\uc11c \uc0ac\uc6a9\ub418\ub294 INSERT, UPDATE, DELETE \ubb38\uc744 \ud65c\uc6a9","source":"@site/docs/SQL/05_03.md","sourceDirName":"SQL","slug":"/SQL/05_03","permalink":"/docs/SQL/05_03","draft":false,"unlisted":false,"editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/SQL/05_03.md","tags":[],"version":"current","sidebarPosition":7,"frontMatter":{"sidebar_position":7,"title":"T-SQL \ubd84\ub958 \ubc0f \ub370\uc774\ud130 \ubcc0\uacbd\uc744 \uc704\ud55c SQL \ubb38","description":"\ub370\uc774\ud130 \ubcc0\uacbd\uc5d0\uc11c \uc0ac\uc6a9\ub418\ub294 INSERT, UPDATE, DELETE \ubb38\uc744 \ud65c\uc6a9"},"sidebar":"tutorialSidebar","previous":{"title":"SELECT \ubb38(2)","permalink":"/docs/SQL/05_02"},"next":{"title":"\ub370\uc774\ud130 \ud615\uc2dd(1)","permalink":"/docs/SQL/06_01"}}');var l=s(4848),r=s(8453);const i={sidebar_position:7,title:"T-SQL \ubd84\ub958 \ubc0f \ub370\uc774\ud130 \ubcc0\uacbd\uc744 \uc704\ud55c SQL \ubb38",description:"\ub370\uc774\ud130 \ubcc0\uacbd\uc5d0\uc11c \uc0ac\uc6a9\ub418\ub294 INSERT, UPDATE, DELETE \ubb38\uc744 \ud65c\uc6a9"},c=void 0,t={},h=[{value:"T-SQL\uc758 \ubd84\ub958",id:"t-sql\uc758-\ubd84\ub958",level:2},{value:"DML",id:"dml",level:3},{value:"DDL",id:"ddl",level:3},{value:"DCL",id:"dcl",level:3},{value:"\ub370\uc774\ud130 \uc0bd\uc785",id:"\ub370\uc774\ud130-\uc0bd\uc785",level:2},{value:"<code>INSERT</code> \ubb38 \uae30\ubcf8",id:"insert-\ubb38-\uae30\ubcf8",level:3},{value:"\uc790\ub3d9\uc73c\ub85c \uc99d\uac00\ud558\ub294 <code>IDENTITY</code>",id:"\uc790\ub3d9\uc73c\ub85c-\uc99d\uac00\ud558\ub294-identity",level:3},{value:"<code>SEQUENCE</code>",id:"sequence",level:3},{value:"\ub300\ub7c9\uc758 \uc0d8\ud50c\ub370\uc774\ud130 \uc0dd\uc131",id:"\ub300\ub7c9\uc758-\uc0d8\ud50c\ub370\uc774\ud130-\uc0dd\uc131",level:3},{value:"\ub370\uc774\ud130 \uc218\uc815",id:"\ub370\uc774\ud130-\uc218\uc815",level:2},{value:"<code>UPDATE</code>",id:"update",level:3},{value:"\ub370\uc774\ud130 \uc0ad\uc81c",id:"\ub370\uc774\ud130-\uc0ad\uc81c",level:2},{value:"<code>DELETE</code>",id:"delete",level:3},{value:"MERGE",id:"merge",level:3}];function x(e){const n={admonition:"admonition",blockquote:"blockquote",br:"br",code:"code",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.R)(),...e.components},{Details:s}=n;return s||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.h2,{id:"t-sql\uc758-\ubd84\ub958",children:"T-SQL\uc758 \ubd84\ub958"}),"\n",(0,l.jsx)(n.h3,{id:"dml",children:"DML"}),"\n",(0,l.jsxs)(n.blockquote,{children:["\n",(0,l.jsx)(n.p,{children:"Data Manipulation Language\n\ub370\uc774\ud130 \uc870\uc791 \uc5b8\uc5b4"}),"\n"]}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\ub370\uc774\ud130\uc758 \uc120\ud0dd, \uc0bd\uc785, \uc218\uc815, \uc0ad\uc81c\uc5d0 \uc0ac\uc6a9"}),"\n",(0,l.jsxs)(n.li,{children:["\ub300\uc0c1\uc740 \ud14c\uc774\ube14\uc758 ",(0,l.jsx)(n.strong,{children:"\ud589"})]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"SELECT"}),", ",(0,l.jsx)(n.code,{children:"INSERT"}),", ",(0,l.jsx)(n.code,{children:"UPDATE"}),", ",(0,l.jsx)(n.code,{children:"DELETE"}),"\uac00 \ud574\ub2f9"]}),"\n",(0,l.jsxs)(n.li,{children:["\ud2b8\ub79c\uc7ad\uc158(Transaction)\uc744 \ubc1c\uc0dd\uc2dc\ud0b4(",(0,l.jsx)(n.code,{children:"SELECT"})," \uc81c\uc678)"]}),"\n"]}),"\n",(0,l.jsx)("br",{}),"\n",(0,l.jsx)(n.h3,{id:"ddl",children:"DDL"}),"\n",(0,l.jsxs)(n.blockquote,{children:["\n",(0,l.jsx)(n.p,{children:"Data Definition Language\n\ub370\uc774\ud130 \uc815\uc758 \uc5b8\uc5b4"}),"\n"]}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\ub370\uc774\ud130\ubca0\uc774\uc2a4 \uac1c\uccb4\ub97c \uc0dd\uc131, \uc0ad\uc81c, \ubcc0\uacbd\ud558\ub294 \ub370 \uc0ac\uc6a9"}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"CREATE"}),", ",(0,l.jsx)(n.code,{children:"DROP"}),", ",(0,l.jsx)(n.code,{children:"ALTER"})," \ub4f1\uc774 \ud574\ub2f9"]}),"\n",(0,l.jsx)(n.li,{children:"\ud2b8\ub79c\uc7ad\uc158\uc744 \ubc1c\uc0dd\uc2dc\ud0a4\uc9c0 \uc54a\uc74c"}),"\n"]}),"\n",(0,l.jsx)("br",{}),"\n",(0,l.jsx)(n.h3,{id:"dcl",children:"DCL"}),"\n",(0,l.jsxs)(n.blockquote,{children:["\n",(0,l.jsx)(n.p,{children:"Data Control Language\n\ub370\uc774\ud130 \uc81c\uc5b4 \uc5b8\uc5b4"}),"\n"]}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\uc0ac\uc6a9\uc790\uc5d0\uac8c \uad8c\ud55c \ubd80\uc5ec \uc2dc\uc5d0 \uc8fc\ub85c \uc0ac\uc6a9"}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"GRANT"}),", ",(0,l.jsx)(n.code,{children:"REVOKE"}),", ",(0,l.jsx)(n.code,{children:"DENY"})," \ub4f1\uc774 \ud574\ub2f9"]}),"\n"]}),"\n",(0,l.jsx)("br",{}),"\n",(0,l.jsx)(n.hr,{}),"\n",(0,l.jsx)("br",{}),"\n",(0,l.jsx)(n.h2,{id:"\ub370\uc774\ud130-\uc0bd\uc785",children:"\ub370\uc774\ud130 \uc0bd\uc785"}),"\n",(0,l.jsxs)(n.h3,{id:"insert-\ubb38-\uae30\ubcf8",children:[(0,l.jsx)(n.code,{children:"INSERT"})," \ubb38 \uae30\ubcf8"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-sql",children:"INSERT [INTO] <\ud14c\uc774\ube14> [(\uc5f41, \uc5f42, ...)] VALUES (\uac121, \uac122, ...)\n\n-- ex\nINSERT INTO testTbl1 VALUES (1, 'hyoloui', 28)\nINSERT INTO testTbl1(id, userName) VALUES(2, 'juloui')\nINSERT INTO testTbl1(userName, age, id) VALUES('beeloui', 7, 3) -- \uc21c\uc11c\ub294 \uc0c1\uad00 \uc5c6\uc74c\n"})}),"\n",(0,l.jsxs)(n.h3,{id:"\uc790\ub3d9\uc73c\ub85c-\uc99d\uac00\ud558\ub294-identity",children:["\uc790\ub3d9\uc73c\ub85c \uc99d\uac00\ud558\ub294 ",(0,l.jsx)(n.code,{children:"IDENTITY"})]}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"IDENTITY"})," \uc9c0\uc815 \uc2dc\uc5d0\ub294 \uc785\ub825\uac12\uc744 \uc0dd\ub7b5 / DEFAULT \uac12"]}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-sql",children:"CREATE TABLE testTbl2\n    (id int IDENTITY,\n    userName nchar(3),\n    age int,\n    nation nchar(4) DEFAULT '\ub300\ud55c\ubbfc\uad6d');\n\nGO\n\nINSERT INTO testTbl2 VALUES('\uc77c\ubc88', 20, DEFAULT)\n\nSET IDENTITY_INSERT testTbl2 ON; -- identity \ub85c \uc9c0\uc815\ub41c \ud589\uc744 \uac15\uc81c\ub85c \uc9c0\uc815\n\nINSERT INTO testTbl2(id, userName, age, nation)\n    VALUES(11, '\uc2ed\uc77c\ubc88', 25, '\uc77c\ubcf8')\n\nSET IDENTITY_INSERT testTbl2 OFF; -- identity \ub85c \uc9c0\uc815\ub41c \ud589\uc744 \uc790\ub3d9\uc73c\ub85c \uc9c0\uc815\n\nEXECUTE sp_help testTbl2 -- testTbl2 \ud14c\uc774\ube14\uc758 columns \uc815\ubcf4 \ud655\uc778\n\nSELECT IDENT_CURRENT('testTbl2') -- \ud604\uc7ac row \uac00 \uba87\uac1c\uc778\uc9c0 \ud655\uc778\n"})}),"\n",(0,l.jsx)("br",{}),"\n",(0,l.jsx)(n.hr,{}),"\n",(0,l.jsx)("br",{}),"\n",(0,l.jsx)(n.h3,{id:"sequence",children:(0,l.jsx)(n.code,{children:"SEQUENCE"})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"IDENTITY"}),"\uc640 \uac19\uc740 \ud6a8\uacfc\ub97c \ub0c4"]}),"\n",(0,l.jsx)(n.li,{children:"\uc624\ub77c\ud074\uacfc \uac19\uc740 \ubc29\uc2dd\uc744 \uc81c\uacf5\ud558\uae30 \uc704\ud55c \uac1c\uccb4\uc784"}),"\n"]}),"\n",(0,l.jsx)("br",{}),"\n",(0,l.jsx)(n.admonition,{type:"info",children:(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.code,{children:"IDENTITY"})," \ucc98\ub7fc ",(0,l.jsx)(n.code,{children:"CREATE TABLE"})," \ubb38\uc5d0\uc11c \uc791\uc131\ud558\ub294 \uac83\uc774 \uc544\ub2cc,",(0,l.jsx)(n.br,{}),"\n","\ub530\ub85c ",(0,l.jsx)(n.code,{children:"CREATE SEQUENCE"})," \ubb38\uc744 \uc791\uc131 \ud574\uc57c\ud568"]})}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-sql",children:"CREATE SEQUENCE idSEQ\n    START WITH 1 -- \uc2dc\uc791\uac12\n    INCREMENT BY 1; -- \uc99d\uac00\uac12\n\nGO\n\nINSERT INTO testTbl3\n    VALUES (NEXT VALUE FOR idSEQ, '\uc194\ub77c', 25, DEFAULT)\n"})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["\ubcc0\uacbd\uc740 ",(0,l.jsx)(n.code,{children:"ALTER SEQUENCE"})," \ubb38\uc744 \uc0ac\uc6a9\ud568"]}),"\n",(0,l.jsx)(n.li,{children:"\ud2b9\uc815 \ubc94\uc704\uc758 \uac12\uc774 \ubc18\ubcf5\ub418\uac8c \uc785\ub825\ud560 \uc218\ub3c4 \uc788\uc74c"}),"\n"]}),"\n",(0,l.jsx)("br",{}),"\n",(0,l.jsx)(n.hr,{}),"\n",(0,l.jsx)("br",{}),"\n",(0,l.jsx)(n.h3,{id:"\ub300\ub7c9\uc758-\uc0d8\ud50c\ub370\uc774\ud130-\uc0dd\uc131",children:"\ub300\ub7c9\uc758 \uc0d8\ud50c\ub370\uc774\ud130 \uc0dd\uc131"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-sql",children:"USE tempDB\nCREATE TABLE testTbl4 (id int, Fname NVARCHAR(50), Lname NVARCHAR(50))\n\nGO\n\n\nINSERT INTO testTbl4\n    SELECT BusinessEntityID, FirstName, LastName\n        FROM AdventureWorks.Person.Person\n\nSELECT BusinessEntityID AS id, FirstName as Fname, LastName as Lname\n    INTO testTbl5\n    FROM AdventureWorks.Person.Person\n"})}),"\n",(0,l.jsxs)(s,{children:[(0,l.jsx)("summary",{children:"\uc2e4\ud589 \uacb0\uacfc"}),(0,l.jsxs)(n.table,{children:[(0,l.jsx)(n.thead,{children:(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.th,{children:"id"}),(0,l.jsx)(n.th,{children:"Fname"}),(0,l.jsx)(n.th,{children:"Lname"})]})}),(0,l.jsxs)(n.tbody,{children:[(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:"1"}),(0,l.jsx)(n.td,{children:"John"}),(0,l.jsx)(n.td,{children:"Doe"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:"2"}),(0,l.jsx)(n.td,{children:"Jane"}),(0,l.jsx)(n.td,{children:"Smith"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:"3"}),(0,l.jsx)(n.td,{children:"Alice"}),(0,l.jsx)(n.td,{children:"Brown"})]})]})]})]}),"\n",(0,l.jsx)("br",{}),"\n",(0,l.jsx)(n.hr,{}),"\n",(0,l.jsx)("br",{}),"\n",(0,l.jsx)(n.h2,{id:"\ub370\uc774\ud130-\uc218\uc815",children:"\ub370\uc774\ud130 \uc218\uc815"}),"\n",(0,l.jsx)(n.h3,{id:"update",children:(0,l.jsx)(n.code,{children:"UPDATE"})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\uad6c\ubb38 \ud615\uc2dd"}),"\n"]}),"\n",(0,l.jsx)(n.admonition,{type:"info",children:(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.code,{children:"UPDATE"}),", ",(0,l.jsx)(n.code,{children:"SET"}),", ",(0,l.jsx)(n.code,{children:"WHERE"})," \uc740 \ud558\ub098\uc758 \uc138\ud2b8\ub77c\uace0 \uc0dd\uac01\ud558\uc790",(0,l.jsx)(n.br,{}),"\n","ex) ",(0,l.jsx)(n.code,{children:"SELECT"}),", ",(0,l.jsx)(n.code,{children:"FROM"}),", ",(0,l.jsx)(n.code,{children:"WHERE"})," \uacfc \ube44\uc2b7\ud558\ub2e4"]})}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-sql",children:"UPDATE \ud14c\uc774\ube14\uc774\ub984\n    SET \uc5f41 = \uac121, \uc5f42 = \uac122 ...\n    WHERE \uc870\uac74\n\n-- \uc608\uc2dc\nUPDATE testTbl7\n    SET Lname = '\uc774\ub984\ubc14\uafb8\uae30'\n    WHERE Fname = 'Alice';\n"})}),"\n",(0,l.jsxs)(s,{children:[(0,l.jsx)("summary",{children:"\uc2e4\ud589 \uacb0\uacfc"}),(0,l.jsxs)(n.table,{children:[(0,l.jsx)(n.thead,{children:(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.th,{children:"id"}),(0,l.jsx)(n.th,{children:"Fname"}),(0,l.jsx)(n.th,{children:"Lname"})]})}),(0,l.jsxs)(n.tbody,{children:[(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:"1"}),(0,l.jsx)(n.td,{children:"John"}),(0,l.jsx)(n.td,{children:"Doe"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:"2"}),(0,l.jsx)(n.td,{children:"Jane"}),(0,l.jsx)(n.td,{children:"Smith"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:"3"}),(0,l.jsx)(n.td,{children:"Alice"}),(0,l.jsx)(n.td,{children:"\uc774\ub984\ubc14\uafb8\uae30"})]})]})]})]}),"\n",(0,l.jsx)("br",{}),"\n",(0,l.jsx)(n.hr,{}),"\n",(0,l.jsx)("br",{}),"\n",(0,l.jsx)(n.h2,{id:"\ub370\uc774\ud130-\uc0ad\uc81c",children:"\ub370\uc774\ud130 \uc0ad\uc81c"}),"\n",(0,l.jsx)(n.h3,{id:"delete",children:(0,l.jsx)(n.code,{children:"DELETE"})}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-sql",children:"DELETE \ud14c\uc774\ube14\uc774\ub984 WHERE \uc870\uac74\n\n-- \uc608\uc2dc\nDELETE testTbl6 WHERE Fname = 'JANE'\n"})}),"\n",(0,l.jsxs)(s,{children:[(0,l.jsx)("summary",{children:"\uc2e4\ud589 \uacb0\uacfc"}),(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-text",children:"| id  | Fname | Lname      |\n| --- | ----- | ---------- |\n| 1   | John  | Doe        |\n| 3   | Alice | \uc774\ub984\ubc14\uafb8\uae30 |\n"})})]}),"\n",(0,l.jsxs)(n.admonition,{type:"warning",children:[(0,l.jsxs)(n.p,{children:["\uae30\ubcf8\uc801\uc73c\ub85c ",(0,l.jsx)(n.code,{children:"DELETE"})," \ubb38\uc740 ",(0,l.jsx)(n.code,{children:"WHERE"}),"\uc5d0 \ud574\ub2f9\ud558\ub294 \ubaa8\ub4e0 \uc5f4\uc744 \uc81c\uac70\ud55c\ub2e4.",(0,l.jsx)(n.br,{}),"\n","\ub530\ub77c\uc11c \uc870\uac74\uc744 \uba85\ud655\ud788 \ud558\uac70\ub098 ",(0,l.jsx)(n.code,{children:"TOP"}),"\uc744 \uc0ac\uc6a9\ud558\uc790!"]}),(0,l.jsx)(n.p,{children:(0,l.jsx)(n.code,{children:"DELETE TOP(5) testTbl6 WHERE Fname = 'JANE'"})})]}),"\n",(0,l.jsxs)(n.table,{children:[(0,l.jsx)(n.thead,{children:(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.th,{children:"\uad6c\ubb38"}),(0,l.jsx)(n.th,{children:"\uc131\ub2a5"}),(0,l.jsx)(n.th,{children:"\uc6a9\ub3c4"})]})}),(0,l.jsxs)(n.tbody,{children:[(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"DELETE"})}),(0,l.jsx)(n.td,{children:"\uac00\uc7a5 \ub290\ub9ac\ub2e4"}),(0,l.jsx)(n.td,{children:"\ud2b9\uc815 \ud589\uc744 \uc0ad\uc81c\ud560 \ub54c \uc0ac\uc6a9"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"DROP"})}),(0,l.jsx)(n.td,{children:"\ube60\ub974\ub2e4"}),(0,l.jsx)(n.td,{children:"\ud14c\uc774\ube14 \uc804\uccb4(\uad6c\uc870 \ud3ec\ud568)\ub97c \uc0ad\uc81c\ud560 \ub54c \uc0ac\uc6a9"})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{children:(0,l.jsx)(n.code,{children:"TRUNCATE TABLE"})}),(0,l.jsx)(n.td,{children:"\uac00\uc7a5 \ube60\ub974\ub2e4"}),(0,l.jsx)(n.td,{children:"\ud14c\uc774\ube14\uc758 \ubaa8\ub4e0 \ud589\uc744 \uc0ad\uc81c\ud560 \ub54c \uc0ac\uc6a9"})]})]})]}),"\n",(0,l.jsx)("br",{}),"\n",(0,l.jsx)(n.hr,{}),"\n",(0,l.jsx)("br",{}),"\n",(0,l.jsx)(n.h3,{id:"merge",children:"MERGE"}),"\n",(0,l.jsxs)(n.blockquote,{children:["\n",(0,l.jsxs)(n.p,{children:["\ud558\ub098\uc758 \ubb38\uc7a5\uc5d0\uc11c \uacbd\uc6b0\uc5d0 \ub530\ub77c ",(0,l.jsx)(n.code,{children:"INSERT"}),", ",(0,l.jsx)(n.code,{children:"UPDATE"}),", ",(0,l.jsx)(n.code,{children:"DELETE"}),"\ub97c \uc218\ud589\ud560 \uc218 \uc788\ub294 \uad6c\ubb38"]}),"\n"]}),"\n",(0,l.jsx)(n.p,{children:"\uc2dc\ub098\ub9ac\uc624"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-sql",children:"USE sqlDB;\nSELECT userID, name, addr INTO memberTBL FROM userTBL;\nSELECT * FROM memberTBL;\n\nCREATE TABLE changeTBL\n(\n    changeType NCHAR(4),\n    userID CHAR(8),\n    name NVARCHAR(10),\n    addr NCHAR(2),\n)\n\nINSERT INTO changeTBL VALUES\n    ('\uc2e0\uaddc\uac00\uc785', 'CHO', '\ucd08\uc544', '\ubbf8\uad6d'),\n    ('\uc8fc\uc18c\ubcc0\uacbd', 'LSH', NULL, '\uc804\uc8fc'),\n    ('\uc8fc\uc18c\ubcc0\uacbd', 'KMS', NULL, '\ubd80\uc0b0'),\n    ('\ud68c\uc6d0\ud0c8\ud1f4', 'LJB', NULL, NULL),\n    ('\ud68c\uc6d0\ud0c8\ud1f4', 'HRK', NULL, NULL),\n\n-- \uc57d \uc77c\uc8fc\uc77c \ud6c4\n\nSELECT * FROM memberTBL\n\nMERGE memberTBL AS M\n    USING changeTBL AS CHAR\n    ON M.userID = C.userID\n    -- \uc2e0\uaddc\uac00\uc785\n    WHEN NOT MATCHED AND changeType = '\uc2e0\uaddc\uac00\uc785' THEN\n        INSERT (userID, name, addr) VALUES(C.userID, C.name, C.addr)\n    -- \uc8fc\uc18c\ubcc0\uacbd\n    WHEN NOT MATCHED AND changeType = '\uc8fc\uc18c\ubcc0\uacbd' THEN\n        UPDATE SET M.addr = C.addr\n    -- \ud68c\uc6d0\ud0c8\ud1f4\n    WHEN NOT MATCHED AND changeType = '\ud68c\uc6d0\ud0c8\ud1f4' THEN\n        DELETE;\n"})}),"\n",(0,l.jsxs)(s,{children:[(0,l.jsx)("summary",{children:"\uc2e4\ud589 \uacb0\uacfc"}),(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-text",children:"_\ub530\ube14\ud074\ub9ad\n"})})]})]})}function E(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(x,{...e})}):x(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>i,x:()=>c});var d=s(6540);const l={},r=d.createContext(l);function i(e){const n=d.useContext(r);return d.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:i(e.components),d.createElement(r.Provider,{value:n},e.children)}}}]);
"use strict";(self.webpackChunkhyoloui=self.webpackChunkhyoloui||[]).push([[2729],{66770:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>h,contentTitle:()=>c,default:()=>x,frontMatter:()=>d,metadata:()=>l,toc:()=>t});const l=JSON.parse('{"id":"SQL/11_01","title":"\uc800\uc7a5 \ud504\ub85c\uc2dc\uc800","description":"\uc800\uc7a5 \ud504\ub85c\uc2dc\uc800\uc758 \uac1c\ub150\uacfc \uc6a9\ub3c4\ub97c \ud559\uc2b5\ud558\uc5ec \ud2b9\uc9d5\uc744 \ud30c\uc545\ud558\uace0 \uc885\ub958\ub97c \uad6c\ubd84, \ub0b4\ubd80 \uc791\ub3d9\uae4c\uc9c0 \uc0b4\ud3b4\ubd05\ub2c8\ub2e4","source":"@site/docs/SQL/11_01.md","sourceDirName":"SQL","slug":"/SQL/11_01","permalink":"/docs/SQL/11_01","draft":false,"unlisted":false,"editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/SQL/11_01.md","tags":[],"version":"current","sidebarPosition":19,"frontMatter":{"sidebar_position":19,"title":"\uc800\uc7a5 \ud504\ub85c\uc2dc\uc800","description":"\uc800\uc7a5 \ud504\ub85c\uc2dc\uc800\uc758 \uac1c\ub150\uacfc \uc6a9\ub3c4\ub97c \ud559\uc2b5\ud558\uc5ec \ud2b9\uc9d5\uc744 \ud30c\uc545\ud558\uace0 \uc885\ub958\ub97c \uad6c\ubd84, \ub0b4\ubd80 \uc791\ub3d9\uae4c\uc9c0 \uc0b4\ud3b4\ubd05\ub2c8\ub2e4"},"sidebar":"tutorialSidebar","previous":{"title":"\uc778\ub371\uc2a4\uc758 \uc0dd\uc131, \ubcc0\uacbd, \uc0ad\uc81c","permalink":"/docs/SQL/10_03"},"next":{"title":"\uc0ac\uc6a9\uc790 \uc815\uc758 \ud568\uc218","permalink":"/docs/SQL/11_02"}}');var i=s(74848),r=s(28453);const d={sidebar_position:19,title:"\uc800\uc7a5 \ud504\ub85c\uc2dc\uc800",description:"\uc800\uc7a5 \ud504\ub85c\uc2dc\uc800\uc758 \uac1c\ub150\uacfc \uc6a9\ub3c4\ub97c \ud559\uc2b5\ud558\uc5ec \ud2b9\uc9d5\uc744 \ud30c\uc545\ud558\uace0 \uc885\ub958\ub97c \uad6c\ubd84, \ub0b4\ubd80 \uc791\ub3d9\uae4c\uc9c0 \uc0b4\ud3b4\ubd05\ub2c8\ub2e4"},c=void 0,h={},t=[{value:"1. \uc800\uc7a5 \ud504\ub85c\uc2dc\uc800\uc758 \uac1c\uc694",id:"1-\uc800\uc7a5-\ud504\ub85c\uc2dc\uc800\uc758-\uac1c\uc694",level:2},{value:"\uac1c\ub150",id:"\uac1c\ub150",level:3},{value:"\uad6c\ubb38 \ud615\uc2dd",id:"\uad6c\ubb38-\ud615\uc2dd",level:3},{value:"\uc0dd\uc131 \ubc0f \uc0ac\uc6a9",id:"\uc0dd\uc131-\ubc0f-\uc0ac\uc6a9",level:3},{value:"\ub9e4\uac1c\ubcc0\uc218\uc758 \uc0ac\uc6a9",id:"\ub9e4\uac1c\ubcc0\uc218\uc758-\uc0ac\uc6a9",level:3},{value:"\ub9ac\ud134 \uac12\uc758 \uc774\uc6a9",id:"\ub9ac\ud134-\uac12\uc758-\uc774\uc6a9",level:4},{value:"\uc800\uc7a5 \ud504\ub85c\uc2dc\uc800 \ub0b4 \uc624\ub958 \ucc98\ub9ac",id:"\uc800\uc7a5-\ud504\ub85c\uc2dc\uc800-\ub0b4-\uc624\ub958-\ucc98\ub9ac",level:4},{value:"\uc784\uc2dc \uc800\uc7a5 \ud504\ub85c\uc2dc\uc800",id:"\uc784\uc2dc-\uc800\uc7a5-\ud504\ub85c\uc2dc\uc800",level:4},{value:"\uc2e4\uc2b5 \uc694\uc57d",id:"\uc2e4\uc2b5-\uc694\uc57d",level:3},{value:"2. \uc800\uc7a5 \ud504\ub85c\uc2dc\uc800\uc758 \ud2b9\uc9d5",id:"2-\uc800\uc7a5-\ud504\ub85c\uc2dc\uc800\uc758-\ud2b9\uc9d5",level:2},{value:"1. SQL Server\uc758 \uc131\ub2a5 \ud5a5\uc0c1",id:"1-sql-server\uc758-\uc131\ub2a5-\ud5a5\uc0c1",level:3},{value:"2. \ubaa8\ub4c8\uc2dd \ud504\ub85c\uadf8\ub798\ubc0d\uc774 \uac00\ub2a5\ud568",id:"2-\ubaa8\ub4c8\uc2dd-\ud504\ub85c\uadf8\ub798\ubc0d\uc774-\uac00\ub2a5\ud568",level:3},{value:"3. \ubcf4\uc548\uc744 \uac15\ud654\ud560 \uc218 \uc788\uc74c",id:"3-\ubcf4\uc548\uc744-\uac15\ud654\ud560-\uc218-\uc788\uc74c",level:3},{value:"4. \ub124\ud2b8\uc6cc\ud06c \uc804\uc1a1\ub7c9\uc744 \uac10\uc18c\uc2dc\ud0b4",id:"4-\ub124\ud2b8\uc6cc\ud06c-\uc804\uc1a1\ub7c9\uc744-\uac10\uc18c\uc2dc\ud0b4",level:3},{value:"3. \uc800\uc7a5 \ud504\ub85c\uc2dc\uc800\uc758 \uc885\ub958",id:"3-\uc800\uc7a5-\ud504\ub85c\uc2dc\uc800\uc758-\uc885\ub958",level:2},{value:"\uc0ac\uc6a9\uc790 \uc815\uc758 \uc800\uc7a5 \ud504\ub85c\uc2dc\uc800",id:"\uc0ac\uc6a9\uc790-\uc815\uc758-\uc800\uc7a5-\ud504\ub85c\uc2dc\uc800",level:3},{value:"\ud655\uc7a5 \uc800\uc7a5 \ud504\ub85c\uc2dc\uc800",id:"\ud655\uc7a5-\uc800\uc7a5-\ud504\ub85c\uc2dc\uc800",level:3},{value:"\uc2dc\uc2a4\ud15c \uc800\uc7a5 \ud504\ub85c\uc2dc\uc800",id:"\uc2dc\uc2a4\ud15c-\uc800\uc7a5-\ud504\ub85c\uc2dc\uc800",level:3},{value:"4. \uc800\uc7a5 \ud504\ub85c\uc2dc\uc800\uc758 \uc791\ub3d9",id:"4-\uc800\uc7a5-\ud504\ub85c\uc2dc\uc800\uc758-\uc791\ub3d9",level:2},{value:"\uc77c\ubc18 T-SQL\uc758 \uc791\ub3d9",id:"\uc77c\ubc18-t-sql\uc758-\uc791\ub3d9",level:3},{value:"\uc77c\ubc18 T-SQL\uc758 1\ud68c \uc2e4\ud589 \uc2dc",id:"\uc77c\ubc18-t-sql\uc758-1\ud68c-\uc2e4\ud589-\uc2dc",level:4},{value:"\uc77c\ubc18 T-SQL\uc758 2\ud68c \uc2e4\ud589 \uc2dc(\ub3d9\uc77c\ud55c T-SQL \uc2e4\ud589)",id:"\uc77c\ubc18-t-sql\uc758-2\ud68c-\uc2e4\ud589-\uc2dc\ub3d9\uc77c\ud55c-t-sql-\uc2e4\ud589",level:4},{value:"\uc800\uc7a5 \ud504\ub85c\uc2dc\uc800\uc758 \uc791\ub3d9 \ubc29\uc2dd",id:"\uc800\uc7a5-\ud504\ub85c\uc2dc\uc800\uc758-\uc791\ub3d9-\ubc29\uc2dd",level:3},{value:"\uc800\uc7a5 \ud504\ub85c\uc2dc\uc800\ub97c \uc815\uc758\ud560 \ub54c",id:"\uc800\uc7a5-\ud504\ub85c\uc2dc\uc800\ub97c-\uc815\uc758\ud560-\ub54c",level:4},{value:"\uc800\uc7a5 \ud504\ub85c\uc2dc\uc800 1\ud68c \uc2e4\ud589 \uc2dc",id:"\uc800\uc7a5-\ud504\ub85c\uc2dc\uc800-1\ud68c-\uc2e4\ud589-\uc2dc",level:4},{value:"\uc800\uc7a5 \ud504\ub85c\uc2dc\uc800 2\ud68c \uc2e4\ud589 \uc2dc",id:"\uc800\uc7a5-\ud504\ub85c\uc2dc\uc800-2\ud68c-\uc2e4\ud589-\uc2dc",level:4},{value:"WITH RECOMPILE \uc635\uc158\uacfc \ubb38\uc81c\uc810",id:"with-recompile-\uc635\uc158\uacfc-\ubb38\uc81c\uc810",level:3},{value:"\uc7ac\ucef4\ud30c\uc77c \ubc29\ubc95",id:"\uc7ac\ucef4\ud30c\uc77c-\ubc29\ubc95",level:3}];function a(e){const n={admonition:"admonition",blockquote:"blockquote",br:"br",code:"code",h2:"h2",h3:"h3",h4:"h4",hr:"hr",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h2,{id:"1-\uc800\uc7a5-\ud504\ub85c\uc2dc\uc800\uc758-\uac1c\uc694",children:"1. \uc800\uc7a5 \ud504\ub85c\uc2dc\uc800\uc758 \uac1c\uc694"}),"\n",(0,i.jsx)(n.h3,{id:"\uac1c\ub150",children:"\uac1c\ub150"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:["Stored Procedure",(0,i.jsx)(n.br,{}),"\n","SQL Server\uc5d0\uc11c \uc81c\uacf5\ub418\ub294 \ud504\ub85c\uadf8\ub798\ubc0d \uae30\ub2a5"]}),"\n"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\ucffc\ub9ac\ubb38\uc758 \uc9d1\ud569\uc73c\ub85c \uc5b4\ub5a0\ud55c \ub3d9\uc791\uc744 \uc77c\uad04 \ucc98\ub9ac\ud558\uae30 \uc704\ud55c \uc6a9\ub3c4"}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"\uad6c\ubb38-\ud615\uc2dd",children:"\uad6c\ubb38 \ud615\uc2dd"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sql",children:"CREATE { PROC | PROCEDURE } [schema_name]\n  procedure_name[; number]\n    [\n      { @parameter[type_schema_name.] data_type }\n      [VARYING][= default][OUT | OUTPUT]\n      [READONLY]\n    ][, ...n]\n[WITH <procedure_option>[, ...n]]\n[FOR REPLICATION]\nAS { [BEGIN sql_statement[;][, ...n][END]]}\n[;]\n"})}),"\n",(0,i.jsx)(n.h3,{id:"\uc0dd\uc131-\ubc0f-\uc0ac\uc6a9",children:"\uc0dd\uc131 \ubc0f \uc0ac\uc6a9"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sql",children:"USE sqlDB;\nGO\nCREATE PROCEDURE usp_users\nAS\n  SELECT * FROM userTbl;\nGO\n\nEXEC usp_users;\n"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\uc218\uc815\uacfc \uc0ad\uc81c","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\uc218\uc815 : ",(0,i.jsx)(n.code,{children:"ALTER PROCEDURE"})]}),"\n",(0,i.jsxs)(n.li,{children:["\uc0ad\uc81c : ",(0,i.jsx)(n.code,{children:"DROP PROCEDURE"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"\ub9e4\uac1c\ubcc0\uc218\uc758-\uc0ac\uc6a9",children:"\ub9e4\uac1c\ubcc0\uc218\uc758 \uc0ac\uc6a9"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sql",metastring:'title="\uad6c\ubb38 \ud615\uc2dd\uc758 \uc815\uc758"',children:"@\uc785\ub825\ub9e4\uac1c\ubcc0\uc218\uc774\ub984 \ub370\uc774\ud130\ud615\uc2dd [ = \ub514\ud3f4\ud2b8\uac12 ]\n@\ucd9c\ub825\ub9e4\uac1c\ubcc0\uc218\uc774\ub984 \ub370\uc774\ud130\ud615\uc2dd OUTPUT\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sql",metastring:'title="\uad6c\ubb38 \ud615\uc2dd\uc758 \uc2e4\ud589"',children:"EXECUTE \ud504\ub85c\uc2dc\uc800\uc774\ub984 [\uc804\ub2ec\uac12]\nEXECUTE \ud504\ub85c\uc2dc\uc800\uc774\ub984 @\ubcc0\uc218\uba85 OUTPUT\n"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\ud504\ub85c\uadf8\ub798\ubc0d \uae30\ub2a5","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\ud504\ub85c\uadf8\ub798\ubc0d \uae30\ub2a5\uc744 \uc774\uc6a9\ud574 \uc720\uc5f0\ud55c \uae30\ub2a5\uc73c\ub85c \ud655\uc7a5 \uac00\ub2a5"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"\ub9ac\ud134-\uac12\uc758-\uc774\uc6a9",children:"\ub9ac\ud134 \uac12\uc758 \uc774\uc6a9"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"RETURN"}),"\ubb38\uc744 \uc0ac\uc6a9\ud574\uc11c \uc131\uacf5 \ubc0f \uc2e4\ud328 \uc5ec\ubd80\ub97c \ud655\uc778"]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"\uc800\uc7a5-\ud504\ub85c\uc2dc\uc800-\ub0b4-\uc624\ub958-\ucc98\ub9ac",children:"\uc800\uc7a5 \ud504\ub85c\uc2dc\uc800 \ub0b4 \uc624\ub958 \ucc98\ub9ac"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"@@ERROR \ud568\uc218"})," \ubc0f ",(0,i.jsx)(n.code,{children:"TRY/CATCH"}),"\ubb38\uc744 \uc774\uc6a9\ud568"]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"\uc784\uc2dc-\uc800\uc7a5-\ud504\ub85c\uc2dc\uc800",children:"\uc784\uc2dc \uc800\uc7a5 \ud504\ub85c\uc2dc\uc800"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"#"})," \ub610\ub294 ",(0,i.jsx)(n.code,{children:"##"}),"\uc744 \ubd99\uc784"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"TEMPDB"}),"\uc5d0 \uc800\uc7a5\ub428"]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"\uc2e4\uc2b5-\uc694\uc57d",children:"\uc2e4\uc2b5 \uc694\uc57d"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sql",metastring:'title="\uc0ac\uc6a9\ub41c \uc800\uc7a5 \ud504\ub85c\uc2dc\uc800"',children:"CREATE PROCEDURE usp_users3\n  @userBirth INT = 1970,\n  @userHeight INT = 178\nAS\n  SELECT * FROM userTbl\n  WHERE birthYear > @userBirth AND height > @userHeight;\n"})}),"\n",(0,i.jsx)("br",{}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"2-\uc800\uc7a5-\ud504\ub85c\uc2dc\uc800\uc758-\ud2b9\uc9d5",children:"2. \uc800\uc7a5 \ud504\ub85c\uc2dc\uc800\uc758 \ud2b9\uc9d5"}),"\n",(0,i.jsx)(n.h3,{id:"1-sql-server\uc758-\uc131\ub2a5-\ud5a5\uc0c1",children:"1. SQL Server\uc758 \uc131\ub2a5 \ud5a5\uc0c1"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:["\ub3d9\uc77c \uc800\uc7a5 \ud504\ub85c\uc2dc\uc800\uac00 \uc790\uc8fc \uc0ac\uc6a9\ub420 \uacbd\uc6b0\uc5d0\ub294 \uc77c\ubc18 \ucffc\ub9ac\ub97c \ubc18\ubcf5\ud574\uc11c \uc2e4\ud589\ud558\ub294 \uac83\ubcf4\ub2e4",(0,i.jsx)(n.br,{}),"\n","SQL Server\uc758 \uc131\ub2a5\uc774 \ud06c\uac8c \ud5a5\uc0c1\ub420 \uc218 \uc788\uc74c"]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"2-\ubaa8\ub4c8\uc2dd-\ud504\ub85c\uadf8\ub798\ubc0d\uc774-\uac00\ub2a5\ud568",children:"2. \ubaa8\ub4c8\uc2dd \ud504\ub85c\uadf8\ub798\ubc0d\uc774 \uac00\ub2a5\ud568"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsx)(n.p,{children:"\uc800\uc7a5 \ud504\ub85c\uc2dc\uc800\ub97c \uc0dd\uc131\ud574 \ub193\uc73c\uba74 \uc5b8\uc81c\ub4e0\uc9c0 \uc2e4\ud589 \uac00\ub2a5 (ex. \ud568\uc218)"}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"3-\ubcf4\uc548\uc744-\uac15\ud654\ud560-\uc218-\uc788\uc74c",children:"3. \ubcf4\uc548\uc744 \uac15\ud654\ud560 \uc218 \uc788\uc74c"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:["\uc0ac\uc6a9\uc790 \ubcc4\ub85c \ud14c\uc774\ube14\uc5d0 \uc811\uadfc \uad8c\ud55c\uc744 \uc8fc\uc9c0 \uc54a\uace0,",(0,i.jsx)(n.br,{}),"\n","\uc800\uc7a5 \ud504\ub85c\uc2dc\uc800\uc5d0 \uc811\uadfc \uad8c\ud55c\uc744 \uc90c\uc73c\ub85c\uc368 \uc880 \ub354 \ubcf4\uc548\uc744 \uac15\ud654\ud568"]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"4-\ub124\ud2b8\uc6cc\ud06c-\uc804\uc1a1\ub7c9\uc744-\uac10\uc18c\uc2dc\ud0b4",children:"4. \ub124\ud2b8\uc6cc\ud06c \uc804\uc1a1\ub7c9\uc744 \uac10\uc18c\uc2dc\ud0b4"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:["\uc800\uc7a5 \ud504\ub85c\uc2dc\uc800 \uc774\ub984 \ubc0f \ub9e4\uac1c\ubcc0\uc218 \ub4f1 \uba87 \uae00\uc790\uc758 \ud14d\uc2a4\ud2b8\ub9cc \uc804\uc1a1\ud558\uba74 \ub418\ubbc0\ub85c",(0,i.jsx)(n.br,{}),"\n","\ub124\ud2b8\uc6cc\ud06c\uc758 \ubd80\ud558\ub97c \uc904\uc77c \uc218 \uc788\uc74c"]}),"\n"]}),"\n",(0,i.jsx)("br",{}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"3-\uc800\uc7a5-\ud504\ub85c\uc2dc\uc800\uc758-\uc885\ub958",children:"3. \uc800\uc7a5 \ud504\ub85c\uc2dc\uc800\uc758 \uc885\ub958"}),"\n",(0,i.jsx)(n.h3,{id:"\uc0ac\uc6a9\uc790-\uc815\uc758-\uc800\uc7a5-\ud504\ub85c\uc2dc\uc800",children:"\uc0ac\uc6a9\uc790 \uc815\uc758 \uc800\uc7a5 \ud504\ub85c\uc2dc\uc800"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["T-SQL \uc800\uc7a5 \ud504\ub85c\uc2dc\uc800","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\uc0ac\uc6a9\uc790\uac00 \uc9c1\uc811 ",(0,i.jsx)(n.code,{children:"CREATE PROCEDURE"})," \ubb38\uc744 \uc774\uc6a9\ud574\uc11c \uc0dd\uc131\ud55c \ud504\ub85c\uc2dc\uc800"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["CLR \uc800\uc7a5 \ud504\ub85c\uc2dc\uc800","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:".NET Framework \uc5b4\uc148\ube14\ub9ac\uc758 \ud074\ub798\uc2a4\uc5d0 \uacf5\uc6a9\uc758 \uc815\uc801 \uba54\uc18c\ub4dc\ub85c \uad6c\ud604"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"\ud655\uc7a5-\uc800\uc7a5-\ud504\ub85c\uc2dc\uc800",children:"\ud655\uc7a5 \uc800\uc7a5 \ud504\ub85c\uc2dc\uc800"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsx)(n.p,{children:"C\uc5b8\uc5b4 \ub4f1\uc744 \uc774\uc6a9\ud558\uc5ec \ub370\uc774\ud130\ubca0\uc774\uc2a4\uc5d0\uc11c \uad6c\ud604\ud558\uae30 \uc5b4\ub824\uc6b4 \uac83\ub4e4\uc744 \uad6c\ud604\ud55c \uc800\uc7a5 \ud504\ub85c\uc2dc\uc800"}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"\uc2dc\uc2a4\ud15c-\uc800\uc7a5-\ud504\ub85c\uc2dc\uc800",children:"\uc2dc\uc2a4\ud15c \uc800\uc7a5 \ud504\ub85c\uc2dc\uc800"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsx)(n.p,{children:"\uc2dc\uc2a4\ud15c\uc744 \uad00\ub9ac\ud558\uae30 \uc704\ud574\uc11c SQL Server\uac00 \uc81c\uacf5\ud574\uc8fc\ub294 \uc800\uc7a5 \ud504\ub85c\uc2dc\uc800"}),"\n"]}),"\n",(0,i.jsx)("br",{}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"4-\uc800\uc7a5-\ud504\ub85c\uc2dc\uc800\uc758-\uc791\ub3d9",children:"4. \uc800\uc7a5 \ud504\ub85c\uc2dc\uc800\uc758 \uc791\ub3d9"}),"\n",(0,i.jsx)(n.h3,{id:"\uc77c\ubc18-t-sql\uc758-\uc791\ub3d9",children:"\uc77c\ubc18 T-SQL\uc758 \uc791\ub3d9"}),"\n",(0,i.jsx)(n.h4,{id:"\uc77c\ubc18-t-sql\uc758-1\ud68c-\uc2e4\ud589-\uc2dc",children:"\uc77c\ubc18 T-SQL\uc758 1\ud68c \uc2e4\ud589 \uc2dc"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"\uc77c\ubc18 T-SQL 1\ud68c \uc2e4\ud589",src:s(23690).A+"",width:"652",height:"256"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"1\ud68c \uc2e4\ud589 \uc2dc"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-text",children:"SQL Server \uad6c\ubb38 \ubd84\uc11d \ubc0f \ucef4\ud30c\uc77c \uc2dc\uac04 :\nCPU \uc2dc\uac04 = 140ms, \uacbd\uacfc \uc2dc\uac04 = 46ms.\n"})}),"\n"]}),"\n"]}),"\n",(0,i.jsx)("br",{}),"\n",(0,i.jsx)(n.h4,{id:"\uc77c\ubc18-t-sql\uc758-2\ud68c-\uc2e4\ud589-\uc2dc\ub3d9\uc77c\ud55c-t-sql-\uc2e4\ud589",children:"\uc77c\ubc18 T-SQL\uc758 2\ud68c \uc2e4\ud589 \uc2dc(\ub3d9\uc77c\ud55c T-SQL \uc2e4\ud589)"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"\uc77c\ubc18 T-SQL 2\ud68c \uc2e4\ud589",src:s(72673).A+"",width:"444",height:"196"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"2\ud68c \uc2e4\ud589 \uc2dc"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-text",children:"SQL Server \uad6c\ubb38 \ubd84\uc11d \ubc0f \ucef4\ud30c\uc77c \uc2dc\uac04 :\nCPU \uc2dc\uac04 = 0ms, \uacbd\uacfc \uc2dc\uac04 = 0ms.\n"})}),"\n"]}),"\n"]}),"\n",(0,i.jsx)("br",{}),"\n",(0,i.jsx)(n.h3,{id:"\uc800\uc7a5-\ud504\ub85c\uc2dc\uc800\uc758-\uc791\ub3d9-\ubc29\uc2dd",children:"\uc800\uc7a5 \ud504\ub85c\uc2dc\uc800\uc758 \uc791\ub3d9 \ubc29\uc2dd"}),"\n",(0,i.jsx)(n.h4,{id:"\uc800\uc7a5-\ud504\ub85c\uc2dc\uc800\ub97c-\uc815\uc758\ud560-\ub54c",children:"\uc800\uc7a5 \ud504\ub85c\uc2dc\uc800\ub97c \uc815\uc758\ud560 \ub54c"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"\uc800\uc7a5 \ud504\ub85c\uc2dc\uc800 \uc815\uc758",src:s(66551).A+"",width:"717",height:"276"})}),"\n",(0,i.jsx)("br",{}),"\n",(0,i.jsx)(n.h4,{id:"\uc800\uc7a5-\ud504\ub85c\uc2dc\uc800-1\ud68c-\uc2e4\ud589-\uc2dc",children:"\uc800\uc7a5 \ud504\ub85c\uc2dc\uc800 1\ud68c \uc2e4\ud589 \uc2dc"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"create-procedure-1",src:s(27827).A+"",width:"617",height:"299"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"1\ud68c \uc2e4\ud589 \uc2dc"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-text",children:"SQL Server \uad6c\ubb38 \ubd84\uc11d \ubc0f \ucef4\ud30c\uc77c \uc2dc\uac04 :\nCPU \uc2dc\uac04 = 31ms, \uacbd\uacfc \uc2dc\uac04 = 58ms.\n"})}),"\n"]}),"\n"]}),"\n",(0,i.jsx)("br",{}),"\n",(0,i.jsx)(n.h4,{id:"\uc800\uc7a5-\ud504\ub85c\uc2dc\uc800-2\ud68c-\uc2e4\ud589-\uc2dc",children:"\uc800\uc7a5 \ud504\ub85c\uc2dc\uc800 2\ud68c \uc2e4\ud589 \uc2dc"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"create-procedure-1",src:s(27827).A+"",width:"617",height:"299"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"2\ud68c \uc2e4\ud589 \uc2dc"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-text",children:"SQL Server \uad6c\ubb38 \ubd84\uc11d \ubc0f \ucef4\ud30c\uc77c \uc2dc\uac04 :\nCPU \uc2dc\uac04 = 0ms, \uacbd\uacfc \uc2dc\uac04 = 0ms.\n"})}),"\n"]}),"\n"]}),"\n",(0,i.jsx)("br",{}),"\n",(0,i.jsx)(n.h3,{id:"with-recompile-\uc635\uc158\uacfc-\ubb38\uc81c\uc810",children:"WITH RECOMPILE \uc635\uc158\uacfc \ubb38\uc81c\uc810"}),"\n",(0,i.jsx)(n.admonition,{title:"\uc800\uc7a5 \ud504\ub85c\uc2dc\uc800\uc758 \ubb38\uc81c\uc810",type:"danger",children:(0,i.jsxs)(n.p,{children:["\ucc98\uc74c \uc218\ud589 \uc2dc \ucd5c\uc801\ud654\uac00 \uc774\ub8e8\uc5b4\uc9c0\uae30 \ub54c\ubb38\uc5d0",(0,i.jsx)(n.br,{}),"\n","\ub450 \ubc88\uc9f8 \uc218\ud589 \uc2dc\uc5d0\ub294 \uadf8 \ucd5c\uc801\ud654\uac00 ",(0,i.jsx)(n.strong,{children:"\ub354 \uc548 \uc88b\uc740 \uc131\ub2a5"}),"\uc744 \ub0b4\ub354\ub77c\ub3c4",(0,i.jsx)(n.br,{}),"\n","\uc774\ubbf8 \ucef4\ud30c\uc77c\uc774 \ub41c \uc800\uc7a5 \ud504\ub85c\uc2dc\uc800\ub97c \uacc4\uc18d \uc0ac\uc6a9\ud558\uac8c \ub428"]})}),"\n",(0,i.jsx)(n.admonition,{title:"\uc800\uc7a5 \ud504\ub85c\uc2dc\uc800\uc758 \ud574\uacb0\ucc45",type:"tip",children:(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"\uc7ac\ucef4\ud30c\uc77c"})," \ud558\ub294 \ubc29\ubc95\uc774 \uc788\uc74c"]})}),"\n",(0,i.jsx)("br",{}),"\n",(0,i.jsx)(n.h3,{id:"\uc7ac\ucef4\ud30c\uc77c-\ubc29\ubc95",children:"\uc7ac\ucef4\ud30c\uc77c \ubc29\ubc95"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\uc2e4\ud589 \uc2dc\uc5d0 ",(0,i.jsx)(n.code,{children:"WITH RECOMPILE"})," \uc635\uc158\uc744 \uc0ac\uc6a9\ud568"]}),"\n",(0,i.jsx)(n.li,{children:"\uc2e4\ud589 \uc2dc\ub9c8\ub2e4 \uc790\ub3d9\uc73c\ub85c \uc7ac\ucef4\ud30c\uc77c \ub418\ub3c4\ub85d \ud504\ub85c\uc2dc\uc800\ub97c \uc0dd\uc131\ud568"}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"sp_recompile \ud14c\uc774\ube14\uc774\ub984"})," \uc2dc\uc2a4\ud15c \uc800\uc7a5 \ud504\ub85c\uc2dc\uc800\ub97c \uc0ac\uc6a9\ud568"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"DBCC FREEPROCCACHE"})," \ub97c \uc0ac\uc6a9\ud568"]}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sql",metastring:'title="\uc0ac\uc6a9\ub41c \uc800\uc7a5 \ud504\ub85c\uc2dc\uc800"',children:"CREATE PROC usp_ID\n  @id INT\nWITH RECOMPILE\nAS\n  SELECT * FROM spTbl WHERE CustomerId < @id;\nGO;\n"})})]})}function x(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}},66551:(e,n,s)=>{s.d(n,{A:()=>l});const l=s.p+"assets/images/CREATE_PROCEDURE-12a76675c82d756b0e9245cb79a02785.png"},27827:(e,n,s)=>{s.d(n,{A:()=>l});const l=s.p+"assets/images/create-procedure-1-adc6a3a185c5aaa7411cc564f7178627.png"},23690:(e,n,s)=>{s.d(n,{A:()=>l});const l=s.p+"assets/images/normal-t-sql-1-e0fa8577204533577a311483ec9bcb2f.png"},72673:(e,n,s)=>{s.d(n,{A:()=>l});const l=s.p+"assets/images/normal-t-sql-2-2a9d3a3a8d317d429022f67cabbad31c.png"},28453:(e,n,s)=>{s.d(n,{R:()=>d,x:()=>c});var l=s(96540);const i={},r=l.createContext(i);function d(e){const n=l.useContext(r);return l.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:d(e.components),l.createElement(r.Provider,{value:n},e.children)}}}]);
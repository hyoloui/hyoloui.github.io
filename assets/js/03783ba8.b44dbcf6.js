"use strict";(self.webpackChunkhyoloui=self.webpackChunkhyoloui||[]).push([[6389],{11272:(n,e,r)=>{r.r(e),r.d(e,{assets:()=>l,contentTitle:()=>a,default:()=>u,frontMatter:()=>d,metadata:()=>t,toc:()=>c});const t=JSON.parse('{"id":"c-lang/06","title":"\uac04\ub2e8\ud55c \uac8c\uc784 \ub9cc\ub4e4\uae30","description":"\uc704 \uc544\ub798 \uac8c\uc784 \ub9cc\ub4e4\uae30","source":"@site/docs/c-lang/06.md","sourceDirName":"c-lang","slug":"/c-lang/06","permalink":"/docs/c-lang/06","draft":false,"unlisted":false,"editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/c-lang/06.md","tags":[],"version":"current","sidebarPosition":7,"frontMatter":{"sidebar_position":7,"title":"\uac04\ub2e8\ud55c \uac8c\uc784 \ub9cc\ub4e4\uae30"},"sidebar":"tutorialSidebar","previous":{"title":"\uc870\uac74\uc2dd \ud65c\uc6a9","permalink":"/docs/c-lang/05"},"next":{"title":"\ubc18\ubcf5\ubb38 \ud65c\uc6a9","permalink":"/docs/c-lang/07"}}');var i=r(74848),s=r(28453);const d={sidebar_position:7,title:"\uac04\ub2e8\ud55c \uac8c\uc784 \ub9cc\ub4e4\uae30"},a=void 0,l={},c=[{value:"\uc704 \uc544\ub798 \uac8c\uc784 \ub9cc\ub4e4\uae30",id:"\uc704-\uc544\ub798-\uac8c\uc784-\ub9cc\ub4e4\uae30",level:3},{value:"3\uc758 \ubc30\uc218 \ud53c\ud558\uae30",id:"3\uc758-\ubc30\uc218-\ud53c\ud558\uae30",level:3}];function o(n){const e={br:"br",code:"code",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.R)(),...n.components},{Details:r}=e;return r||function(n,e){throw new Error("Expected "+(e?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.h3,{id:"\uc704-\uc544\ub798-\uac8c\uc784-\ub9cc\ub4e4\uae30",children:"\uc704 \uc544\ub798 \uac8c\uc784 \ub9cc\ub4e4\uae30"}),"\n",(0,i.jsx)(e.p,{children:"\uc131\ubc94\uc774\uac00 \uc545\ub2f9 \ub85c\ubd07\uc5d0\uac8c \ubd99\ub4e4\ub824 \uc788\ub2e4.\n\uc131\ubc94\uc774\uac00 \uc788\ub294 \ubc29 \ubc88\ud638\ub97c \uc54c\uc544\ub0b4\uc57c \ud55c\ub2e4.\n\uc545\ub2f9 \ub85c\ubd07\uc774 \ubbfc\uc218\uc5d0\uac8c \uacb0\ud22c\ub97c \uc81c\uc548\ud588\ub2e4.\n\uae30\ud68c\ub294 \ub2e8 3\ubc88.. \ubbfc\uc218\ub294 \uc131\ubc94\uc774\ub97c \uad6c\ud574\ub0bc \uc218 \uc788\uc744\uae4c?"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"1 ~ 10 \uae4c\uc9c0 \uc22b\uc790\ub97c \uc785\ub825\ud558\uba74 \ub85c\ubd07\uc774 \ud78c\ud2b8\ub97c \uc900\ub2e4."}),"\n"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-c",children:'#include <stdio.h>\n#include <stdlib.h>\n#include <time.h>\n\nint main(void){\n    int minsu, room, game = 3;\n\n    srand((int unsigned)time(0));\n    room = (rand() % 10) + 1;\n\n    printf("\uc545\ub2f9: \uc131\ubc94\uc774\uac00 \uc788\ub294 \ubc29\uc758 \ubc88\ud638\ub97c \uc54c\uc544\ub0b4\ub77c.\\n");\n\n    while(game){\n        printf("%d\ubc88\uc758 \uae30\ud68c\uac00 \uc788\ub2e4.\\n1 ~ 10 \uae4c\uc9c0\uc758 \uc22b\uc790\ub97c \uc785\ub825\ud574\ub77c.\\n", game);\n        scanf("%d", &minsu);\n\n        if (minsu < room){\n            printf("\uc545\ub2f9 : \uc785\ub825\ud55c \ubc88\ud638\uac00 \ubc29\ubc88\ud638 \ubcf4\ub2e4 \uc791\uad6c\ub098.\\n");\n            game--;\n        } else if (minsu > room){\n            printf("\uc545\ub2f9 : \ub108\uc758 \uc22b\uc790\ub294 \ub098\ubcf4\ub2e4 \ud06c\uad6c\ub098.\\n");\n            game--;\n        } else {\n            printf("\uc545\ub2f9 : \ub9de\ucdc4\uad6c\ub098 \ud480\uc5b4\uc8fc\ub3c4\ub85d \ud558\uc9c0.\\n");\n            break;\n        }\n    }\n    if (game == 0) printf("\ubbfc\uc218\uac00 \uc84c\uc2b5\ub2c8\ub2e4. \ubbfc\uc218\ub294 \uc6b8\uace0 \uc788\uc2b5\ub2c8\ub2e4.\\n");\n    else printf("\ubbfc\uc218\uac00 \uc774\uacbc\uc2b5\ub2c8\ub2e4. \uc131\ubc94\uc774\ub294 \ubbfc\uc218\uc5d0\uac8c \ubf40\ubf40\ub97c \ud574\uc8fc\uc5c8\uc2b5\ub2c8\ub2e4.\\n");\n\n    return 0;\n}\n'})}),"\n",(0,i.jsxs)(r,{children:[(0,i.jsx)("summary",{children:"\uc2e4\ud589 \uacb0\uacfc"}),(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-text",children:"\uc545\ub2f9: \uc131\ubc94\uc774\uac00 \uc788\ub294 \ubc29\uc758 \ubc88\ud638\ub97c \uc54c\uc544\ub0b4\ub77c.\n3\ubc88\uc758 \uae30\ud68c\uac00 \uc788\ub2e4.\n1 ~ 10 \uae4c\uc9c0\uc758 \uc22b\uc790\ub97c \uc785\ub825\ud574\ub77c.\n5\n\uc545\ub2f9 : \uc785\ub825\ud55c \ubc88\ud638\uac00 \ubc29\ubc88\ud638 \ubcf4\ub2e4 \uc791\uad6c\ub098.\n2\ubc88\uc758 \uae30\ud68c\uac00 \uc788\ub2e4.\n1 ~ 10 \uae4c\uc9c0\uc758 \uc22b\uc790\ub97c \uc785\ub825\ud574\ub77c.\n6\n\uc545\ub2f9 : \uc785\ub825\ud55c \ubc88\ud638\uac00 \ubc29\ubc88\ud638 \ubcf4\ub2e4 \uc791\uad6c\ub098.\n1\ubc88\uc758 \uae30\ud68c\uac00 \uc788\ub2e4.\n1 ~ 10 \uae4c\uc9c0\uc758 \uc22b\uc790\ub97c \uc785\ub825\ud574\ub77c.\n8\n\uc545\ub2f9 : \uc785\ub825\ud55c \ubc88\ud638\uac00 \ubc29\ubc88\ud638 \ubcf4\ub2e4 \uc791\uad6c\ub098.\n\ubbfc\uc218\uac00 \uc84c\uc2b5\ub2c8\ub2e4. \ubbfc\uc218\ub294 \uc6b8\uace0 \uc788\uc2b5\ub2c8\ub2e4.\n"})})]}),"\n",(0,i.jsxs)(e.p,{children:["\ube68\uac04 \uc8fc\uc0ac\uc704, \ud30c\ub780 \uc8fc\uc0ac\uc704 \ub450\uac1c\ub97c \ub358\uc838 \uadf8 \ud569\uc774 9\ubcf4\ub2e4 \ucee4\uc57c \ud55c\ub2e4.",(0,i.jsx)(e.br,{}),"\n","\uae30\ud68c\ub294 5\ubc88 \ubfd0\uc774\ub2e4."]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-c",children:'#include <stdio.h>\n#include <stdlib.h>\n#include <time.h>\n#define OVER_SUM 9\n\nint main(void){\n    int red, blue, sum, game = 5;\n\n\n    while(game){\n        srand((unsigned int)time(0));\n        printf("%d \ubc88\uc758 \uae30\ud68c\uac00 \uc788\uc2b5\ub2c8\ub2e4. \ub79c\ub364 \uc22b\uc790\ub97c \uc0dd\uc131\ud558\ub824\uba74 Enter\ub97c \uc785\ub825\ud558\uc138\uc694", game);\n        getchar( );\n        red = (rand() % 6) + 1;\n        blue = (rand() % 6) + 1;\n        sum = red + blue;\n        printf("\ud569\uacc4: %d, \ube68\uac04 \uc8fc\uc0ac\uc704: %d, \ud30c\ub780 \uc8fc\uc0ac\uc704: %d\\n",sum,red,blue);\n        if (sum <= OVER_SUM){\n            printf(" %d \ubcf4\ub2e4 \ucee4\uc57c \ud569\ub2c8\ub2e4.\\n", OVER_SUM);\n        } else {\n            printf(" %d \ubcf4\ub2e4 \ud07d\ub2c8\ub2e4.\\n\uac8c\uc784 \uc885\ub8cc..\\n", OVER_SUM);\n            break;\n        }\n        game--;\n    }\n    return 0;\n}\n'})}),"\n",(0,i.jsxs)(r,{children:[(0,i.jsx)("summary",{children:"\uc2e4\ud589 \uacb0\uacfc"}),(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-text",children:"  5 \ubc88\uc758 \uae30\ud68c\uac00 \uc788\uc2b5\ub2c8\ub2e4. \ub79c\ub364 \uc22b\uc790\ub97c \uc0dd\uc131\ud558\ub824\uba74 Enter\ub97c \uc785\ub825\ud558\uc138\uc694\n  \ud569\uacc4: 7, \ube68\uac04 \uc8fc\uc0ac\uc704: 5, \ud30c\ub780 \uc8fc\uc0ac\uc704: 2\n  9 \ubcf4\ub2e4 \ucee4\uc57c \ud569\ub2c8\ub2e4.\n  4 \ubc88\uc758 \uae30\ud68c\uac00 \uc788\uc2b5\ub2c8\ub2e4. \ub79c\ub364 \uc22b\uc790\ub97c \uc0dd\uc131\ud558\ub824\uba74 Enter\ub97c \uc785\ub825\ud558\uc138\uc694\n  \ud569\uacc4: 5, \ube68\uac04 \uc8fc\uc0ac\uc704: 1, \ud30c\ub780 \uc8fc\uc0ac\uc704: 4\n  9 \ubcf4\ub2e4 \ucee4\uc57c \ud569\ub2c8\ub2e4.\n  3 \ubc88\uc758 \uae30\ud68c\uac00 \uc788\uc2b5\ub2c8\ub2e4. \ub79c\ub364 \uc22b\uc790\ub97c \uc0dd\uc131\ud558\ub824\uba74 Enter\ub97c \uc785\ub825\ud558\uc138\uc694\n  \ud569\uacc4: 10, \ube68\uac04 \uc8fc\uc0ac\uc704: 4, \ud30c\ub780 \uc8fc\uc0ac\uc704: 6\n  9 \ubcf4\ub2e4 \ud07d\ub2c8\ub2e4.\n  \uac8c\uc784 \uc885\ub8cc..\n"})})]}),"\n",(0,i.jsx)(e.h3,{id:"3\uc758-\ubc30\uc218-\ud53c\ud558\uae30",children:"3\uc758 \ubc30\uc218 \ud53c\ud558\uae30"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-c",children:'#include <stdio.h>\n#include <stdlib.h>\n#include <time.h>\n\nint main(void) {\n    int red = 0, sum = 0, game = 1;\n\n    while (game) {\n        printf("\uc8fc\uc0ac\uc704\ub97c \ub358\uc9c0\ub824\uba74 Enter\ub97c \uc785\ub825\ud558\uc138\uc694.");\n        getchar( );\n\n        srand((unsigned int)time(0));\n        red = rand() % 6 + 1;\n        sum += red;\n\n        printf("sum = %d, red = %d\\n", sum, red);\n        if (sum > 19) {\n           printf("\ud568\uc815\uc744 \ud53c\ud574 \ubb34\uc0ac\ud788 \ud1b5\uacfc\ud588\uc2b5\ub2c8\ub2e4.\\n");\n           break;\n        }\n        if (sum % 5 == 0 || sum % 7 == 0){\n            printf("\ud568\uc815\uc744 \ub9cc\ub098 \uac8c\uc784\uc774 \uc885\ub8cc \ub429\ub2c8\ub2e4.\\n");\n            game--;\n            break;\n        }\n    }\n    return 0;\n}\n'})}),"\n",(0,i.jsxs)(r,{children:[(0,i.jsx)("summary",{children:"\uc2e4\ud589 \uacb0\uacfc"}),(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-text",children:"\uc2e4\ud589 \uacb0\uacfc:\n\n\uc8fc\uc0ac\uc704\ub97c \ub358\uc9c0\ub824\uba74 Enter\ub97c \uc785\ub825\ud558\uc138\uc694.\nsum = 2, red = 2\n\uc8fc\uc0ac\uc704\ub97c \ub358\uc9c0\ub824\uba74 Enter\ub97c \uc785\ub825\ud558\uc138\uc694.\nsum = 5, red = 3\n\ud568\uc815\uc744 \ub9cc\ub098 \uac8c\uc784\uc774 \uc885\ub8cc \ub429\ub2c8\ub2e4.\n\n---\n\n\uc2e4\ud589 \uacb0\uacfc:\n\n\uc8fc\uc0ac\uc704\ub97c \ub358\uc9c0\ub824\uba74 Enter\ub97c \uc785\ub825\ud558\uc138\uc694.\nsum = 1, red = 1\n\uc8fc\uc0ac\uc704\ub97c \ub358\uc9c0\ub824\uba74 Enter\ub97c \uc785\ub825\ud558\uc138\uc694.\nsum = 2, red = 1\n\uc8fc\uc0ac\uc704\ub97c \ub358\uc9c0\ub824\uba74 Enter\ub97c \uc785\ub825\ud558\uc138\uc694.\nsum = 4, red = 2\n\uc8fc\uc0ac\uc704\ub97c \ub358\uc9c0\ub824\uba74 Enter\ub97c \uc785\ub825\ud558\uc138\uc694.\nsum = 6, red = 2\n\uc8fc\uc0ac\uc704\ub97c \ub358\uc9c0\ub824\uba74 Enter\ub97c \uc785\ub825\ud558\uc138\uc694.\nsum = 9, red = 3\n\uc8fc\uc0ac\uc704\ub97c \ub358\uc9c0\ub824\uba74 Enter\ub97c \uc785\ub825\ud558\uc138\uc694.\nsum = 13, red = 4\n\uc8fc\uc0ac\uc704\ub97c \ub358\uc9c0\ub824\uba74 Enter\ub97c \uc785\ub825\ud558\uc138\uc694.\nsum = 18, red = 5\n\uc8fc\uc0ac\uc704\ub97c \ub358\uc9c0\ub824\uba74 Enter\ub97c \uc785\ub825\ud558\uc138\uc694.\nsum = 23, red = 5\n\ud568\uc815\uc744 \ud53c\ud574 \ubb34\uc0ac\ud788 \ud1b5\uacfc\ud588\uc2b5\ub2c8\ub2e4.\n"})})]})]})}function u(n={}){const{wrapper:e}={...(0,s.R)(),...n.components};return e?(0,i.jsx)(e,{...n,children:(0,i.jsx)(o,{...n})}):o(n)}},28453:(n,e,r)=>{r.d(e,{R:()=>d,x:()=>a});var t=r(96540);const i={},s=t.createContext(i);function d(n){const e=t.useContext(s);return t.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function a(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(i):n.components||i:d(n.components),t.createElement(s.Provider,{value:e},n.children)}}}]);
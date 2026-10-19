---
title: "Restful API란?"
description: "Restful API의 개념과 GET, POST, PATCH, PUT, DELETE 메서드의 기준, Restful이 아닌 API 설계 방식인 GraphQL을 정리한 글."
authors: [hyoloui]
tags: [web]
---

:::note 🎯목적

Restful API에 대해 기록하며, GET, POST 외에 알고있는 메소드와 그 기준을 설명하고 Restful API 가 아닌 것들은 어떤게 있는지 기록합니다.

:::

<!--truncate-->

## Restful API란?

- Restful API는 표준 HTTP 메서드 집합을 사용하여 리소스에 대한 작업을 수행하는 웹 서비스를 설계하기 위한 아키텍처 스타일입니다.
- Restful API에서 각 리소스는 고유한 URI로 식별됩니다. 클라이언트(예: 웹 브라우저 또는 모바일 앱)는 표준 HTTP 메서드를 사용하여 이러한 리소스와 상호 작용할 수 있습니다.

예를 들어, 클라이언트는 요청 본문에 사용자 데이터를 포함하는 JSON 객체와 함께 URI: `https://example.com/users`로 요청을 전송하여 서버에 POST 요청을 전송하여 새 사용자를 생성할 수 있습니다.

## GET, POST 외에 알고있는 메소드와 그 기준을 설명

HTTP Method의 종류에는 `GET`, `POST`, `PATCH`, `PUT`, `DELETE`등이 있으며 `PATCH`요청은 데이터의 일부만 변경할 때, `PUT`은 데이터 전체를 변경할 때, `DELETE`는 데이터를 삭제할 때 사용됩니다.

## Restful API가 아닌 것?

- restful외의 API설계 규칙은 다양하게 있지만, 최근 가장 급부상하는 API 설계 규칙은 페이스북에서 제작한 GraphQL입니다.
- GraphQL은 단일 엔드포인트에 다양한 쿼리문을 통해 서버와 통신하게 됩니다.
- 특히 클라이언트가 필요한 데이터만 요청할 수 있도록 지원해, 서버측에서 필요한 데이터만 반환함으로써 데이터 전송량을 최소화하고 불필요한 중복 요청을 줄이는 효과를 가져올 수 있습니다.
- 하지만 GraphQL은 JSON으로 통신을 해야하기 때문에, 파일을 업로드 할 때 불편함이 있을 수 있습니다. 이를 보완하기 위해 라이브러리등을 사용해야 합니다.

:::tip 최종 정리

- Restful API는 HTTP 기반의 API 설계 규칙입니다.
- URI라고하는 자원과 그에 대한 동작을 수행하는 Method로 정의됩니다.
- Method의 종류에는 `GET`, `POST`, `PATCH`, `PUT`, `DELETE`등이 있으며 `PATCH`요청은 데이터의 일부만 변경할 때, `PUT`은 데이터 전체를 변경할 때, `DELETE`는 데이터를 삭제할 때 사용됩니다.

---

- restful 이외의 API설계 규칙은 다양하게 있으나, 떠오르는 API 설계 규칙은 페이스북에서 제작한 GraphQL입니다.
- GraphQL은 단일 엔드포인트에 다양한 쿼리문을 통해 서버와 통신하고 필요한 데이터만 반환함으로써 데이터 전송량을 최소화해 불필요한 중복 요청을 줄이는 효과를 가져올 수 있습니다.
- GraphQL은 JSON으로 통신을 하기 때문에, 파일을 업로드 하기 까다로워 라이브러리를 활용 할 수 있습니다.

:::

{/* 이 글은 Tistory(https://hyoloui.tistory.com/140)에서 옮겨 온 글입니다. 원문 작성일: 2023-03-27 */}

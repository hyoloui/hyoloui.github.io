---
sidebar_position: 6
---

### 물리 계층

- 네트워크 케이블과 물리적 신호의 전송 규칙을 조정
- 물리적 매체를 통해 Bit Stream을 전송하는데 필요한 인터페이스 및 전송매체의 전기적, 기계적 규격을 정의
- 물리 계층과 관련된 네트워크 연결 장비
  - 전기적 신호를 재생하는 장비 - 허브, 리피터
  - 기계적인 연결 장치 - 각종 커넥터, 전송 매체 연결소자
  - 디지털/아날로그 신호 변환기 - MODEM, CODEC
- 중계기[(Repeater)]: 약해진 신호를 재생, 물리적 거리 확장
- 허브[(Hub)]: 멀티포트 리피터
- RS-232C
  - DTE와 DCE 연결을 위한 대표적인 물리 계층 프로토콜 -> v.24, v.28
  - PC 에서 USB 이전에는 모뎀, 마우스 등을 연결하는 대표적인 직렬 인터페이스
  - USB 로 대체됨
- 널모뎀[(Null modem)]
  - DCE가 없이 DTE와 DTE를 직접 연결하기 위한 방법
  - RS-232C 케이블의 송신과 수신 단자를 교차연결

---

### 데이터링크 계층

- 한 노드에서 다음 노드까지 비트 그룹[Frame]을 오류 없이 전달하는 책임
  - Node-to-node frame delivery
- 데이터링크 층의 주요 임무
  - Framing -> 헤더와 트레일러를 붙여서 프레임을 구성
  - 물리주소 지정 - Physical addressing -> LAN 카드 주소(MAC Address)
  - 흐름제어 - [Flow control]
  - 오류제어 - [Error control]
  - 접속제어 - [Access control]
- 데이터링크 계층의 장비
  - 브릿지: 물리주소를 사용하여 프레임을 전달하는 장비
  - 스위치: 멀티포트 브리지
- 데이터링크 계층의 대표적인 프로토콜
  - [HDLC] Hign level Data Link Control
  - [PPP] Point-to-Point Protocol 등
- LAN에서는 데이터링크 계층을 2개의 계층으로 세분
  - [LLC] Logical Link Control
  - [MAC] Medium Access Control

---

### 네트워크 계층

- 두 시스템이 서로 다른 네트워크에 접속되어 있을 경우,
  여러 네트워크 링크를 거쳐서
  **출발지** 장비(Source device)로부터
  **목적지** 장비(Destination device)까지 Packet을 전달하는 책임
- 네트워크 계층의 주요 임무
  - Logical addressing - 논리 주소([IP 주소])의 지정
  - Routing - [경로 지정]과 교환 기능 제공
- 네트워크 계층의 장비 -> 라우터[(router)]

---

### 전송 계층

- 전체 메시지를 출발지 응용프로그램에서 목적지 응용 프로그램 까지 전달
  - process-to-process segment delivery
- 컴퓨터 내부의 프로그램으로 처리
- 전송계층의 주요 임무
  - Port addressing > service-point addressing
  - Segmentation and reassembly > sequence number를 사용
  - [Connection control], [Flow control], [Error Control]
    단, 2계층의 데이터링크 계층과는 control 범위가 다름

---

### 세션 계층

- 통신 장치들 간의 대화 제어[Dialog control] >> 회의 진행
  - 전이중 방식
  - 반이중 방식
- 동기화[Synchronization] >> Checkpoint를 삽입

---

### 표현 계층

- 데이터 표현의 차이를 극복: 번역[Translation]
- 암호화 및 압축 수행: [Encryption] & [Compression]
  - 압축 방식
    - JPEG: 정지화상 압축 표준
    - MPEG: 동영상 압축 표준 + MP3(MPEG Audio Level 3)
    - MHEG(Multimedia and Hypermedia Experts Group)
  - 암호 방식
    - Cryptology >> cryptography와cryptanalysis
    - Cryptography >> Encryption, Decryption, cipher Text, plain text
    - 암호 서비스
      - [Confidentiality] 기밀성, 비밀성
      - [Integrity] 무결성, 변조 방지
      - [Authentication] 인증, 통신 상대방의 신원 확인
      - [Non-repudiation] 부인봉쇄 >> 디지털 서명
      - [Availability] 가용성 >> Dos(Denial of Service) 공격으로부터의 보호
    - 암호 방식
      - 암호 알고리즘은 공개하고 암호 키를 비밀로 함
      - 비밀키(대칭키) 방식
        - 암호화 키가 복호화 키가 동일한 방식
          [DES], [AES]
          키의 관리 및 분배가 어려움
      - 공개키 방식
        - 암호화 키와 복호화 키가 서로 다름, 암호화 키는 공개
          - 교환 알고리즘
          - [RSA] - 소인수분해 문제
          - [ECC] - 타원곡선 상의 유한체 이산로그

---

### 응용 계층

사용자가 네트워크에 접근할 수 있도록 하는 User interface를 제공

- [MHS]
- [Directory System]
- [FTAM]
- [Virtual Terminal]
- [CMIP ]

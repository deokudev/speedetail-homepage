---
title: 할일 & 일정 동기화
nextjs:
  metadata:
    title: 할일 & 일정 동기화
    description: 클라우드 기반 노트 데이터 동기화
---

Speedetail App을 사용하면 클라우드를 통해 여러 컴퓨터 간에 노트를 동기화할 수 있습니다.
기본적으로 Speedetail App은 Speedetail 동기화 서버에 데이터를 저장합니다.
환경설정 창에서 다음과 같이 동기화를 구성할 수 있습니다:

<!-- ![동기화 환경설정](/images/sync_preferences.png) -->

세 가지 동기화 옵션이 있습니다:

- **동기화하지 않음** - Speedetail 데이터를 로컬 기기에만 저장
- **Speedetail 동기화 서버** - Speedetail의 자체 서비스와 동기화
- **Self-hosting (CouchDB)** - 사용자의 호환 가능한 서버와 동기화

## 자체 동기화 서버 설정 방법

Speedetail을 사용하면 Speedetail의 자체 서비스 대신 [CouchDB](http://couchdb.apache.org/) API와 호환되는 자체 데이터베이스에 노트를 저장할 수 있습니다.
CouchDB는 오픈소스 NoSQL 데이터베이스이므로 무료로 자신의 환경에 배포할 수 있습니다. 자세한 내용은 CouchDB의 [설치 가이드](https://docs.couchdb.org/en/stable/install/index.html)를 참조하세요.
직접 데이터베이스를 운영하는 대신 DBaaS를 사용하는 것도 좋은 선택입니다. 예를 들어, [Cloudant](https://cloudant.com/)는 완전 관리형 DBaaS 제공업체 중 하나입니다.

{% callout type="warning" %}
이 기능은 본인의 책임 하에 사용하시기 바랍니다. Speedetail 자체는 서버의 다른 사용자로부터 데이터를 보호하지 않습니다. 데이터를 보호하려면 이 페이지 하단의 [보안](#보안-구성) 섹션을 읽어보세요.
{% /callout %}

### 데이터베이스 생성

CouchDB 서버를 구축했다면, 노트를 저장할 데이터베이스를 생성해 보겠습니다.
Speedetail에는 하나의 데이터베이스만 필요합니다. 예를 들어, 다음 명령을 실행하여 데이터베이스를 생성합니다:

```bash
> curl -X PUT http://localhost:5984/my-speedetail-data
```

{% callout type="note" title="참고" %}
CouchDB가 `localhost`와 포트 5984(기본값)가 아닌 곳에서 실행 중인 경우, `localhost:5984`를 해당 서버 주소와 포트로 변경하세요.
{% /callout %}

데이터베이스 목록을 조회하면 다음과 같은 유용한 결과가 표시됩니다:

```bash
> curl -X GET http://127.0.0.1:5984/_all_dbs
["my-speedetail-data"]
```

Speedetail 동기화 환경설정으로 돌아가서 **주소** 섹션에 데이터베이스 URL을 입력할 수 있습니다:

```url
http://localhost:5984/my-speedetail-data
```

<!-- ![데스크톱 앱에서 사용자 지정 서버와 동기화](/images/sync_custom-server.png) -->

그런 다음 **적용** 버튼을 누릅니다.

자세한 내용은 [CouchDB 튜토리얼](http://guide.couchdb.org/draft/tour.html)을 참조하세요.

### 보안 구성

아시다시피 CouchDB는 기본적으로 Admin Party 모드로 실행됩니다. 이는 모든 사용자가 모든 작업을 수행할 수 있는 권한을 가지고 있다는 의미입니다.
CouchDB의 [문서](http://guide.couchdb.org/draft/security.html)를 참조하세요.
노트를 안전하게 보호하기 위해 사용자 이름과 비밀번호로 관리자 사용자를 생성하는 것을 권장합니다.

이제 관리자 사용자를 생성해 보겠습니다. 사용자 이름은 `joshua`이고 비밀번호는 `secret`입니다:

```bash
> curl -X PUT http://127.0.0.1:5984/_config/admins/joshua -d '"secret"'
```

이제 `joshua`라는 관리자 사용자가 생겼으니, `my-speedetail-data`에 대한 관리자 권한을 부여해 보겠습니다:

```bash
> curl -X PUT http://127.0.0.1:5984/my-speedetail-data/_security -d '{ "admins": { "names": [ "joshua" ] } }'
```

이제 유효한 인증 정보가 없는 사용자의 접근이 제한됩니다:

```bash
> curl -X PUT http://127.0.0.1:5984/my-speedetail-data
{"error":"unauthorized","reason":"You are not a server admin."}
```

올바른 인증 정보로 다시 시도해 보겠습니다:

```bash
> HOST="http://joshua:secret@127.0.0.1:5984"
> curl -X PUT $HOST/my-speedetail-data
{"ok":true}
```

잘 작동합니다!

Speedetail 동기화 환경설정으로 돌아가서 **주소** 섹션에 데이터베이스 URL을 입력할 수 있습니다:

```url
http://joshua:secret@127.0.0.1:5984/my-speedetail-data
```

포트 번호는 생략하지 마세요.

### SSL 활성화

데이터베이스를 공개적으로 접근 가능하게 하려면 SSL을 구성하는 것을 권장합니다.
[CouchDB는 기본적으로 SSL을 제공](https://cwiki.apache.org/confluence/pages/viewpage.action?pageId=48203146)하지만 클라이언트와의 복제에 문제가 있어 권장하지 않습니다.
리버스 프록시 서버로 nginx를 권장합니다. 구성은 다음과 같습니다:

```nginx
server {
  listen 6984;
  ssl on;
  ssl_certificate /path/to/fullchain.pem;
  ssl_certificate_key /path/to/privkey.pem;
  ssl_protocols TLSv1.1 TLSv1.2 SSLv3;
  ssl_session_cache shared:SSL:1m;

  server_name ***;

  location / {
    proxy_pass http://localhost:5984;
    proxy_redirect off;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Ssl on;
  }

  location ~ ^/(.*)/_changes {
    proxy_pass http://localhost:5984;
    proxy_redirect off;
    proxy_buffering off;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Ssl on;
  }
}
```

서버 URL은 다음과 같이 됩니다:

```url
https://joshua:secret@your-server.com:6984/my-speedetail-data
```

{% callout type="warning" title="참고" %}
Speedetail이 호스팅하는 데이터베이스에서는 디자인 문서를 생성하거나 첨부 파일을 추가할 수 없습니다.
{% /callout %}

### 모바일 동기화 지원

iOS의 App Transport Security 요구사항으로 인해 서버에서 SSL을 활성화하는 것을 잊지 마세요.

모바일 앱에서 데이터베이스 동기화를 구성하려면:

1. 환경설정 → 동기화로 이동
2. _Self-hosting (CouchDB)_ 선택
3. _Address_ 섹션의 입력 필드에 데이터베이스 URL 입력
4. _적용_ 버튼 누르기

<!-- ![모바일 앱에서 사용자 지정 서버와 동기화](/images/sync_mobile.png) -->

<!--
## 데이터베이스 연결 디버깅

앱이 데이터베이스와 동기화되지 않는 경우, 문제를 디버깅하는 두 가지 방법이 있습니다:

1. [네트워크 진단 실행](/app-version/troubleshooting#run-network-diagnosis)
2. [메인 프로세스 로깅 활성화](/app-version/troubleshooting#enable-logging)
-->

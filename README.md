## PM2 연구

PM2 Documentation
-> https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/

NodeJS 서버를 운영하다보면 이유없이 죽어있는 경우가 있고 싱글 스레드 기반의 단일 프로세스로 운영되어 성능상 이슈가 발생할 수 있다.
해당 이슈를 해결하기 위해 NodeJS에서는 Master Process 가 Child process 클러스터링 하여 Task 를 Round Robin 방식으로 처리할 수 있도록 Cluster 모듈을 제공한다. 
PM2는 해당 Cluster 모듈을 사용하여 사용자가 쉽게 Cluster 운영을 Config 설정으로 해줄 수 있고 모니터링 도구를 제공하며 3rd party인 logtate도 제공한다.


PM2 를 간단히 구현한 예제이니 참고하여 각프로젝트에 적용하길 바란다.
클러스터 대수, 메모리 도달에 따른 인스턴스 리로드, failover 에 따른 자동 startup 등 다양한 설정들이 존재하니 확인하기 바란다.

디펜던시 설치
```
npm install && pm2 install pm2-logrotate
```

PM2 에 대한 Config
```
 ecosystem.config.js 주석 확인하기 바람
```

PM2 를 통한 서버 실행
```
pm2 start ecosystem.config.js
```

실행 되는 서비스는 간단한 API Express 서버와 API를 호출하는 Cron Schedule 임
```$xslt

Rest API ( /src/server/index.js )
 /test GET -> 간단한 메시지 Response
 /random GET -> 숫자 1~10 난수로 Response

ScheduleJob ( /src/scheduleJobs/index.js )
  /test 요청에 대한 Schedule Job #1 매초마다
  /random 요청에 대한 Schedule Job #2 5초마다
```

PM2 를 통한 서버 중지
```
pm2 stop all // 전체 프로세스 중지
pm2 stop `서비스명 or process number` // 해당 서비스만 중지
```

PM2 실시간 로깅
```
pm2 logs
```

PM2 파일 로깅
```
logs/api-outs__YYYY-MM-DD_HH-MM-SS.log 생성
```

로그로테이트 주기 및 용량에 따른 분리 변경 명령어
```
 // Log 로테이트 주기가 짧으면 운영되는 서버가 Reload 되면서 파일이 생성되기 때문에 좋지 않을 것 같음
pm2 set pm2-logrotate:max_size 500M // 500MB 단위로 분리 (K: 키로바이트, G: 기가바이트)
pm2 set pm2-logrotate:compress true (Roate 되는 시점에 압축할 것인지에 대한 설정)
pm2 set pm2-logrotate:rotateInterval '*/1 * * * *' (Expression 은 Cron 과 동일함 eg: 1분마다 생성)
```
 
로그 모니터링 터미널용
```$xslt
pm2 monit
```

로그 웹 모니터링 (부분유료화)
```$xslt
pm2 plus
```

프로세스 인스턴스 목록 삭제
```$xslt
pm2 delete `id or all` // all은 전체
```

로그 flush 기능
```$xslt
pm2 flush
```

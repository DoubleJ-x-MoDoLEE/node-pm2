module.exports = {
  apps : [{
    name: 'API', // 서비스 이름 지정
    script: './src/server/index.js', // 실행할 script 의 entry point
    instances: 2, // 클러스터링 대수 'max' 경우 OS 상 Scale Out 할 수 있는 최대 치를 의미함..
    node_args: '-r esm', // node 옵션
    exec_mode: 'cluster', // 클러스터 모드
    autorestart: true, // 자동으로 restart 활성화 할 것인지 여부
    watch: true, // 파일이 바뀌었을 때 restart 가 되는 설정인 거같음
    max_memory_restart: '100M', // 메모리 설정 단위가 다다랐을 때 서버의 인스턴스를 재기동 함 M(MB), G(GB), K(KB)
    kill_timeout : 3000, // 서버를 kill할 때 바로 죽이지 않고 3000ms 이후에 죽이는 것 같음
    listen_timeout : 3000, // 3000ms 정도의 시간을 여유잡아서 pm2 start를 햇을 때 띄우는 방식
    log_date_format: 'YYYY-MM-DD HH:mm Z',
    time: true,
    out_file: 'logs/api-outs.log', // error, log 와 통합해서 보여주는 outs file
    pid_file: 'logs/api-pid.log', // pid process log 파일
    error_file: 'logs/api-error.log', // error 로그만 보여주는 로그
    combine_logs: true,
    merge_logs: true,
    ignore_watch: ['node_modules', 'logs'], // watch 대상에서 제외하는 폴더
    env: { // 환경 변수 셋업 ( 이 부분은 도커에서의 env 와 어떻게 같이 사용할 것인가에 대한 스터디가 필요함 )
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  },{
    name: 'SCHEDULE_JOB',
    script: './src/scheduleJobs/index.js',
    instances: 1,
    node_args: '-r esm',
    exec_mode: 'cluster',
    autorestart: true,
    watch: true,
    max_memory_restart: '128M',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};

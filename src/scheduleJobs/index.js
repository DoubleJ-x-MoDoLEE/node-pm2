import schedule from 'node-schedule';
import axios from 'axios';

const URL_BASE = `http://localhost:8080`;

/**
 * /test 요청에 대한 Schedule Job
 */
schedule.scheduleJob('* * * * * *', async () => {
  const response = await axios.get(`${URL_BASE}/test`);
  console.log(new Date().toDateString(), response.data);
});

/**
 * /random 요청에 대한 Schedule Job
 */
schedule.scheduleJob('*/5 * * * * *', async () => {
  const response = await axios.get(`${URL_BASE}/random`);
  console.log(new Date().toDateString(), response.data);
});


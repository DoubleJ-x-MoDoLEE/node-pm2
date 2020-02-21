import express from 'express';
const app = express();

app.get('/test', (req, res) => {
  console.log(new Date().toDateString(), '/test 요청 완료.');
  res.json({
    message : '/test request success!'
  })
});

app.get('/random', (req, res) => {
  const randomNum = (Math.random() * 10).toFixed(0);
  console.log(new Date().toDateString(), `/random ${randomNum}`);
  res.json({
    randomNum
  })
});

app.listen(8080, () => {
  console.log(`Server started port 8080`)
});

const express = require('express');
const path = require('path'); // ⬅️ 요거 추가!

const app = express();

// public 폴더를 정적 경로로 설정
app.use(express.static('public'));

// / 요청에 대해 main.html 보내기
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/pages/main.html'));
});

app.listen(3000, () => {
  console.log('server is running on http://localhost:3000');
});

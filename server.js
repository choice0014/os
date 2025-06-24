const express = require("express");
const path = require("path");

const app = express();

// public 폴더를 절대경로로만 정적 경로로 설정 (상대경로는 제거)
app.use(express.static(path.join(__dirname, "public")));

// / 요청에 대해 main.html 보내기
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/pages/main.html"));
});

app.listen(3000, () => {
  console.log("server is running on http://localhost:3000");
});

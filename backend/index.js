require("dotenv").config();
const app = require("./server.js");

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Server is listening on: http://localhost:${PORT}`);
});

import express from "express";
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("app.ts running.....")
});

export default app;
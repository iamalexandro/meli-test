import express from "express";
import cors from "cors";
import router from "./router.js";

const app = express();

app.use(cors());

app.get("/users", (req, res) => {
  res.send({
    users: [],
  });
});

app.use("/api/items", router);

app.listen(3000, () => {
  console.log("server started on port 3000");
});

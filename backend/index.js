import express from "express";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Health check successful");
})




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})


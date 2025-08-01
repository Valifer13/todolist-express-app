import { app } from "./app";
import { stdout } from "process";
// import cors from "cors";

const port = process.env.PORT || 3000;

// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true,
// }));

app.listen(port, () => {
  stdout.write(`Server is running at http://localhost:${port}\n`)
})
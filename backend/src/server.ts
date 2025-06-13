import { app } from "./app";
import { stdout } from "process";

const port = process.env.PORT || 3000;

app.listen(port, () => {
  stdout.write(`Server is running at http://localhost:${port}`)
})
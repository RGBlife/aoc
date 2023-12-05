import * as dotenv from "dotenv";
import * as fs from "fs";

dotenv.config();

fetch(`https://adventofcode.com/2023/day/5/input`, {
  headers: {
    cookie: `session=${process.env.SESSION_COOKIE}`,
    "User-Agent": "node-fetch (bretgomesmn@gmail.com)",
  },
})
  .then((response) => {
    return response.text();
  })
  .then((data) => {
    fs.writeFileSync("./data/p9-p10.inputs.txt", data);
  });

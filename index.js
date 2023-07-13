import { exec } from "child_process";
import { writeFile } from "fs";

function main() {
  for (let i = 0; i < 1000; i++) {
    writeFile(`./test-${i + 2}.txt`, `hello world ${i}`, (err) => { });

    let a = exec("git add -A", (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });

    a.on("message", (message) => {
      console.log(message);
      a.kill();
    });
    let b = exec(
      `git commit --date "${i + i * 100} days ago" -m "Update ${i}"`,
      (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
      },
    );

   
    b.on("message", (message) => {
      console.log(message);
      b.kill();
    });  }
}

main();

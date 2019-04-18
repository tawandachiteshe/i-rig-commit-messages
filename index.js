import { exec } from "child_process";
import { writeFile } from "fs";

function main() {
  for (let i = 0; i < 2000; i++) {
    writeFile(`./test-${i + 2}.txt`, `hello world ${i}`, (err) => { });

    le  exec("git add -A", (error, stdout, stderr) => {
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

    exec(
      `git commit --date "${i} days ago" -m "Update ${i}"`,
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
  }
}

main();

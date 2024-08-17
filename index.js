import { exec } from "child_process";
import { writeFile } from "fs";

function main() {
  for (let i = 0; i < 10_000; i++) {
    writeFile(`./test-${i}.txt`, `hello world ${i}`, (err) => { });

    exec("git add .", (error, stdout, stderr) => {
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
      'git commit --date "3 days ago" -m "Update"',
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

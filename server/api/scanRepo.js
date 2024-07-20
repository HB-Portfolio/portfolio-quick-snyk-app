import { exec } from "child_process";

export default defineEventHandler(async (event) => {
  let body = "";
  for await (const chunk of event.req) {
    body += chunk;
  }
  const { url } = JSON.parse(body);

  console.log(`URL: ${url}`);

  return new Promise((resolve, reject) => {
    exec(
      "snyk auth (YOUR OWN SNYK API KEY HERE)",
      (error, stdout, stderr) => {
        if (error) {
          console.error("Snyk CLI Error:", error);
          console.error("Standard Error:", stderr);
          reject(new Error("Snyk CLI command failed"));
          return;
        } else {
          exec(`snyk test ${url}`, (error, stdout, stderr) => {
            resolve(stdout);
          });
          return;
        }
      }
    );
  });
});

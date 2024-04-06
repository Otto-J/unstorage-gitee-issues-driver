// - 11:27 unstorage + gitee-issues 和 gitee 内容<br>https://gitee.com/api/v5/swagger#/getV5ReposOwnerRepoIssues
// - 11:32 适配 github gitee 上的内容

import { createStorage } from "unstorage";
import { giteeIssuesDriver } from "..";

// fetch(
//   "https://gitee.com/api/v5/repos/xiaoxfa/blog-issues-template/issues?access_token=228a33ca4192f43957b97590fde72c3f&state=all&labels=publish&sort=created&direction=desc&page=1&per_page=20"
// )
//   .then((res) => {
//     return res.json();
//   })
//   .then((res) => {
//     console.log(res);
//   });

// const baseURL =
//   "https://gitee.com/api/v5/repos/xiaoxfa/blog-issues-template/issues";

const storage = createStorage({
  driver: giteeIssuesDriver({
    repo: "https://gitee.com/xiaoxfa/blog-issues-template",
    access_token: process.env.GITEE_TOKEN!,
    labels: "post", // optional
    creator: "xiaoxfa", // optional
    ttl: 60, // 60 seconds cache
  }),
});

const keys = await storage.getKeys();
console.log("get keys", keys);

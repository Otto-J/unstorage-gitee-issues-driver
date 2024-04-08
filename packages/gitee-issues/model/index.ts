import type { GiteeIssuesDriverOptions } from "..";

export const fetchIssues = async (options: GiteeIssuesDriverOptions) => {
  const [_, owner, repo] = options.repo
    .split("https://gitee.com")[1]
    .split("/");

  const token = options.access_token;
  const creator = options.creator ?? owner;
  const page = 99;
  const label = options.labels ?? "post";
  const baseUrl = `https://gitee.com/api/v5/repos/${owner}/${repo}/issues`;
  const params = new URLSearchParams();
  params.append("access_token", token);
  params.append("state", "all");
  // label=post
  params.append("labels", label);
  // sort=created&direction=desc&page=1&per_page=99&creator=xiaoxfa'
  params.append("sort", "created");
  params.append("direction", "desc");
  params.append("page", "1");
  params.append("per_page", page.toString());
  params.append("creator", creator);

  return fetch(`${baseUrl}?${params.toString()}`)
    .then((res) => res.json())
    .then((list: any) => {
      // console.log(list, 2);
      return ((list ?? []) as any[])
        .map((issue) => ({
          id: issue.number,
          title: issue.title,
          labels: (issue.labels as any[]).map((label) =>
            typeof label === "string" ? label : label.name
          ),
          // body: issue.body,
          body: encodeURIComponent(issue.body),
          created_at: issue.created_at,
          updated_at: issue.updated_at,
        }))
        .map((issue) => {
          return JSON.stringify(issue);
        });
    })
    .catch((err) => {
      console.error(err);
      return [];
    });
};

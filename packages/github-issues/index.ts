import { createStorage, defineDriver } from "unstorage";
import { Octokit } from "octokit";

export const myStorageDriver = defineDriver(
  (options: { owner: string; repo: string; auth: string }) => {
    const octokit = new Octokit({
      auth: options.auth,
    });

    async function getIssues(owner: string, repo: string) {
      const issues = await octokit.request("GET /repos/{owner}/{repo}/issues", {
        owner: owner,
        repo: repo,
        labels: "publish",
        creator: owner,
      });

      return issues.data;
    }

    async function getIssueDetails(
      owner: string,
      repo: string,
      issueNumber: number
    ) {
      const issue = await octokit.request(
        "GET /repos/{owner}/{repo}/issues/{issue_number}",
        {
          owner: owner,
          repo: repo,
          issue_number: issueNumber,
        }
      );

      return issue.data;
    }
    return {
      name: "my-custom-driver",
      options,
      async hasItem(key, _opts) {
        return true;
      },
      async getItem(key: string, _opts) {
        const detail = await getIssueDetails(
          options.owner,
          options.repo,
          Number(key)
        );
        return {
          id: detail.id,
          title: detail.title,
          labels: detail.labels.map((label) =>
            typeof label === "string" ? label : label.name
          ),
          body: detail.body,
          created_at: detail.created_at,
          updated_at: detail.updated_at,
        };
      },
      async setItem(key, value, _opts) {},
      async removeItem(key, _opts) {},
      async getKeys(base, _opts) {
        const issueList = await getIssues(options.owner, options.repo);
        const res = issueList.map((issue) => String(issue.number));
        return res;
      },
      // async getItemRaw(key, _opts) {}
      async clear(base, _opts) {},
      async dispose() {},
      // async watch(callback) {},
    };
  }
);

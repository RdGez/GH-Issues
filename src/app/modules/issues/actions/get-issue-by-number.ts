import { sleep } from "@helpers/sleep";
import { GitHubIssue } from "../interfaces";
import { environment } from "@environments/environment.development";

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.gitHubToken;

export const getIssueByNumber = async (issueNumber: string): Promise<GitHubIssue> => {
  try {
    const response = await fetch(`${ BASE_URL }/issues/${issueNumber}`,{
      headers: { Authorization: `Bearer ${ GITHUB_TOKEN }` },
    });
    if (!response.ok) throw "Can't get issue";

    const issue: GitHubIssue = await response.json();

    return issue
  } catch (error) {
    throw "Can't get issue";
  }
}

import { sleep } from "@helpers/sleep";
import { GitHubIssue } from "../interfaces";
import { environment } from "@environments/environment.development";

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.gitHubToken;

export const getCommentsByIssue = async (issueNumber: string): Promise<GitHubIssue[]> => {
  try {
    const response = await fetch(`${ BASE_URL }/issues/${issueNumber}/comments`,{
      headers: { Authorization: `Bearer ${ GITHUB_TOKEN }` },
    });
    if (!response.ok) throw "Can't get comments";

    const comments: GitHubIssue[] = await response.json();

    return comments
  } catch (error) {
    throw "Can't get comments";
  }
}

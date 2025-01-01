import { sleep } from "@helpers/sleep";
import { GitHubLabel } from "../interfaces/github-label.interface";
import { environment } from "@environments/environment.development";

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.gitHubToken;

export const getLabels = async (): Promise<GitHubLabel[]> => {
  await sleep(1500);

  try {
    const response = await fetch(`${ BASE_URL }/labels`,{
      headers: { Authorization: `Bearer ${ GITHUB_TOKEN }` },
    });
    if (!response.ok) throw "Can't get labels";

    const labels: GitHubLabel[] = await response.json();

    return labels
  } catch (error) {
    throw "Can't get labels";
  }
}

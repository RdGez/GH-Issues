import { environment } from "@environments/environment.development";
import { getCommentsByIssue } from "./get-issue-comments";

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.gitHubToken;

const issueNumber = '1234'
const mockComments: any[] = [
  { id: 1, body: 'First Comment', user: { login: 'user1' } },
  { id: 2, body: 'Second Comment', user: { login: 'user2' } }
]

describe('getCommentsByIssue', () => {
  it('should fetch issue comments successfully', async () => {
    const requestUrl = `${BASE_URL}/issues/${issueNumber}/comments`
    const commentResponse = new Response(JSON.stringify(mockComments), {
      status: 200,
      statusText: 'OK',
    })

    spyOn(window, 'fetch').and.resolveTo(commentResponse);
    await getCommentsByIssue(issueNumber);

    expect(window.fetch).toHaveBeenCalledWith(requestUrl, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      }
    });
  })

  it('should throw an error if the response is not ok', async () => {
    const commentResponse = new Response(null, {
      status: 404,
      statusText: 'Not Found',
    })

    spyOn(window, 'fetch').and.resolveTo(commentResponse);

    try {
      await getCommentsByIssue(issueNumber);
    } catch (error) {
      expect(error).toEqual("Can't get comments");
    }
  })
})

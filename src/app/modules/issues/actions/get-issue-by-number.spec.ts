import { environment } from "@environments/environment.development"
import { getIssueByNumber } from "./get-issue-by-number";

const issueNumber = '2312';
const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.gitHubToken;
const mockIssue = { id: '1234', number: issueNumber, body: '# Hola Mundo!' }

describe('GetIssueByNumber', () => {
  it('should fetch successfully', async () => {
    const requestUrl = `${BASE_URL}/issues/${issueNumber}`
    const issueResponse = new Response(JSON.stringify(mockIssue), {
      status: 200,
      statusText: 'OK',
    })

    spyOn(window, 'fetch').and.resolveTo(issueResponse);
    const issue = await getIssueByNumber(issueNumber);

    expect(window.fetch).toHaveBeenCalledWith(requestUrl, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      }
    });
  })

  it('should not fetch successfully', async () => {
    const issueResponse = new Response(null, {
      status: 404,
      statusText: 'Not Found',
    })

    spyOn(window, 'fetch').and.resolveTo(issueResponse);

    try {
      await getIssueByNumber(issueNumber);
    } catch (error) {
      expect(error).toEqual("Can't get issue");
    }
  })
})

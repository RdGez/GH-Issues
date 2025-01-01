import { Injectable, signal } from '@angular/core';
import { injectQuery, injectQueryClient } from '@tanstack/angular-query-experimental';
import { getIssueByNumber } from '../actions/get-issue-by-number';
import { getCommentsByIssue } from '../actions/get-issue-comments';
import { GitHubIssue } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  private _issueNumber = signal<string | null>(null)
  private _queryClient = injectQueryClient()

  issueQuery = injectQuery(() => ({
    queryKey: ['issue', this._issueNumber()],
    queryFn: () => getIssueByNumber(this._issueNumber()!),
    enabled: !!this._issueNumber(),
    staleTime: 1000 * 60 * 5,
  }));

  commentQuery = injectQuery(() => ({
    queryKey: ['issue', this._issueNumber(), 'comments'],
    queryFn: () => getCommentsByIssue(this._issueNumber()!),
    enabled: !!this._issueNumber()
  }));

  set issueNumber(issueNumber: string) {
    this._issueNumber.set(issueNumber);
  }

  prefetchIssue(issueId: string) {
    this._queryClient.prefetchQuery({
      queryKey: ['issue', issueId],
      queryFn: () => getIssueByNumber(issueId),
      staleTime: 1000 * 60 * 5,
    })
  }

  setIssueData(issue: GitHubIssue) {
    this._queryClient.setQueryData(['issue', issue.number.toString()], issue, {
      updatedAt: Date.now() + 1000 * 60,
    });
  }
}

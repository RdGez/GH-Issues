import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GitHubIssue } from '../../interfaces';
import { CapitalizePipe } from '@shared/pipes/capitalize.pipe';
import { DatePipe } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'issue-comment',
  imports: [CapitalizePipe, DatePipe, MarkdownModule],
  standalone: true,
  templateUrl: './issue-comment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssueCommentComponent {
  public issue = input.required<GitHubIssue>();
}

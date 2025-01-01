import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, tap } from 'rxjs';
import { IssueService } from '../../services/issue.service';
import { SpinnerComponent } from '@shared/components/spinner/spinner.component';
import { IssueCommentComponent } from '../../components/issue-comment/issue-comment.component';

@Component({
  selector: 'issue-page',
  imports: [RouterLink, SpinnerComponent, IssueCommentComponent],
  standalone: true,
  templateUrl: './issue-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class IssuePageComponent {
  public route = inject(ActivatedRoute);
  public issueService = inject(IssueService);
  public issue = this.issueService.issueQuery;
  public comments = this.issueService.commentQuery;

  issueNumber = toSignal(
    this.route.paramMap.pipe(
      map(params => params.get('number') ?? ''),
      tap(issueNumber => this.issueService.issueNumber = issueNumber)
    )
  );
}

import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { IssuesService } from '../../services/issues.service';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { LabelsSelectorComponent } from '../../components/labels-selector/labels-selector.component';
import { IssueItemComponent } from '../../components/issue-item/issue-item.component';
import { State } from '../../interfaces';

@Component({
  selector: 'app-issues-list-page',
  imports: [SpinnerComponent, LabelsSelectorComponent, IssueItemComponent],
  standalone: true,
  templateUrl: './issues-list-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class IssuesListPageComponent {
  private readonly _issueService = inject(IssuesService);
  public state = this._issueService.selectedState;

  get isLoading() {
    return this.issues.data() === undefined || this.labels.isLoading() || this.issues.isLoading();
  }

  get labels() {
    return this._issueService.labelsQuery;
  }

  get issues() {
    return this._issueService.issuesQuery;
  }

  onChangeState(newState: string) {
    const state = {
      'all': State.All,
      'open': State.Open,
      'closed': State.Closed,
    }[newState] ?? State.All;

    this._issueService.showIssuesByState(state);
  }
}

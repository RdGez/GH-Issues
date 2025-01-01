import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GitHubIssue, State } from '../../interfaces';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from '@shared/pipes/capitalize.pipe';
import { IssueService } from '../../services/issue.service';

@Component({
  selector: 'issue-item',
  imports: [CommonModule, RouterLink, CapitalizePipe],
  templateUrl: './issue-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssueItemComponent {
  public issue = input.required<GitHubIssue>();
  public isOpen = computed(() => this.issue().state === State.Open);

  private _issueService = inject(IssueService);

  prefetchData() {
    // this._issueService.prefetchIssue(this.issue().number.toString()); // Pre-load issue data.
    this._issueService.setIssueData(this.issue());
  }
}

import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { GitHubLabel } from '../../interfaces';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from '@shared/pipes/capitalize.pipe';
import { IssuesService } from '../../services/issues.service';

@Component({
  selector: 'labels-selector',
  imports: [CommonModule, CapitalizePipe],
  standalone: true,
  templateUrl: './labels-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelsSelectorComponent {
  public labels = input.required<GitHubLabel[]>();
  private _issuesService = inject(IssuesService);

  isSelected(labelName: string) {
    return this._issuesService.selectedLabels().has(labelName);
  }

  onToggleLabel(labelName: string) {
    this._issuesService.toggleLabel(labelName);
  }
}

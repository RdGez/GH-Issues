import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'spinner',
  imports: [],
  standalone: true,
  templateUrl: './spinner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
  public type = input.required<string>();
}

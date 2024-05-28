import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ScrollAppearanceDirective} from '../../../../common/directives/scroll-appearance.directive';

@Component({
  selector: 'app-analytics-block',
  standalone: true,
  templateUrl: './analytics-block.component.html',
  styleUrl: './analytics-block.component.scss',
  imports: [RouterOutlet, ScrollAppearanceDirective],
})
export class AnalyticsBlockComponent {}

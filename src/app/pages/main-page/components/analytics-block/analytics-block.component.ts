import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-analytics-block',
  standalone: true,
  templateUrl: './analytics-block.component.html',
  styleUrl: './analytics-block.component.scss',
  imports: [RouterOutlet],
})
export class AnalyticsBlockComponent {}

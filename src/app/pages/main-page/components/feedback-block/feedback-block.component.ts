import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-feedback-block',
  standalone: true,
  templateUrl: './feedback-block.component.html',
  styleUrl: './feedback-block.component.scss',
  imports: [RouterOutlet],
})
export class FeedbackBlockComponent {}

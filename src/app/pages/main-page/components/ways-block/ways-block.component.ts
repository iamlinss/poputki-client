import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-ways-block',
  standalone: true,
  templateUrl: './ways-block.component.html',
  styleUrl: './ways-block.component.scss',
  imports: [RouterOutlet],
})
export class WaysBlockComponent {
  constructor(public router: Router) {}
}

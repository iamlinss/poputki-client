import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {ScrollAppearanceDirective} from '../../../../common/directives/scroll-appearance.directive';

@Component({
  selector: 'app-ways-block',
  standalone: true,
  templateUrl: './ways-block.component.html',
  styleUrl: './ways-block.component.scss',
  imports: [RouterOutlet, ScrollAppearanceDirective],
})
export class WaysBlockComponent {
  constructor(public router: Router) {}
}

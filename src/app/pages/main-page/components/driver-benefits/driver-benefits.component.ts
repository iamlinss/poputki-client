import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {ScrollAppearanceDirective} from '../../../../common/directives/scroll-appearance.directive';

@Component({
  selector: 'app-driver-benefits',
  standalone: true,
  templateUrl: './driver-benefits.component.html',
  styleUrl: './driver-benefits.component.scss',
  imports: [RouterOutlet, ScrollAppearanceDirective],
})
export class DriverBenefitsComponent {
  constructor(public router: Router) {}
}

import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ScrollAppearanceDirective} from '../../../../common/directives/scroll-appearance.directive';

@Component({
  selector: 'app-main-benefits',
  standalone: true,
  templateUrl: './main-benefits.component.html',
  styleUrl: './main-benefits.component.scss',
  imports: [RouterOutlet, ScrollAppearanceDirective],
})
export class MainBenefitsComponent {}

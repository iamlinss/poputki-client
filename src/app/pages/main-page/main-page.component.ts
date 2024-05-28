import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AnalyticsBlockComponent} from './components/analytics-block/analytics-block.component';
import {DriverBenefitsComponent} from './components/driver-benefits/driver-benefits.component';
import {FeedbackBlockComponent} from './components/feedback-block/feedback-block.component';
import {FinderBlockComponent} from '../../components/finder-block/finder-block.component';
import {MainBenefitsComponent} from './components/main-benefits/main-benefits.component';
import {WaysBlockComponent} from './components/ways-block/ways-block.component';
import {MainComponent} from './components/main/main.component';
import {ScrollAppearanceDirective} from '../../common/directives/scroll-appearance.directive';

@Component({
  selector: 'app-main-page',
  standalone: true,
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  imports: [
    RouterOutlet,
    FinderBlockComponent,
    MainBenefitsComponent,
    DriverBenefitsComponent,
    WaysBlockComponent,
    AnalyticsBlockComponent,
    FeedbackBlockComponent,
    MainComponent,
    ScrollAppearanceDirective,
  ],
})
export class MainPageComponent {}

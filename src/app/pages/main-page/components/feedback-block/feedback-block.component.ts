import {CommonModule} from '@angular/common';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ScrollAppearanceDirective} from '../../../../common/directives/scroll-appearance.directive';

@Component({
  selector: 'app-feedback-block',
  standalone: true,
  templateUrl: './feedback-block.component.html',
  styleUrl: './feedback-block.component.scss',
  imports: [RouterOutlet, CommonModule, ScrollAppearanceDirective],
})
export class FeedbackBlockComponent {
  @ViewChild('sliderContainer') sliderContainer?: ElementRef;
  currentPosition = 0;

  shiftCards(direction: number) {
    this.currentPosition = this.currentPosition + direction;

    if (this.sliderContainer) {
      const cardElements = this.sliderContainer.nativeElement.children;

      for (let i = 0; i < cardElements.length; i++) {
        const card = cardElements[i] as HTMLElement;
        const currentTransform = card.style.transform || 'translateX(0px)';
        const currentPosition = parseInt(currentTransform.match(/(-?\d+)px/)![1], 10);
        const newPosition = currentPosition + direction * 420; // Регулируйте сдвиг здесь
        card.style.transform = `translateX(${newPosition}px)`;
      }
    }
  }
}

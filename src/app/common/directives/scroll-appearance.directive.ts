import {Directive, ElementRef, HostListener, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appScrollAppearance]',
  standalone: true,
})
export class ScrollAppearanceDirective implements OnInit {
  @Input('appScrollAppearance') public startPosition?: string;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnInit() {
    this.renderer.addClass(this.el.nativeElement, 'fade-in');

    switch (this.startPosition) {
      case 'left':
        this.renderer.addClass(this.el.nativeElement, 'translate-left');
        break;
      case 'right':
        this.renderer.addClass(this.el.nativeElement, 'translate-right');
        break;
      case 'bottom':
        this.renderer.addClass(this.el.nativeElement, 'translate-bottom');
        break;
      default:
        return;
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const elementPosition = this.el.nativeElement.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;

    const offset = screenHeight * 0.2;

    if (elementPosition - offset < screenHeight) {
      this.renderer.addClass(this.el.nativeElement, 'show');
    }
  }
}

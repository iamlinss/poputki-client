import {Component, ElementRef, HostListener} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {ProgressService} from '../../common/services/register-progress.service';
import {CommonModule} from '@angular/common';
import {UserService} from '../../common/services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [RouterOutlet, CommonModule],
})
export class HeaderComponent {
  isMenuOpen = false;

  constructor(
    public router: Router,
    public ProgressService: ProgressService,
    public userService: UserService,
    private el: ElementRef,
  ) {}

  logout() {
    this.isMenuOpen = false;
    sessionStorage.removeItem('token');
    this.userService.updateAuth();
  }

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.isMenuOpen = false;
    }
  }
}

import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {RegisterProgressService} from '../../common/register-progress.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [RouterOutlet, CommonModule],
})
export class HeaderComponent {
  constructor(
    public router: Router,
    public registerProgressService: RegisterProgressService,
  ) {}
}

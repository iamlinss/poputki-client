import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from './components/header/header.component';
import {UserService} from './common/services/user.service';
import {LoaderService} from './common/services/loader.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, HeaderComponent, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    public userService: UserService,
    public loaderService: LoaderService,
  ) {}

  ngOnInit() {
    this.loaderService.setLoading(false);
    this.userService.updateAuth();
  }
}

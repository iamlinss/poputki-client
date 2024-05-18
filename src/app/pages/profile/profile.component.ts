import {CommonModule} from '@angular/common';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {UnsubscribeService} from '../../common/services/unsubscribe.service';
import {Router, RouterOutlet} from '@angular/router';
import {ProfileDataService} from './profile.service';
import {UserService} from '../../common/services/user.service';
import {takeUntil} from 'rxjs';
import {ProfileData} from './profile.model';
import {LoaderService} from '../../common/services/loader.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  providers: [UnsubscribeService],
})
export class ProfileComponent implements OnInit {
  profileData?: ProfileData;
  constructor(
    public router: Router,
    public profileDataService: ProfileDataService,
    public userService: UserService,
    public loaderService: LoaderService,
    private unsubscribe$: UnsubscribeService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.loaderService.setLoading(true);

    this.profileDataService
      .getUser(this.userService.userId!)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.loaderService.setLoading(false);

          this.profileData = res;
          this.cdr.detectChanges();
        },
      });
  }
}

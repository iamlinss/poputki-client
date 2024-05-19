/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import {CommonModule} from '@angular/common';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {UnsubscribeService} from '../../common/services/unsubscribe.service';
import {Router, RouterOutlet} from '@angular/router';
import {LoaderService} from '../../common/services/loader.service';
import {UserService} from '../../common/services/user.service';
import {ProfileDataService} from '../profile/profile.service';
import {takeUntil} from 'rxjs';
import {DriverTripData} from '../profile/profile.model';

@Component({
  selector: 'app-trips',
  standalone: true,
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.scss',
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  providers: [UnsubscribeService],
})
export class TripsComponent implements OnInit {
  tripStatus: boolean = false;

  tripList: DriverTripData[] = [];
  driverName: string = '';

  constructor(
    public router: Router,
    public loaderService: LoaderService,
    public userService: UserService,
    public profileService: ProfileDataService,
    private unsubscribe$: UnsubscribeService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.toggleStatus();
  }

  toggleStatus() {
    if (!this.tripStatus) {
      this.profileService
        .getUserDriverTrips(this.userService.userId!)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (res) => {
            console.log('getUserDriverTrips');
            this.tripList = res;
            console.log(res);
            this.cdr.detectChanges();
          },
        });

      this.profileService
        .getUser(this.userService.userId!)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (res) => {
            this.driverName = res.firstName + ' ' + res.lastName;
          },
        });
    } else {
      this.profileService
        .getUserPassegerTrips(this.userService.userId!)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (res) => {
            console.log('getUserPassegerTrips');
            this.tripList = res;
            console.log(res);
            this.cdr.detectChanges();
          },
        });

      this.profileService
        .getUser(this.tripList[0].userId + '')
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (res) => {
            this.driverName = res.firstName + ' ' + res.lastName;
          },
        });
    }
  }
}

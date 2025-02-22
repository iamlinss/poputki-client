/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import {CommonModule} from '@angular/common';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {UnsubscribeService} from '../../common/services/unsubscribe.service';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import {LoaderService} from '../../common/services/loader.service';
import {UserService} from '../../common/services/user.service';
import {ProfileDataService} from '../profile/profile.service';
import {takeUntil} from 'rxjs';
import {DriverTripData, PassengerData} from '../profile/profile.model';

@Component({
  selector: 'app-trips',
  standalone: true,
  templateUrl: './trips-brone.component.html',
  styleUrl: './trips-brone.component.scss',
  providers: [UnsubscribeService],
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule,],
})
export class TripsBroneComponent implements OnInit {
  isLoading = false;
  userRole: string | null = null;
  tripListPassenger: PassengerData[] = [];
  selectedTrip: DriverTripData | null = null;
  tripId: string | null = null;
  actionResult: 'approve' | 'cancel' | null = null;

  constructor(
    public router: Router,
    public loaderService: LoaderService,
    public userService: UserService,
    public profileService: ProfileDataService,
    private unsubscribe$: UnsubscribeService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {
    this.userService.role$.subscribe(role => {
      this.userRole = role;
    });
  }



  ngOnInit() {
    this.route.params.subscribe(params => {
      this.tripId = params['tripId'];
    });
    this.loadPassangers(true);
  }

  loadPassangers(isFirstCall = false) {
    isFirstCall ? this.loaderService.setLoading(true) : (this.isLoading = true);
      this.profileService
        .getTripPassengers(this.tripId!)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (res) => {
            this.tripListPassenger = res.filter(passenger => passenger.status === 'PENDING_CONFIRMATION');
            isFirstCall ? this.loaderService.setLoading(false) : (this.isLoading = false);
            this.cdr.detectChanges();
          },
        });

  }

  approveTrip(tripId: number) {
    this.profileService.changePassengerStatus(tripId, 'CONFIRMED')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {

        },
        error: (err) => {
          console.error('Ошибка при подтверждении:', err);
        }
      });
    this.actionResult = 'approve';
  }

  cancelTrip(tripId: number) {
    this.profileService.changePassengerStatus(tripId, 'REJECTED_BY_DRIVER')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {

        },
        error: (err) => {
          console.error('Ошибка при подтверждении:', err);
        }
      });
    this.actionResult = 'cancel';
  }

  leaveFeedback() {
    this.router.navigate(['trips/feedback'])
  }
}

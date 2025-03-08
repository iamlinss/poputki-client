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
import {DriverTripData, PassengerTripData} from '../profile/profile.model';
import {TripItemComponent} from './components/trip-item/trip-item.component';

@Component({
  selector: 'app-trips',
  standalone: true,
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.scss',
  providers: [UnsubscribeService],
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule, TripItemComponent],
})
export class TripsComponent implements OnInit {
  tripStatus: boolean = true;
  isLoading = false;
  userRole: string | null = null;
  tripListPassenger: PassengerTripData[] = [];
  tripListDriver: DriverTripData[] = [];
  selectedTrip: DriverTripData | null = null;

  constructor(
    public router: Router,
    public loaderService: LoaderService,
    public userService: UserService,
    public profileService: ProfileDataService,
    private unsubscribe$: UnsubscribeService,
    private cdr: ChangeDetectorRef,
  ) {
    this.userService.role$.subscribe(role => {
      this.userRole = role;
      this.tripStatus = (this.userRole === 'USER');
    });
  }



  ngOnInit() {
    this.toggleStatus(true);
  }

  transformPassengerToDriverTrip(passengerTrip: PassengerTripData): DriverTripData {
    return {
      car: passengerTrip.tripDetails.car,
      departureDateTime: passengerTrip.tripDetails.departureDateTime,
      departureLocation: passengerTrip.tripDetails.departureLocation,
      description: '',
      destinationLocation: passengerTrip.tripDetails.destinationLocation,
      id: passengerTrip.id,
      seats: passengerTrip.passengerSeats,
      status: passengerTrip.passengerStatus!,
      userId: Number(this.userService.userId!),
      driverName: passengerTrip.tripDetails.driverName,
      price: passengerTrip.tripDetails.price,
      hasPendingPassengers: false,
    };
  }

  onSelectTrip(trip: PassengerTripData | DriverTripData) {
    if ('car' in trip) {
      this.selectedTrip = trip;
    } else {
      this.selectedTrip = this.transformPassengerToDriverTrip(trip as PassengerTripData);
    }
  }

  toggleStatus(isFirstCall = false) {
    isFirstCall ? this.loaderService.setLoading(true) : (this.isLoading = true);
    if (!this.tripStatus) {
      this.profileService
        .getUserDriverTrips(this.userService.userId!)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (res) => {
            this.tripListDriver = res;
            isFirstCall ? this.loaderService.setLoading(false) : (this.isLoading = false);
            this.cdr.detectChanges();
          },
        });
    } else {
      this.profileService
        .getUserPassegerTrips(this.userService.userId!)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (res) => {
            this.tripListPassenger = res;
            isFirstCall ? this.loaderService.setLoading(false) : (this.isLoading = false);
            this.cdr.detectChanges();
          },
        });
    }
  }

  leaveFeedback() {
    this.router.navigate(['trips/feedback'])
  }
}



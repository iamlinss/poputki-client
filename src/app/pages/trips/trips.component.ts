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
import {CarData, DriverTripData} from '../profile/profile.model';
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
  tripStatus: boolean = false;
  isLoading = false;
  tripList: DriverTripData[] = [{
    car: {
      id: 1,
      brand: "круз",
      model: "200",
      color: "pink",
      plateNumber: "string",
    },
    id: 1,
    departureLocation: {
      id: 1,
      city: "minsk",
      country: "bel"
    },
    destinationLocation: {
      id: 2,
      city: "moscow",
      country: "rus"
    },
    departureDateTime: "10.10.2010",
    description: "description",
    seats: 1,
    status: {
      id: 1,
      status: "status",
    },
    driverName: "алина",
    userId: 1,
    price: 123
  },
    {
      car: {
        id: 1,
        brand: "круз",
        model: "200",
        color: "pink",
        plateNumber: "string",
      },
      id: 2,
      departureLocation: {
        id: 1,
        city: "minsk",
        country: "bel"
      },
      destinationLocation: {
        id: 2,
        city: "moscow",
        country: "rus"
      },
      departureDateTime: "10.10.2010",
      description: "description",
      seats: 1,
      status: {
        id: 4,
        status: "Поездка завершена",
      },
      driverName: "алина",
      userId: 1,
      price: 123
    },
  ];
  selectedTrip: DriverTripData | null = null;

  constructor(
    public router: Router,
    public loaderService: LoaderService,
    public userService: UserService,
    public profileService: ProfileDataService,
    private unsubscribe$: UnsubscribeService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.toggleStatus(true);
  }

  toggleStatus(isFirstCall = false) {
    isFirstCall ? this.loaderService.setLoading(true) : (this.isLoading = true);

    if (!this.tripStatus) {
      this.profileService
        .getUserDriverTrips(this.userService.userId!)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (res) => {
            // this.tripList = res;
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
            // this.tripList = res;
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

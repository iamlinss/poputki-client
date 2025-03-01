import {CommonModule} from '@angular/common';
import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {Router, RouterOutlet} from '@angular/router';
import {LoaderService} from '../../common/services/loader.service';
import {FinderBlockComponent} from '../../components/finder-block/finder-block.component';
import {CheckboxItemComponent} from '../../components/checkbox-item/checkbox-item.component';
import {ProfileDataService} from '../profile/profile.service';
import {DriverTripData} from '../profile/profile.model';
import {TimeFormatPipe} from '../../common/pipes/time.pipe';
import {CustomDatePipe} from '../../common/pipes/date.pipe';
import {Subscription} from 'rxjs';
import {TripPassengerItemComponent} from './components/trip-passenger-item/trip-passenger-item.component';

@Component({
  selector: 'app-trips-passenger',
  standalone: true,
  templateUrl: './trips-passenger.component.html',
  styleUrl: './trips-passenger.component.scss',
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    CommonModule,
    FinderBlockComponent,
    CheckboxItemComponent,
    TimeFormatPipe,
    CustomDatePipe,
    TripPassengerItemComponent,
  ],
})
export class TripsPassengerComponent implements OnInit, OnDestroy {
  public tripsList: DriverTripData[] = [];
  public selectedTrip: DriverTripData | null = null;
  public selectedStartCityId?: number;
  public selectedFinishCityId?: number;
  @ViewChild(FinderBlockComponent) finderBlockComponent!: FinderBlockComponent;
  public start = '';
  public finish = '';
  public date = '';
  public count = 1;
  subs: Subscription[] = [];
  isLoading = false;

  timeOptions = [
    {state: false, id: 1, startTime: '00:00', endTime: '05:59'},
    {state: false, id: 2, startTime: '06:00', endTime: '11:59'},
    {state: false, id: 3, startTime: '12:00', endTime: '17:59'},
    {state: false, id: 4, startTime: '18:00', endTime: '23:59'},
  ];

  constructor(
    public router: Router,
    public loaderService: LoaderService,
    public profileDataService: ProfileDataService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    const filter = JSON.parse(localStorage.getItem('filter')!);
    const filterData = filter ? {
      date: filter.date || new Date().toISOString().split('T')[0],
      seats: filter.seats || 1,
      departureLocationId: filter.selectedStartCityId,
      destinationLocationId: filter.selectedFinishCityId,
      status: 'CREATED'
  } : {
      date: new Date().toISOString().split('T')[0],
      seats: filter?.seats || 1,
      departureLocationId: undefined,
      destinationLocationId: undefined,
      status: 'CREATED'
  };

  this.getTripsList(filterData);
  }

  tripBooked() {
    this.start = '';
    this.finish = '';
    this.date = '';
    this.count = 1;
    this.selectedStartCityId = undefined;
    this.selectedFinishCityId = undefined;

    this.finderBlockComponent.resetForm();

    localStorage.removeItem('filter');

    const filterData = {
        date: new Date().toISOString().split('T')[0],
        seats: 1,
        departureLocationId: undefined,
        destinationLocationId: undefined,
        status: 'CREATED'
    };

    this.getTripsList(filterData);
}


  getTripsList(filterData: any = {}) {
    this.isLoading = true;

    this.subs.push(
      this.profileDataService.getTripsList(filterData).subscribe({
        next: (res: any) => {
          this.tripsList = this.applyTimeFilter(res);
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: () => {
          this.isLoading = false;
          this.tripsList = [];
          this.cdr.detectChanges();
        }
      }),
    );
  }

  onTimeClick(id: number) {
    const option = this.timeOptions.find((option) => option.id === id);
    if (option) {
      option.state = !option.state;
    }


    const filterData = {
      date: this.date || new Date().toISOString().split('T')[0],
      seats: this.count,
      departureLocationId: this.selectedStartCityId,
      destinationLocationId: this.selectedFinishCityId,
      status: 'CREATED'
    };

    this.getTripsList(filterData);
  }


applyTimeFilter(trips: DriverTripData[]): DriverTripData[] {
  const activeTimeOptions = this.timeOptions.filter((option) => option.state);

  if (activeTimeOptions.length === 0) {
    return trips;
  }

  return trips.filter((trip) => {
    const tripDate = new Date(trip.departureDateTime);
    const tripTimeInMinutes = tripDate.getHours() * 60 + tripDate.getMinutes();

    return activeTimeOptions.some((option) => {
      const [startHour, startMinute] = option.startTime.split(':').map(Number);
      const [endHour, endMinute] = option.endTime.split(':').map(Number);
      const startTimeInMinutes = startHour * 60 + startMinute;
      const endTimeInMinutes = endHour * 60 + endMinute;

      return tripTimeInMinutes >= startTimeInMinutes && tripTimeInMinutes <= endTimeInMinutes;
    });
  });
}

  setFilter(data: any) {
    this.start = data.start;
    this.finish = data.finish;
    this.date = data.date;
    this.count = data.seats;
    this.selectedStartCityId = data.selectedStartCityId;
    this.selectedFinishCityId = data.selectedFinishCityId;

    const filterData = {
      date: this.date,
      seats: this.count,
      departureLocationId: this.selectedStartCityId,
      destinationLocationId: this.selectedFinishCityId,
      status: 'CREATED'
    };

    this.getTripsList(filterData);
  }

  ngOnDestroy() {
    this.subs.forEach((item) => item.unsubscribe());
    localStorage.removeItem('filter');
  }
}

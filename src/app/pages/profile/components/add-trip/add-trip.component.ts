import {CommonModule} from '@angular/common';
import {Component, OnInit, OnDestroy, HostListener, ElementRef} from '@angular/core';
import {ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import {Router, RouterOutlet} from '@angular/router';
import {Subscription} from 'rxjs';
import {FormService} from '../../../../common/services/form-validation.service';
import {ProgressService} from '../../../../common/services/register-progress.service';
import {CarData, CityData, TripData} from '../../profile.model';
import {ProfileDataService} from '../../profile.service';
import {UserService} from '../../../../common/services/user.service';
import {TripDataService} from '../../../../common/services/trip.service';
import {LoaderService} from '../../../../common/services/loader.service';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  templateUrl: './add-trip.component.html',
  styleUrl: './add-trip.component.scss',
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
})
export class AddTripComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  subs: Subscription[] = [];

  isCitiesListOpen = false;
  citiesList: CityData[] = [];
  carList: CarData[] = [];

  passengerCount: number = 1;
  selectedStartCityId?: number;
  selectedFinishCityId?: number;

  constructor(
    public ProgressService: ProgressService,
    public profileDataService: ProfileDataService,
    public tripDataService: TripDataService,
    public router: Router,
    public formService: FormService,
    public userService: UserService,
    public loaderService: LoaderService,
    private el: ElementRef,
  ) {}

  ngOnInit() {
    this.loaderService.setLoading(true);

    this.subs.push(
      this.tripDataService.getCitiesList().subscribe({
        next: (res) => {
          this.citiesList = res;
          this.loaderService.setLoading(false);
        },
      }),
    );

    this.subs.push(
      this.profileDataService.getUser(this.userService.userId!).subscribe({
        next: (res) => {
          this.loaderService.setLoading(false);
          this.carList = res.cars;
        },
      }),
    );

    this.initForm();
    this.ProgressService.addTripProgress = 'car';
  }

  initForm() {
    this.form = new FormGroup({
      car: new FormControl('', [Validators.required]),
      start: new FormControl('', [Validators.required]),
      finish: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      comment: new FormControl(''),
    });
  }

  selectCity(city: CityData, state: 'start' | 'finish') {
    if (state === 'start') {
      this.form.get('start')?.setValue(city.city + ', ' + city.country);
      this.selectedStartCityId = city.id;
    } else {
      this.form.get('finish')?.setValue(city.city + ', ' + city.country);
      this.selectedFinishCityId = city.id;
    }
    this.isCitiesListOpen = false;
  }

  back() {
    switch (this.ProgressService.addTripProgress) {
      case 'car':
        this.router.navigate(['/']);
        break;
      case 'start':
        this.ProgressService.addTripProgress = 'car';
        break;
      case 'finish':
        this.ProgressService.addTripProgress = 'start';
        break;
      case 'date':
        this.ProgressService.addTripProgress = 'finish';
        break;
      case 'time':
        this.ProgressService.addTripProgress = 'date';
        break;
      case 'price':
        this.ProgressService.addTripProgress = 'time';
        break;
      case 'comment':
        this.ProgressService.addTripProgress = 'price';
        break;
      case 'details':
        this.ProgressService.addTripProgress = 'comment';
        break;
    }
  }

  next() {
    switch (this.ProgressService.addTripProgress) {
      case 'car':
        if (this.form.get('car')?.valid) {
          this.ProgressService.addTripProgress = 'start';
        } else {
          this.form.get('car')?.markAsTouched();
        }
        break;
      case 'start':
        if (this.form.get('start')?.valid) {
          this.ProgressService.addTripProgress = 'finish';
        } else {
          this.form.get('start')?.markAsTouched();
        }
        break;
      case 'finish':
        if (this.form.get('finish')?.valid) {
          this.ProgressService.addTripProgress = 'date';
        } else {
          this.form.get('finish')?.markAsTouched();
        }
        break;
      case 'date':
        if (this.form.get('date')?.valid) {
          this.ProgressService.addTripProgress = 'time';
        } else {
          this.form.get('date')?.markAsTouched();
        }
        break;
      case 'time':
        if (this.form.get('time')?.valid) {
          this.ProgressService.addTripProgress = 'price';
        } else {
          this.form.get('time')?.markAsTouched();
        }
        break;
      case 'price':
        if (this.form.get('price')?.valid) {
          this.ProgressService.addTripProgress = 'comment';
        } else {
          this.form.get('price')?.markAsTouched();
        }
        break;
      case 'comment':
        if (this.form.get('comment')?.valid) {
          this.ProgressService.addTripProgress = 'details';
        } else {
          this.form.get('comment')?.markAsTouched();
        }
        break;
      case 'details':
        this.addTrip();
        break;
    }
  }

  addTrip() {
    const data: TripData = {
      departureLocationId: this.selectedStartCityId!,
      destinationLocationId: this.selectedFinishCityId!,
      departureDateTime: this.form.get('date')?.value + 'T' + this.form.get('time')?.value,
      description: this.form.get('comment')?.value,
      seats: this.passengerCount,
      userId: this.userService.userId!,
      // eslint-disable-next-line no-unsafe-optional-chaining
      carId: (this.form.get('car')?.value).id,
    };

    this.loaderService.setLoading(true);

    this.subs.push(
      this.profileDataService.addTrip(data).subscribe({
        complete: () => {
          this.loaderService.setLoading(false);
          this.ProgressService.addTripProgress = 'success';
        },
      }),
    );
  }

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.isCitiesListOpen = false;
    }
  }

  ngOnDestroy() {
    this.loaderService.setLoading(false);
    this.ProgressService.addTripProgress = null;
    this.subs.forEach((item) => item.unsubscribe());
  }
}

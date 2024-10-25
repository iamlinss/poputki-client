import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Router, RouterOutlet} from '@angular/router';
import {CityData} from '../../pages/profile/profile.model';
import {TripDataService} from '../../common/services/trip.service';
import {LoaderService} from '../../common/services/loader.service';
import {CommonModule} from '@angular/common';
import {UnsubscribeService} from '../../common/services/unsubscribe.service';
import {takeUntil} from 'rxjs';

@Component({
  selector: 'app-finder-block',
  standalone: true,
  templateUrl: './finder-block.component.html',
  styleUrl: './finder-block.component.scss',
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  providers: [UnsubscribeService],
})
export class FinderBlockComponent implements OnInit {
  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
  @Input() isStartPage: boolean = false;

  passengerCount: number = 1;
  form!: FormGroup;
  citiesList: CityData[] = [];
  isCitiesListOpen1 = false;
  isCitiesListOpen2 = false;
  selectedStartCityId?: number;
  selectedFinishCityId?: number;

  constructor(
    public tripDataService: TripDataService,
    public loaderService: LoaderService,
    private el: ElementRef,
    private route: Router,
    private unsubscribe$: UnsubscribeService,
  ) {}

  ngOnInit() {
    this.initForm();
    this.loadCitiesList();
  }

  loadCitiesList() {
    this.loaderService.setLoading(true);
    this.tripDataService
      .getCitiesList()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res) => {
          this.citiesList = res;
          this.loaderService.setLoading(false);
        },
      });
  }

  initForm() {
    this.form = new FormGroup({
      start: new FormControl(''),
      finish: new FormControl(''),
      date: new FormControl(''),
    });

    if (!this.isStartPage) {
      this.pathForm();
    }
  }

  pathForm() {
    const filter = JSON.parse(localStorage.getItem('filter')!);
    if (filter) {
      this.form.patchValue({
        start: filter.start,
        finish: filter.finish,
        date: filter.date,
      });

      this.selectedStartCityId = filter.selectedStartCityId;
      this.selectedFinishCityId = filter.selectedFinishCityId;

      this.passengerCount = filter.seats;
    }
  }

  selectCity(city: CityData, state: 'start' | 'finish') {
    if (state === 'start') {
      this.form.get('start')?.setValue(city.city + ', ' + city.country);
      this.selectedStartCityId = city.id;
    } else {
      this.form.get('finish')?.setValue(city.city + ', ' + city.country);
      this.selectedFinishCityId = city.id;
    }
    this.isCitiesListOpen1 = false;
    this.isCitiesListOpen2 = false;
  }

  sendForm() {
    const data = {
      start: this.form.get('start')?.value,
      finish: this.form.get('finish')?.value,
      date: this.form.get('date')?.value,
      seats: this.passengerCount,
      selectedStartCityId: this.selectedStartCityId,
      selectedFinishCityId: this.selectedFinishCityId,
    };

    if (this.isStartPage) {
      localStorage.setItem('filter', JSON.stringify(data));
      this.route.navigate(['/trips-passenger']);
    }

    this.submitForm.emit(data);
  }

  revertCoordinates() {
    const tmp = this.form.get("start")?.value;
    this.form.get("start")?.setValue(this.form.get("finish")?.value);
    this.form.get("finish")?.setValue(tmp);
  }


  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.isCitiesListOpen1 = false;
      this.isCitiesListOpen2 = false;
    }
  }
}

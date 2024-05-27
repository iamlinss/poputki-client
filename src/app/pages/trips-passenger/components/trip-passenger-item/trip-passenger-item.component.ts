import {CommonModule} from '@angular/common';
import {
  Component,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterOutlet} from '@angular/router';
import {DriverTripData} from '../../../profile/profile.model';
import {TimeFormatPipe} from '../../../../common/pipes/time.pipe';
import {ProfileDataService} from '../../../profile/profile.service';
import {UserService} from '../../../../common/services/user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-trip-passenger-item',
  standalone: true,
  templateUrl: './trip-passenger-item.component.html',
  styleUrl: './trip-passenger-item.component.scss',
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule, TimeFormatPipe],
})
export class TripPassengerItemComponent implements OnChanges, OnDestroy {
  status: 'data' | 'reserved' = 'data';
  subs: Subscription[] = [];
  @Input() selectedTrip: DriverTripData | null = null;
  @Input() count: string = '1';
  @Output() closedEvent: EventEmitter<void> = new EventEmitter();

  constructor(
    public profileDataService: ProfileDataService,
    public userService: UserService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['count']) {
      this.count = changes['count'].currentValue;
    }
  }

  toggleStatus(status: 'data' | 'reserved') {
    if (status === 'reserved') {
      const data = {
        tripId: this.selectedTrip?.id,
        userId: this.userService.userId,
        seats: this.count,
      };

      this.subs.push(
        this.profileDataService.broneTrip(data).subscribe({
          next: () => {
            this.status = status;
            this.cdr.detectChanges();
          },
        }),
      );
    }
  }

  close() {
    this.closedEvent.emit();
    setTimeout(() => {
      this.status = 'data';
    }, 500);
  }

  ngOnDestroy(): void {
    this.subs.forEach((item) => item.unsubscribe());
  }
}

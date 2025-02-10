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
  userRole: string | null = null;
  @Input() selectedTrip: DriverTripData | null = null;
  @Input() count: number = 1;
  @Output() closedEvent: EventEmitter<void> = new EventEmitter();
  @Output() tripBooked: EventEmitter<void> = new EventEmitter();

  passengerCount: number = 1;
  constructor(
    public profileDataService: ProfileDataService,
    public userService: UserService,
    private cdr: ChangeDetectorRef,
  ) {
    this.userService.role$.subscribe(role => {
      this.userRole = role;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['count']) {
      this.count = changes['count'].currentValue;
    }
  }

  increasePassengerCount() {
    if (this.count < (this.selectedTrip?.seats || 0)) {
      this.count++;
    }
  }

  decreasePassengerCount() {
    if (this.count > 1) {
      this.count--;
    }
  }

  toggleStatus(status: 'data' | 'reserved') {
    if (status === 'reserved') {
      const data = {
        tripId: this.selectedTrip?.id,
        userId: this.userService.userId,
        seats: this.count,
        status: 'PENDING_CONFIRMATION'
      };

      this.subs.push(
        this.profileDataService.broneTrip(data).subscribe({
          next: () => {
            this.status = status;
            this.count = 1;
            this.tripBooked.emit();
            this.cdr.detectChanges();
          },
          error: ()=>{
            this.close()
          }
        }),
      );
    }
  }



  close() {
    this.closedEvent.emit();
    this.count = 1;
    setTimeout(() => {
      this.status = 'data';
    }, 500);
  }

  ngOnDestroy(): void {
    this.subs.forEach((item) => item.unsubscribe());
  }
}

import {CommonModule} from '@angular/common';
import {Component, Output, EventEmitter, Input} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterOutlet} from '@angular/router';
import {DriverTripData,} from '../../../profile/profile.model';
import {TimeFormatPipe} from '../../../../common/pipes/time.pipe';
import { ProfileDataService } from '../../../profile/profile.service';
import { takeUntil } from 'rxjs';
import { UnsubscribeService } from '../../../../common/services/unsubscribe.service';
import { UserService } from '../../../../common/services/user.service';

@Component({
  selector: 'app-trip-item',
  standalone: true,
  templateUrl: './trip-item.component.html',
  styleUrl: './trip-item.component.scss',
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule, TimeFormatPipe],
})
export class TripItemComponent {
  status: 'data' | 'decline' | 'decline-success'|'decline-success-driver'|'complete-success' = 'data';
  selectedReason: number = 0;
  error = false;
  userRole: string | null = null;

  @Input() tripStatus: boolean = false;
  @Input() selectedTrip: DriverTripData | null = null;
  @Output() closedEvent: EventEmitter<void> = new EventEmitter();
  @Output() tripCancelled: EventEmitter<void> = new EventEmitter();



  constructor(
    private profileService: ProfileDataService,
    private unsubscribe$: UnsubscribeService,
    public userService: UserService,
  ) {
    this.userService.role$.subscribe(role => {
      this.userRole = role;
      this.tripStatus = (this.userRole === 'USER');
    });
  }

  toggleStatus(status: 'data' | 'decline' | 'decline-success' | 'decline-success-driver'|'complete-success') {
    if ((status === 'decline-success' || status === 'decline-success-driver') && !this.selectedReason) {
      this.error = true;
    } else if(status === 'decline-success' && this.selectedReason){
      this.error = false;
      const tripId = this.selectedTrip!.id;
      this.status = status;
      this.profileService.changePassengerStatus(tripId, 'CANCELLED_BY_PASSENGER')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.tripCancelled.emit();
        },
      });
    }
    else if(status === 'decline-success-driver' && this.selectedReason){
      this.error = false;
      const tripId = this.selectedTrip!.id;
      this.status = 'decline-success';
      this.profileService.changeTripStatus(tripId, 'CANCELLED')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.tripCancelled.emit();
        },
      });

    }
    else if(status === 'complete-success'){
      this.error = false;
      const tripId = this.selectedTrip!.id;
      this.status = status;
      this.profileService.changeTripStatus(tripId, 'COMPLETED')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.tripCancelled.emit();
        },
      });
      this.close();
    }
    else{
      this.error = false;
      this.status = status;
    }
  }

  close() {
    this.closedEvent.emit();
    setTimeout(() => {
      this.status = 'data';
      this.selectedReason = 0;
      this.error = false;
    }, 1000);
  }
}

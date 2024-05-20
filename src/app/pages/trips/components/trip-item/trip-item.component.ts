import {CommonModule} from '@angular/common';
import {Component, Output, EventEmitter, Input} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterOutlet} from '@angular/router';
import {DriverTripData} from '../../../profile/profile.model';

@Component({
  selector: 'app-trip-item',
  standalone: true,
  templateUrl: './trip-item.component.html',
  styleUrl: './trip-item.component.scss',
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
})
export class TripItemComponent {
  status: 'data' | 'decline' | 'decline-success' = 'data';
  selectedReason: number = 0;
  error = false;

  @Input() tripStatus: boolean = false;
  @Input() selectedTrip: DriverTripData | null = null;
  @Output() closedEvent: EventEmitter<void> = new EventEmitter();

  toggleStatus(status: 'data' | 'decline' | 'decline-success') {
    if (status === 'decline-success' && !this.selectedReason) {
      this.error = true;
    } else {
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

import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {UnsubscribeService} from '../../common/services/unsubscribe.service';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  providers: [UnsubscribeService],
})
export class ProfileComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}

import { Component } from '@angular/core';
import {DatePipe, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [
    DatePipe,
    NgIf,
    RouterLink
  ],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss'
})
export class FeedbackComponent {
  public tripDate = new Date();
public rating:null|number=null;
  mark(value:number) {
    if (this.rating===value) this.rating=null;
    else this.rating = value;
    console.log(this.rating)
  }
}

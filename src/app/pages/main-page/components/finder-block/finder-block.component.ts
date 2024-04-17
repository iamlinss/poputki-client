import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-finder-block',
  standalone: true,
  templateUrl: './finder-block.component.html',
  styleUrl: './finder-block.component.scss',
  imports: [RouterOutlet],
})
export class FinderBlockComponent {
  passengerCount: number = 1;

  sendForm() {
    console.log(this.passengerCount);
  }
}

import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-ways-block',
  standalone: true,
  templateUrl: './ways-block.component.html',
  styleUrl: './ways-block.component.scss',
  imports: [RouterOutlet],
})
export class WaysBlockComponent {}

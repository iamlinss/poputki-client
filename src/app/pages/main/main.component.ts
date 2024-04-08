import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  imports: [RouterOutlet],
})
export class MainComponent implements OnInit {
  ngOnInit(): void {
    console.log('tes');
  }
}

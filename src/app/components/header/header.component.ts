import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [RouterOutlet],
})
export class HeaderComponent implements OnInit {
  ngOnInit(): void {
    console.log('tes');
  }
}

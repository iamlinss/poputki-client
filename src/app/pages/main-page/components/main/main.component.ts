import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FinderBlockComponent} from '../finder-block/finder-block.component';

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  imports: [RouterOutlet, FinderBlockComponent],
})
export class MainComponent {}

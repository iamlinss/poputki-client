import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {FinderBlockComponent} from '../../../../components/finder-block/finder-block.component';
import {LoaderService} from '../../../../common/services/loader.service';

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  imports: [RouterOutlet, FinderBlockComponent],
})
export class MainComponent implements OnInit {
  constructor(
    public router: Router,
    public loaderService: LoaderService,
  ) {}

  ngOnInit() {
    this.loaderService.setLoading(true);

    setTimeout(() => {
      this.loaderService.setLoading(false);
    }, 1000);
  }
}

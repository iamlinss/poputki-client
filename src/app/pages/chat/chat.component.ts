import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {UnsubscribeService} from '../../common/services/unsubscribe.service';
import {Router, RouterOutlet} from '@angular/router';
import {LoaderService} from '../../common/services/loader.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  providers: [UnsubscribeService],
})
export class ChatComponent implements OnInit {
  constructor(
    public router: Router,
    public loaderService: LoaderService,
  ) {}

  ngOnInit() {
    this.loaderService.setLoading(true);

    setTimeout(() => {
      this.loaderService.setLoading(false);
    }, 1500);
  }
}

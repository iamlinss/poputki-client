import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ProfileDataService } from '../profile/profile.service';
import { UnsubscribeService } from '../../common/services/unsubscribe.service';

@Component({
  selector: 'app-reviews',
  standalone: true,
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
  providers: [UnsubscribeService],
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule],
})
export class ReviewsComponent implements OnInit {
  form!: FormGroup;
  rating: number = 0;
  stars = Array(5).fill(0);
  passengerId: number | null = null;
  successMessage: boolean = false;

  constructor(
    private profileDataService: ProfileDataService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      comment: new FormControl('', [Validators.required]),
    });
    this.route.paramMap.subscribe(params => {
      const id = params.get('passangerId');
      this.passengerId = id ? +id : null;
    });
  }

  setRating(star: number) {
    if (this.rating === star) {
      this.rating = 0;
    } else {
      this.rating = star;
    }
  }

  submitReview() {
    if (this.form.valid && this.rating > 0 && this.passengerId !== null) {
      const reviewData = {
        rating: this.rating,
        comment: this.form.get('comment')?.value,
      };

      this.profileDataService.addReview(this.passengerId, reviewData).subscribe({
        next: () => {
          this.form.reset();
          this.rating = 0;

        },
      });
      this.successMessage = true;
      setTimeout(() => {
        this.router.navigate(['/trips']);
      }, 1500);
    } else {
      this.form.markAllAsTouched();
    }
  }
}

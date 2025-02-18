import {CommonModule} from '@angular/common';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {UnsubscribeService} from '../../common/services/unsubscribe.service';
import {Router, RouterOutlet} from '@angular/router';
import {ProfileDataService} from './profile.service';
import {UserService} from '../../common/services/user.service';
import {takeUntil} from 'rxjs';
import {ProfileData} from './profile.model';
import {LoaderService} from '../../common/services/loader.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  providers: [UnsubscribeService],
})
export class ProfileComponent implements OnInit {
  profileData?: ProfileData;
  userRole: string | null = null;
  constructor(
    public router: Router,
    public profileDataService: ProfileDataService,
    public userService: UserService,
    public loaderService: LoaderService,
    private unsubscribe$: UnsubscribeService,
    private cdr: ChangeDetectorRef,
  ) {
    this.userService.role$.subscribe(role => {
      this.userRole = role;
    });
  }

  deleteCar(carId: number | undefined) {
    if (confirm("Вы уверены, что хотите удалить этот автомобиль?")) {
      this.profileDataService.deleteCar(carId)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: () => {
            if (this.profileData?.cars) {
              this.profileData.cars = this.profileData.cars.filter(car => car.id !== carId);
              this.cdr.detectChanges();
            }
          },
          error: (err) => {
            console.error("Ошибка при удалении автомобиля:", err);
          }
        });
    }
  }

  ngOnInit() {
    this.loaderService.setLoading(true);

    this.profileDataService
      .getUser(this.userService.userId!)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res) => {
          this.loaderService.setLoading(false);

          this.profileData = res;
          this.cdr.detectChanges();
        },
      });
  }
}

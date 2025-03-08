import {CommonModule} from '@angular/common';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {UnsubscribeService} from '../../common/services/unsubscribe.service';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import {ProfileDataService} from './profile.service';
import {UserService} from '../../common/services/user.service';
import {switchMap, takeUntil} from 'rxjs';
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
  isCurrentUserProfile: boolean = false;
  constructor(
    public router: Router,

    private route: ActivatedRoute,
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
    const currentUserId = this.userService.userId;

    // Подписываемся на изменения параметров маршрута
    this.route.paramMap
      .pipe(
        takeUntil(this.unsubscribe$),
        switchMap(paramMap => {
          const profileId = paramMap.get('profileId');
          this.isCurrentUserProfile = (currentUserId === profileId);
          return this.profileDataService.getUser(profileId);
        })
      )
      .subscribe({
        next: (res) => {
          this.loaderService.setLoading(false);
          this.profileData = res;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error("Ошибка при загрузке профиля:", err);
          this.loaderService.setLoading(false);
        }
      });
  }
}

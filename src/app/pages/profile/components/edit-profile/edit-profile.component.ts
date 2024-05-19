import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterOutlet} from '@angular/router';
import {UnsubscribeService} from '../../../../common/services/unsubscribe.service';
import {EditProfileData} from '../../profile.model';
import {LoaderService} from '../../../../common/services/loader.service';
import {ProfileDataService} from '../../profile.service';
import {takeUntil} from 'rxjs';
import {UserService} from '../../../../common/services/user.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  providers: [UnsubscribeService],
})
export class EditProfileComponent implements OnInit {
  form!: FormGroup;

  constructor(
    public router: Router,
    public loaderService: LoaderService,
    public profileDataService: ProfileDataService,
    private unsubscribe$: UnsubscribeService,
    public userService: UserService,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      desc: new FormControl('', [Validators.required]),
    });

    this.loaderService.setLoading(true);

    this.profileDataService
      .getUser(this.userService.userId!)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res) => {
          this.form.get('name')?.setValue(res.firstName),
            this.form.get('surname')?.setValue(res.lastName),
            this.form.get('date')?.setValue(res.birthDate),
            this.form.get('phone')?.setValue(res.phone),
            this.form.get('desc')?.setValue(res.description),
            this.loaderService.setLoading(false);
        },
      });
  }

  editProfile() {
    if (this.form.valid) {
      const data: EditProfileData = {
        firstName: this.form.get('name')?.value,
        lastName: this.form.get('surname')?.value,
        birthDate: this.form.get('date')?.value,
        phone: this.form.get('phone')?.value,
        description: this.form.get('desc')?.value,
      };

      this.loaderService.setLoading(true);
      this.profileDataService
        .editProfile(this.userService.userId!, data)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: () => {
            this.loaderService.setLoading(false);
            this.router.navigate(['/profile']);
          },
        });
    } else {
      this.form.markAllAsTouched();
    }
  }
}

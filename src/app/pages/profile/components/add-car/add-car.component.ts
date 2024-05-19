import {CommonModule} from '@angular/common';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import {Router, RouterOutlet} from '@angular/router';
import {Subscription} from 'rxjs';
import {FormService} from '../../../../common/services/form-validation.service';
import {ProgressService} from '../../../../common/services/register-progress.service';
import {CarData} from '../../profile.model';
import {ProfileDataService} from '../../profile.service';
import {UserService} from '../../../../common/services/user.service';
import {LoaderService} from '../../../../common/services/loader.service';

@Component({
  selector: 'app-add-car',
  standalone: true,
  templateUrl: './add-car.component.html',
  styleUrl: './add-car.component.scss',
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
})
export class AddCarComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  subs: Subscription[] = [];
  isLoading = false;

  isEmailUniqe: boolean = true;

  constructor(
    public ProgressService: ProgressService,
    public profileDataService: ProfileDataService,
    public loaderService: LoaderService,
    public router: Router,
    public formService: FormService,
    public userService: UserService,
  ) {}

  ngOnInit() {
    this.initForm();
    this.ProgressService.addCarProgress = 'registration';
  }

  initForm() {
    this.form = new FormGroup({
      regNumber: new FormControl('', [Validators.required]),
      brand: new FormControl('', [Validators.required]),
      model: new FormControl('', [Validators.required]),
      color: new FormControl('', [Validators.required]),
    });
  }

  back() {
    switch (this.ProgressService.addCarProgress) {
      case 'registration':
        this.router.navigate(['/profile']);
        break;
      case 'brand':
        this.ProgressService.addCarProgress = 'registration';
        break;
      case 'model':
        this.ProgressService.addCarProgress = 'brand';
        break;
      case 'color':
        this.ProgressService.addCarProgress = 'model';
        break;
    }
  }

  next() {
    switch (this.ProgressService.addCarProgress) {
      case 'registration':
        if (this.form.get('regNumber')?.valid) {
          this.ProgressService.addCarProgress = 'brand';
        } else {
          this.form.get('regNumber')?.markAsTouched();
        }
        break;
      case 'brand':
        if (this.form.get('brand')?.valid) {
          this.ProgressService.addCarProgress = 'model';
        } else {
          this.form.get('brand')?.markAsTouched();
        }
        break;
      case 'model':
        if (this.form.get('model')?.valid) {
          this.ProgressService.addCarProgress = 'color';
        } else {
          this.form.get('model')?.markAsTouched();
        }
        break;
      case 'color':
        if (this.form.get('color')?.valid) {
          this.addCar();
        } else {
          this.form.get('color')?.markAsTouched();
        }
        break;
    }
  }

  selectGender(gender: string) {
    this.form.patchValue({
      gender: gender,
    });
  }

  addCar() {
    const data: CarData = {
      brand: this.form.get('brand')?.value,
      model: this.form.get('model')?.value,
      color: this.form.get('color')?.value,
      plateNumber: this.form.get('regNumber')?.value,
    };

    this.loaderService.setLoading(true);

    this.subs.push(
      this.profileDataService.addCar(this.userService.userId!, data).subscribe({
        next: () => {
          this.loaderService.setLoading(false);
          this.ProgressService.addCarProgress = 'success';
        },
      }),
    );
  }

  ngOnDestroy() {
    this.ProgressService.addCarProgress = null;
    this.subs.forEach((item) => item.unsubscribe());
  }
}

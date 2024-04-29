import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import {Router, RouterOutlet} from '@angular/router';
import {FormService} from '../../../../common/services/form-validation.service';
import {AuthDataService} from '../../auth.service';
import {CommonModule} from '@angular/common';
import {RegisterProgressService} from '../../../../common/services/register-progress.service';
import {RegisterData} from '../../auth.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-registration',
  standalone: true,
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  subs: Subscription[] = [];

  isEmailUniqe: boolean = true;

  constructor(
    private authDataService: AuthDataService,
    public registerProgressService: RegisterProgressService,
    public router: Router,
    public formService: FormService,
  ) {}

  ngOnInit() {
    this.initForm();
    this.registerProgressService.progressState = 'email';
  }

  initForm() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      birthDate: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  back() {
    switch (this.registerProgressService.progressState) {
      case 'info':
        this.registerProgressService.progressState = 'email';
        break;
      case 'gender':
        this.registerProgressService.progressState = 'info';
        break;
      case 'password':
        this.registerProgressService.progressState = 'gender';
        break;
    }
  }

  next() {
    switch (this.registerProgressService.progressState) {
      case 'email':
        if (this.form.get('email')?.valid) {
          this.subs.push(
            this.authDataService.checkEmail(this.form.get('email')?.value).subscribe({
              error: (res) => {
                if (res.status === 302) {
                  this.isEmailUniqe = false;
                } else {
                  this.isEmailUniqe = true;
                  this.registerProgressService.progressState = 'info';
                }
              },
            }),
          );
        } else {
          this.form.get('email')?.markAsTouched();
        }
        break;
      case 'info':
        if (
          this.form.get('firstName')?.valid &&
          this.form.get('lastName')?.valid &&
          this.form.get('birthDate')?.valid
        ) {
          this.registerProgressService.progressState = 'gender';
        } else {
          this.form.get('firstName')?.markAsTouched();
          this.form.get('lastName')?.markAsTouched();
          this.form.get('birthDate')?.markAsTouched();
        }
        break;
      case 'gender':
        if (this.form.get('gender')?.valid) {
          this.registerProgressService.progressState = 'password';
        } else {
          this.form.get('gender')?.markAsTouched();
        }
        break;
      case 'password':
        if (this.form.get('password')?.valid) {
          this.register();
        } else {
          this.form.get('password')?.markAsTouched();
        }
        break;
    }
  }

  selectGender(gender: string) {
    this.form.patchValue({
      gender: gender,
    });
  }

  register() {
    const data: RegisterData = {
      firstName: this.form.get('firstName')?.value,
      lastName: this.form.get('lastName')?.value,
      email: this.form.get('email')?.value,
      birthDate: this.form.get('birthDate')?.value,
      gender: this.form.get('gender')?.value,
      password: this.form.get('password')?.value,
    };

    this.subs.push(
      this.authDataService.register(data).subscribe({
        next: () => {
          this.registerProgressService.progressState = 'success';
        },
      }),
    );
  }

  ngOnDestroy() {
    this.registerProgressService.progressState = null;
    this.subs.forEach((item) => item.unsubscribe());
  }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import {Router, RouterOutlet} from '@angular/router';
import {FormService} from '../../../../common/form-validation.service';
import {UnsubscribeService} from '../../../../common/unsubscribe.service';
import {AuthDataService} from '../../auth.service';
import {CommonModule} from '@angular/common';
import {RegisterProgressService} from '../../../../common/register-progress.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  providers: [UnsubscribeService],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  form!: FormGroup;

  constructor(
    private authDataService: AuthDataService,
    private unsubscribe$: UnsubscribeService,
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
      gender: new FormControl('', [Validators.required]), // m f n
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
        this.registerProgressService.progressState = 'info';
        break;
      case 'info':
        this.registerProgressService.progressState = 'gender';
        break;
      case 'gender':
        this.registerProgressService.progressState = 'password';
        break;
      case 'password':
        this.login();
        break;
    }
  }

  login() {
    console.log(this.form);
    // if (this.form.valid) {
    //   const data: AuthData = {
    //     email: this.form.get('login')?.value,
    //     password: this.form.get('password')?.value,
    //   };
    //   this.authDataService.login(data).pipe(takeUntil(this.unsubscribe$)).subscribe();
    // } else {
    //   this.form.markAllAsTouched();
    // }
  }

  ngOnDestroy() {
    this.registerProgressService.progressState = null;
  }
}

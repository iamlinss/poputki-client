import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterOutlet} from '@angular/router';
import {AuthDataService} from '../../auth.service';
import {CommonModule} from '@angular/common';
import {FormService} from '../../../../common/services/form-validation.service';
import {AuthData} from '../../auth.model';
import {UnsubscribeService} from '../../../../common/services/unsubscribe.service';
import {takeUntil} from 'rxjs';
import {UserService} from '../../../../common/services/user.service';
import {LoaderService} from '../../../../common/services/loader.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  providers: [UnsubscribeService],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private authDataService: AuthDataService,
    private unsubscribe$: UnsubscribeService,
    public router: Router,
    public formService: FormService,
    public userService: UserService,
    public loaderService: LoaderService,
  ) {}

  ngOnInit() {
    this.initForm();
    this.onFormChanges();
  }

  initForm() {
    this.form = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }
  onFormChanges() {
    this.form.valueChanges.subscribe(() => {
      this.errorMessage = null;
    });
  }

  login() {
    this.errorMessage = null;
    if (this.form.valid) {
      const data: AuthData = {
        email: this.form.get('login')?.value,
        password: this.form.get('password')?.value,
      };
      this.loaderService.setLoading(true);
      this.authDataService
        .login(data)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (res) => {
            this.loaderService.setLoading(false);
            localStorage.setItem('token', res.token);
            this.userService.updateAuth();
            this.router.navigate(['/']);
          },
          error: (err) => {
            this.loaderService.setLoading(false);
            console.error('Login error:', err);
            this.errorMessage = 'Неверная почта или пароль. Попробуйте еще раз.';
        }
        });
    } else {
      this.form.markAllAsTouched();
    }
  }
}

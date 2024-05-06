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

  constructor(
    private authDataService: AuthDataService,
    private unsubscribe$: UnsubscribeService,
    public router: Router,
    public formService: FormService,
    public userService: UserService,
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      login: new FormControl('leonov@mail.com', [Validators.required, Validators.email]),
      password: new FormControl('leonov', [Validators.required]),
    });
  }

  login() {
    if (this.form.valid) {
      const data: AuthData = {
        email: this.form.get('login')?.value,
        password: this.form.get('password')?.value,
      };
      this.authDataService
        .login(data)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (res) => {
            sessionStorage.setItem('token', JSON.stringify(res));
            this.userService.updateAuth();
            this.router.navigate(['/']);
          },
        });
    } else {
      this.form.markAllAsTouched();
    }
  }
}

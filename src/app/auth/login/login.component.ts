import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Login } from '../../appStore/app.actions';
import { AuthInputData } from '../../appStore/app-state.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  emailControl: AbstractControl;
  passwordControl: AbstractControl;
  disabledSubmit = true;

  constructor(private fb: FormBuilder, private store: Store, private router: Router) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group(
      {
        email: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.minLength(5), Validators.required]]
      },
      { updateOn: 'blur' }
    );
    this.emailControl = this.loginForm.controls.email;
    this.passwordControl = this.loginForm.controls.password;
    this.onChanges();
  }

  onChanges(): void {
    this.loginForm.valueChanges.subscribe(val => {
      this.loginForm.valid ? (this.disabledSubmit = false) : (this.disabledSubmit = true);
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }

    const loginInfo: AuthInputData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
    this.store.dispatch(new Login(loginInfo));
  }
}

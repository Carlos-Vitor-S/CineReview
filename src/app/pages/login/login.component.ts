import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../interfaces/user';
import { FirebaseService } from '../../../services/firebase.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { IconFieldModule } from 'primeng/iconfield';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    IconFieldModule,
    CommonModule,
    RouterLink,
    CheckboxModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginComponent {
  formGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit() {}

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  formSubmit() {
    this.formGroup.reset;
    if (this.formGroup.valid) {
      let userData: User = Object.assign({} as User, this.formGroup.value);
      console.log(userData);
      this.loginWithEmail(userData);
      this.router.navigate(['']);
    } else {
      console.log('erro');
    }
  }
  //login with email and password
  loginWithEmail(userData: User) {
    this.firebaseService.loginWithEmail(userData.email, userData.password);
  }
}

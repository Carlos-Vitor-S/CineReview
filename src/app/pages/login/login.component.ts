import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../interfaces/user';
import { FirebaseService } from '../../../services/firebase.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  formGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit() {
    this.firebaseService.getUser();
  }

  constructor(private firebaseService: FirebaseService) {}

  formSubmit() {
    this.formGroup.reset;
    if (this.formGroup.valid) {
      let userData: User = Object.assign({} as User, this.formGroup.value);
      console.log(userData);
      this.loginWithEmail(userData);

      console.log('logou');
    } else {
      console.log('erro');
    }
  }

  loginWithEmail(userData: User) {
    this.firebaseService.loginWithEmail(userData.email, userData.password);
  }
}

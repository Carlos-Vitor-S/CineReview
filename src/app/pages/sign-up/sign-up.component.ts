import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FirebaseService } from '../../../services/firebase.service';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [InputTextModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  constructor(private firebaseService: FirebaseService) {}
  user?: User;
  formGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit() {}

  formSubmit() {
    if (this.formGroup.valid) {
      let userData: User = Object.assign({} as User, this.formGroup.value);
      console.log(userData);
      this.registerWithEmail(userData);
      this.formGroup.reset;
    }
  }

  registerWithEmail(formData: User) {
    try {
      this.firebaseService.signUpWithEmail(formData.email, formData.password);
    } catch (error) {
      console.log('Deu erro: ', error);
    }
  }
}

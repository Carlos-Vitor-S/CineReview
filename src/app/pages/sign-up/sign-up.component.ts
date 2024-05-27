import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FirebaseService } from '../../../services/firebase.service';
import { User } from '../../../interfaces/user';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    InputTextModule,
    ReactiveFormsModule,
    CalendarModule,
    DropdownModule,
    PasswordModule,
    CommonModule,
    ButtonModule,
    FormsModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SignUpComponent {
  genres?: { genero: string }[];
  selectedGenre?: { genero: string };
  currentEmail: string = '';
  currentUser: User[] = [];
  user?: User;
  formGroup = new FormGroup({
    name: new FormControl(''),
    lastname: new FormControl(''),
    gender: new FormControl(''),
    birthday: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.genres = [
      { genero: 'Masculino' },
      { genero: 'Feminino' },
      { genero: 'Outro' },
    ];
  }

  formSubmit() {
    if (this.formGroup.valid) {
      let userData: User = Object.assign({} as User, this.formGroup.value);
      console.log(userData);
      this.registerWithEmail(userData);
      this.createUser(userData);

      this.router.navigate(['']);
      this.formGroup.reset();
    }
  }

  registerWithEmail(formData: User) {
    try {
      this.firebaseService.signUpWithEmail(formData.email, formData.password);
    } catch (error) {
      console.log('Deu erro: ', error);
    }
  }

  createUser(user: User) {
    this.firebaseService.createUserFireStore(user);
  }

  getCurrentEmail() {}

  getUser() {}
}

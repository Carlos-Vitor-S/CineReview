import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { Genre } from '../../../interfaces/genre';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

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

  user?: User;
  formGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private firebaseService: FirebaseService) {}

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

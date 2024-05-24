import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
} from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

import { HomeComponent } from './pages/home/home.component';

import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HomeComponent,
    ToolbarComponent,
    ButtonModule,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    SpinnerComponent,
    ProgressSpinnerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(
    private router: Router,
    private fireabaseService: FirebaseService
  ) {}

  ngOnInit() {}
}

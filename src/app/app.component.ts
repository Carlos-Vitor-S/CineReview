import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
export class AppComponent {
  title = 'app';

  constructor(private router: Router) {}

  ngOnInit() {}
}

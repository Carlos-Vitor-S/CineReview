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
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'app';
  loading: boolean = false;
  constructor(private router: Router) {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 2500);
  }

  ngOnInit() {
    this.getSpinnerOnRoutes();
  }

  getSpinnerOnRoutes() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.loading = false;
      }
    });
  }
}

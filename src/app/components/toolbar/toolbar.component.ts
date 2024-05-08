import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { Router } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { ProductionTypeEnum } from '../../../enums/productionsTypeEnum';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    ToolbarModule,
    ButtonModule,
    DropdownModule,
    MenubarModule,
    CommonModule,
  ],

  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ToolbarComponent {
  movieType: ProductionTypeEnum = ProductionTypeEnum.movie;
  tvType: ProductionTypeEnum = ProductionTypeEnum.tv;
  constructor(private router: Router) {}

  goToHome() {
    this.router.navigate(['']);
  }

  redirectToMovies() {
    this.router.navigate(['/productionList', this.movieType]);
  }

  redirectToTv() {
    this.router.navigate(['/productionList', this.tvType]);
  }
}

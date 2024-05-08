import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { Production } from '../../../interfaces/production';
import { Router } from '@angular/router';
import { ProductionDetailsService } from '../../../services/production-details.service';
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CardModule, CarouselModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() productions: Production[] = [];
  @Input() cardTitle?: string = '';

  constructor(
    private router: Router,
    private productionDetailsService: ProductionDetailsService
  ) {}
  //onClick event
  redirectToProduction(production: Production) {
    this.productionDetailsService.clearLocalStorage();
    this.productionDetailsService.addProduction(production);
    this.router.navigate(['/production', production.id], { fragment: 'top' });
  }
  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: '1200px',
      numVisible: 4,
      numScroll: 4,
    },
  ];
}

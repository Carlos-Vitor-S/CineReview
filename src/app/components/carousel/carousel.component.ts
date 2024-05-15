import { Component, Input } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { Production } from '../../../interfaces/production';
import { Router } from '@angular/router';
import { ProductionDetailsService } from '../../../services/production-details.service';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent {
  //@Input() poster: string = '';

  @Input() posters: Production[] = [];
  @Input() vote_average: Number = 0;

  constructor(
    private router: Router,
    private productionDetailsService: ProductionDetailsService
  ) {}

  redirectToProduction(production: Production) {
    this.productionDetailsService.clearLocalStorage();
    this.productionDetailsService.addProduction(production);

    this.router.navigate(['/production', production.id]);
  }
  //carrousel responsive options
  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 4,
      numScroll: 4,
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
  ];
}

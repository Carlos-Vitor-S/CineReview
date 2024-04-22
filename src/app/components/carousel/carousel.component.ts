import { Component, Input } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { Production } from '../../../interfaces/production';

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

  //carrousel responsive options
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
  ];
}

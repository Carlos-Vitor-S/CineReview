import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { Production } from '../../../interfaces/production';
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
  @Input() vote_average: Number = 0;
  @Input() cardTitle: string = '';
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

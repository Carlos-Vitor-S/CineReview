import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';

import { ProductionDetailsService } from '../../../services/production-details.service';

import { Casting } from '../../../interfaces/casting';
import { CarouselModule } from 'primeng/carousel';
import { ImdbService } from '../../../services/imdb.service';
import { ProductionTypeEnum } from '../../../enums/productionsTypeEnum';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
@Component({
  selector: 'app-avatar-card',
  standalone: true,
  imports: [CarouselModule, AvatarModule, AvatarGroupModule],
  templateUrl: './avatar-card.component.html',
  styleUrl: './avatar-card.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AvatarCardComponent {
  @Input() casting: Casting[] = [];
  @Input() cardTitle: string = '';

  constructor(
    private productionDetailsService: ProductionDetailsService,
    private imdbService: ImdbService
  ) {}

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
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '550px',
      numVisible: 1,
      numScroll: 1,
    },
  ];
}

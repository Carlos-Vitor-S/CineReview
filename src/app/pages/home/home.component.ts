import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { CardComponent } from '../../components/card/card.component';

import { Production } from '../../../interfaces/production';
import { register } from 'swiper/element/bundle';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { ImdbService } from '../../../services/imdb.service';
import { environment } from '../../../environments/environment.development';
import { tick } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
// register Swiper custom elements
register();
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [InputTextModule, CardComponent, CarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent {
  constructor(private imdbService: ImdbService) {}

  //Api atributes

  moviesNowPlaying: Production[] = [];

  title: string = '';
  poster_path: string = '';
  backdrop_path: string = '';
  vote_average: Number = 0;

  ngOnInit() {
    this.getNowPlaying();
  }
  //this.poster_path = `${environment.posterBaseUrl}${item.poster_path}`;

  //Get movies currently on theatres
  getNowPlaying() {
    this.imdbService.getNowPlaying().subscribe((data) => {
      data.results.slice(0, 6).map((item) => {
        this.moviesNowPlaying.push({
          title: item.title,
          overview: item.overview,
          poster_path: `${environment.posterBaseUrl}${item.poster_path}`,
          backdrop_path: `${environment.posterBaseUrl}${item.backdrop_path}`,
          vote_average: Number(item.vote_average.toFixed(1)),
        });
      });
      console.log(this.moviesNowPlaying);
    });
  }
}

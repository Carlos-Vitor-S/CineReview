import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { CardComponent } from '../../components/card/card.component';
import { Production } from '../../../interfaces/production';
import { register } from 'swiper/element/bundle';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { ImdbService } from '../../../services/imdb.service';
import { environment } from '../../../environments/environment.development';
import { TimeWindowEnum } from '../../../enums/timeWindowEnum';
import { ProductionTypeEnum } from '../../../enums/productionsTypeEnum';
import { Genre } from '../../../interfaces/genre';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { ProductionDetailsService } from '../../../services/production-details.service';
import { Recommendation } from '../../../interfaces/recommendation';
import { CommonModule } from '@angular/common';

// register Swiper custom elements
register();
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [InputTextModule, CardComponent, CarouselComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent {
  constructor(
    private imdbService: ImdbService,
    private productionDetailsService: ProductionDetailsService
  ) {}
  //Api Arrays
  sectionCategory = {
    category1: `Series Populares`,
    category2: `Filmes em Alta `,
    category3: `Recomendados`,
  };

  moviesGenresAndKeywords = {
    comedy: '35',
    based_on_true_story: '9672',
    horror: '27',
    thriller: '53',
    drama: '18',
  };

  moviesNowPlaying: Production[] = [];
  popularSeries: Production[] = [];
  trendingMovies: Production[] = [];
  trailerPlaying: Production[] = [];
  recommendations: Production[] = [];
  isRecommended: boolean = false;
  genreList?: Genre;

  youtubeLink: string = '';

  productionName: string = 'Django';

  ngOnInit() {
    this.getNowPlaying();
    this.getPopularSeries();
    this.getTrendingMovies();
    this.getRecommendations();
  }

  //Get movies currently on theatres
  getNowPlaying() {
    this.imdbService.getNowPlaying().subscribe((data) => {
      data.results.slice(0, 6).map((item) => {
        this.moviesNowPlaying.push({
          id: item.id,
          title: item.title,
          overview: item.overview,
          original_title: item.original_title,
          poster_path: `${environment.posterBaseUrl}${item.poster_path}`,
          backdrop_path: `${environment.posterBaseUrl}${item.backdrop_path}`,
          vote_average: Number(item.vote_average.toFixed(1)),
          genre_ids: item.genre_ids,
          release_date: item.release_date,
        });
      });
      console.log('Movies now Playing Theatres: ', this.moviesNowPlaying);
    });
  }

  //get most rated TV series
  getPopularSeries() {
    this.imdbService.getPopularSeries().subscribe((data) => {
      data.results.slice(0, 6).map((item) => {
        this.popularSeries.push({
          id: item.id,
          name: item.name,
          original_name: item.original_name,
          overview: item.overview,
          backdrop_path: `${environment.posterBaseUrl}${item.backdrop_path}`,
          vote_average: Number(item.vote_average.toFixed(1)),
          genre_ids: item.genre_ids,
          key: item.key,
          first_air_date: item.first_air_date,
        });
      });
      console.log('Popular series: ', this.popularSeries);
    });
  }

  //get trending movies on day or week
  getTrendingMovies() {
    this.imdbService.getTrendingMovies(TimeWindowEnum.day).subscribe((data) => {
      data.results.slice(0, 6).map((item) => {
        this.trendingMovies.push({
          id: item.id,
          title: item.title,
          original_title: item.original_title,
          overview: item.overview,
          backdrop_path: `${environment.posterBaseUrl}${item.backdrop_path}`,
          vote_average: Number(item.vote_average.toFixed(1)),
          genre_ids: item.genre_ids,
          release_date: item.release_date,
          key: item.key,
        });
      });
      console.log('Trending Movies: ', this.trendingMovies);
    });
  }

  getRecommendations() {
    this.productionDetailsService.recommendation$.subscribe((recData) => {
      if (recData != null) {
        recData.map((item) => {
          this.isRecommended = !this.isRecommended;
          //First question radio

          //Baseado em fatos reais
          if (item.selectedImage === 'Reais') {
            if (item.selectedOption === 'Rir') {
              this.imdbService
                .getRecomendations(
                  this.moviesGenresAndKeywords.comedy,
                  this.moviesGenresAndKeywords.based_on_true_story
                )
                .subscribe((data) => {
                  data.results.slice(0, 6).map((item) => {
                    this.recommendations.push({
                      id: item.id,
                      title: item.title,
                      original_title: item.original_title,
                      overview: item.overview,
                      backdrop_path: `${environment.posterBaseUrl}${item.backdrop_path}`,
                      vote_average: Number(item.vote_average.toFixed(1)),
                      genre_ids: item.genre_ids,
                      release_date: item.release_date,
                      key: item.key,
                    });
                  });
                });
            }
            if (item.selectedOption === 'Assustar') {
              this.imdbService
                .getRecomendations(
                  this.moviesGenresAndKeywords.horror,
                  this.moviesGenresAndKeywords.based_on_true_story
                )
                .subscribe((data) => {
                  data.results.slice(0, 6).map((item) => {
                    this.recommendations.push({
                      id: item.id,
                      title: item.title,
                      original_title: item.original_title,
                      overview: item.overview,
                      backdrop_path: `${environment.posterBaseUrl}${item.backdrop_path}`,
                      vote_average: Number(item.vote_average.toFixed(1)),
                      genre_ids: item.genre_ids,
                      release_date: item.release_date,
                      key: item.key,
                    });
                  });
                });
              console.log(
                'filmes Assustar baseados em reais: ',
                this.recommendations
              );
            }
            if (item.selectedOption === 'Emocionar') {
              this.imdbService
                .getRecomendations(
                  this.moviesGenresAndKeywords.drama,
                  this.moviesGenresAndKeywords.based_on_true_story
                )
                .subscribe((data) => {
                  data.results.slice(0, 6).map((item) => {
                    this.recommendations.push({
                      id: item.id,
                      title: item.title,
                      original_title: item.original_title,
                      overview: item.overview,
                      backdrop_path: `${environment.posterBaseUrl}${item.backdrop_path}`,
                      vote_average: Number(item.vote_average.toFixed(1)),
                      genre_ids: item.genre_ids,
                      release_date: item.release_date,
                      key: item.key,
                    });
                  });
                });
              console.log(
                'filmes Emocianar baseados em reais: ',
                this.recommendations
              );
            }
          }
          //Normais
          if (item.selectedImage === 'Ficção') {
            if (item.selectedOption === 'Rir') {
              this.imdbService
                .getRecomendations(this.moviesGenresAndKeywords.comedy)
                .subscribe((data) => {
                  data.results.slice(14, 20).map((item) => {
                    this.recommendations.push({
                      id: item.id,
                      title: item.title,
                      original_title: item.original_title,
                      overview: item.overview,
                      backdrop_path: `${environment.posterBaseUrl}${item.backdrop_path}`,
                      vote_average: Number(item.vote_average.toFixed(1)),
                      genre_ids: item.genre_ids,
                      release_date: item.release_date,
                      key: item.key,
                    });
                  });
                });
              console.log('Comedia ficção: ', this.recommendations);
            }
            if (item.selectedOption === 'Assustar') {
              this.imdbService
                .getRecomendations(this.moviesGenresAndKeywords.horror)
                .subscribe((data) => {
                  data.results.slice(5, 11).map((item) => {
                    this.recommendations.push({
                      id: item.id,
                      title: item.title,
                      original_title: item.original_title,
                      overview: item.overview,
                      backdrop_path: `${environment.posterBaseUrl}${item.backdrop_path}`,
                      vote_average: Number(item.vote_average.toFixed(1)),
                      genre_ids: item.genre_ids,
                      release_date: item.release_date,
                      key: item.key,
                    });
                  });
                });
              console.log('Assustar: ', this.recommendations);
            }
            if (item.selectedOption === 'Emocionar') {
              this.imdbService
                .getRecomendations(this.moviesGenresAndKeywords.drama)
                .subscribe((data) => {
                  data.results.slice(14, 20).map((item) => {
                    this.recommendations.push({
                      id: item.id,
                      title: item.title,
                      original_title: item.original_title,
                      overview: item.overview,
                      backdrop_path: `${environment.posterBaseUrl}${item.backdrop_path}`,
                      vote_average: Number(item.vote_average.toFixed(1)),
                      genre_ids: item.genre_ids,
                      release_date: item.release_date,
                      key: item.key,
                    });
                  });
                });
              console.log('Emocionar: ', this.recommendations);
            }
          }
        });
      }
    });
  }
}

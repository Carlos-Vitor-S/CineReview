import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { StepperModule } from 'primeng/stepper';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToggleButtonModule } from 'primeng/togglebutton';

import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Recommendation } from '../../../interfaces/recommendation';
import { Router } from '@angular/router';
import { ProductionDetailsService } from '../../../services/production-details.service';
import { GridCardComponent } from '../../components/grid-card/grid-card.component';
import { ImdbService } from '../../../services/imdb.service';
import { GenresAndKeywordEnum } from '../../../enums/genresAndKeywordEnum';
import { RecomendationsEnum } from '../../../enums/recomendationsEnum';
import { environment } from '../../../environments/environment.development';
import { Production } from '../../../interfaces/production';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-recommendation',
  standalone: true,
  imports: [
    StepperModule,
    ButtonModule,
    CommonModule,
    RadioButtonModule,
    FormsModule,
    ToggleButtonModule,
    ReactiveFormsModule,
    GridCardComponent,
    DialogModule,
  ],
  templateUrl: './recommendation.component.html',
  styleUrl: './recommendation.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RecommendationComponent {
  selectedImage: string = '';
  selectedEmoji: string = '';
  pageNumber: number = 1;

  recommendations: Production[] = [];
  imagesData: Recommendation[] = [];
  productionsArray: Production[] = [];
  allProductionsArray: Production[] = [];

  visible1: boolean = false;
  visible2: boolean = false;
  isDisabled: boolean = true;

  constructor(
    private router: Router,
    private productionDetailsService: ProductionDetailsService,
    private imdbService: ImdbService
  ) {}

  ngOnInit() {
    this.disableButton();
  }
  //gets image value
  onClickImage(event: string) {
    this.selectedImage = event;
    console.log(this.selectedImage);
    this.disableButton();
  }
  //gets emoji value
  onClickEmoji(event: string) {
    this.selectedEmoji = event;
    console.log(this.selectedEmoji);
    this.disableButton();
  }
  //preview data
  showPreviewData() {
    if (this.selectedEmoji && this.selectedImage) {
      this.recommendations = [];
      this.getRecommendations(1);
    }
  }

  disableButton() {
    if (this.selectedImage && this.selectedEmoji) {
      this.isDisabled = false;
    }
  }

  showDialog1() {
    this.visible1 = true;
    console.log('Show dialog 1: ', this.visible1);
  }

  showDialog2() {
    this.visible2 = true;
    console.log('Show dialog 2: ', this.visible1);
  }

  closeDialog() {
    this.visible1 = false;
  }

  //confirm data and redirect
  getData() {
    this.visible2 = false;
    this.visible1 = false;

    this.imagesData = [
      {
        selectedEmoji: this.selectedEmoji,
        selectedImage: this.selectedImage,
      },
    ];
    this.productionDetailsService.getRecommendationArray(this.recommendations);
    this.productionDetailsService.getRecommendationData(this.imagesData);

    this.router.navigate(['/'], {});
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  rerollMovies() {
    this.recommendations = [];
    this.getRecommendations(this.pageNumber);
    if (this.pageNumber < 4) {
      this.pageNumber++;
    }
    console.log(`Pagina ${this.pageNumber}`, this.allProductionsArray);
  }

  removeArrayData() {
    this.allProductionsArray = [];
  }

  getRecommendations(page: number) {
    //Baseado em fatos reais
    if (this.selectedImage === RecomendationsEnum.baseadoEmFatosReais) {
      if (this.selectedEmoji === RecomendationsEnum.feliz) {
        this.imdbService
          .getRecomendations(
            GenresAndKeywordEnum.comedy,
            page,
            GenresAndKeywordEnum.based_on_true_story
          )
          .subscribe((data) => {
            if (page < 4) {
              this.allProductionsArray = this.allProductionsArray.concat(
                data.results
              );
            }

            const start = Math.floor(
              Math.random() * (this.allProductionsArray.length - 6)
            );
            const end = start + 6;
            console.log('start', start);
            console.log('end', end);
            this.allProductionsArray.slice(start, end).map((item) => {
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
            this.productionsArray = this.recommendations;
          });
      }
      if (this.selectedEmoji === RecomendationsEnum.curioso) {
        this.imdbService
          .getRecomendations(
            `${GenresAndKeywordEnum.horror}|${GenresAndKeywordEnum.mystery}`,
            page,
            GenresAndKeywordEnum.based_on_true_story
          )
          .subscribe((data) => {
            if (page < 4) {
              this.allProductionsArray = this.allProductionsArray.concat(
                data.results
              );
            }
            const start = Math.floor(
              Math.random() * (this.allProductionsArray.length - 6)
            );
            const end = start + 6;
            this.allProductionsArray.slice(start, end).map((item) => {
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
      if (this.selectedEmoji === RecomendationsEnum.tranquilo) {
        this.imdbService
          .getRecomendations(
            GenresAndKeywordEnum.drama,

            page,
            GenresAndKeywordEnum.based_on_true_story
          )
          .subscribe((data) => {
            if (page < 4) {
              this.allProductionsArray = this.allProductionsArray.concat(
                data.results
              );
            }
            const start = Math.floor(
              Math.random() * (this.allProductionsArray.length - 6)
            );
            const end = start + 6;
            this.allProductionsArray.slice(start, end).map((item) => {
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
      if (this.selectedEmoji === RecomendationsEnum.estressado) {
        this.imdbService
          .getRecomendations(
            GenresAndKeywordEnum.action,

            page,
            GenresAndKeywordEnum.based_on_true_story
          )
          .subscribe((data) => {
            if (page < 4) {
              this.allProductionsArray = this.allProductionsArray.concat(
                data.results
              );
            }

            const start = Math.floor(
              Math.random() * (this.allProductionsArray.length - 6)
            );
            const end = start + 6;
            this.allProductionsArray.slice(start, end).map((item) => {
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
      if (this.selectedEmoji === RecomendationsEnum.triste) {
        this.imdbService
          .getRecomendations(
            GenresAndKeywordEnum.comedy,

            page,
            GenresAndKeywordEnum.based_on_true_story
          )
          .subscribe((data) => {
            if (page < 4) {
              this.allProductionsArray = this.allProductionsArray.concat(
                data.results
              );
            }
            const start = Math.floor(
              Math.random() * (this.allProductionsArray.length - 6)
            );
            const end = start + 6;
            this.allProductionsArray.slice(start, end).map((item) => {
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
      if (this.selectedEmoji === RecomendationsEnum.cansado) {
        this.imdbService
          .getRecomendations(
            `${GenresAndKeywordEnum.scienceFiction}|${GenresAndKeywordEnum.adventure}`,
            page,
            GenresAndKeywordEnum.based_on_true_story
          )
          .subscribe((data) => {
            if (page < 4) {
              this.allProductionsArray = this.allProductionsArray.concat(
                data.results
              );
            }
            const start = Math.floor(
              Math.random() * (this.allProductionsArray.length - 6)
            );
            const end = start + 6;
            this.allProductionsArray.slice(start, end).map((item) => {
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
    if (this.selectedImage === RecomendationsEnum.filmesFiccao) {
      if (this.selectedEmoji === RecomendationsEnum.feliz) {
        this.imdbService
          .getRecomendations(GenresAndKeywordEnum.comedy, page)
          .subscribe((data) => {
            if (page < 4) {
              this.allProductionsArray = this.allProductionsArray.concat(
                data.results
              );
            }
            const start = Math.floor(
              Math.random() * (this.allProductionsArray.length - 6)
            );
            const end = start + 6;
            this.allProductionsArray.slice(start, end).map((item) => {
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
      if (this.selectedEmoji === RecomendationsEnum.curioso) {
        this.imdbService
          .getRecomendations(
            `${GenresAndKeywordEnum.horror}|${GenresAndKeywordEnum.mystery}`,
            page
          )
          .subscribe((data) => {
            if (page < 4) {
              this.allProductionsArray = this.allProductionsArray.concat(
                data.results
              );
            }
            const start = Math.floor(
              Math.random() * (this.allProductionsArray.length - 6)
            );
            const end = start + 6;
            this.allProductionsArray.slice(start, end).map((item) => {
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
      if (this.selectedEmoji === RecomendationsEnum.tranquilo) {
        this.imdbService
          .getRecomendations(GenresAndKeywordEnum.drama, page)
          .subscribe((data) => {
            if (page < 4) {
              this.allProductionsArray = this.allProductionsArray.concat(
                data.results
              );
            }
            const start = Math.floor(
              Math.random() * (this.allProductionsArray.length - 6)
            );
            const end = start + 6;
            this.allProductionsArray.slice(start, end).map((item) => {
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
      if (this.selectedEmoji === RecomendationsEnum.estressado) {
        this.imdbService
          .getRecomendations(GenresAndKeywordEnum.action, page)
          .subscribe((data) => {
            if (page < 4) {
              this.allProductionsArray = this.allProductionsArray.concat(
                data.results
              );
            }
            const start = Math.floor(
              Math.random() * (this.allProductionsArray.length - 6)
            );
            const end = start + 6;
            this.allProductionsArray.slice(start, end).map((item) => {
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
      if (this.selectedEmoji === RecomendationsEnum.triste) {
        this.imdbService
          .getRecomendations(
            `${GenresAndKeywordEnum.comedy}|${GenresAndKeywordEnum.animation}`,
            page
          )
          .subscribe((data) => {
            if (page < 4) {
              this.allProductionsArray = this.allProductionsArray.concat(
                data.results
              );
            }
            const start = Math.floor(
              Math.random() * (this.allProductionsArray.length - 6)
            );
            const end = start + 6;
            this.allProductionsArray.slice(start, end).map((item) => {
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
      if (this.selectedEmoji === RecomendationsEnum.cansado) {
        this.imdbService
          .getRecomendations(
            `${GenresAndKeywordEnum.scienceFiction}|${GenresAndKeywordEnum.fantasy}`,
            page
          )
          .subscribe((data) => {
            if (page < 4) {
              this.allProductionsArray = this.allProductionsArray.concat(
                data.results
              );
            }
            const start = Math.floor(
              Math.random() * (this.allProductionsArray.length - 6)
            );
            const end = start + 6;

            this.allProductionsArray.slice(start, end).map((item) => {
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
  }
}

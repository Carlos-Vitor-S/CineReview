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
  visible: boolean = false;

  constructor(
    private router: Router,
    private productionDetailsService: ProductionDetailsService,
    private imdbService: ImdbService
  ) {}

  ngOnInit() {}
  //gets image value
  onClickImage(event: string) {
    this.selectedImage = event;
    console.log(this.selectedImage);
  }
  //gets emoji value
  onClickEmoji(event: string) {
    this.selectedEmoji = event;
    console.log(this.selectedEmoji);
  }
  //preview data
  showPreviewData() {
    if (this.selectedEmoji && this.selectedImage) {
      this.recommendations = [];
      this.getRecommendations();
    }
  }

  showDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
  }

  //confirm data and redirect
  getData() {
    this.imagesData = [
      {
        selectedEmoji: this.selectedEmoji,
        selectedImage: this.selectedImage,
      },
    ];
    this.productionDetailsService.getRecommendationArray(this.recommendations);
    //this.productionDetailsService.getRecommendationData(this.imagesData);

    console.log(this.visible);
    this.router.navigate(['/']);
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  rerollMovies() {
    this.recommendations = [];
    this.getRecommendations();
  }
  getRecommendations() {
    //Baseado em fatos reais
    if (this.selectedImage === RecomendationsEnum.baseadoEmFatosReais) {
      if (this.selectedEmoji === RecomendationsEnum.feliz) {
        this.imdbService
          .getRecomendations(
            GenresAndKeywordEnum.comedy,
            GenresAndKeywordEnum.based_on_true_story
          )
          .subscribe((data) => {
            const start = Math.floor(Math.random() * (data.results.length - 6));
            const end = start + 6;
            console.log('start', start);
            console.log('end', end);
            data.results.slice(start, end).map((item) => {
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
            GenresAndKeywordEnum.based_on_true_story
          )
          .subscribe((data) => {
            const start = Math.floor(Math.random() * (data.results.length - 6));
            const end = start + 6;
            data.results.slice(start, end).map((item) => {
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
            GenresAndKeywordEnum.based_on_true_story
          )
          .subscribe((data) => {
            const start = Math.floor(Math.random() * (data.results.length - 6));
            const end = start + 6;
            data.results.slice(start, end).map((item) => {
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
            GenresAndKeywordEnum.based_on_true_story
          )
          .subscribe((data) => {
            const start = Math.floor(Math.random() * (data.results.length - 6));
            const end = start + 6;
            data.results.slice(start, end).map((item) => {
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
            GenresAndKeywordEnum.based_on_true_story
          )
          .subscribe((data) => {
            const start = Math.floor(Math.random() * (data.results.length - 6));
            const end = start + 6;
            data.results.slice(start, end).map((item) => {
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
            GenresAndKeywordEnum.based_on_true_story
          )
          .subscribe((data) => {
            const start = Math.floor(Math.random() * (data.results.length - 6));
            const end = start + 6;
            data.results.slice(start, end).map((item) => {
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
          .getRecomendations(GenresAndKeywordEnum.comedy)
          .subscribe((data) => {
            const start = Math.floor(Math.random() * (data.results.length - 6));
            const end = start + 6;
            data.results.slice(start, end).map((item) => {
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
            `${GenresAndKeywordEnum.horror}|${GenresAndKeywordEnum.mystery}`
          )
          .subscribe((data) => {
            const start = Math.floor(Math.random() * (data.results.length - 6));
            const end = start + 6;
            data.results.slice(start, end).map((item) => {
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
          .getRecomendations(GenresAndKeywordEnum.drama)
          .subscribe((data) => {
            const start = Math.floor(Math.random() * (data.results.length - 6));
            const end = start + 6;
            data.results.slice(start, end).map((item) => {
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
          .getRecomendations(GenresAndKeywordEnum.action)
          .subscribe((data) => {
            const start = Math.floor(Math.random() * (data.results.length - 6));
            const end = start + 6;
            data.results.slice(start, end).map((item) => {
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
            `${GenresAndKeywordEnum.comedy}|${GenresAndKeywordEnum.animation}`
          )
          .subscribe((data) => {
            const start = Math.floor(Math.random() * (data.results.length - 6));
            const end = start + 6;
            data.results.slice(start, end).map((item) => {
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
            `${GenresAndKeywordEnum.scienceFiction}|${GenresAndKeywordEnum.fantasy}`
          )
          .subscribe((data) => {
            const start = Math.floor(Math.random() * (data.results.length - 6));
            const end = start + 6;
            data.results.slice(start, end).map((item) => {
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

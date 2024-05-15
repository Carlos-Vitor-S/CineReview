import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProductionDetailsService } from '../../../services/production-details.service';
import { Production } from '../../../interfaces/production';
import { CommonModule } from '@angular/common';
import { ImageModule } from 'primeng/image';
import { ImdbService } from '../../../services/imdb.service';
import { ProductionTypeEnum } from '../../../enums/productionsTypeEnum';
import { environment } from '../../../environments/environment.development';
import { Genre } from '../../../interfaces/genre';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';

import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { Casting } from '../../../interfaces/casting';
import { AvatarCardComponent } from '../../components/avatar-card/avatar-card.component';
import { CastingTypeEnum } from '../../../enums/castingTypeEnum';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewComponent } from '../../components/review/review.component';

@Component({
  selector: 'app-production-details',
  standalone: true,
  imports: [
    CommonModule,
    ImageModule,
    MenubarModule,
    ButtonModule,
    AvatarGroupModule,
    AvatarModule,
    AvatarCardComponent,
    ReviewComponent,
  ],
  templateUrl: './production-details.component.html',
  styleUrl: './production-details.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductionDetailsComponent {
  productions: Production[] = [];
  casting: Casting[] = [];
  directors: string = '';
  writers: string = '';
  isImageFound: string = '';
  avatarCardTitle: string = 'Elenco';
  productionType: ProductionTypeEnum = ProductionTypeEnum.movie;
  productionId: number = 0;
  trailerUrlSafe?: SafeResourceUrl;
  trailerUrl: string = '';
  notFoundMessage: string =
    'A obra não ofereceu nenhuma sinopse sobre a produção';
  genres: Genre[] = [];

  //Construtor
  constructor(
    private productionDetailsService: ProductionDetailsService,
    private imdbService: ImdbService,
    private domSanitizer: DomSanitizer,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productions = productionDetailsService.getProductions();
  }

  ngOnInit() {
    this.getProductionDetails();
    this.getTrailers();
    this.getCasting();
    this.getCrew();
    this.getRoutingType();
  }

  //Get data from card event click
  getProductionDetails() {
    this.productionDetailsService.productionsSubject.getValue().map((data) => {
      data.name == null
        ? (this.productionType = ProductionTypeEnum.movie)
        : (this.productionType = ProductionTypeEnum.tv);

      this.productionId = data.id;
      console.log('os ids das produções: ', data.genre_ids);
      data.genre_ids?.map((item) => {
        this.imdbService
          .getGenre(this.productionType)
          .subscribe((genreData) => {
            genreData.genres.map((itemGenre) => {
              if (itemGenre.id == item) {
                this.genres.push({
                  name: itemGenre.name,
                });
              }
            });
          });
      });

      console.log('Generos: ', this.genres);
      return this.productionType;
    });
  }
  //get trailers by passing id
  getTrailers() {
    if (this.productionId != 0) {
      this.imdbService
        .getTrailers(this.productionId, this.productionType)
        .subscribe((trailerData) => {
          this.trailerUrl = `${environment.trailerBaseUrl}${trailerData.results[0].key}`;
          this.trailerUrlSafe =
            this.domSanitizer.bypassSecurityTrustResourceUrl(this.trailerUrl);
          console.log('sanitize: ', this.trailerUrlSafe);
        });
    }
  }
  // get genre list
  getGenre() {
    this.imdbService
      .getGenre(ProductionTypeEnum.movie)
      .subscribe((genreData) => {
        genreData.genres.map((item) => {});
      });
  }
  //Get casting from production
  // prettier-ignore
  getCasting() {
    this.imdbService.getCasting(this.productionType , this.productionId).subscribe((data)=>{
      data.cast.map((item)=>{
        if(item.profile_path==null){
          this.isImageFound = '/assets/notFoundCasting.png'
        }
        else{
          this.isImageFound = `${environment.posterBaseUrl}/${item.profile_path}`
        }
       
          this.casting.push({
            name : item.name,
            known_for_department : item.known_for_department,
            profile_path : this.isImageFound,
            character : item.character
          })
       })
    })
  }
  //get crew from production
  getCrew() {
    this.imdbService
      .getCasting(this.productionType, this.productionId)
      .subscribe((data) => {
        data.crew.map((item) => {
          if (item.known_for_department == CastingTypeEnum.Directing) {
            this.directors += item.name + ', ';
          } else if (item.known_for_department == CastingTypeEnum.Writing) {
            this.writers += item.name + ', ';
          }
        });
        console.log('Escritores: ', this.writers);
        console.log('Diretores: ', this.directors);
      });
  }

  getRoutingType() {
    this.route.paramMap.subscribe((param) => {
      param.get('id');
      console.log(param.get('id'));
    });
  }
}

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
import { ActivatedRoute, Router, TitleStrategy } from '@angular/router';
import { ReviewComponent } from '../../components/review/review.component';
import { Review } from '../../../interfaces/review';
import { DialogModule } from 'primeng/dialog';

import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FirebaseService } from '../../../services/firebase.service';

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
    InputTextareaModule,
    ReactiveFormsModule,
    DialogModule,
  ],
  templateUrl: './production-details.component.html',
  styleUrl: './production-details.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductionDetailsComponent {
  productions: Production[] = [];
  casting: Casting[] = [];
  reviews: Review[] = [];
  customReviews: Review[] = [];
  genres: Genre[] = [];
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

  isTyping: boolean = false;
  textAreaText: string = '';
  displayName: string = '';
  isUserLoggedIn: boolean = false;
  isDialogVisible: boolean = false;
  commentFormGroup = new FormGroup({
    commentControl: new FormControl(''),
  });

  //Construtor
  constructor(
    private productionDetailsService: ProductionDetailsService,
    private imdbService: ImdbService,
    private domSanitizer: DomSanitizer,
    private router: Router,
    private route: ActivatedRoute,
    private firebaseService: FirebaseService
  ) {
    this.productions = productionDetailsService.getProductions();
  }

  ngOnInit() {
    this.getProductionDetails();
    this.getTrailers();
    this.getCasting();
    this.getCrew();
    this.getRoutingType();
    this.getReviews();
    this.getDisplayName();
    this.getFirebaseReviews();
    this.getUserStatus();
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
  //get routing param
  getRoutingType() {
    this.route.paramMap.subscribe((param) => {
      param.get('id');
      console.log(param.get('id'));
    });
  }

  //get reviews from api
  // prettier-ignore
  getReviews(){
    this.imdbService.getReviews(this.productionId , this.productionType).subscribe((data)=>{
     data.results.slice(0,3).map((item)=>
        this.reviews.push({
          author : item.author,
          content : item.content,
        })
     )
    })
  }
  //Comment buttons actions
  toggleSubmit() {
    this.isTyping = true;
  }

  CloseToggle() {
    this.commentFormGroup.reset();
    this.isTyping = false;
  }

  submitForm() {
    if (this.isUserLoggedIn == true) {
      let user: Review = {
        author: this.displayName,
        productionId: this.productionId,
        content: this.commentFormGroup.value.commentControl!,
      };

      this.firebaseService.createFirestoreReview(user);
      console.log('Formulario do review', user);
      this.commentFormGroup.reset();
    }
    if (this.isUserLoggedIn == false) {
    }
  }

  fireStoreData: Review[] = [];
  getFirebaseReviews() {
    this.firebaseService.getReviews().subscribe((data) => {
      console.log('Firebase: ', data);
      this.fireStoreData = [];
      data.map((item) => {
        if (item.productionId === this.productionId) {
          this.fireStoreData.push({
            content: item.content,
            author: item.author,
            productionId: item.productionId,
          });
        }
      });
    });
  }

  getUserStatus() {
    this.firebaseService.currentAuthStatus$.subscribe((stats) => {
      stats != null
        ? (this.isUserLoggedIn = true)
        : (this.isUserLoggedIn = false);
    });
  }

  showDialog() {
    this.isDialogVisible = true;
  }

  closeDialog() {
    this.isDialogVisible = false;
  }

  getDisplayName() {
    this.firebaseService.currentId$.subscribe((id) => {
      this.firebaseService.getUser(id).subscribe((item) => {
        this.displayName = item.get('name');

        console.log('Nome', this.displayName);
      });
    });
  }
}

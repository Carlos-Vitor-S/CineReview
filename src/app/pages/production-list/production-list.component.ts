import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { ImdbService } from '../../../services/imdb.service';
import { ProductionTypeEnum } from '../../../enums/productionsTypeEnum';
import { Production } from '../../../interfaces/production';

import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { environment } from '../../../environments/environment.development';
import { GridCardComponent } from '../../components/grid-card/grid-card.component';
import { ActivatedRoute } from '@angular/router';
import { ProductionDetailsService } from '../../../services/production-details.service';
@Component({
  selector: 'app-production-list',
  standalone: true,
  imports: [DataViewModule, CommonModule, GridCardComponent],

  templateUrl: './production-list.component.html',
  styleUrl: './production-list.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductionListComponent implements OnInit {
  movies: Production[] = [];
  tv: Production[] = [];
  productionTypeTitle: string = '';
  productionType: any = '';
  pageNumber: number = 2;

  constructor(
    private imdbService: ImdbService,
    private route: ActivatedRoute,
    private productionDetailsService: ProductionDetailsService
  ) {}

  ngOnInit() {
    this.getRoutingType();
    this.getTvList();
    this.getMovieList();
  }

  //get the production type and change content
  getRoutingType() {
    this.route.paramMap.subscribe((param) => {
      this.productionType = param.get('productionType');
      this.productionType == ProductionTypeEnum.movie
        ? (this.productionTypeTitle = 'Filmes')
        : (this.productionTypeTitle = 'Series');
    });
    console.log('Production Type: ', this.productionType);
  }

  // prettier-ignore
  //get a list of movies with pages
  getMovieList() {
  this.productionDetailsService.pageChange$.subscribe((page) => {
    this.pageNumber = page;
    this.movies = []
    this.imdbService.getProductionList(ProductionTypeEnum.movie , this.pageNumber).subscribe((data)=>{
      data.results.map((item)=>{
        this.movies.push({
          id: item.id,
          title: item.title,
          original_title: item.original_title,
          overview: item.overview,
          poster_path : `${environment.posterBaseUrl}${item.poster_path}`,
          backdrop_path: `${environment.posterBaseUrl}${item.backdrop_path}`,
          vote_average: Number(item.vote_average.toFixed(1)),
          genre_ids: item.genre_ids,
          release_date: item.release_date,
          key: item.key,
          });
        })
      })
    })
    console.log("Filmes :" , this.movies)
    console.log("pagina atual: " , this.pageNumber);

}

  // prettier-ignore
  //get a list of tv series with pages
  getTvList() {
    this.productionDetailsService.pageChange$.subscribe((page) => {
      this.pageNumber = page;
      this.tv = []
      this.imdbService.getProductionList(ProductionTypeEnum.tv , this.pageNumber).subscribe((data)=>{
        data.results.map((item)=>{
          this.tv.push({
              id: item.id,
              name: item.name,
              original_name: item.original_name,
              overview: item.overview,
              backdrop_path: `${environment.posterBaseUrl}${item.backdrop_path}`,
              vote_average: Number(item.vote_average.toFixed(1)),
              genre_ids: item.genre_ids,
              release_date: item.release_date,
              key: item.key,
            });
          })
        })
      })
      console.log("series TV:" , this.tv)
      console.log("pagina atual: " , this.pageNumber);

  }
}

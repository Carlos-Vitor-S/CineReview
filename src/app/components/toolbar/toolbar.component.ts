import { Component, CUSTOM_ELEMENTS_SCHEMA, HostListener } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { ProductionTypeEnum } from '../../../enums/productionsTypeEnum';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { Production } from '../../../interfaces/production';
import { ImdbService } from '../../../services/imdb.service';
import { environment } from '../../../environments/environment.development';

import { DividerModule } from 'primeng/divider';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductionDetailsService } from '../../../services/production-details.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    ToolbarModule,
    ButtonModule,
    DropdownModule,
    MenubarModule,
    CommonModule,
    InputTextModule,
    AutoCompleteModule,
    ReactiveFormsModule,
    DividerModule,
  ],

  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ToolbarComponent {
  movieType: ProductionTypeEnum = ProductionTypeEnum.movie;
  tvType: ProductionTypeEnum = ProductionTypeEnum.tv;
  productionParam: any;
  isMobileScreen: boolean = false;
  isExpanded: boolean = false;
  isAutocompleteOpen: boolean = false;
  screenSize: number = 0;
  hideLeftSide: boolean = true;
  changeDivSize: string = '';
  changeAutoCompleteIcon: string = 'pi pi-search';
  isOnRoute: boolean = false;
  //search
  productionSuggestions: Production[] = [];
  searchText: string = '';
  searchBarContainer: string = '';

  //Form
  formGroupSearch = new FormGroup({
    searchResult: new FormControl(''),
  });
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }
  constructor(
    private router: Router,
    private imdbService: ImdbService,
    private productionDetailsService: ProductionDetailsService,
    private route: ActivatedRoute
  ) {
    this.checkScreenSize();
  }

  ngOnInit() {
    this.checkCurrentUrl();
  }

  goToHome() {
    this.router.navigate(['']);
  }

  redirectToMovies() {
    this.router.navigate(['/productionList', this.movieType]);
  }

  redirectToTv() {
    this.router.navigate(['/productionList', this.tvType]);
  }

  getProductionByName(event: any) {
    this.searchText = event.query;
    console.log('search text: ', this.searchText);
    this.getProductionsByQuery(this.searchText);
  }

  //search production of any type (by name)
  // prettier-ignore
  getProductionsByQuery(event: any) {
    this.productionSuggestions = [];
    this.searchText = event.query;
    //verificar se o texto de consulta está vazio
    if(this.searchText.trim()!==''){
      this.imdbService.getProductionByName(this.searchText).subscribe((data)=>{
        
        if(data.results){
          //filtrar titulos vazios
          const filteredResults = data.results.filter((filter)=>{
            //remover espaços em branco extras ao redor do titulo
            const title = (filter.title || filter.name)?.trim();
            //aplicar o filtro com espaçamento ''
            return title != ''
          })
          this.productionSuggestions = filteredResults.map((item)=>({
            id: item.id,
            title: item.title?.trim(),
            name: item.name?.trim(),
            original_name: item.original_name,
            overview: item.overview,
            backdrop_path: `${environment.posterBaseUrl}${item.backdrop_path}`,
            vote_average: Number(item.vote_average.toFixed(1)),
            genre_ids: item.genre_ids,
            key: item.key,
            first_air_date: item.first_air_date,
          }))
        }
      })
    } 
  }

  //search by name selector
  onItemSelect(event: any) {
    const valueId = event.value.id;
    this.productionDetailsService.clearLocalStorage();
    this.productionDetailsService.addProduction(event.value);
    if (this.isOnRoute) {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/production', valueId]);
      });
    } else {
      this.router.navigate(['/production', valueId]);
    }
    this.searchText = '';
  }
  //changes toolbar based on mediascreen type
  checkScreenSize() {
    this.isMobileScreen = window.innerWidth < 769;
  }

  checkCurrentUrl() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.router.url.includes('production')) {
          this.isOnRoute = true;
        }
      }
    });
  }
  //icon activates search bar for smaller devices
  toggleSearchBar() {
    if (this.isMobileScreen) {
      this.isExpanded = !this.isExpanded;
      this.hideLeftSide = !this.isExpanded;
      this.changeDivSize = this.isExpanded ? '100%' : 'auto';
      this.changeAutoCompleteIcon = this.isExpanded
        ? 'pi pi-times'
        : 'pi pi-search';
    }
  }
}

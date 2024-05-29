import { EventEmitter, Injectable } from '@angular/core';
import { Production } from '../interfaces/production';
import { BehaviorSubject, Observable } from 'rxjs';
import { Recommendation } from '../interfaces/recommendation';

@Injectable({
  providedIn: 'root',
})
export class ProductionDetailsService {
  productionsSubject = new BehaviorSubject<Production[]>([]);
  searchProductionSubject = new BehaviorSubject<Production[]>([]);
  recommendationSubject = new BehaviorSubject<Recommendation[]>([]);
  recommendationProductionsSubject = new BehaviorSubject<Production[]>([]);
  paginatorPage = new BehaviorSubject<number>(1);

  recommendation$ = this.recommendationSubject.asObservable();
  productionsChange$ = this.productionsSubject.asObservable();
  pageChange$ = this.paginatorPage.asObservable();
  searchProduction$ = this.searchProductionSubject.asObservable();
  recommendationProductions$ =
    this.recommendationProductionsSubject.asObservable();

  constructor() {
    this.loadProductions();
  }

  //Get productions
  loadProductions() {
    const productionsJson = localStorage.getItem('productions');
    if (productionsJson) {
      const productions = JSON.parse(productionsJson);
      this.productionsSubject.next(productions);
    }
  }

  getProductions(): Production[] {
    return this.productionsSubject.value;
  }
  //Add production to local storage
  addProduction(production: Production) {
    const productions = [...this.productionsSubject.value, production];
    this.productionsSubject.next(productions);
    localStorage.setItem('productions', JSON.stringify(productions));
  }
  //clear local storage
  clearLocalStorage() {
    localStorage.removeItem('productions');
    this.productionsSubject.next([]);
  }
  // prettier-ignore
  //get paginator page count

  getPaginatorPage(pageNumber: number ) {
    this.paginatorPage.next(pageNumber)
   
  }

  //get search bar production data

  getSearchBarData(production: Production[]) {
    this.searchProductionSubject.next(production);
  }

  //get recommendation data
  getRecommendationData(recomendation: Recommendation[]) {
    this.recommendationSubject.next(recomendation);
  }

  getRecommendationArray(production: Production[]) {
    this.recommendationProductionsSubject.next(production);
  }
}

import { EventEmitter, Injectable } from '@angular/core';
import { Production } from '../interfaces/production';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductionDetailsService {
  productionsSubject = new BehaviorSubject<Production[]>([]);
  paginatorPage = new BehaviorSubject<number>(1);

  productionsChange$ = this.productionsSubject.asObservable();
  pageChange$ = this.paginatorPage.asObservable();

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
}

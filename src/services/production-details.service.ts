import { EventEmitter, Injectable } from '@angular/core';
import { Production } from '../interfaces/production';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductionDetailsService {
  productionsSubject = new BehaviorSubject<Production[]>([]);

  constructor() {
    this.loadProductions();
  }
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

  addProduction(production: Production) {
    const productions = [...this.productionsSubject.value, production];
    this.productionsSubject.next(productions);
    localStorage.setItem('productions', JSON.stringify(productions));
  }
  clearLocalStorage() {
    localStorage.removeItem('productions');
    this.productionsSubject.next([]);
  }
}

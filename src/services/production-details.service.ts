import { EventEmitter, Injectable } from '@angular/core';
import { Production } from '../interfaces/production';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductionDetailsService {
  productions$ = new BehaviorSubject<Production[]>([]);
}

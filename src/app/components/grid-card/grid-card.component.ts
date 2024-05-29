import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { Production } from '../../../interfaces/production';
import { Router } from '@angular/router';
import { ProductionDetailsService } from '../../../services/production-details.service';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-grid-card',
  standalone: true,
  imports: [CommonModule, PaginatorModule],
  templateUrl: './grid-card.component.html',
  styleUrl: './grid-card.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GridCardComponent {
  @Input() productions: Production[] = [];
  @Input() paginator: boolean = true;
  first: number = 0;
  rows: number = 10;
  totalRecords: number = 120;

  constructor(
    private router: Router,
    private productionDetailsService: ProductionDetailsService
  ) {}

  redirectToProduction(production: Production) {
    this.productionDetailsService.clearLocalStorage();
    this.productionDetailsService.addProduction(production);
    this.router.navigate(['/production', production.id], { fragment: 'top' });
  }

  onPageChange(event: any) {
    const pageCount = event.page + 1;
    this.productionDetailsService.getPaginatorPage(pageCount);
  }
}

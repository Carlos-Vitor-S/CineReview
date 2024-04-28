import { Component } from '@angular/core';
import { ProductionDetailsService } from '../../../services/production-details.service';
import { Production } from '../../../interfaces/production';
import { CommonModule } from '@angular/common';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-production-details',
  standalone: true,
  imports: [CommonModule, ImageModule],
  templateUrl: './production-details.component.html',
  styleUrl: './production-details.component.scss',
})
export class ProductionDetailsComponent {
  constructor(private productionDetailsService: ProductionDetailsService) {}

  productions: Production[] =
    this.productionDetailsService.productions$.getValue();

  imageBackground =
    'https://image.tmdb.org/t/p/original/hib8MpBPU7GdluS38htXCF4uw0c.jpg';

  ngOnInit() {
    this.getProductionDetails();
  }

  getProductionDetails() {
    this.productionDetailsService.productions$.getValue();
  }
}

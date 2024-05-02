import { Component } from '@angular/core';
import { ProductionDetailsService } from '../../../services/production-details.service';
import { Production } from '../../../interfaces/production';
import { CommonModule } from '@angular/common';
import { ImageModule } from 'primeng/image';
import { ImdbService } from '../../../services/imdb.service';
import { ProductionTypeEnum } from '../../../enums/productionsTypeEnum';
import { environment } from '../../../environments/environment.development';
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl,
} from '@angular/platform-browser';

@Component({
  selector: 'app-production-details',
  standalone: true,
  imports: [CommonModule, ImageModule],
  templateUrl: './production-details.component.html',
  styleUrl: './production-details.component.scss',
})
export class ProductionDetailsComponent {
  //productions: Production[] =
  //this.productionDetailsService.productionsSubject.getValue();

  productions: Production[] = [];

  constructor(
    private productionDetailsService: ProductionDetailsService,
    private imdbService: ImdbService,
    private domSanitizer: DomSanitizer
  ) {
    this.productions = productionDetailsService.getProductions();
  }

  trailerId: number = 0;
  trailerUrlSafe?: SafeResourceUrl;
  trailerUrl: string = '';
  ngOnInit() {
    //this.getProductionDetails();
    //this.getSafeUrl();
    this.getProductionDetails();
    this.getTrailers();
    //this.getService();
  }

  //Get data from card event click
  getProductionDetails() {
    this.productionDetailsService.productionsSubject.getValue().map((data) => {
      return (this.trailerId = data.id);
    });
  }

  getTrailers() {
    if (this.trailerId != 0) {
      this.imdbService
        .getTrailers(this.trailerId, ProductionTypeEnum.tv)
        .subscribe((trailerData) => {
          this.trailerUrl = `${environment.trailerBaseUrl}${trailerData.results[0].key}`;
          this.trailerUrlSafe =
            this.domSanitizer.bypassSecurityTrustResourceUrl(this.trailerUrl);
          console.log('sanitize: ', this.trailerUrlSafe);
        });
    }
  }
}

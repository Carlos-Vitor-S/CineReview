import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { StepperModule } from 'primeng/stepper';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToggleButtonModule } from 'primeng/togglebutton';

import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Recommendation } from '../../../interfaces/recommendation';
import { Router } from '@angular/router';
import { ProductionDetailsService } from '../../../services/production-details.service';
@Component({
  selector: 'app-recommendation',
  standalone: true,
  imports: [
    StepperModule,
    ButtonModule,
    CommonModule,
    RadioButtonModule,
    FormsModule,
    ToggleButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './recommendation.component.html',
  styleUrl: './recommendation.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RecommendationComponent {
  selectedOption: string = '';
  selectedOption2: string = '';
  selectedImage: string = '';
  recomendations: Recommendation[] = [];
  constructor(
    private router: Router,
    private productionDetailsService: ProductionDetailsService
  ) {}

  ngOnInit() {
    console.log(this.selectedOption);
    console.log(this.selectedOption2);
  }

  onOptionSelected(event: string) {
    this.selectedOption = event;
    console.log('selectionou: ', this.selectedOption);
  }

  onOption2Selected(event: string) {
    this.selectedOption2 = event;
    console.log('selectionou: ', this.selectedOption2);
  }

  onClickImage(event: string) {
    this.selectedImage = event;
    console.log(this.selectedImage);
  }

  getData() {
    this.recomendations = [
      {
        selectedOption: this.selectedOption,
        selectedOption2: this.selectedOption2,
        selectedImage: this.selectedImage,
      },
    ];
    this.productionDetailsService.getRecommendationData(this.recomendations);

    this.router.navigate(['/']);
  }
}

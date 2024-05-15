import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [InputTextareaModule, CommonModule, AvatarModule],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss',
})
export class ReviewComponent {
  value!: string;
}

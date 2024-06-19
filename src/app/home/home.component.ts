import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  selectedCategoryId: number | undefined;

  onCategorySelected(categoryId: number | null) {
    this.selectedCategoryId = categoryId === null ? undefined : categoryId;
  }
}

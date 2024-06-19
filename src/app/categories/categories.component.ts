import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
  @Output() categorySelected = new EventEmitter<number | null>();
  selectedCategory: number | null = null;

  onCategoryClick(categoryId: number | null): void {
    this.selectedCategory = categoryId;
    this.categorySelected.emit(categoryId);
  }
}

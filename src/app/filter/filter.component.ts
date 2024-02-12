import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  @Input()
  categories: Category[] = [];

  @Input()
  selectedCategories: Set<string> = new Set<string>();

  ngOnInit(): void {
  }

  @Output() categoryEvent = new EventEmitter<Set<string>>();

  toggleCategory(category: Category) {

    if (this.selectedCategories.has(category.id)) {
      this.selectedCategories.delete(category.id);
    } else {
      this.selectedCategories.add(category.id);
    }

    this.categoryEvent.emit(this.selectedCategories);
  }
}

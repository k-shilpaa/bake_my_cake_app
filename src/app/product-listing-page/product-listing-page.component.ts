import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageService } from '../services/message.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-product-listing-page',
  templateUrl: './product-listing-page.component.html',
  styleUrls: ['./product-listing-page.component.css'],
})
export class ProductListingPageComponent implements OnInit {
  products: Product[] = [];
  allProducts: Product[] = [];
  categories: Category[] = [];
  selectedCategories: Set<string> = new Set<string>();

  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.messageService.currentMessage.subscribe({
      next: (message) => {
        if (message !== '') {
          this.snackBar.open(message, 'Dismiss', {
            duration: 3000, // Duration in milliseconds
          });
          this.messageService.clearMessage();
        }
      },
    });
    this.getAllProducts();
    this.getAllCategories();
  }

  filterByCategory(selectedCategories: Set<string>): void {
    this.products = this.allProducts.filter((product) =>
      selectedCategories.has(product.category)
    );
  }

  onSearch(searchText: string) {
    if (searchText) {
      this.products = this.products.filter((item) =>
        item.name?.toLowerCase().includes(searchText.toLowerCase())
      );
    } else {
      this.getAllProducts();
    }
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.allProducts = data;
        this.products = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAllCategories() {
    this.productService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.categories.forEach((category) =>
          this.selectedCategories.add(category.id)
        );
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}

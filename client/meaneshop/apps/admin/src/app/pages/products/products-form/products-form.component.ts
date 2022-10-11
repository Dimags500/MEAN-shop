import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '@meaneshop/products';

@Component({
  selector: 'meaneshop-products-form',
  templateUrl: './products-form.component.html',
  styles: [],
})
export class ProductsFormComponent implements OnInit {
  editMode = false;
  form: FormGroup;
  isSubmitted = false;

  categories = [];
  selectedCategory = 'string';
  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this._initFrom();
    this._getCAtegories();
  }

  onSubmit() {}
  onCancle() {}

  private _initFrom() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDesription: [''],
      image: [''],
      isFeatured: [''],
    });
  }

  private _getCAtegories() {
    this.categoriesService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  get productForm() {
    return this.form.controls;
  }
}

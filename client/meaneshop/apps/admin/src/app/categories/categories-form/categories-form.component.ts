import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from '@meaneshop/products';

@Component({
  selector: 'meaneshop-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [],
})
export class CategoriesFormComponent implements OnInit {
  form: FormGroup;
  isSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.form.valid) return;

    console.log(this.categoryForm['name'].value);
    console.log(this.categoryForm['icon'].value);

    const category: Category = {
      name: this.categoryForm['name'].value,
      icon: this.categoryForm['icon'].value,
    };
    this.categoryService.createCategory(category).subscribe();
  }

  get categoryForm() {
    return this.form.controls;
  }
}

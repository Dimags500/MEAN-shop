import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from '@meaneshop/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

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
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
    });
  }

  onCancle() {
    this.location.back();
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
    this.categoriesService.createCategory(category).subscribe(
      (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: 'Category is Created',
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Category is NOT Created',
          detail: error.statusText,
        });
      }
    );
  }

  get categoryForm() {
    return this.form.controls;
  }
}

import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  editMode = false;
  currentCategoryId: string;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['#fff'],
    });

    this._checkEditMode();
  }

  onCancle() {
    this.location.back();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.form.valid) return;

    const category: Category = {
      id: this.currentCategoryId,
      name: this.categoryForm['name'].value,
      icon: this.categoryForm['icon'].value,
      color: this.categoryForm['color'].value,
    };

    if (this.editMode) {
      this._updateCatrgory(category);
    } else {
      this._createCategory(category);
    }
  }

  get categoryForm() {
    return this.form.controls;
  }
  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      const categoryId = params['id'];
      if (categoryId) {
        this.editMode = true;
        this.currentCategoryId = categoryId;
        this.categoriesService
          .getCategoryById(categoryId)
          .subscribe((category) => {
            this.categoryForm['name'].setValue(category.name);
            this.categoryForm['icon'].setValue(category.icon);
            this.categoryForm['color'].setValue(category.color);
          });
      }
    });
  }
  private _updateCatrgory(category: Category) {
    this.categoriesService.updateCategory(category).subscribe(
      (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: 'Category is Updated',
        });
        timer(1500)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Category is NOT Updated',
          detail: error.statusText,
        });
      }
    );
  }

  private _createCategory(category: Category) {
    this.categoriesService.createCategory(category).subscribe(
      (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: 'Category is Created',
        });
        timer(1500)
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
}

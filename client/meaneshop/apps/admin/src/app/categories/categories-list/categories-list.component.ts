import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@meaneshop/products';

import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [],
})
export class CategoriesListComponent implements OnInit {
  categories: Category[] = [];

  constructor(
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getCategories();
  }

  editCategory(categoryId: string) {
    this.router.navigateByUrl(`categories/form/${categoryId}`);
  }

  deleteCategory(categoryId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete Category?',
      header: 'Delete Category',
      icon: 'pi pi-trash',
      accept: () => {
        return this.categoriesService.deleteCategory(categoryId).subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'success',
              detail: 'Category is Deleted',
            });
            this._getCategories();
          },
          (error) => {
            console.log(error);
            this.messageService.add({
              severity: 'error',
              summary: 'Category is NOT Deleted',
              detail: error.statusText,
            });
          }
        );
      },
    });
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe((res) => {
      this.categories = res;
    });
  }
}

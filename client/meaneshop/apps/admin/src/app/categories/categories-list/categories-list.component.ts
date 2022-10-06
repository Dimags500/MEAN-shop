import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category } from '@meaneshop/products';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'meaneshop-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [],
})
export class CategoriesListComponent implements OnInit {
  categories: Category[] = [];

  constructor(
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this._getCategories();
  }

  editCategory(categoryId: string) {
    alert('edit');
  }

  deleteCategory(categoryId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete Category?',
      header: 'Delete Category',
      icon: 'pi pi-trash',
      accept: () => {
        return this.categoriesService.deleteCategory(categoryId).subscribe(
          (res) => {
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
      reject: (type) => {},
    });
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe((res) => {
      this.categories = res;
    });
  }
}

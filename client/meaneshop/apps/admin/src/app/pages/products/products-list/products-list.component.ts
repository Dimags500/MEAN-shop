import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductsService } from '@meaneshop/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [],
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productsService: ProductsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getProducts();
  }

  editProduct(productId: any) {}
  deleteProduct(productId: any) {}

  private _getProducts() {
    this.productsService.getProducts().subscribe((res) => {
      this.products = res;
    });
  }
}

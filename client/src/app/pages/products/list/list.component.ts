import { Component, OnInit } from '@angular/core';
import { APIService } from './../../../services/api.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-products-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  constructor(private apiService: APIService, private router: Router) {}
  products: [Product];
  ngOnInit(): void {
    this.listAllProducts();
  }

  listAllProducts(): void {
    this.apiService.listAllProducts().subscribe(
      (data: { status: boolean; response: [Product] }) => {
        this.products = data.response;
      },
      (err) => {
        alert((err.error && err.error.response) || err.message);
      }
    );
  }
  navigateToNewProduct(): void {
    this.router.navigate([`/products/new`]);
  }

  navigateToProduct(id: string): void {
    this.router.navigate([`/products/${id}`]);
  }

  deleteProduct(event: MouseEvent, id: string): void {
    event.preventDefault();
    event.stopPropagation();
    this.apiService.deleteProducts([id]).subscribe(
      () => {
        alert('Product deleted');
        this.listAllProducts();
      },
      (err) => {
        alert((err.error && err.error.response) || err.message);
      }
    );
  }
}

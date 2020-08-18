import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  constructor(
    private apiService: APIService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  productId: string;
  product: Product;
  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.apiService.getProduct(Number(this.productId)).subscribe(
      (data: { response: Product; status: boolean }) => {
        this.product = data.response;
      },
      (err) => {
        alert((err.error && err.error.response) || err.message);
      }
    );
  }

  navigateToProducts(): void {
    this.router.navigate(['/products']);
  }

  navigateToNewProduct(): void {
    this.router.navigate(['/products/new']);
  }
}

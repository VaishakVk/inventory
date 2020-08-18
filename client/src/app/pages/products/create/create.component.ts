import { Component, OnInit, ViewChild } from '@angular/core';
import { APIService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  constructor(private apiService: APIService, private router: Router) {}
  @ViewChild('f') public productFrm: NgForm;
  model: Product = {
    name: '',
    short_name: '',
    description: '',
    price: 10,
  };
  ngOnInit(): void {}
  resetModel(): void {
    this.model = {
      name: '',
      short_name: '',
      description: '',
      price: 10,
    };
  }

  navigateToProducts(): void {
    this.router.navigate(['/products']);
  }

  onSubmit(): void {
    this.apiService
      .createProduct(
        this.model.name,
        this.model.short_name,
        this.model.price,
        this.model.description
      )
      .subscribe(
        () => {
          this.productFrm.resetForm();
          alert('Product created successfully!');
        },
        (err) => {
          console.log(err);
          alert((err.error && err.error.response) || err.message);
        }
      );
  }
}

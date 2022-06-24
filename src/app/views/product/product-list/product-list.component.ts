import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Pagination } from 'src/app/shared/models';
import { ProductFilter } from '../models';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  productList: any[] = [];
  titles: string[] = [
    "id",
    "name",
    "productImage",
  ];
  properties: string[] = [
    "id",
    "name",
    "mainImageUrl",
  ];
  filter: ProductFilter = new ProductFilter();
  pagination: Pagination = new Pagination();

  constructor(
    private router: Router,
    private productService: ProductService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.filter.page = 1;
    this.filter.size = 10;
  
    this.getproductList();
  }

  searchValue(): void {
    this.getproductList();
  }

  resetfilter() {
    let pagePagination = {
      page: this.filter.page,
      size: this.filter.size,
    };
    this.filter = new ProductFilter();
    this.filter.page = pagePagination.page;
    this.filter.size = pagePagination.size;
    this.getproductList();
  }

  getproductList() {
    this.spinner.show();
    this.productService.getAll(this.filter).subscribe(
      (res: any) => {
        this.productList = res.data.content;
        delete res.data.content;
        this.pagination = { ...this.filter, ...res.data };
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  setPageSize(pageSize) {
    if (pageSize == this.filter.size) return;
    this.filter.size = pageSize;
    this.getproductList();
  }

  setPageNumber(pageNumber: number) {
    if (pageNumber == this.filter.page) return;
    this.filter.page = pageNumber;
    this.getproductList();
  }
  navigateToEdit(event) {
    this.router.navigateByUrl(`/product/edit/${event.id}`);
  }
  navigateToView(event) {
    this.router.navigateByUrl(`/product/view/${event.id}`);
  }

  deleteproduct(item){
    this.spinner.show();
    this.productService.delete(item.id).subscribe(
      (res: any) => {
        this.getproductList();
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
      }
    )

  }

}

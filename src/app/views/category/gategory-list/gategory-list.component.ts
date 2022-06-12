import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Pagination } from 'src/app/shared/models';
import { Order } from '../../orders/models';
import { CategoryFilter } from '../models';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-gategory-list',
  templateUrl: './gategory-list.component.html',
  styleUrls: ['./gategory-list.component.scss']
})
export class GategoryListComponent implements OnInit {
  categoryList: Order[] = [];
  titles: string[] = [
    "id",
    "name",
    "description",
    "imageUrl",
    "basicImageForDesignUrl",
  ];
  properties: string[] = [
    "id",
    "name",
    "description",
    "imageUrl",
    "basicImageForDesignUrl",
  ];
  filter: CategoryFilter = new CategoryFilter();
  pagination: Pagination = new Pagination();

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.filter.page = 0;
    this.filter.size = 10;
  
    this.getCategoryList();
  }

  searchValue(): void {
    this.getCategoryList();
  }

  resetfilter() {
    let pagePagination = {
      page: this.filter.page,
      size: this.filter.size,
    };
    this.filter = new CategoryFilter();
    this.filter.page = pagePagination.page;
    this.filter.size = pagePagination.size;
    this.getCategoryList();
  }

  getCategoryList() {
    this.spinner.show();
    this.categoryService.getAll(this.filter).subscribe(
      (res: any) => {
        this.categoryList = res.data;
        delete res.Orders;
        this.pagination = { ...this.filter, ...res };
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
    this.getCategoryList();
  }

  setPageNumber(pageNumber: number) {
    if (pageNumber == this.filter.page) return;
    this.filter.page = pageNumber;
    this.getCategoryList();
  }
  navigateToEdit(event) {
    this.router.navigateByUrl(`/category/edit/${event.id}`);
  }
  navigateToView(event) {
    this.router.navigateByUrl(`/category/view/${event.id}`);
  }

  deleteCategory(item){
    this.spinner.show();
    this.categoryService.delete(item.id).subscribe(
      (res: any) => {
        this.getCategoryList();
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
      }
    )

  }

}

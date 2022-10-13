import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Pagination } from 'src/app/shared/models';
import { EmployeeBranches } from '../models';
import { EmployeeBranchesService } from '../services/employee-branches.service';

@Component({
  selector: 'app-employee-branches-list',
  templateUrl: './employee-branches-list.component.html',
  styleUrls: ['./employee-branches-list.component.scss']
})
export class EmployeeBranchesListComponent implements OnInit {
  employeeBranchesList: EmployeeBranches[] = [];
  titles: string[] = [
    "id",
    "createdAt",
    "title",
    "title",
    "description",
    "description",
    "address",
  ];
  properties: string[] = [
    "id",
    "createdAt",
    "title",
    "titleAr",
    "description",
    "description",
    "address",

  ];
  // filter: employeeBranchesFilter = new employeeBranchesFilter();
  filter:any = {};
  pagination: Pagination = new Pagination();

  currentId:number = null;


  constructor(
    private router: Router,
    private employeeBranchesService: EmployeeBranchesService,
    private spinner: NgxSpinnerService,
    public route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.currentId = this.route.snapshot.params.restaurantId
    this.filter.page = 1;
    this.filter.limit = 10;
  
    this.getemployeeBranchesList();
  }

  searchValue(): void {
    this.getemployeeBranchesList();
  }

  resetfilter() {
    let pagePagination = {
      page: this.filter.page,
      limit: this.filter.limit,
    };
    this.filter = {};
    this.filter.page = pagePagination.page;
    this.filter.limit = pagePagination.limit;
    this.getemployeeBranchesList();
  }

  getemployeeBranchesList() {
    this.spinner.show();
    this.employeeBranchesService.get(this.route.snapshot.params.restaurantId,this.filter).subscribe(
      (res: any) => {
        this.employeeBranchesList = res.data;
        delete res.data.content;
        this.pagination = res.meta;
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  setPagelimit(pagelimit) {
    if (pagelimit == this.filter.limit) return;
    this.filter.limit = pagelimit;
    this.getemployeeBranchesList();
  }

  setPageNumber(pageNumber: number) {
    if (pageNumber == this.filter.page) return;
    this.filter.page = pageNumber;
    this.getemployeeBranchesList();
  }
  navigateToEdit(event) {
    this.router.navigateByUrl(`/employee-branches/${this.route.snapshot.params.restaurantId}/edit/${event.id}`);
  }
  navigateToView(event) {
    this.router.navigateByUrl(`/employee-branches/${this.route.snapshot.params.restaurantId}/view/${event.id}`);
  }

  deleteEmployeeBranches(item){
    this.spinner.show();
    this.employeeBranchesService.delete('1',item.id).subscribe(
      (res: any) => {
        this.getemployeeBranchesList();
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
      }
    )

  }

}

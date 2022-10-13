import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Pagination } from 'src/app/shared/models';
import { EmployeeRoles } from '../models';
import { EmployeeRolesService } from '../services/employee-roles.service';

@Component({
  selector: 'app-employee-roles-list',
  templateUrl: './employee-roles-list.component.html',
  styleUrls: ['./employee-roles-list.component.scss']
})
export class EmployeeRolesListComponent implements OnInit {
  employeeRolesList: EmployeeRoles[] = [];
  titles: string[] = [
    "id",
    "createdAt",
    "name",
    "description",
  ];
  properties: string[] = [
    "id",
    "createdAt",
    "name",
    "description",
  ];
  // filter: employeeRolesFilter = new employeeRolesFilter();
  filter:any = {};
  pagination: Pagination = new Pagination();
  currentId:number = null;

  constructor(
    private router: Router,
    private employeeRolesService: EmployeeRolesService,
    private spinner: NgxSpinnerService,
    public route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.currentId = this.route.snapshot.params.restaurantId
    this.filter.page = 1;
    this.filter.limit = 10;
  
    this.getemployeeRolesList();
  }

  searchValue(): void {
    this.getemployeeRolesList();
  }

  resetfilter() {
    let pagePagination = {
      page: this.filter.page,
      limit: this.filter.limit,
    };
    this.filter = {};
    this.filter.page = pagePagination.page;
    this.filter.limit = pagePagination.limit;
    this.getemployeeRolesList();
  }

  getemployeeRolesList() {
    this.spinner.show();
    this.employeeRolesService.get(this.route.snapshot.params.restaurantId,this.filter).subscribe(
      (res: any) => {
        this.employeeRolesList = res.data;
        delete res.data.content;
        this.pagination = res.meta
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
    this.getemployeeRolesList();
  }

  setPageNumber(pageNumber: number) {
    if (pageNumber == this.filter.page) return;
    this.filter.page = pageNumber;
    this.getemployeeRolesList();
  }
  navigateToEdit(event) {
    this.router.navigateByUrl(`/employee-roles/${this.route.snapshot.params.restaurantId}/edit/${event.id}`);
  }
  navigateToView(event) {
    this.router.navigateByUrl(`/employee-roles/${this.route.snapshot.params.restaurantId}/view/${event.id}`);
  }

  deleteEmployeeRoles(item){
    this.spinner.show();
    this.employeeRolesService.delete('1',item.id).subscribe(
      (res: any) => {
        this.getemployeeRolesList();
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
      }
    )

  }

}
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { Pagination } from "src/app/shared/models";
import { RestaurantService } from "../services/restaurant.service";

@Component({
  selector: "app-restaurant-list",
  templateUrl: "./restaurant-list.component.html",
  styleUrls: ["./restaurant-list.component.scss"],
})
export class RestaurantListComponent implements OnInit {
  restaurantList: any[] = [];
  titles: string[] = ["id", "name", "name", "description", "description"];
  properties: string[] = [
    "id",
    "title",
    "titleAr",
    "description",
    "description",
  ];
  // filter: restaurantFilter = new restaurantFilter();
  filter: any = {};
  pagination: Pagination = new Pagination();

  constructor(
    private router: Router,
    private restaurantService: RestaurantService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.filter.page = 1;
    this.filter.limit = 10;

    this.getrestaurantList();
  }

  searchValue(): void {
    this.getrestaurantList();
  }

  resetfilter() {
    let pagePagination = {
      page: this.filter.page,
      limit: this.filter.limit,
    };
    this.filter = {};
    this.filter.page = pagePagination.page;
    this.filter.limit = pagePagination.limit;
    this.getrestaurantList();
  }

  getrestaurantList() {
    this.spinner.show();
    this.restaurantService.get(this.filter).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.restaurantList = res.data;
        this.pagination = { ...this.filter, ...res.meta };
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  setPagelimit(pagelimit) {
    if (pagelimit == this.filter.limit) return;
    this.filter.limit = pagelimit;
    this.getrestaurantList();
  }

  setPageNumber(pageNumber: number) {
    if (pageNumber == this.filter.page) return;
    this.filter.page = pageNumber;
    this.getrestaurantList();
  }
  navigateToEdit(event) {
    this.router.navigateByUrl(`/restaurant/edit/${event.id}`);
  }
  navigateToView(event) {
    this.router.navigateByUrl(`/restaurant/view/${event.id}`);
  }

  deleteRestaurant(item) {
    this.spinner.show();
    this.restaurantService.delete(item.id).subscribe(
      (res: any) => {
        this.getrestaurantList();
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }
  navigateTO(restaurant: { event: any; type: string }) {
    switch (restaurant.type) {
      case "category":
        this.router.navigateByUrl(`category/${restaurant.event.id}`);
        break;
      case "employeeRoles":
        this.router.navigateByUrl(`employee-roles/${restaurant.event.id}`);
        break;
      case "employeeBranches":
        this.router.navigateByUrl(`employee-branches/${restaurant.event.id}`);
        break;
      case "restaurantEmployee":
        this.router.navigateByUrl(`restaurant-employee/${restaurant.event.id}`);
        break;
      case "tables":
        this.router.navigateByUrl(`tables/${restaurant.event.id}`);
        break;
      case "permissions":
        this.router.navigateByUrl(`permissions/${restaurant.event.id}`);
        break;
      case "menusItems":
        this.router.navigateByUrl(`menus-items/${restaurant.event.id}`);
        break;

      default:
        break;
    }
  }
}

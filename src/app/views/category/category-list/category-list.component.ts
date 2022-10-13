import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { NotifierService } from "angular-notifier";
import { NgxSpinnerService } from "ngx-spinner";
import { ListComponent } from "src/app/shared/common";
import { CategoryService } from "../services/category.service";

@Component({
  selector: "app-category-list",
  templateUrl: "./category-list.component.html",
  styleUrls: ["./category-list.component.scss"],
})
export class CategoryListComponent
  extends ListComponent<any, any>
  implements OnInit
{

  currentId:number = null;
  constructor(
    private categoryService: CategoryService,
    public notifier: NotifierService,
    public spinner: NgxSpinnerService,
    public translate: TranslateService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(categoryService, notifier, spinner, translate, route, router);
    this.titles = [
      "image",
      "id",
      "createdAt",
      "name",
      "name",
      "description",
      "description",
      "slug",
    ];
    this.properties = [
      "image",
      "id",
      "createdAt",
      "name",
      "nameAr",
      "description",
      "descriptionAr",
      "slug",
    ];
    this.navigateTo = "category";
  }

  resetfilter() {
    let pagePagination = {
      page: this.filter.page,
      limit: this.filter.limit,
    };
    this.filter = {};
    this.filter.page = pagePagination.page;
    this.filter.limit = pagePagination.limit;
    this.getList();
  }

  ngOnInit(): void {
    this.currentId = this.route.snapshot.params.restaurantId
    this.getList();
  }

  getList() {
    this.spinner.show();
    this.categoryService.get(this.route.snapshot.params.restaurantId,this.filter).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.list = res.data;
        this.pagination = res.meta;
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
      }
    );
  }

  navigateToEdit(event) {
    this.router.navigateByUrl(`/category/${this.route.snapshot.params.restaurantId}/edit/${event.id}`);
  }
  navigateToView(event) {
    this.router.navigateByUrl(`/category/${this.route.snapshot.params.restaurantId}/view/${event.id}`);
  }

  deleteItem(item){
    this.spinner.show();
    this.categoryService.delete(this.route.snapshot.params.restaurantId,item.id).subscribe(
      (res: any) => {
        this.getList();
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
      }
    )
  }

}

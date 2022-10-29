import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { NotifierService } from "angular-notifier";
import { NgxSpinnerService } from "ngx-spinner";
import { ListComponent } from "src/app/shared/common";
import { MenusItemsService } from "../services/menus-items.service";

@Component({
  selector: "app-menus-items-list",
  templateUrl: "./menus-items-list.component.html",
  styleUrls: ["./menus-items-list.component.scss"],
})
export class MenusItemsListComponent
  extends ListComponent<any, any>
  implements OnInit
{
  currentId: number = null;
  constructor(
    private menusItemsService: MenusItemsService,
    public notifier: NotifierService,
    public spinner: NgxSpinnerService,
    public translate: TranslateService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(menusItemsService, notifier, spinner, translate, route, router);
    this.titles = [
      "id",
      "createdAt",
      "title",
      "titleAr",
      "description",
      "descriptionAr",
      "price",
    ];
    this.properties = [
      "id",
      "createdAt",
      "title",
      "titleAr",
      "description",
      "descriptionAr",
      "price",
    ];
    this.navigateTo = "menus-items";
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
    this.currentId = this.route.snapshot.params.restaurantId;
    this.getList();
  }

  getList() {
    this.spinner.show();
    this.menusItemsService
      .get(this.route.snapshot.params.restaurantId, this.filter)
      .subscribe(
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
    this.router.navigateByUrl(
      `/menus-items/${this.route.snapshot.params.restaurantId}/edit/${event.id}`
    );
  }
  navigateToView(event) {
    this.router.navigateByUrl(
      `/menus-items/${this.route.snapshot.params.restaurantId}/view/${event.id}`
    );
  }

  deleteItem(item) {
    this.spinner.show();
    this.menusItemsService
      .delete(this.route.snapshot.params.restaurantId, item.id)
      .subscribe(
        (res: any) => {
          this.getList();
          this.spinner.hide();
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }

  navigateTO(menuItem: { event: any; type: string }) {
    switch (menuItem.type) {
      case "variations":
        this.router.navigateByUrl(
          `variation/${this.route.snapshot.params.restaurantId}/list/${menuItem.event.id}`
        );
        break;

      default:
        break;
    }
  }
}

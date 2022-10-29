import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { NotifierService } from "angular-notifier";
import { NgxSpinnerService } from "ngx-spinner";
import { ListComponent } from "src/app/shared/common";
import { AttributesService } from "../services/attributes.service";

@Component({
  selector: "app-attributes-list",
  templateUrl: "./attributes-list.component.html",
  styleUrls: ["./attributes-list.component.scss"],
})
export class AttributesListComponent
  extends ListComponent<any, any>
  implements OnInit
{
  currentId: number = null;
  constructor(
    private attributesService: AttributesService,
    public notifier: NotifierService,
    public spinner: NgxSpinnerService,
    public translate: TranslateService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(attributesService, notifier, spinner, translate, route, router);
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
    this.navigateTo = "attributes";
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
    this.attributesService
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
      `/attributes/${this.route.snapshot.params.restaurantId}/edit/${event.id}`
    );
  }
  navigateToView(event) {
    this.router.navigateByUrl(
      `/attributes/${this.route.snapshot.params.restaurantId}/view/${event.id}`
    );
  }

  deleteItem(item) {
    this.spinner.show();
    this.attributesService
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

  navigateTO(attributes: { event: any; type: string }) {
    switch (attributes.type) {
      case "attributeValues":
        this.router.navigateByUrl(`attribute-values/${this.route.snapshot.params.restaurantId}/list/${attributes.event.id}`);
        break;

      default:
        break;
    }
  }
}

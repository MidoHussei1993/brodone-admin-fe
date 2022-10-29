import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { NotifierService } from "angular-notifier";
import { NgxSpinnerService } from "ngx-spinner";
import { ListComponent } from "src/app/shared/common";
import { AttributesValuesService } from "../services/attributes-values.service";

@Component({
  selector: "app-attributes-values-list",
  templateUrl: "./attributes-values-list.component.html",
  styleUrls: ["./attributes-values-list.component.scss"],
})
export class AttributesValuesListComponent
  extends ListComponent<any, any>
  implements OnInit
{
  currentId: number = null;
  attributeId: number = null;

  constructor(
    private attributesValuesService: AttributesValuesService,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public notifier: NotifierService,
    public translate: TranslateService,
    public spinner: NgxSpinnerService,
    public router: Router
  ) {
    super(attributesValuesService, notifier, spinner, translate, route, router);
    this.titles = ["createdAt", "title", "titleAr", "description", "description"];
    this.properties = [
      "createdAt",
      "value",
      "valueAr",
      "description",
      "descriptionAr",
    ];
  }

  ngOnInit(): void {
    this.currentId = this.route.snapshot.params.restaurantId;
    this.attributeId = this.route.snapshot.params.attributeId;
    this.getList();
  }

  getList() {
    this.spinner.show();
    this.attributesValuesService.get(this.route.snapshot.params.restaurantId,this.route.snapshot.params.attributeId,this.filter).subscribe(
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
      `/attribute-values/${this.route.snapshot.params.restaurantId}/edit/${this.route.snapshot.params.attributeId}/${event.id}`
    );
  }
  navigateToView(event) {
    this.router.navigateByUrl(
      `/attribute-values/${this.route.snapshot.params.restaurantId}/view/${this.route.snapshot.params.attributeId}/${event.id}`
    );
  }
}

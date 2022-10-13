import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { NotifierService } from "angular-notifier";
import { NgxSpinnerService } from "ngx-spinner";
import { Crud, Pattern } from "src/app/shared/common";
import { FormMode } from "src/app/shared/models";
import { RestaurantEmplooyeesService } from "../services/restaurant-emplooyees.service";

@Component({
  selector: "app-restaurant-employee-crud",
  templateUrl: "./restaurant-employee-crud.component.html",
  styleUrls: ["./restaurant-employee-crud.component.scss"],
})
export class RestaurantEmployeeCrudComponent extends Crud implements OnInit {
  constructor(
    private restaurantEmplooyeesService: RestaurantEmplooyeesService,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public notifier: NotifierService,
    public translate: TranslateService,
    public spinner: NgxSpinnerService
  ) {
    super(restaurantEmplooyeesService, notifier, spinner, translate, route);
    this.form = this.formBuilder.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      email: ["", [Validators.required]],
      password: ["", [Validators.required]],
      countryCode: ["", [Validators.required]],
      phoneNumber: ["", [Validators.required]],
    });
    this.mode = this.route.snapshot.data.mode;
    this.currentLanguage = this.translate.currentLang;
    if (this.mode === FormMode.View) {
      this.form.disable();
    }
  }

  ngOnInit(): void {
    if (this.mode == FormMode.Edit || this.mode == FormMode.View) {
      this.getById(this.route.snapshot.params.id);
    }
  }

  getById(id: number) {
    this.busyLoading = true;
    this.spinner.show();
    this.restaurantEmplooyeesService
      .getById(+this.route.snapshot.params.restaurantId, id)
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.busyLoading = false;
          this.form.patchValue(res);
        },
        (err) => {
          this.spinner.hide();
          this.busyLoading = false;
        }
      );
  }

  create() {
    let body = this.form.value;
    this.spinner.show();
    this.restaurantEmplooyeesService
      .create(this.route.snapshot.params.restaurantId, body)
      .subscribe(
        (result) => {
          this.spinner.hide();
          this.form.reset();
          // this.form.get('id').patchValue(0);
          this.notifier.notify("success", this.translate.instant("created"));
        },
        (err) => {
          this.spinner.hide();
          // this.notifier.notify('error',err)
        }
      );
  }
  edit() {
    let body = this.form.value;
    this.spinner.show();
    this.restaurantEmplooyeesService
      .edit(
        +this.route.snapshot.params.restaurantId,
        this.route.snapshot.params.id,
        body
      )
      .subscribe(
        (result) => {
          this.spinner.hide();
          this.notifier.notify("success", this.translate.instant("edited"));
        },
        (err) => {
          this.spinner.hide();
          // this.notifier.notify('error',err)
        }
      );
  }
}

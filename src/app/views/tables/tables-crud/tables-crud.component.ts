import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { NotifierService } from "angular-notifier";
import { NgxSpinnerService } from "ngx-spinner";
import { Crud, Pattern } from "src/app/shared/common";
import { FormMode } from "src/app/shared/models";
import { EmployeeBranchesService } from "../../employee-branches/services/employee-branches.service";
import { TablesService } from "../services/tables.service";

@Component({
  selector: "app-tables-crud",
  templateUrl: "./tables-crud.component.html",
  styleUrls: ["./tables-crud.component.scss"],
})
export class TablesCrudComponent extends Crud implements OnInit {
  branchList: any[] = [];
  constructor(
    private tablesService: TablesService,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public notifier: NotifierService,
    public translate: TranslateService,
    public spinner: NgxSpinnerService,
    public branchesService: EmployeeBranchesService
  ) {
    super(tablesService, notifier, spinner, translate, route);
    this.form = this.formBuilder.group({
      capacity: ["", [Validators.required]],
      status: ["", [Validators.required]],
      qrCode: ["", [Validators.required]],
      branchId: ["", [Validators.required]],
    });
    this.mode = this.route.snapshot.data.mode;
    this.currentLanguage = this.translate.currentLang;
    if (this.mode === FormMode.View) {
      this.form.disable();
    }
  }

  ngOnInit(): void {
    this.getBranchList();
    if (this.mode == FormMode.Edit || this.mode == FormMode.View) {
      this.getById();
    }
  }
  getBranchList() {
    this.branchesService
      .get(this.route.snapshot.params.restaurantId, { limit: 50 })
      .subscribe(
        (res: any) => {
          this.branchList = res.data;
          this.spinner.hide();
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }

  getById() {
    this.busyLoading = true;
    this.spinner.show();
    this.tablesService
      .getById(
        +this.route.snapshot.params.restaurantId,
        this.route.snapshot.params.id
      )
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
    this.tablesService
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
    this.tablesService
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

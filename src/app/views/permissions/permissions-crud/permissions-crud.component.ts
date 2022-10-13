import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { NotifierService } from "angular-notifier";
import { NgxSpinnerService } from "ngx-spinner";
import { Crud, Pattern } from "src/app/shared/common";
import { FormMode } from "src/app/shared/models";
import { EmployeeRolesService } from "../../employee-roles/services/employee-roles.service";
import { PermissionsService } from "../services/permissions.service";

@Component({
  selector: "app-permissions-crud",
  templateUrl: "./permissions-crud.component.html",
  styleUrls: ["./permissions-crud.component.scss"],
})
export class PermissionsCrudComponent extends Crud implements OnInit {
  actionList: any[] = [
    {
      name: 'create',
      selected:false,
    },
    {
      name: 'read',
      selected:false,
    },
    {
      name: 'update',
      selected:false,
    },
    {
      name: 'delete',
      selected:false,
    },
  ];
  roleList: any[] = [];
  constructor(
    private permissionsService: PermissionsService,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public notifier: NotifierService,
    public translate: TranslateService,
    public spinner: NgxSpinnerService,
    public employeeRolesService: EmployeeRolesService,
  ) {
    super(permissionsService, notifier, spinner, translate, route);
    this.form = this.formBuilder.group({
      roleId: ["", [Validators.required]],
      resourceId: ["", [Validators.required]],
      restaurantId: [+this.route.snapshot.params.restaurantId],
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
    this.getRoleList()
  }
  getRoleList() {
    this.employeeRolesService
      .get(this.route.snapshot.params.restaurantId, { limit: 50 })
      .subscribe(
        (res: any) => {
          this.roleList = res.data;
          this.spinner.hide();
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }

  getResourceList() {
    this.employeeRolesService
      .get(this.route.snapshot.params.restaurantId, { limit: 50 })
      .subscribe(
        (res: any) => {
          this.roleList = res.data;
          this.spinner.hide();
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }

  getById(id: number) {
    this.busyLoading = true;
    this.spinner.show();
    this.permissionsService
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
    this.permissionsService
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
    this.permissionsService
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

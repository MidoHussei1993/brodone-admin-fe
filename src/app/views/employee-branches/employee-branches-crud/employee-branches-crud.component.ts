import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { NotifierService } from "angular-notifier";
import { NgxSpinnerService } from "ngx-spinner";
import { Crud, Pattern } from "src/app/shared/common";
import { FormMode } from "src/app/shared/models";
import { TagService } from "../../tags/services/tag.service";
import { EmployeeBranchesService } from "../services/employee-branches.service";

@Component({
  selector: "app-employee-branches-crud",
  templateUrl: "./employee-branches-crud.component.html",
  styleUrls: ["./employee-branches-crud.component.scss"],
})
export class EmployeeBranchesCrudComponent extends Crud implements OnInit {
  constructor(
    private employeeBranchesService: EmployeeBranchesService,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public notifier: NotifierService,
    public translate: TranslateService,
    public spinner: NgxSpinnerService
  ) {
    super(employeeBranchesService, notifier, spinner, translate, route);
    this.form = this.formBuilder.group({
      title: [
        "",
        [
          Validators.required,
          Validators.pattern(Pattern.OnlyEnglishLettersAndSpace),
        ],
      ],
      titleAr: [
        "",
        [Validators.required, Validators.pattern(Pattern.OnlyArabicLetters)],
      ],
      description: [
        "",
        [
          Validators.required,
          Validators.pattern(Pattern.OnlyEnglishLettersAndSpace),
        ],
      ],
      descriptionAr: [
        "",
        [Validators.required, Validators.pattern(Pattern.OnlyArabicLetters)],
      ],
      address: ["", [Validators.required]],
      featuredImage: ["3", [Validators.required]],
      lat: [22, [Validators.required]],
      lng: [22, [Validators.required]],
      phoneNumbers: new FormArray([], Validators.required),
    });
    this.mode = this.route.snapshot.data.mode;
    this.currentLanguage = this.translate.currentLang;
    if (this.mode === FormMode.View) {
      this.form.disable();
    }
  }

  ngOnInit(): void {
    if (this.mode == FormMode.Edit || this.mode == FormMode.View) {
      this.getById();
    }
  }

  getById() {
    this.busyLoading = true;
    this.spinner.show();
    this.employeeBranchesService
      .getById(
        this.route.snapshot.params.restaurantId,
        this.route.snapshot.params.id
      )
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.busyLoading = false;
          this.form.patchValue(res);
          if (res.phoneNumbers) {
            if (Array.isArray(res.phoneNumbers)) {
              res.phoneNumbers.map((phone) => {
                this.addForm("phoneNumbers", this.initPhoneItem(phone));
              });
            }
          }
          this.locationList = [{
            lat: +res.lat,
            lng: +res.lng
          }]
        },
        (err) => {
          this.spinner.hide();
          this.busyLoading = false;
        }
      );
  }

  create() {
    let body = this.form.value;
    body.phoneNumbers = body.phoneNumbers.map(({ phone }) => String(phone));
    this.spinner.show();
    this.employeeBranchesService
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
    body.phoneNumbers = body.phoneNumbers.map(({ phone }) => String(phone));
    this.spinner.show();
    this.employeeBranchesService
      .edit(
        this.route.snapshot.params.restaurantId,
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

  setMarkerLocation(propName: string) {
    if (propName == "latitude") {
      this.locationList[0].lat = this.form.get("lat").value;
    } else {
      this.locationList[0].lng = this.form.get("lng").value;
    }
  }

  removeItem(index: number) {
    (this.form.get("phoneNumbers") as FormArray).removeAt(index);
  }

  initPhoneItem(val = "") {
    const form = this.formBuilder.group({
      phone: [val, Validators.required],
    });
    return form;
  }
}

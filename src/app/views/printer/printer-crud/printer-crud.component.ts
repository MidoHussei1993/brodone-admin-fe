import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { NotifierService } from "angular-notifier";
import { NgxSpinnerService } from "ngx-spinner";
import { FormMode } from "src/app/shared/models";
import { PrintHouseService } from "src/app/shared/services/print-house.service";

@Component({
  selector: "app-printer-crud",
  templateUrl: "./printer-crud.component.html",
  styleUrls: ["./printer-crud.component.scss"],
})
export class PrinterCrudComponent implements OnInit {
  mode: FormMode;
  form: FormGroup;
  busyLoading: boolean = false;
  currentLanguage: string = "";
  formSubmited;
  cityList: any[] = [];
  rigionList: any[] = [];
  regionId: number = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private printHouseService: PrintHouseService,
    private notifier: NotifierService,
    private translate: TranslateService,
    private spinner: NgxSpinnerService
  ) {
    this.form = this.formBuilder.group({
      phoneNo: ["", [Validators.required]],
      password: ["", [Validators.required]],
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      email: ["", [Validators.required]],
      cityId: ["", [Validators.required]],
      businessClassification: ["", [Validators.required]],
      photoUrl: [""],
      compnayName: ["", [Validators.required]],
      managerName: ["", [Validators.required]],
      tradMark: ["", [Validators.required]],
      crno: ["", [Validators.required]],
    });

    this.mode = this.route.snapshot.data.mode;
    this.currentLanguage = this.translate.currentLang;
    if (this.mode === FormMode.View) {
      // this.isView = true;
      this.form.disable();
    }
  }

  ngOnInit(): void {
    this.getCityDropdown();
    if (this.mode == FormMode.Edit || this.mode == FormMode.View) {
      this.form.addControl(
        "id",
        new FormControl(this.route.snapshot.params.id, Validators.required)
      );
      this.getprinterById(this.route.snapshot.params.id);
    }
  }

  getCityDropdown() {
    this.printHouseService.getCityDropdown().subscribe((res) => {
      this.rigionList = res.responsePayload;
    });
  }

  getRegionCities(regionId) {
    console.log(regionId);
    this.printHouseService.getRegionCities(regionId).subscribe((res) => {
      this.cityList = res.responsePayload;
    });
  }

  getprinterById(id: number) {
    this.busyLoading = true;
    this.spinner.show();
    this.printHouseService.getById(id).subscribe(
      (res) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.form.patchValue(res.responsePayload);
        this.regionId = res.responsePayload.regionId;
        this.getRegionCities(this.regionId);
      },
      (err) => {
        this.spinner.hide();
        this.busyLoading = false;
      }
    );
  }

  submit() {
    this.form.markAllAsTouched();
    console.log(this.form);
    if (!this.form.valid) return;
    console.log(this.form);
    if (this.mode === FormMode.Create) {
      this.create();
    } else {
      this.edit();
    }
  }
  create() {
    let body = this.form.value;
    this.spinner.show();
    this.printHouseService.create(body).subscribe(
      (result) => {
        this.form.reset();
        // this.form.get('id').patchValue(0);
        this.spinner.hide();
        this.notifier.notify("success", this.translate.instant("created"));
      },
      (err) => {
        this.spinner.hide();
        this.notifier.notify("error", err.error.message);
      }
    );
  }
  edit() {
    let body = this.form.value;
    body.id = this.route.snapshot.params.id;
    this.spinner.show();
    this.printHouseService.update(body).subscribe(
      (result) => {
        this.spinner.hide();
        this.notifier.notify("success", this.translate.instant("edited"));
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
        this.notifier.notify("error", err.error.message);
      }
    );
  }
}

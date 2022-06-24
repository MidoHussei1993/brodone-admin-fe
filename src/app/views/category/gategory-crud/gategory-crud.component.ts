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
import { CategoryService } from "../services/category.service";

@Component({
  selector: "app-gategory-crud",
  templateUrl: "./gategory-crud.component.html",
  styleUrls: ["./gategory-crud.component.scss"],
})
export class GategoryCrudComponent implements OnInit {
  mode: FormMode;
  form: FormGroup;
  busyLoading: boolean = false;
  currentLanguage: string = "";
  formSubmited;
  categoryImage: string = null;
  canvasImage: string = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private notifier: NotifierService,
    private translate: TranslateService,
    private spinner: NgxSpinnerService
  ) {
    this.form = this.formBuilder.group({
      name: ["", [Validators.required]],
      description: ["", [Validators.required]],
    });

    this.mode = this.route.snapshot.data.mode;
    this.currentLanguage = this.translate.currentLang;
    if (this.mode === FormMode.View) {
      // this.isView = true;
      this.form.disable();
    }
  }

  ngOnInit(): void {
    if (this.mode == FormMode.Edit || this.mode == FormMode.View) {
      this.getCategoryImage();
      this.getCategoryCanvas();
      this.form.addControl(
        "id",
        new FormControl(this.route.snapshot.params.id, Validators.required)
      );
      // this.form.addControl("imageUrl", new FormControl(""));
      // this.form.addControl("basicImageForDesignUrl", new FormControl(""));
      this.getCatecoryById(this.route.snapshot.params.id);
    }
  }

  getCategoryImage() {
    this.spinner.show();
    this.categoryService
      .getCategoryImage(this.route.snapshot.params.id)
      .subscribe(
        (res) => {
          this.spinner.hide();
          if (!res.responsePayload) return;
          this.categoryImage = res.responsePayload.image;
        },
        (err) => {
          this.spinner.show();
          this.busyLoading = false;
        }
      );
  }
  uploadCategoryImage(event) {
    this.spinner.show();
    this.categoryService
      .uploadCategoryImage({
        id: this.route.snapshot.params.id,
        file: event.target.files[0],
      })
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.getCatecoryById(this.route.snapshot.params.id);
        },
        (err) => {
          this.spinner.show();
        }
      );
  }

  getCategoryCanvas() {
    this.spinner.show();
    this.categoryService
      .getCategoryCanvas(this.route.snapshot.params.id)
      .subscribe(
        (res) => {
          this.spinner.hide();
          if (!res.responsePayload) return;
          this.canvasImage = res.responsePayload.image;
        },
        (err) => {
          this.spinner.show();
          this.busyLoading = false;
        }
      );
  }
  uploadCategoryCanvas(event) {
    this.spinner.show();
    this.categoryService
      .uploadCategoryCanvas({
        id: this.route.snapshot.params.id,
        file: event.target.files[0],
      })
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.getCatecoryById(this.route.snapshot.params.id);
        },
        (err) => {
          this.spinner.show();
        }
      );
  }

  getCatecoryById(id: number) {
    this.busyLoading = true;
    this.spinner.show();
    this.categoryService.getById(id).subscribe(
      (res) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.form.patchValue(res.data);
      },
      (err) => {
        this.spinner.show();
        this.busyLoading = false;
      }
    );
  }

  submit() {
    this.form.markAllAsTouched();
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
    this.categoryService.create(body).subscribe(
      (result) => {
        this.form.reset();
        // this.form.get('id').patchValue(0);
        this.spinner.hide();
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
    this.categoryService.update(body).subscribe(
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

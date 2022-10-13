import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { NotifierService } from "angular-notifier";
import { NgxSpinnerService } from "ngx-spinner";
import { Crud, Pattern } from "src/app/shared/common";
import { FormMode } from "src/app/shared/models";
import { AttributesValuesService } from "../services/attributes-values.service";

@Component({
  selector: "app-attributes-values-crud",
  templateUrl: "./attributes-values-crud.component.html",
  styleUrls: ["./attributes-values-crud.component.scss"],
})
export class AttributesValuesCrudComponent extends Crud implements OnInit {
  constructor(
    private attributesValuesService: AttributesValuesService,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public notifier: NotifierService,
    public translate: TranslateService,
    public spinner: NgxSpinnerService
  ) {
    super(attributesValuesService, notifier, spinner, translate, route);
    this.form = this.formBuilder.group({
      value: [
        "",
        [
          Validators.required,
          Validators.pattern(Pattern.OnlyEnglishLettersAndSpace),
        ],
      ],
      valueAr: [
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
    this.attributesValuesService
      .getById(
        this.route.snapshot.params.attributeId,
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
    this.attributesValuesService
      .create(this.route.snapshot.params.attributeId, body)
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
    this.attributesValuesService
      .edit(
        this.route.snapshot.params.attributeId,
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

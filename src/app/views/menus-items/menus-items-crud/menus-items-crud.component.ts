import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { NotifierService } from "angular-notifier";
import { NgxSpinnerService } from "ngx-spinner";
import { Crud, Pattern } from "src/app/shared/common";
import { FormMode } from "src/app/shared/models";
import { AttributesValuesService } from "../../attributes-values/services/attributes-values.service";
import { AttributesService } from "../../attributes/services/attributes.service";
import { CategoryService } from "../../category/services/category.service";
import { MenusItemsService } from "../services/menus-items.service";

@Component({
  selector: "app-menus-items-crud",
  templateUrl: "./menus-items-crud.component.html",
  styleUrls: ["./menus-items-crud.component.scss"],
})
export class MenusItemsCrudComponent extends Crud implements OnInit {
  attributesList: any[] = [];
  attributesValuesList: any = {};
  categoryList: any[] = [];
  constructor(
    private menuItemsService: MenusItemsService,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public notifier: NotifierService,
    public translate: TranslateService,
    public spinner: NgxSpinnerService,
    private attributesService: AttributesService,
    private attributesValuesService: AttributesValuesService,
    private categoryService: CategoryService
  ) {
    super(menuItemsService, notifier, spinner, translate, route);
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
      price: ["", [Validators.required]],
      categoryId: ["", [Validators.required]],
      variations: new FormArray([]),
    });
    this.mode = this.route.snapshot.data.mode;
    this.currentLanguage = this.translate.currentLang;
    if (this.mode === FormMode.View) {
      this.form.disable();
    }
    if (this.mode === FormMode.Create) {
      this.addVariationsForm();
    }
  }

  ngOnInit(): void {
    if (this.mode == FormMode.Edit || this.mode == FormMode.View) {
      this.getById(this.route.snapshot.params.id);
    }
    this.getAttributesList();
    this.getCategoryList();
  }

  getById(id: number) {
    this.busyLoading = true;
    this.spinner.show();
    this.menuItemsService
      .getById(this.route.snapshot.params.restaurantId, id)
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.busyLoading = false;
          res.price = +res.price;
          this.form.patchValue(res);
          res.variations.map((item) => this.addVariationsForm(item));
        },
        (err) => {
          this.spinner.hide();
          this.busyLoading = false;
        }
      );
  }

  addVariationsForm(
    item = {
      description: "",
      descriptionAr: "",
      media: [],
      price: "",
      title: "",
      titleAr: "",
      variationAttributeValues: [],
    }
  ) {
    let AttributeForm = new FormArray([], [Validators.required]);
    if (item.variationAttributeValues.length) {
      item.variationAttributeValues.map((attribute) =>
        AttributeForm.push(this.addAttributesForm(attribute))
      );
    }
    const form = this.formBuilder.group({
      title: [
        item.title,
        [
          Validators.required,
          Validators.pattern(Pattern.OnlyEnglishLettersAndSpace),
        ],
      ],
      titleAr: [
        item.titleAr,
        [Validators.required, Validators.pattern(Pattern.OnlyArabicLetters)],
      ],
      description: [
        item.description,
        [
          Validators.required,
          Validators.pattern(Pattern.OnlyEnglishLettersAndSpace),
        ],
      ],
      descriptionAr: [
        item.descriptionAr,
        [Validators.required, Validators.pattern(Pattern.OnlyArabicLetters)],
      ],
      price: [+item.price, [Validators.required]],
      attributes: AttributeForm,
      media: new FormArray([
        this.formBuilder.group({
          type: ["IMAGE", [Validators.required]],
          path: ["dd", [Validators.required]],
        }),
      ]),
    });

    this.addForm("variations", form);
  }

  // addForm(controlName,formGroup:FormGroup) {
  //   (this.form.controls.variations).push(formGroup);
  // }
  addAttributesForm(item = { attributeId: "", attributeValueId: null }) {
    if (item.attributeId) {
      this.getAttributesValuesList(item.attributeId)
    }
    const form = this.formBuilder.group({
      attributeId: [+item.attributeId, [Validators.required]],
      attributeValueId: [+item.attributeValueId, [Validators.required]],
    });
    return form;
  }
  getAttributesList() {
    this.attributesService
      .get(this.route.snapshot.params.restaurantId, { limit: 50 })
      .subscribe(
        (res: any) => {
          this.attributesList = res.data;
          this.spinner.hide();
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }

  getCategoryList() {
    this.categoryService
      .get(this.route.snapshot.params.restaurantId, { limit: 50 })
      .subscribe(
        (res: any) => {
          this.categoryList = res.data;
          this.spinner.hide();
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }
  deleteVariation(i){
    (this.form.get('variations') as FormArray).removeAt(i)
  }
  addNewAttribute(index) {
    let form: any = (this.form.controls.variations as FormArray)
      .at(index)
      .get("attributes");
    form.push(this.addAttributesForm());
  }
  deleteNewAttribute(index, attributeIndex) {
    let form: any = (this.form.controls.variations as FormArray)
      .at(index)
      .get("attributes");
    form.removeAt(attributeIndex);
  }
  getAttributesValuesList(id) {
    this.attributesValuesService
      .get(this.route.snapshot.params.restaurantId, id, { limit: 50 })
      .subscribe(
        (res: any) => {
          if(!this.attributesValuesList[id]) this.attributesValuesList[id]= []
          this.attributesValuesList[id] = res.data;
          this.spinner.hide();
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }

  create() {
    let body = this.form.value;
    this.spinner.show();
    this.menuItemsService
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
    this.menuItemsService
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
}

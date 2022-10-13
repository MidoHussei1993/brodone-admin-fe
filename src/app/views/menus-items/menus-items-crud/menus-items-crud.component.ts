import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Crud, Pattern } from 'src/app/shared/common';
import { FormMode } from 'src/app/shared/models';
import { AttributesService } from '../../attributes/services/attributes.service';
import { CategoryService } from '../../category/services/category.service';
import { MenusItemsService } from '../services/menus-items.service';

@Component({
  selector: 'app-menus-items-crud',
  templateUrl: './menus-items-crud.component.html',
  styleUrls: ['./menus-items-crud.component.scss']
})
export class MenusItemsCrudComponent   extends Crud implements OnInit {
  attributesList: any[] = [];
  attributesValuesList: any[] = [];
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
    private categoryService: CategoryService,
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

  addVariationsForm() {
    const form = this.formBuilder.group({
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
      attributes:  new FormArray([
        this.formBuilder.group({
          attributeId: ["", [Validators.required]],
          attributeValueId: ["", [Validators.required]],
        })
      ], [Validators.required]),
      media: new FormArray([
        this.formBuilder.group({
          type: ["ddd", [Validators.required]],
          path: ["dd", [Validators.required]],
        })
      ]),
    });

    this.addForm("variations", form);
  }

  // addForm(controlName,formGroup:FormGroup) {
  //   (this.form.controls.variations).push(formGroup);
  // }
  addAttributesForm() {
    const form = this.formBuilder.group({
      attributeId: ["", [Validators.required]],
      attributeValueId: ["", [Validators.required]],
    });
    return form;
  }
  getAttributesList() {
    this.attributesService.get(this.route.snapshot.params.restaurantId,{ limit: 50 }).subscribe(
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
    this.categoryService.get(this.route.snapshot.params.restaurantId,{ limit: 50 }).subscribe(
      (res: any) => {
        this.categoryList = res.data;
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }
  addNewAttribute(index){
    let form:any = (this.form.controls.variations as FormArray).at(index).get('attributes');
    form.push(this.addAttributesForm());
  }
  deleteNewAttribute(index,attributeIndex){
    let form:any = (this.form.controls.variations as FormArray).at(index).get('attributes');
    form.removeAt(attributeIndex)
  }
  getAttributesValuesList(id) {
    this.attributesValuesList = [];
    this.attributesValuesService.get(id, { limit: 50 }).subscribe(
      (res: any) => {
        this.attributesValuesList = res.data;
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }
}

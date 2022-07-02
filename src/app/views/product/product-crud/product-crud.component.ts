import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormArray,
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { NotifierService } from "angular-notifier";
import { NgxSpinnerService } from "ngx-spinner";
import { FormMode } from "src/app/shared/models";
import { CategoryService } from "../../category/services/category.service";
import { ProductService } from "../services/product.service";

interface IColor {
  colorName: string;
  hexa: string;
  id: number;
  rbg: string;
  selected: boolean;
}

@Component({
  selector: "app-product-crud",
  templateUrl: "./product-crud.component.html",
  styleUrls: ["./product-crud.component.scss"],
})
export class ProductCrudComponent implements OnInit {
  @ViewChild("priceItemForm", { static: false }) priceItemForm;
  @ViewChild("uploadImageModal", { static: false }) uploadImageModal;

  mode: FormMode;
  priceForm: FormGroup;
  form: FormGroup;
  busyLoading: boolean = false;
  currentLanguage: string = "";
  colorList: IColor[] = [];
  sizeList: { id: number; sizeCode: string; selected: boolean }[] = [];
  categoryList: any[] = [];
  mainObject: any = {};
  imageObject: { image: any; id: number; order: number } = {
    id: null,
    image: null,
    order: null,
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private notifier: NotifierService,
    private translate: TranslateService,
    private spinner: NgxSpinnerService,
    private categoryService: CategoryService,
    private modalService: NgbModal
  ) {
    this.form = this.formBuilder.group({
      name: ["", [Validators.required]],
      description: ["", [Validators.required]],
      categoryId: ["", [Validators.required]],
      imageOverlayCost: ["", [Validators.required]],
      imageOverlayEnabled: ["", [Validators.required]],
      pricingList: new FormArray([], [Validators.required]),
    });

    this.priceForm = this.formBuilder.group({
      fromQuantity: [null, [Validators.required]],
      toQuantity: [null, [Validators.required]],
      price: [null, [Validators.required]],
    });

    this.mode = this.route.snapshot.data.mode;
    this.currentLanguage = this.translate.currentLang;
    if (this.mode === FormMode.View) {
      this.form.disable();
    }
  }

  ngOnInit(): void {
    this.imageObject.id = this.route.snapshot.params.id;
    if (this.mode == FormMode.Edit || this.mode == FormMode.View) {
      this.getProductById(this.route.snapshot.params.id);
    } else {
      this.getCategoryDropdown();
      this.getColors();
      this.getSizesList();
    }
  }

  getProductById(id: number) {
    this.busyLoading = true;
    this.spinner.show();
    this.productService.getById(id).subscribe(
      (res) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.form.patchValue({ ...res.data, ...res.data.designDetails });
        this.mainObject = res.data;
        this.getCategoryDropdown();
        this.getColors();
        this.getSizesList();
        res.data.pricingList.map((item) => this.AddInPricingList(item));
      },
      (err) => {
        this.spinner.show();
        this.busyLoading = false;
      }
    );
  }
  getCategoryDropdown() {
    this.categoryService.getDropdown().subscribe((res) => {
      this.categoryList = res.data;
    });
  }

  getColors() {
    this.productService.getColors().subscribe((res) => {
      this.colorList = res.map((item) => {
        item.selected = false;
        return item;
      });

      if (this.mode == FormMode.Edit || this.mode == FormMode.View) {
        this.colorList.map((color) => {
          this.mainObject.availableColors.map((item) => {
            if (color.id == item.id) {
              color.selected = true;
            }
          });
        });
      }
    });
  }

  getSizesList() {
    this.productService.getSizesList().subscribe((res) => {
      this.sizeList = res.map((item) => {
        item.selected = false;
        return item;
      });

      if (this.mode == FormMode.Edit || this.mode == FormMode.View) {
        this.sizeList.map((size) => {
          this.mainObject.availableSizes.map((item) => {
            if (size.sizeCode == item.sizeLabel) {
              size.selected = true;
            }
          });
        });
      }
    });
  }

  AddInPricingList(item) {
    (this.form.controls.pricingList as FormArray).push(
      this.formBuilder.group({
        fromQuantity: [item.fromQuantity, [Validators.required]],
        toQuantity: [item.toQuantity, [Validators.required]],
        price: [item.price, [Validators.required]],
      })
    );
  }

  addToPriceList() {
    (this.form.controls.pricingList as FormArray).push(
      this.formBuilder.group({
        fromQuantity: [
          this.priceForm.get("fromQuantity").value,
          [Validators.required],
        ],
        toQuantity: [
          this.priceForm.get("toQuantity").value,
          [Validators.required],
        ],
        price: [this.priceForm.get("price").value, [Validators.required]],
      })
    );
    this.priceForm.reset();
    console.log(this.priceForm.value);
  }

  deletePricing(index: number) {
    (this.form.controls.pricingList as FormArray).removeAt(index);
  }

  openListPriceItemModal() {
    this.modalService.open(this.priceItemForm, {
      ariaLabelledBy: "modal-basic-title",
      centered: true,
    });
  }

  openUploadImageModal() {
    this.modalService.open(this.uploadImageModal, {
      ariaLabelledBy: "modal-basic-title",
      centered: true,
    });
  }

  handleInputChange(event, prop: string) {
    this.imageObject.image = event.target.files[0];
  }
  uploadProductImage() {
    this.spinner.show();
    this.productService.uploadProductImage(this.imageObject).subscribe(
      (result) => {
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  submit() {
    this.form.markAllAsTouched();
    console.log(this.form.value);
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
    body.designDetails = {
      imageOverlayEnabled: body.imageOverlayEnabled,
      imageOverlayCost: body.imageOverlayCost,
    };
    delete body.imageOverlayEnabled;
    delete body.imageOverlayCost;
    body.availableColors = this.colorList
      .filter((item) => item.selected == true)
      .map((item) => {
        return { colorId: item.id };
      });
    body.availableSizes = this.sizeList
      .filter((item) => item.selected == true)
      .map((item) => {
        return { sizeLabel: item.id };
      });
    console.log(body);
    console.log(
      "🚀 ~ file: product-crud.component.ts ~ line 249 ~ ProductCrudComponent ~ create ~ body",
      body
    );
    this.spinner.show();
    this.productService.create(body).subscribe(
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
    body.id = this.route.snapshot.params.id;
    body.designDetails = {
      imageOverlayEnabled: body.imageOverlayEnabled,
      imageOverlayCost: body.imageOverlayCost,
    };
    delete body.imageOverlayEnabled;
    delete body.imageOverlayCost;
    body.availableColors = this.colorList
      .filter((item) => item.selected == true)
      .map((item) => {
        return { colorId: item.id };
      });
    body.availableSizes = this.sizeList
      .filter((item) => item.selected == true)
      .map((item) => {
        return { sizeLabel: item.sizeCode };
      });

    console.log(body);
    this.spinner.show();
    this.productService.update(body).subscribe(
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

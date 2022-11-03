import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { NotifierService } from "angular-notifier";
import { NgxSpinnerService } from "ngx-spinner";
import { Crud, Pattern } from "src/app/shared/common";
import { FormMode } from "src/app/shared/models";
import { TagService } from "../../tags/services/tag.service";
import { RestaurantService } from "../services/restaurant.service";

@Component({
  selector: "app-restaurant-crud",
  templateUrl: "./restaurant-crud.component.html",
  styleUrls: ["./restaurant-crud.component.scss"],
})
export class RestaurantCrudComponent extends Crud implements OnInit {
  tagList: any[] = [];
  constructor(
    private restaurantService: RestaurantService,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public notifier: NotifierService,
    public translate: TranslateService,
    public spinner: NgxSpinnerService,
    private tagService: TagService
  ) {
    super(restaurantService, notifier, spinner, translate, route);
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
      images: new FormArray([], Validators.required),
      featuredImage: ["", [Validators.required]],
      tagsId: this.formBuilder.array([], [Validators.required]),
      restaurantAdmin: this.formBuilder.group({
        // make a nested group
        firstName: ["", [Validators.required]],
        lastName: ["", [Validators.required]],
        email: ["", [Validators.required]],
        password: ["", [Validators.required]],
        countryCode: ["", [Validators.required]],
        phoneNumber: ["", [Validators.required]],
      }),
      branch: this.formBuilder.group({
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
        lat: ["", [Validators.required]],
        lng: ["", [Validators.required]],
        address: ["", [Validators.required]],
        featuredImage: ["", [Validators.required]],
        images:new FormArray([], Validators.required),
        phoneNumbers: new FormArray([], [Validators.required]),
        countryCode: ["", [Validators.required]],
      }),
    });
    this.mode = this.route.snapshot.data.mode;
    this.currentLanguage = this.translate.currentLang;
    if (this.mode === FormMode.View) {
      this.form.disable();
    }
    if (this.mode === FormMode.Create) {
      this.addPhoneForm();
      // this.addRestaurantAdminPhoneForm()
    }
  }

  ngOnInit(): void {
    if (this.mode == FormMode.Edit || this.mode == FormMode.View) {
      this.getById(this.route.snapshot.params.id);
    }
    this.getTagList();
  }
  getTagList() {
    this.tagService.get({ limit: 50 }).subscribe(
      (res: any) => {
        this.tagList = res.data.map((tag) => {
          tag.selected = false;
          return tag;
        });
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  initTagItem(val = "") {
    const form = this.formBuilder.group({
      tag: [val, Validators.required],
    });
    return form;
  }

  getById(id: number) {
    this.busyLoading = true;
    this.spinner.show();
    this.restaurantService.getById(id).subscribe(
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
        this.locationList = [
          {
            lat: +res.lat,
            lng: +res.lng,
          },
        ];
      },
      (err) => {
        this.spinner.hide();
        this.busyLoading = false;
      }
    );
  }
  initPhoneItem(val = "") {
    const form = this.formBuilder.group({
      phone: [val, Validators.required],
    });
    (this.form.controls.branch.get("phoneNumbers") as FormArray)
    return form;
  }

  submit() {
    this.form.markAllAsTouched();
    console.log(this.form.value);
    let selectedTags: any = this.tagList
      .filter((item) => item.selected)
      .map(({ id }) => id);

    // this.form.get("tagsId").patchValue(selectedTags);
    selectedTags.map((item, index) => {
      (this.form.get("tagsId") as FormArray).push(
        this.formBuilder.group({
          value: [item],
        })
      );
    });
    // (this.form.get('tagsId')as FormArray).push(selectedTags])
    console.log("🚀 ~ file: restaurant-crud.component.ts ~ line 175 ~ RestaurantCrudComponent ~ submit ~ this.form.get('tagsId')", this.form.get('tagsId').value)
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
    body.tagsId = body.tagsId.map(({value})=> value);
    body.images = body.images.map(({ image }) => image);
    body.branch.images = body.branch.images.map(({ image }) => image);
    // body.lat = +body.lat;
    // body.lng = +body.lng;
    body.branch.phoneNumbers = body.branch.phoneNumbers.map(({ phone }) => String(phone));
    this.spinner.show();
    this.mainService.create(body).subscribe(
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
    console.log(body)
    body.tagsId = body.tagsId.map(({value})=> value)
    body.images = body.images.map(({ image }) => image);
    body.branch.images = body.branch.images.map(({ image }) => image);

    // body.lat = +body.lat;
    // body.lng = +body.lng;
    body.branch.phoneNumbers = body.branch.phoneNumbers.map(({ phone }) => String(phone));
    this.spinner.show();
    this.restaurantService.edit(this.route.snapshot.params.id, body).subscribe(
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

  setMarkerLocation(location: { lat: number; lng: number }) {
    this.locationList[0] = location;
       this.form.get("branch").get("lat").patchValue(location.lat);
       this.form.get("branch").get("lng").patchValue(location.lng);
  }

  addPhoneForm(val = "") {
    (this.form.controls.branch.get("phoneNumbers") as FormArray).push(
      this.formBuilder.group({
        phone: [val, Validators.required],
      })
    );
  }
  deletePhoneForm(index: number) {
    (this.form.controls.branch.get("phoneNumbers") as FormArray).removeAt(
      index
    );
  }
  addRestaurantAdminPhoneForm(val = "") {
    (this.form.controls.restaurantAdmin.get("phoneNumber") as FormArray).push(
      this.formBuilder.group({
        phone: [val, Validators.required],
      })
    );
  }
  deleteRestaurantAdminPhoneForm(index: number) {
    (this.form.controls.restaurantAdmin.get("phoneNumber") as FormArray).removeAt(
      index
    );
  }
}

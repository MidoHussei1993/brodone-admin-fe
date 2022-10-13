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
      images: [["3"], [Validators.required]],
      featuredImage: ["3", [Validators.required]],
      tagsId:new FormArray([], [Validators.required]),
      restaurantAdmin: this.formBuilder.group({
        // make a nested group
        firstName: ["", [Validators.required]],
        lastName: ["", [Validators.required]],
        email: ["", [Validators.required]],
        password: ["", [Validators.required]],
        countryCode: ["", [Validators.required]],
        phoneNumber: ["01062650000", [Validators.required]],
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
        featuredImage: ["يييي", [Validators.required]],
        images: [["ddd"], [Validators.required]],
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
        this.tagList = res.data;
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
    return form;
  }

  edit() {
    let body = this.form.value;
    body.lat = +body.lat;
    body.lng = +body.lng;
    body.phoneNumbers = body.phoneNumbers.map(({ phone }) => String(phone));
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

  setMarkerLocation(propName: string) {
    if (propName == "latitude") {
      this.locationList[0].lat = this.form.get("branch").get("lat").value;
    } else {
      this.locationList[0].lng = this.form.get("branch").get("lng").value;
    }
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
}

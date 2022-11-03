import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { NotifierService } from "angular-notifier";
import { NgxSpinnerService } from "ngx-spinner";
import { ListComponent } from "src/app/shared/common";
import { Pagination } from "src/app/shared/models";
import { Tag } from "../models";
import { TagService } from "../services/tag.service";

@Component({
  selector: "app-tags-list",
  templateUrl: "./tags-list.component.html",
  styleUrls: ["./tags-list.component.scss"],
})
export class TagsListComponent
  extends ListComponent<any, any>
  implements OnInit
{
  constructor(
    private tagService: TagService,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public notifier: NotifierService,
    public translate: TranslateService,
    public spinner: NgxSpinnerService,
    public router: Router
  ) {
    super(tagService, notifier, spinner, translate, route, router);
    this.titles = [
      "id",
      "icon",
      "createdAt",
      "title",
      "title",
      "description",
      "description",
    ];
    this.properties = [
      "id",
      "icon",
      "createdAt",
      "title",
      "titleAr",
      "description",
      "descriptionAr",
    ];
  }

  ngOnInit(): void {
    this.navigateTo = "tags";
    this.getList();
  }

  deleteTag(item) {
    this.spinner.show();
    this.tagService.delete(item.id).subscribe(
      (res: any) => {
        this.getList();
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }
}

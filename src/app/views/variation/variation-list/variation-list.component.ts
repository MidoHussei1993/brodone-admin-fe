import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListComponent } from 'src/app/shared/common';
import { VariationService } from '../services/variation.service';

@Component({
  selector: 'app-variation-list',
  templateUrl: './variation-list.component.html',
  styleUrls: ['./variation-list.component.scss']
})
export class VariationListComponent 
extends ListComponent<any, any>
implements OnInit
{
currentId: number = null;
menuItemId: number = null;

constructor(
  private variationService: VariationService,
  public route: ActivatedRoute,
  private formBuilder: FormBuilder,
  public notifier: NotifierService,
  public translate: TranslateService,
  public spinner: NgxSpinnerService,
  public router: Router
) {
  super(variationService, notifier, spinner, translate, route, router);
  this.titles = ["createdAt", "title", "titleAr", "description", "descriptionAr"];
  this.properties = [
    "createdAt",
    "title",
    "titleAr",
    "description",
    "descriptionAr",
  ];
}

ngOnInit(): void {
  this.currentId = this.route.snapshot.params.restaurantId;
  this.menuItemId = this.route.snapshot.params.menuItemId;
  this.getList();
}

getList() {
  this.spinner.show();
  this.variationService.get(this.route.snapshot.params.restaurantId,this.route.snapshot.params.menuItemId,this.filter).subscribe(
    (res: any) => {
      this.spinner.hide();
      this.list = res.data;
      this.pagination = res.meta;
    },
    (err) => {
      console.log(err);
      this.spinner.hide();
    }
  );
}

navigateToEdit(event) {
  this.router.navigateByUrl(
    `/variation/${this.route.snapshot.params.restaurantId}/edit/${this.route.snapshot.params.menuItemId}/${event.id}`
  );
}
navigateToView(event) {
  this.router.navigateByUrl(
    `/variation/${this.route.snapshot.params.restaurantId}/view/${this.route.snapshot.params.menuItemId}/${event.id}`
  );
}
}

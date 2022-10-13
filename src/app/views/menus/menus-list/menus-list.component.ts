import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListComponent } from 'src/app/shared/common';
import { MenusService } from '../services/menus.service';

@Component({
  selector: 'app-menus-list',
  templateUrl: './menus-list.component.html',
  styleUrls: ['./menus-list.component.scss']
})
export class MenusListComponent 
extends ListComponent<any, any>
implements OnInit
{

currentId:number = null;
constructor(
  private menusService: MenusService,
  public notifier: NotifierService,
  public spinner: NgxSpinnerService,
  public translate: TranslateService,
  public route: ActivatedRoute,
  public router: Router
) {
  super(menusService, notifier, spinner, translate, route, router);
  this.titles = [
    "image",
    "id",
    "createdAt",
    "name",
    "name",
    "description",
    "description",
    "slug",
  ];
  this.properties = [
    "image",
    "id",
    "createdAt",
    "name",
    "nameAr",
    "description",
    "descriptionAr",
    "slug",
  ];
  this.navigateTo = "category";
}

resetfilter() {
  let pagePagination = {
    page: this.filter.page,
    limit: this.filter.limit,
  };
  this.filter = {};
  this.filter.page = pagePagination.page;
  this.filter.limit = pagePagination.limit;
  this.getList();
}

ngOnInit(): void {
  this.currentId = this.route.snapshot.params.restaurantId
  this.getList();
}

getList() {
  this.spinner.show();
  this.menusService.get(this.route.snapshot.params.restaurantId,this.filter).subscribe(
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
  this.router.navigateByUrl(`/menu/${this.route.snapshot.params.restaurantId}/edit`);
}
navigateToView(event) {
  this.router.navigateByUrl(`/menu/${this.route.snapshot.params.restaurantId}/view`);
}

deleteItem(item){
  this.spinner.show();
  this.menusService.delete(this.route.snapshot.params.restaurantId).subscribe(
    (res: any) => {
      this.getList();
      this.spinner.hide();
    },
    (err) => {
      this.spinner.hide();
    }
  )
}

}

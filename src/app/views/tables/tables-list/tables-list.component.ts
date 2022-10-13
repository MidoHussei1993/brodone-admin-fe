import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListComponent } from 'src/app/shared/common';
import { TablesService } from '../services/tables.service';

@Component({
  selector: 'app-tables-list',
  templateUrl: './tables-list.component.html',
  styleUrls: ['./tables-list.component.scss']
})
export class TablesListComponent 
extends ListComponent<any, any>
implements OnInit
{

currentId:number = null;
constructor(
  private tablesService: TablesService,
  public notifier: NotifierService,
  public spinner: NgxSpinnerService,
  public translate: TranslateService,
  public route: ActivatedRoute,
  public router: Router
) {
  super(tablesService, notifier, spinner, translate, route, router);
  this.titles = [
    "id",
    "createdAt",
    "capacity",
    "qrCode",
    "status",
  ];
  this.properties = [
    "id",
    "createdAt",
    "capacity",
    "qrCode",
    "status",
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
  this.tablesService.get(this.route.snapshot.params.restaurantId,this.filter).subscribe(
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
  this.router.navigateByUrl(`/tables/${this.route.snapshot.params.restaurantId}/edit/${event.id}`);
}
navigateToView(event) {
  this.router.navigateByUrl(`/tables/${this.route.snapshot.params.restaurantId}/view/${event.id}`);
}

deleteItem(item){
  this.spinner.show();
  this.tablesService.delete(this.route.snapshot.params.restaurantId,item.id).subscribe(
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

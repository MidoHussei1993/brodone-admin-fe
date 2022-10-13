import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListComponent } from 'src/app/shared/common';
import { RestaurantEmplooyeesService } from '../services/restaurant-emplooyees.service';

@Component({
  selector: 'app-restaurant-employee-list',
  templateUrl: './restaurant-employee-list.component.html',
  styleUrls: ['./restaurant-employee-list.component.scss']
})
export class RestaurantEmployeeListComponent 
extends ListComponent<any, any>
implements OnInit
{

currentId:number = null;
constructor(
  private restaurantEmplooyeesService: RestaurantEmplooyeesService,
  public notifier: NotifierService,
  public spinner: NgxSpinnerService,
  public translate: TranslateService,
  public route: ActivatedRoute,
  public router: Router
) {
  super(restaurantEmplooyeesService, notifier, spinner, translate, route, router);
  this.titles = [
    "id",
    "createdAt",
    "firstName",
    "lastName",
    "countryCode",
    "phoneNumber",
    "email",
  ];
  this.properties = [
    "id",
    "createdAt",
    "firstName",
    "lastName",
    "countryCode",
    "phoneNumber",
    "email",
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
  this.restaurantEmplooyeesService.get(this.route.snapshot.params.restaurantId,this.filter).subscribe(
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
  this.router.navigateByUrl(`/restaurant-employee/${this.route.snapshot.params.restaurantId}/edit/${event.id}`);
}
navigateToView(event) {
  this.router.navigateByUrl(`/restaurant-employee/${this.route.snapshot.params.restaurantId}/view/${event.id}`);
}

deleteItem(item){
  this.spinner.show();
  this.restaurantEmplooyeesService.delete(this.route.snapshot.params.restaurantId,item.id).subscribe(
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

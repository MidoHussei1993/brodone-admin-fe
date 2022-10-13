import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListComponent } from 'src/app/shared/common';
import { PermissionsService } from '../services/permissions.service';

@Component({
  selector: 'app-permissions-list',
  templateUrl: './permissions-list.component.html',
  styleUrls: ['./permissions-list.component.scss']
})
export class PermissionsListComponent 
extends ListComponent<any, any>
implements OnInit
{

currentId:number = null;
constructor(
  private permissionsService: PermissionsService,
  public notifier: NotifierService,
  public spinner: NgxSpinnerService,
  public translate: TranslateService,
  public route: ActivatedRoute,
  public router: Router
) {
  super(permissionsService, notifier, spinner, translate, route, router);
  this.titles = [
    "id",
    "createdAt",
    "resource",
    "permissions",
  
  ];
  this.properties = [
    "id",
    "createdAt",
    "resource.name",
    "actions",
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
  this.permissionsService.get(this.route.snapshot.params.restaurantId,this.filter).subscribe(
    (res: any) => {
      this.spinner.hide();
      this.list = res.data.map((item) =>{
        item.isActive = item.resource.isActive
        item.actions = item.actions.join(' - ')
        return item;
      });
      this.pagination = res.meta;
    },
    (err) => {
      console.log(err);
      this.spinner.hide();
    }
  );
}

navigateToEdit(event) {
  this.router.navigateByUrl(`/permissions/${this.route.snapshot.params.restaurantId}/edit/${event.id}`);
}
navigateToView(event) {
  this.router.navigateByUrl(`/permissions/${this.route.snapshot.params.restaurantId}/view/${event.id}`);
}

deleteItem(item){
  this.spinner.show();
  this.permissionsService.delete(this.route.snapshot.params.restaurantId,item.id).subscribe(
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

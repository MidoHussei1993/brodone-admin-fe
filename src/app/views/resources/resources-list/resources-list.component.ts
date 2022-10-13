import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListComponent } from 'src/app/shared/common';
import { ResourcesService } from '../services/resources.service';

@Component({
  selector: 'app-resources-list',
  templateUrl: './resources-list.component.html',
  styleUrls: ['./resources-list.component.scss']
})
export class ResourcesListComponent 
extends ListComponent<any, any>
implements OnInit
{

currentId:number = null;
constructor(
  private resourcesService: ResourcesService,
  public notifier: NotifierService,
  public spinner: NgxSpinnerService,
  public translate: TranslateService,
  public route: ActivatedRoute,
  public router: Router
) {
  super(resourcesService, notifier, spinner, translate, route, router);
  this.titles = [
    "id",
    "createdAt",
    "name",
  ];
  this.properties = [
    "id",
    "createdAt",
    "name",
  ];
  this.navigateTo = "resources";
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
  this.getList();
}

}

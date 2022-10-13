import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Crud } from 'src/app/shared/common';
import { FormMode } from 'src/app/shared/models';
import { EmployeeRolesService } from '../services/employee-roles.service';

@Component({
  selector: 'app-employee-roles-crud',
  templateUrl: './employee-roles-crud.component.html',
  styleUrls: ['./employee-roles-crud.component.scss']
})
export class EmployeeRolesCrudComponent extends Crud implements OnInit {

  constructor(
    private employeeRolesService: EmployeeRolesService,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public notifier: NotifierService,
    public translate: TranslateService,
    public spinner: NgxSpinnerService
  ) { 
    super(employeeRolesService,notifier,spinner,translate,route)
    this.form = this.formBuilder.group({
      restaurantId: [+this.route.snapshot.params.restaurantId, [ Validators.required]],
      name: ['', [ Validators.required]],
      description: ['', [ Validators.required]],
    });
    this.mode = this.route.snapshot.data.mode;
    this.currentLanguage = this.translate.currentLang;
    if (this.mode === FormMode.View) {
      this.form.disable();
    }
  }

  ngOnInit(): void {
    if(this.mode == FormMode.Edit || this.mode == FormMode.View){
      this.getById()
    }
  }

  getById(){
    this.busyLoading = true;
    this.spinner.show();
    this.employeeRolesService.getById(this.route.snapshot.params.restaurantId,this.route.snapshot.params.roleId).subscribe(res => {
      this.spinner.hide();
      this.busyLoading = false;
      this.form.patchValue(res)
    },err => {
    this.spinner.hide();
      this.busyLoading = false;
    })
  }

  create() {
    let body = this.form.value;
    this.spinner.show();
    this.employeeRolesService.create(this.route.snapshot.params.restaurantId,body).subscribe(result => {
      this.spinner.hide();
      this.form.reset();
      this.form.get('restaurantId').patchValue(+this.route.snapshot.params.restaurantId);
      this.notifier.notify('success',this.translate.instant('created'))
    },err=>{
      this.spinner.hide();
      // this.notifier.notify('error',err)
    })
  }
  edit() {
    let body = this.form.value;
    this.spinner.show();
    this.employeeRolesService.edit(this.route.snapshot.params.restaurantId,this.route.snapshot.params.roleId,body).subscribe(result => {
      this.spinner.hide();
      this.notifier.notify('success',this.translate.instant('edited'))
    },err=>{
      this.spinner.hide();
      // this.notifier.notify('error',err)
    })
  }

}
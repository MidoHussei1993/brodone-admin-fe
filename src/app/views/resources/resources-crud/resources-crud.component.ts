import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Crud } from 'src/app/shared/common';
import { FormMode } from 'src/app/shared/models';
import { ResourcesService } from '../services/resources.service';

@Component({
  selector: 'app-resources-crud',
  templateUrl: './resources-crud.component.html',
  styleUrls: ['./resources-crud.component.scss']
})
export class ResourcesCrudComponent extends Crud implements OnInit {

  constructor(
    private resourcesService: ResourcesService,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public notifier: NotifierService,
    public translate: TranslateService,
    public spinner: NgxSpinnerService
  ) { 
    super(resourcesService,notifier,spinner,translate,route)
    this.form = this.formBuilder.group({
      name: ['', [ Validators.required]],
    });
    this.mode = this.route.snapshot.data.mode;
    this.currentLanguage = this.translate.currentLang;
    if (this.mode === FormMode.View) {
      this.form.disable();
    }
  }

  ngOnInit(): void {
    if(this.mode == FormMode.Edit || this.mode == FormMode.View){
      this.getById(this.route.snapshot.params.id)
    }
  }

}
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Crud, Pattern } from 'src/app/shared/common';
import { FormMode } from 'src/app/shared/models';
import { TagService } from '../services/tag.service';

@Component({
  selector: 'app-tags-crud',
  templateUrl: './tags-crud.component.html',
  styleUrls: ['./tags-crud.component.scss']
})
export class TagsCrudComponent extends Crud implements OnInit {

  constructor(
    private tagService: TagService,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public notifier: NotifierService,
    public translate: TranslateService,
    public spinner: NgxSpinnerService
  ) { 
    super(tagService,notifier,spinner,translate,route)
    this.form = this.formBuilder.group({
      title: ['', [ Validators.required,Validators.pattern(Pattern.OnlyEnglishLettersAndSpace)]],
      titleAr: ['', [ Validators.required, Validators.pattern(Pattern.OnlyArabicLetters)]],
      description: ['', [ Validators.required,Validators.pattern(Pattern.OnlyEnglishLettersAndSpace)]],
      descriptionAr: ['', [ Validators.required, Validators.pattern(Pattern.OnlyArabicLetters)]],
      icon: ["tes"],
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
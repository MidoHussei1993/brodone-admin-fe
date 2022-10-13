import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  animations: [SharedAnimations]
})
export class SignupComponent implements OnInit {

  form: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private notifier: NotifierService,
    private translate: TranslateService,
    private spinner: NgxSpinnerService
  ) { 
    this.form = this.formBuilder.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      email: ["", [Validators.required]],
      password: ["", [Validators.required]],
      countryCode: ["", [Validators.required]],
      phoneNumber: ["", [Validators.required]],
    });
  }

  ngOnInit() {
  }

  submit() {
    this.form.markAllAsTouched();
    console.log(this.form.value);
    if (!this.form.valid) return;
    console.log(this.form);
    // if (this.mode === FormMode.Create) {
    //   this.create();
    // } else {
    //   this.edit();
    // }
  }
}

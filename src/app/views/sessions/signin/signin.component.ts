import { Component, OnInit } from "@angular/core";
import { SharedAnimations } from "src/app/shared/animations/shared-animations";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../../shared/services/auth.service";
import {
  Router,
  RouteConfigLoadStart,
  ResolveStart,
  RouteConfigLoadEnd,
  ResolveEnd,
} from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { LoginService } from "../services/login.service";
import { LoginModel } from "../models";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
  animations: [SharedAnimations],
})
export class SigninComponent implements OnInit {
  loading: boolean;
  loadingText: string;
  signinForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (
        event instanceof RouteConfigLoadStart ||
        event instanceof ResolveStart
      ) {
        this.loadingText = "Loading Dashboard Module...";

        this.loading = true;
      }
      if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
        this.loading = false;
      }
    });

    this.signinForm = this.fb.group({
      identifier: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  signin() {
    // this.auth.signin(this.signinForm.value).subscribe((result) => {
    //   this.loading = false;
    //   this.router.navigateByUrl("/dashboard/v1");
    // });
    if (!this.signinForm.valid) return;
    this.spinner.show();
    this.loading = true;
    this.loginService.login(this.signinForm.value).subscribe(
      (res) => {
        this.spinner.hide();
        console.log(res)
        localStorage.setItem("token", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);

        // localStorage.setItem("user", JSON.stringify(res));
        // localStorage.setItem("roles", JSON.stringify(res.Roles));

        this.loading = true;
        this.loadingText = "Sigining in...";
        this.auth.signin(this.signinForm.value).subscribe((res) => {
          this.router.navigateByUrl("/dashboard/v1");
          this.loading = false;
      },
      (err) => {
        this.spinner.hide();
        this.loading = false;
      }
    );
    });
  }
}

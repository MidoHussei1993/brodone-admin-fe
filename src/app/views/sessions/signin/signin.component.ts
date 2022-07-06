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
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  signin() {
    if (!this.signinForm.valid) return;
    const loginModel = new LoginModel();
    loginModel.password = this.signinForm.get("password").value;
    loginModel.username = this.signinForm.get("email").value;
    this.spinner.show();
    this.loading = true;
    this.loginService.login(loginModel).subscribe(
      (res) => {
        localStorage.setItem("token", res.access_token);
        localStorage.setItem("user", JSON.stringify(res));
        localStorage.setItem("roles", JSON.stringify(res.Roles));
        this.spinner.hide();

        this.auth.signin(this.signinForm.value).subscribe((result) => {
          this.loading = false;
          this.router.navigateByUrl("/dashboard/v1");
        });
      },
      (err) => {
        this.spinner.hide();
        this.loading = false;
      }
    );
    // this.loading = true;
    // this.loadingText = "Sigining in...";
    // this.auth.signin(this.signinForm.value).subscribe((res) => {
    //   this.router.navigateByUrl("/dashboard/v1");
    //   this.loading = false;
    // });
  }
}

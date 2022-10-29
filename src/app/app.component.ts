import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "bootDash";
  constructor(private translate: TranslateService) {}

  ngOnInit() {
    if (localStorage.getItem("lang")) {
      this.translate.use(localStorage.getItem("lang"));
    }

    let el = document.documentElement;
    if (this.translate.currentLang == "ar") {
      el.setAttribute("dir", "rtl");
    } else {
      el.setAttribute("dir", "ltr");
    }
    // let el = document.querySelector('html');
    // if(this.translate.currentLang == 'ar'){
    //   el.setAttribute('direction', 'rtl');
    //   el.setAttribute('dir', 'rtl');
    //   el.style.direction = 'rtl';
    // }else{
    //   el.setAttribute('direction', 'ltr');
    //   el.setAttribute('dir', 'ltr');
    //   el.style.direction = 'ltr';
    // }
  }
}

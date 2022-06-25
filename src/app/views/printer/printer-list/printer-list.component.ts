import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { Pagination } from "src/app/shared/models";
import { PrintHouseService } from "src/app/shared/services/print-house.service";
import { PrintHouseFilter } from "../models/print-house-filter";

@Component({
  selector: "app-printer-list",
  templateUrl: "./printer-list.component.html",
  styleUrls: ["./printer-list.component.scss"],
})
export class PrinterListComponent implements OnInit {
  PrintHouseList: any[] = [];
  titles: string[] = [
    "id",
    "username",
    "companyName",
    "email",
    "managerName",
    "phoneNo",
    "tradName",
    "cityName",
    "address",
  ];
  properties: string[] = [
    "id",
    "username",
    "companyName",
    "email",
    "managerName",
    "phoneNo",
    "tradName",
    "cityName",
    "address",
  ];
  filter: PrintHouseFilter = new PrintHouseFilter();
  pagination: Pagination = new Pagination();

  constructor(
    private router: Router,
    private printHouseService: PrintHouseService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.filter.page = 1;
    this.filter.size = 10;

    this.getPrintHouseList();
  }

  searchValue(): void {
    this.getPrintHouseList();
  }

  resetfilter() {
    let pagePagination = {
      page: this.filter.page,
      size: this.filter.size,
    };
    this.filter = new PrintHouseFilter();
    this.filter.page = pagePagination.page;
    this.filter.size = pagePagination.size;
    this.getPrintHouseList();
  }

  getPrintHouseList() {
    this.spinner.show();
    this.printHouseService.get().subscribe(
      (res: any) => {
        this.spinner.hide();
        this.PrintHouseList = res.responsePayload.content;
        delete res.responsePayload.content;
        this.pagination = { ...this.filter, ...res.responsePayload };
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  setPageSize(pageSize) {
    if (pageSize == this.filter.size) return;
    this.filter.size = pageSize;
    this.getPrintHouseList();
  }

  setPageNumber(pageNumber: number) {
    if (pageNumber == this.filter.page) return;
    this.filter.page = pageNumber;
    this.getPrintHouseList();
  }
  navigateToEdit(event) {
    this.router.navigateByUrl(`/print-house/edit/${event.id}`);
  }
  navigateToView(event) {
    this.router.navigateByUrl(`/print-house/view/${event.id}`);
  }

  // deletePrintHouse(item) {
  //   this.spinner.show();
  //   this.printHouseService.delete(item.id).subscribe(
  //     (res: any) => {
  //       this.getPrintHouseList();
  //       this.spinner.hide();
  //     },
  //     (err) => {
  //       this.spinner.hide();
  //     }
  //   );
  // }
}

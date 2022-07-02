import { Component, OnInit, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";
import { NgxSpinnerService } from "ngx-spinner";
import { Pagination } from "src/app/shared/models";
import { PrintHouseService } from "src/app/shared/services/print-house.service";
import { Order, OrderFilter } from "../models";
import { OrderService } from "../services/order.service";

@Component({
  selector: "app-order-list",
  templateUrl: "./order-list.component.html",
  styleUrls: ["./order-list.component.scss"],
})
export class OrderListComponent implements OnInit {
  @ViewChild("modalConfirm", { static: false }) modalConfirm;
  orderList: Order[] = [];
  titles: string[] = [
    "orderId",
    "Date",
    "Cost",
    "CompanyName",
    "Status",
    "PrintHouse",
    // 'global.user_type',
  ];
  properties: string[] = [
    "id",
    "orderDate",
    "cost",
    "assignedCompany",
    "orderStatus",
    "typeAr",
    // 'userType',
  ];
  filter: OrderFilter = new OrderFilter();
  pagination: Pagination = new Pagination();

  currentAction: string = "";
  printHouseList: { compnay: string; id: number }[] = [];
  selectedCompanyId: number = null;
  currentOrderId: number = null;

  constructor(
    private orderService: OrderService,
    private printHouseService: PrintHouseService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.filter.page = 0;
    this.filter.size = 10;
    let from = new Date();
    from.setMonth(from.getMonth() - 1);
    // this.filter.fromDate = moment(from).format("DD-MM-YYYY");
    // this.filter.toDate = moment(Date.now()).format("DD-MM-YYYY");
    this.getOrderList();
    this.getPrintHouseList();
  }

  searchValue(): void {
    this.getOrderList();
  }

  resetfilter() {
    let pagePagination = {
      page: this.filter.page,
      size: this.filter.size,
    };
    this.filter = new OrderFilter();
    this.filter.page = pagePagination.page;
    this.filter.size = pagePagination.size;
    this.getOrderList();
  }

  getOrderList() {
    this.spinner.show();
    this.orderService.get(this.filter).subscribe(
      (res: any) => {
        this.orderList = res.Orders;
        delete res.Orders;
        this.pagination = { ...this.filter, ...res };
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }
  getPrintHouseList() {
    this.printHouseService.getPrintHouseList().subscribe(
      (res: any) => {
        this.printHouseList = res.responsePayload;
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  setPageSize(pageSize) {
    if (pageSize == this.filter.size) return;
    this.filter.size = pageSize;
    this.getOrderList();
  }

  setPageNumber(pageNumber: number) {
    if (pageNumber == this.filter.page) return;
    this.filter.page = pageNumber;
    this.getOrderList();
  }

  confirm() {
    this.modalService
      .open(this.modalConfirm, {
        ariaLabelledBy: "modal-basic-title",
        centered: true,
      })
      .result.then(
        (result) => {
          console.log(result);
        },
        (reason) => {
          console.log(reason);
        }
      );
  }
  navigateTO(order: { event: Order; type: string }) {
    this.reset();
    switch (order.type) {
      case "assign":
        this.currentAction = order.type;
        this.currentOrderId = order.event.id;
        this.confirm();
        break;
      case "revoke":
        this.currentAction = order.type;
        this.currentOrderId = order.event.id;
        this.confirm();
        break;
      case "withdraw":
        this.currentAction = order.type;
        this.currentOrderId = order.event.id;
        this.confirm();
        break;

      default:
        break;
    }
  }

  setSelectedCompany(id: number) {
    console.log(id);
    this.selectedCompanyId = id;
  }
  reset() {
    this.currentOrderId = null;
    this.selectedCompanyId = null;
  }

  applyAction() {
    console.log(this.currentAction);
    switch (this.currentAction) {
      case "assign":
        this.assign();
        break;
      case "revoke":
        this.revoke();
        break;
      case "withdraw":
        this.withdraw();
        break;

      default:
        break;
    }
  }

  assign() {
    if (!this.selectedCompanyId) return;
    this.spinner.show();
    this.orderService
      .assign({
        orderId: this.currentOrderId,
        printingHouse: +this.selectedCompanyId,
      })
      .subscribe(
        (res) => {
          this.modalService.dismissAll();
          this.spinner.hide();
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }

  revoke() {
    if (!this.selectedCompanyId) return;
    this.spinner.show();
    this.orderService
      .revoke({
        orderId: this.currentOrderId,
        printingHouse: +this.selectedCompanyId,
      })
      .subscribe(
        (res) => {
          this.modalService.dismissAll();
          this.spinner.hide();
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }

  withdraw() {
    if (!this.selectedCompanyId) return;
    this.spinner.show();
    this.orderService
      .withdraw({
        orderId: this.currentOrderId,
        printingHouse: +this.selectedCompanyId,
      })
      .subscribe(
        (res) => {
          this.modalService.dismissAll();
          this.spinner.hide();
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }
}

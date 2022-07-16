import { Component, OnInit, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";
import { NgxSpinnerService } from "ngx-spinner";
import { Pagination } from "src/app/shared/models";
import { PrintHouseService } from "src/app/shared/services/print-house.service";
import { IsAdmin } from "src/util/acccess-Store";
import { MsgService } from "../../message/services/msg.service";
import { Order, OrderFilter, UpdateOrderStatus } from "../models";
import { OrderService } from "../services/order.service";

@Component({
  selector: "app-order-list",
  templateUrl: "./order-list.component.html",
  styleUrls: ["./order-list.component.scss"],
})
export class OrderListComponent implements OnInit {
  @ViewChild("modalConfirm", { static: false }) modalConfirm;
  @ViewChild("updateStatusModal", { static: false }) updateStatusModal;
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
  adminActionList: { title: string; icon: string; type?: string }[] = [
    {
      title: "assign",
      icon: "i-Checked-User",
      type: "assign",
    },
    {
      title: "revoke",
      icon: "i-Remove-User",
      type: "revoke",
    },
  ];
  printHouseActionList: { title: string; icon: string; type?: string }[] = [
    { title: "withdraw", icon: "i-Close-Window", type: "withdraw" },
    { title: "updateStatus", icon: "i-Tag-4", type: "updateStatus" },
    { title: "pick", icon: "i-Hand", type: "pick" },
  ];
  isAdmin = null;
  statusList: any[] = [];
  updateOrderStatusObject: {} = {
    orderStatus: null,
    comments: "",
  };
  userList: [] = [];
  printersLst: [] = [];

  constructor(
    private orderService: OrderService,
    private printHouseService: PrintHouseService,
    private modalService: NgbModal,
    private msgService: MsgService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.isAdmin = IsAdmin();
    this.filter.page = 1;
    this.filter.size = 10;
    let from = new Date();
    from.setMonth(from.getMonth() - 1);
    // this.filter.fromDate = moment(from).format("DD-MM-YYYY");
    // this.filter.toDate = moment(Date.now()).format("DD-MM-YYYY");
    this.getOrderList();
    this.getPrintHouseList();
    this.getOrderStatusList();
    this.getAllUser();
  }
  getAllUser() {
    this.msgService.getAlluser().subscribe(
      (res: any) => {
        this.userList = res.responsePayload;
      },
      (err) => {}
    );
  }

  getOrderStatusList() {
    this.orderService.getOrderStatus().subscribe(
      (res: any) => {
        this.statusList = res.responsePayload;
      },
      (err) => {}
    );
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
        this.orderList = res.orderList.content;
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

  confirm(modal: string = "modalConfirm") {
    this.modalService
      .open(this[modal], {
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
        if (order.event.orderStatus == "PAIED") return;
        this.revoke(order.event);
        break;
      case "withdraw":
        this.currentAction = order.type;
        this.currentOrderId = order.event.id;
        this.withdraw();
        break;
      case "updateStatus":
        this.currentAction = order.type;
        this.currentOrderId = order.event.id;
        this.confirm("updateStatusModal");
        break;
      case "pick":
        this.currentAction = order.type;
        this.currentOrderId = order.event.id;
        this.pick();
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
      // case "withdraw":
      //   this.withdraw();
      //   break;

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

  revoke(item: Order) {
    this.spinner.show();
    this.orderService
      .revoke({
        orderId: item.id,
        printingHouse: +item.assignedTo,
      })
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.getOrderList();
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }

  withdraw() {
    this.spinner.show();
    this.orderService.withdraw(this.currentOrderId).subscribe(
      (res) => {
        this.modalService.dismissAll();
        this.spinner.hide();
        this.getOrderList();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }
  pick() {
    this.spinner.show();
    this.orderService.pickOrder(+this.currentOrderId).subscribe(
      (res) => {
        this.spinner.hide();
        this.getOrderList();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }
  updateOrderStatus() {
    this.spinner.show();
    this.modalService.dismissAll();
    const body: any = {
      ...this.updateOrderStatusObject,
      orderId: +this.currentOrderId,
    };
    this.orderService.updateOrderStatus(body).subscribe(
      (res) => {
        this.spinner.hide();
        this.updateOrderStatusObject = {
          orderStatus: null,
          comments: "",
        };
        this.getOrderList();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }
}

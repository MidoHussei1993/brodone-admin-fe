import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { Pagination } from "src/app/shared/models";
import { PrintHouseService } from "src/app/shared/services/print-house.service";
import { OrderFilter } from "../../orders/models";
import { Message, MessageFilter } from "../models";
import { MsgService } from "../services/msg.service";

@Component({
  selector: "app-msg-list",
  templateUrl: "./msg-list.component.html",
  styleUrls: ["./msg-list.component.scss"],
})
export class MsgListComponent implements OnInit {
  messageList: Message[] = [];
  titles: string[] = [
    "orderId",
    "subject",
    "messageRead",
    "createdDate",
    "reciver",
    "sender",
    // 'global.user_type',
  ];
  properties: string[] = [
    "id",
    "subject",
    "messageRead",
    "createdDate",
    "reciver",
    "sender",
    // 'userType',
  ];
  filter: MessageFilter = new MessageFilter();
  pagination: Pagination = new Pagination();

  currentAction: string = "";
  printHouseList: { compnay: string; id: number }[] = [];
  selectedCompanyId: number = null;
  currentReply: number = null;

  constructor(
    private msgService: MsgService,
    private printHouseService: PrintHouseService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.filter.page = 1;
    this.filter.size = 5;
    this.filter.id = 1;
    this.getmessageList();
  }

  getmessageList() {
    this.spinner.show();
    this.msgService.getAll(this.filter).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.messageList = res.content;
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  setPageSize(pageSize) {
    if (pageSize == this.filter.size) return;
    this.filter.size = pageSize;
    this.getmessageList();
  }

  setPageNumber(pageNumber: number) {
    if (pageNumber == this.filter.page) return;
    this.filter.page = pageNumber;
    this.getmessageList();
  }
}

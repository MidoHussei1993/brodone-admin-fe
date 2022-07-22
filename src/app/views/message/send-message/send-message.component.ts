import { Component, OnInit, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { Pagination } from "src/app/shared/models";
import { PrintHouseService } from "src/app/shared/services/print-house.service";
import { Message, MessageFilter, SentMassage_ } from "../models";
import { MsgService } from "../services/msg.service";

@Component({
  selector: "app-send-message",
  templateUrl: "./send-message.component.html",
  styleUrls: ["./send-message.component.scss"],
})
export class SendMessageComponent implements OnInit {
  messageList: Message[] = [];
  @ViewChild("modalConfirm", { static: false }) modalConfirm;

  filter: MessageFilter = new MessageFilter();
  pagination: Pagination = new Pagination();

  currentAction: string = "";
  printHouseList: { compnay: string; id: number }[] = [];
  selectedCompanyId: number = null;
  currentReply: string = null;

  body: string = "";

  userList: { userId: string; username: string }[] = [];

  sendMessageObject: SentMassage_ = new SentMassage_();

  constructor(
    private msgService: MsgService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.filter.page = 1;
    this.filter.size = 5;
    this.filter.id = 1;
    this.getmessageList();
    this.getAllusers();
  }

  getAllusers() {
    this.spinner.show();
    this.msgService.getAlluser().subscribe(
      (res: any) => {
        this.spinner.hide();
        this.userList = res.responsePayload;
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  getmessageList() {
    this.spinner.show();
    this.msgService.getAllSent(this.filter).subscribe(
      (res: any) => {
        this.spinner.hide();
        res.content.map(item => this.messageList.push(item))
        delete res.content;
        this.pagination = res;
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

  sendReplay(id: number) {
    this.spinner.show();
    this.msgService
      .reply({
        body: this.body,
        messageId: id,
      })
      .subscribe(
        (res: any) => {
          this.body = "";
          this.currentReply = null;
          this.spinner.hide();
          this.getmessageList();
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }

  openCreateModal() {
    this.modalService.open(this.modalConfirm, {
      ariaLabelledBy: "modal-basic-title",
      centered: true,
    });
  }

  sendNewMessage() {
    this.spinner.show();
    this.msgService.sent(this.sendMessageObject).subscribe(
      (res: any) => {
        this.modalService.dismissAll();
        this.sendMessageObject = new SentMassage_();
        this.spinner.hide();
        this.getmessageList();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }
}

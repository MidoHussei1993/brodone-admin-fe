import { ListPage } from "src/app/shared/models";

export class OrderFilter extends ListPage {
  constructor() {
    super();
    this.fromDate = null;
    this.toDate = null;
    // this.printerId = null;
    // this.customerId = null;
    this.orderId = null;
    this.myOrder = null;
  }
  fromDate: string;
  toDate: string;
  printerId: number;
  customerId: number;
  orderId: number;
  username: string;
  myOrder: boolean;
}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PrinterRoutingModule } from "./printer-routing.module";
import { PrinterListComponent } from "./printer-list/printer-list.component";
import { PrinterCrudComponent } from "./printer-crud/printer-crud.component";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [PrinterListComponent, PrinterCrudComponent],
  imports: [CommonModule, PrinterRoutingModule, SharedModule],
})
export class PrinterModule {}

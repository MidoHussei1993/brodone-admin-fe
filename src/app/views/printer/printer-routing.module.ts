import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormMode } from "src/app/shared/models";
import { PrinterCrudComponent } from "./printer-crud/printer-crud.component";
import { PrinterListComponent } from "./printer-list/printer-list.component";

const routes: Routes = [
  {
    path: "",
    children: [
      { path: "", component: PrinterListComponent },
      {
        path: "create",
        component: PrinterCrudComponent,
        data: { mode: FormMode.Create },
      },
      {
        path: "edit/:id",
        component: PrinterCrudComponent,
        data: { mode: FormMode.Edit },
      },
      {
        path: "view/:id",
        component: PrinterCrudComponent,
        data: { mode: FormMode.View },
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrinterRoutingModule {}

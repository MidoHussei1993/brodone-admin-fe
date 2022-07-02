import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MsgListComponent } from "./msg-list/msg-list.component";
import { RecievedMessageComponent } from "./recieved-message/recieved-message.component";
import { SendMessageComponent } from "./send-message/send-message.component";

const routes: Routes = [
  {
    path: "",
    component: MsgListComponent,
  },
  {
    path: "recieved",
    component: RecievedMessageComponent,
  },
  {
    path: "send",
    component: SendMessageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessageRoutingModule {}

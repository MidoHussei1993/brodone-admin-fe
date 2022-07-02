import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageRoutingModule } from './message-routing.module';
import { MsgListComponent } from './msg-list/msg-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RecievedMessageComponent } from './recieved-message/recieved-message.component';
import { SendMessageComponent } from './send-message/send-message.component';


@NgModule({
  declarations: [
    MsgListComponent,
    RecievedMessageComponent,
    SendMessageComponent
  ],
  imports: [
    CommonModule,
    MessageRoutingModule,
    SharedModule

  ]
})
export class MessageModule { }

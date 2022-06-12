import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageRoutingModule } from './message-routing.module';
import { MsgListComponent } from './msg-list/msg-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    MsgListComponent
  ],
  imports: [
    CommonModule,
    MessageRoutingModule,
    SharedModule

  ]
})
export class MessageModule { }

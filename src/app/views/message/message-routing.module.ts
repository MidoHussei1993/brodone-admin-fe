import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsgListComponent } from './msg-list/msg-list.component';

const routes: Routes = [
  {
    path:'',
    component:MsgListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageRoutingModule { }

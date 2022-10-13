import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { TagsCrudComponent } from './tags-crud/tags-crud.component';
import { TagsListComponent } from './tags-list/tags-list.component';
import { TagsRoutingModule } from './tags-routing.module';


@NgModule({
  declarations: [
    TagsListComponent,
    TagsCrudComponent
  ],
  imports: [
    CommonModule,
    TagsRoutingModule,
    SharedModule
  ]
})
export class TagsModule { }

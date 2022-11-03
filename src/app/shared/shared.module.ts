import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchModule } from './components/search/search.module';
import { SharedComponentsModule } from './components/shared-components.module';
import { SharedDirectivesModule } from './directives/shared-directives.module';
import { SharedPipesModule } from './pipes/shared-pipes.module';
import { TranslateModule } from '@ngx-translate/core';
import { TableComponent } from './components/table/table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DemoNumberPipe } from './pipes';
import { FilterComponent } from './components/filter/filter.component';
import { GoogleMapComponent } from './components/google-map/google-map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { FileInputComponent } from './components/file-input/file-input.component';

const Component = [
  TableComponent,
  FilterComponent,
  GoogleMapComponent,
  FileInputComponent
]
const Pipes = [
  DemoNumberPipe
]

@NgModule({
  declarations: [
    ...Component,
    ...Pipes,
  ],
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    SearchModule,
    ToastrModule.forRoot(),
    NgbModule,
    SharedComponentsModule,
    SharedDirectivesModule,
    SharedPipesModule,
    RouterModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    GoogleMapsModule
  ],
  exports: [
    RouterModule,
    TranslateModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ...Component,
    ...Pipes,
  ]
})
export class SharedModule { }

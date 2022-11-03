import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { environment } from "src/environments/environment";
import { Pagination } from "../../models";
import { SwalModalService } from "../../services/swal-modal.service";
// import { Pagination } from '../..';
// import { ExcelService } from '../../services/excel.service';

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {
  @Input() list: any[] = [];
  @Input() properties: string[] = [];
  @Input() titles: string[] = [];

  @Input() pagination: Pagination = new Pagination();

  @Input() showDelete: boolean = true;
  @Input() showEdit: boolean = true;
  @Input() showView: boolean = true;
  @Input() busyLoading: boolean = false;
  @Input() showActivation: boolean = false;
  @Output() view = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  @Input() addActions: boolean = false;
  @Input() actionList: {
    title: string;
    icon: string;
    type?: string;
    condition?: string;
  }[] = [];
  @Output() aciton: EventEmitter<any> = new EventEmitter<any>();
  @Output() changeActivation: EventEmitter<any> = new EventEmitter<any>();

  @Input() showAnotherCheck: boolean = false;
  @Input() AnotherCheckPropName: string = "";
  @Input() AnotherCheckTitelName: string = "";
  @Output() changeAnotherCheck: EventEmitter<any> = new EventEmitter<any>();
  @Output() resetFilter: EventEmitter<any> = new EventEmitter<any>();

  @Input() rowsNumber: Number[] = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  pageSize: number = 10;
  @Output() activetedPageSize = new EventEmitter<number>();
  @Output() activetedPageNumber = new EventEmitter<number>();

  @Output() search: EventEmitter<any> = new EventEmitter<any>();
  @Input() showSearch: boolean = false;
  @Input() showPagination: boolean = true;
  @Input() isdownloadAll: boolean = false;
  @Output() export = new EventEmitter<number>();

  @Input() create: string = "";

  amazonLink: string = environment.amazonLink;

  active: number = 1;
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private swalService: SwalModalService // private excelService:ExcelService
  ) {
    this.form = this.formBuilder.group({
      search: ["", [Validators.required]],
    });
  }
  ngOnInit(): void {}

  searchValue(): void {
    this.search.emit(this.form.get("search").value);
  }
  reset(): void {
    this.form.reset();
    this.resetFilter.emit("");
  }
  View(item: any): void {
    this.view.emit(item);
  }
  changeActivationCol(index: number): void {
    this.changeActivation.emit(index);
  }

  changeAnotherCheckCol(index: number): void {
    this.changeAnotherCheck.emit(index);
  }

  Edit(item: any): void {
    this.edit.emit(item);
  }

  Delete(item: any): void {
    this.swalService.deleteConfirmation().then((res) => {
      if (res) {
        this.delete.emit(item);
      }
    });
  }
  EmitAaction(item: any, type?: string): void {
    this.aciton.emit({
      event: item,
      ...(type && { type: type }),
    });
  }

  pageSizeChanged(event: string) {
    // console.log(+event.split(': ')[1]);
    // console.log(this.pageSize);
    this.pageSize = Number(+event.split(": ")[1]);
    this.activetedPageSize.emit(+event.split(": ")[1]);
  }
  sendPageNumber(pageNumber: number) {
    this.active = pageNumber;
    this.activetedPageNumber.emit(pageNumber);
  }

  downloadAsExcelFile() {
    if (!this.list.length) return;
    // this.excelService.exportAsExcelFile(this.list, 'data_file');
  }
  downloadAllData(): void {
    this.export.emit();
  }
  accessNestedPropertyOfObject(o, s) {
    s = s.replace(/\[(\w+)\]/g, ".$1"); // convert indexes to properties
    s = s.replace(/^\./, ""); // strip a leading dot
    var a = s.split(".");
    for (var i = 0, n = a.length; i < n; ++i) {
      var k = a[i];
      if (k in o) {
        o = o[k];
      } else {
        return;
      }
    }
    return o;
  }
}

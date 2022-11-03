import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from "src/environments/environment";
import { FileUploadService } from "../../services";

@Component({
  selector: "app-file-input",
  templateUrl: "./file-input.component.html",
  styleUrls: ["./file-input.component.scss"],
})
export class FileInputComponent implements OnInit, OnChanges {
  @Input("control") control: FormControl;
  @Input("controlArray") controlArray: FormArray;

  @Input("accept") accept = "image/*";
  @Input("multiple") multiple: boolean = false;
  @Output("isUploaded") isUploaded = new EventEmitter();
  @Output("uploadedUrl") uploadedUrl = new EventEmitter();
  amazonLink: string = environment.amazonLink;
  @Input("currentImage") currentImage: string = null;

  constructor(
    private fileUpload: FileUploadService,
    private formBuilder: FormBuilder,

    public spinner: NgxSpinnerService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.control) {
      if (this.control.value && !this.currentImage) {
        this.currentImage = this.control.value;
      }
    }
  }

  ngOnInit(): void {}

  fileChangeEvent(event: any): void {
    this.spinner.show();
    this.fileUpload.UploadImage(event.target.files[0]).subscribe(
      (res) => {
        this.spinner.hide();
        if (this.multiple) {
          (this.controlArray as FormArray).push(this.initImageItem(res.Key));
        } else {
          this.currentImage = res.Key;
          this.control.setValue(res.Key);
        }
        this.uploadedUrl.emit(res.Key);
      },
      (err) => {
        this.spinner.hide();
      }
    );
    // this.convertFileTobase64(event.srcElement.files[0]).then(file => {
    // });
  }

  initImageItem(val = "") {
    const form = this.formBuilder.group({
      image: [val, Validators.required],
    });
    return form;
  }

  deleteImage(index) {
    (this.controlArray as FormArray).removeAt(index);
  }

  async convertFileTobase64(blob) {
    let image: string = "";

    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });

    await toBase64(blob).then((_res: string) => {
      image = _res;
    });
    this.isUploaded.emit({ isUploaded: true });
    return image;
  }
}

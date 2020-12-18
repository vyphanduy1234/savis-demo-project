import { PhongBan } from './../../models/phong-ban';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { UpdatedPhongBan } from 'src/app/models/updated-phong-ban';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less'],
})
export class FormComponent implements OnInit {
  editedPhongBan: UpdatedPhongBan = new UpdatedPhongBan();
  @Input() phongBan: PhongBan;
  @Output() onEdit: EventEmitter<any> = new EventEmitter<any>();

  validateForm: FormGroup;
  submitForm(value: {
    id: string;
    email: string;
    name: string;
    phone: string;
  }): void {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      this.editedPhongBan.modifiedUserId = this.editedPhongBan.id;
      this.editedPhongBan.provinceId = this.editedPhongBan.id;
      this.editedPhongBan.districtId = this.editedPhongBan.id;
      this.editedPhongBan.communeId = this.editedPhongBan.id;
      this.editedPhongBan.areaOperationId = this.editedPhongBan.id;
      this.editedPhongBan.parentId = this.editedPhongBan.id;
      this.onEdit.emit(this.editedPhongBan);
    }
  }


  constructor(private fb: FormBuilder) {
    this.validateForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      phone: ['', [Validators.required, this.isMobile]],
      name: ['', [Validators.required]],
      id: ['', [Validators.required]],
    });
  }

  isMobile = (control: FormControl): { [s: string]: boolean } => {
    return typeof control.value === 'string' && /^[1-9]{10}/.test(control.value)
      ? null
      : { wrong: true };
  };

  ngOnInit(): void {
    this.editedPhongBan.id = this.phongBan.id;
    this.editedPhongBan.name = this.phongBan.name;
  }
}

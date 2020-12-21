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
  updatedPhongBan: UpdatedPhongBan;
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
      this.onEdit.emit(this.updatedPhongBan);
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
    this.updatedPhongBan = new UpdatedPhongBan();
    this.updatedPhongBan.id = this.phongBan.id;
    this.updatedPhongBan.name = this.phongBan.name;
    this.updatedPhongBan.code = this.phongBan.code;
    this.updatedPhongBan.status = this.phongBan.status;
    this.updatedPhongBan.createdOnDate = this.phongBan.createdOnDate;
  }
}

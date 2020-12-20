import { BoardService } from './../../services/board.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Observer, Observable } from 'rxjs';
import { AddPhongBan } from 'src/app/models/add-phong-ban';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-show',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.less'],
})
export class AddComponent implements OnInit {
  validateForm: FormGroup;
  selectedProvince = {};
  selectedDistrict = {};
  selectedCommune = {};

  submitForm(value: {
    code: string;
    email: string;
    name: string;
    phone: string;
  }): void {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      let addValue = new AddPhongBan();
      addValue.name = value.name;
      addValue.code = value.code;
      addValue.email = value.email;
      addValue.phoneNumber = value.phone;
      addValue.provinceId = this.selectedProvince as string;
      addValue.districtId = this.selectedDistrict as string;
      addValue.communeId = this.selectedCommune as string;
      this.mService.addPhongBan(addValue).subscribe((data) => {
        if (data.code == 200) {
          this.createMessage('success');
        } else {
          this.createMessage('error');
        }
      });
    }
  }

  createMessage(type: string): void {
    if (type == 'success') this.message.create(type, 'add success');
    if (type == 'error') this.message.create(type, 'add fail');
  }

  constructor(
    private fb: FormBuilder,
    private mService: BoardService,
    private message: NzMessageService
  ) {
    this.validateForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      phone: ['', [Validators.required, this.isMobile]],
      name: ['', [Validators.required]],
      code: ['', [Validators.required]],
    });
  }

  isMobile = (control: FormControl): { [s: string]: boolean } => {
    return typeof control.value === 'string' && /^[1-9]{10}/.test(control.value)
      ? null
      : { wrong: true };
  };

  ngOnInit(): void {
    this.fetchData();
  }

  arrProvince: any = [];
  fetchData() {
    this.mService
      .fetchListProvince()
      .subscribe((data) => (this.arrProvince = data.data));
  }

  isDistrictLoaded = false;
  arrDistrict: any = [];
  isProvinceChosen = false;
  choseProvince(data) {
    this.mService
      .fetchDistrictWithProvince(this.selectedProvince)
      .subscribe((data) => {
        console.log(data);

        this.arrDistrict = data;
        this.isDistrictLoaded = true;
        this.isProvinceChosen = true;
      });
  }

  isCommuneLoaded = false;
  arrCommune: any = [];
  isDistrictChosen = false;
  choseDistrict(data) {
    this.mService
      .fetchCommuneWithDistrict(this.selectedDistrict)
      .subscribe((data) => {
        this.arrCommune = data;
        this.isCommuneLoaded = true;
        this.isDistrictChosen = true;
      });
  }

  isCommueChosen = false;
  choseCommune(data) {
    this.isCommueChosen = true;
  }
}

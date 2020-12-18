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

@Component({
  selector: 'app-show',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.less'],
})
export class AddComponent implements OnInit {
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
    }
  }

  constructor(private fb: FormBuilder, private mService: BoardService) {
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
  choseProvince(provinceId) {

    this.mService.fetchDistrictWithProvince(provinceId).subscribe((data) => {
      console.log(data);

      this.arrDistrict = data;
      this.isDistrictLoaded = true;
    });
  }

  isCommuneLoaded = false;
  arrCommune: any = [];
  choseDistrict(DistrictId) {
    this.mService.fetchCommuneWithDistrict(DistrictId).subscribe((data) => {
      console.log(data);

      this.arrCommune = data;
      this.isCommuneLoaded = true;
    });
  }
}

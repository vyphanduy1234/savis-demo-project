import { BoardService } from './../../services/board.service';
import { PhongBan } from './../../models/phong-ban';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-dv-item',
  templateUrl: './dv-item.component.html',
  styleUrls: ['./dv-item.component.less'],
})
export class DvItemComponent implements OnInit {
  isInEditMode = false;
  @Input() phongBan: PhongBan;
  @Output() dataChanged: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private modal: NzModalService,
    private boardService: BoardService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {}

  showDeleteConfirm(): void {
    this.modal.confirm({
      nzTitle: `Are you sure delete ${this.phongBan.name} ?`,
      nzContent: '<b style="color: red;">Dữ liệu sẽ không được khôi phục</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.delete();
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel'),
    });
  }

  deleteObject: string[];
  delete() {
    this.deleteObject = [];
    this.deleteObject.push(this.phongBan.id);

    this.boardService.deletePhongBan(this.deleteObject).subscribe(
      (data) => {
        console.log(data);

        if(data.code == 200){
          this.createMessage('success','Delete');
          this.dataChanged.emit();
        }else{
          this.createMessage('error','Delete');
        }
      },
      (error) => {
        this.createMessage('error','Delete');
      }
    );
  }

  update(phongBan){

    this.boardService.updatePhongBan(phongBan).subscribe((data) => {
      if(data.code == 200){
        this.createMessage('success','Update');
        this.dataChanged.emit();
      }else{
        this.createMessage('error','Update');
      }
    },
    (error) => {
      this.createMessage('error','Update');
    });
  }

  showConfirmEdit(): void {
    this.modal.confirm({
      nzTitle: `<i>Chỉnh sửa</i>`,
      nzContent: '<b>Dữ liệu sẽ không được khôi phục</b>',
      nzOnOk: () => console.log('OK'),
    });
  }

  turnOnEditMode() {
    this.isInEditMode = !this.isInEditMode;
  }

  createMessage(type: string,message: string): void {
    if (type == 'success') this.message.create(type, `${message} success`);
    if (type == 'error') this.message.create(type, `${message} fail`);
  }
}

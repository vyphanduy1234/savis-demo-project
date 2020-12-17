import { BoardService } from './../../services/board.service';
import { PhongBan } from './../../models/phong-ban';
import { Component, Input, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-dv-item',
  templateUrl: './dv-item.component.html',
  styleUrls: ['./dv-item.component.less'],
})
export class DvItemComponent implements OnInit {
  @Input() phongBan: PhongBan;
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
    this.createMessage('success');
    this.deleteObject = [];
    this.deleteObject.push(this.phongBan.id);
    console.log(this.deleteObject);

    this.boardService
      .deletePhongBan(this.deleteObject)
      .subscribe((mess) => console.log(mess));
  }

  showConfirm(): void {
    this.modal.confirm({
      nzTitle: '<i>Do you Want to delete these items?</i>',
      nzContent: '<b>Dữ liệu sẽ không được khôi phục</b>',
      nzOnOk: () => console.log('OK'),
    });
  }

  createMessage(type: string): void {
    this.message.create(type, 'delete success');
  }
}

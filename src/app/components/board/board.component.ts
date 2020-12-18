import { BoardService } from './../../services/board.service';
import { PhongBan } from './../../models/phong-ban';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.less'],
})
export class BoardComponent implements OnInit {
  arrPhongBan: any[];
  constructor(private bService: BoardService) {}

  isDataLoading = false;
  ngOnInit(): void {
    this.getListPhongBan();
  }

  getListPhongBan() {
    this.isDataLoading = true;
    this.bService.fetchListPhongBan().subscribe((data) => {
      this.arrPhongBan = data;
      this.isDataLoading = false;
    });
  }
}

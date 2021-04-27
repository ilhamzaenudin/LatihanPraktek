import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Data } from '../model/data';
import { MasterService } from '../service/master.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tabel',
  templateUrl: './tabel.component.html',
  styleUrls: ['./tabel.component.css'],
  providers: [MasterService],
})
export class TabelComponent implements OnInit, OnDestroy {
  cariDataForm!: FormGroup;
  dataList!: Data[];

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject()
  constructor(private ms: MasterService) { }

  ngOnInit(): void {
    /*this.ms.listData().subscribe((data) => {
      this.dataList = data;
    })*/
    this.cariDataForm = new FormGroup({
      nama: new FormControl(),
      alamat: new FormControl()
    });
    const that = this;
    this.dtOptions = {
      ajax: (dataTablesParameters: any, callback) => {
        const paramater = new Map<string, any>();
        paramater.set('nama', this.cariDataForm.controls.nama.value);
        paramater.set('alamat', this.cariDataForm.controls.alamat.value);
        that.ms.getListKelasAll(paramater, dataTablesParameters).subscribe(resp => {
          callback({
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: resp.data,
            draw: resp.draw
          });
        });
      },
      search: false,
      serverSide: true,
      processing: true,
      columns: [{
        title: 'ID',
        data: 'id',
        orderable: false
      }, {
        title: 'Name',
        data: 'nama'
      }, {
        title: 'Alamat',
        data: 'alamat'
      }, {
        title: 'Kota',
        data: 'kota'
      }, {
        title: 'Pendapatan',
        data: 'pendapatan'
      }, {
        title: 'Action',
        orderable: false,
        render(data, type, row): any {
          return '<a href ="edit/${row.id}">Edit</a>'
        }
      }],
      rowCallback(row): void {
        const idx = this.rowId;
        //$('td:eq(0)', row).html('<b>' + idx + '</b>');
      }
    }
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  cariData(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    })
  }
}


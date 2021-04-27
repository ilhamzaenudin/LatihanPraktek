import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Kelas } from '../model/kelas';
import { MasterService } from '../services/master.service';

@Component({
  selector: 'app-daftarkelas',
  templateUrl: './daftarkelas.component.html',
  styleUrls: ['./daftarkelas.component.css'],
  providers: [MasterService]
})
export class DaftarkelasComponent implements OnInit, OnDestroy {
  cariDataForm!: FormGroup;
  daftarKelas!: Kelas[];

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject()
  constructor(private ms: MasterService) { }

  ngOnInit(): void {
    /*this.ms.listKelas().subscribe((data) => {
      this.daftarKelas = data;
    });*/
    this.cariDataForm = new FormGroup({
      nama: new FormControl()
    });
    const that = this;
    this.dtOptions = {
      ajax: (dataTablesParameters: any, callback) => {
        const paramater = new Map<string, any>();
        paramater.set('nama', this.cariDataForm.controls.nama.value);
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
        title: 'keterangan',
        data: 'keterangan'
      }, {
        title: 'Action',
        orderable: false,
        render(data, type, row): any {
          return '<a href ="editkelas/${row.id}">Edit</a>'
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

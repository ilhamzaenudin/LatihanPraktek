import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Data } from '../model/data';
import { MasterService } from '../service/master.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-utama',
  templateUrl: './utama.component.html',
  styleUrls: ['./utama.component.css'],
  providers: [MasterService]
})
export class UtamaComponent implements OnInit {
  addDataForm!: FormGroup;
  daftarCustomer!: Data;
  id!: string;
  isEdit = false;

  constructor(
    private ruter: Router,
    private route: ActivatedRoute,
    private mservice: MasterService,
    private toastr: ToastrService) {
    this.addDataForm = new FormGroup({
      nama: new FormControl(null, [Validators.required]),
      alamat: new FormControl(null, [Validators.required]),
      kota: new FormControl(null, [Validators.required]),
      pendapatan: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(hasil => {
      this.id = hasil.id;
      if (this.id) {
        this.isEdit = true;
        this.mservice.getKelasById(this.id).subscribe((data) => {
          this.addDataForm.controls.nama.setValue(data[0].nama);
          this.addDataForm.controls.alamat.setValue(data[0].alamat);
          this.addDataForm.controls.kota.setValue(data[0].kota);
          this.addDataForm.controls.pendapatan.setValue(data[0].pendapatan);
        })
      }
    })
  }
  simpanData(): void {
    if (this.addDataForm.valid) {
      const DataTmp = new Data;
      DataTmp.nama = this.addDataForm.controls.nama.value;
      DataTmp.alamat = this.addDataForm.controls.alamat.value;
      DataTmp.kota = this.addDataForm.controls.kota.value;
      DataTmp.pendapatan = this.addDataForm.controls.pendapatan.value;
      this.daftarCustomer = DataTmp;
      console.log(this.daftarCustomer);
      this.mservice.insertData(DataTmp).subscribe((data) => {
        this.toastr.success(data.message, 'Simpan Berhasil')
          .onTap
          .subscribe(
            () => {
              this.ruter.navigateByUrl("/edit/" + data.key);
            });
      });
    }
  }
}
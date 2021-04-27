import { Component, OnInit } from '@angular/core';
import { MasterService } from '../services/master.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Kelas } from '../model/kelas';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-insertdata',
  templateUrl: './form2.component.html',
  styleUrls: ['./form2.component.css'],
  providers: [MasterService],
})
export class Form2Component implements OnInit {
  addDataForm!: FormGroup;
  daftarKelas!: Kelas;
  id!: string;
  isEdit = false;

  constructor(
    private ruter: Router,
    private route: ActivatedRoute,
    private mservice: MasterService,
    private toastr: ToastrService) {
    this.addDataForm = new FormGroup({
      nama: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      keterangan: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(hasil => {
      this.id = hasil.id;
      if (this.id) {
        this.isEdit = true;
        this.mservice.getKelasById(this.id).subscribe((data) => {
          console.log(data);
          this.addDataForm.controls.nama.setValue(data[0].nama);
          this.addDataForm.controls.keterangan.setValue(data[0].keterangan);
        });
      }
    });
  }
  simpanData(): void {
    if (this.addDataForm.valid) {
      const KelasTmp = new Kelas;
      KelasTmp.nama = this.addDataForm.controls.nama.value;
      KelasTmp.keterangan = this.addDataForm.controls.keterangan.value;
      this.daftarKelas = KelasTmp;
      console.log(this.daftarKelas);
      this.mservice.insertKelas(KelasTmp).subscribe((data) => {
        this.toastr.success(data.message, 'Simpan Berhasil')
          .onTap
          .subscribe(
            () => {
              this.ruter.navigateByUrl("/editkelas/" + data.key);
            });
      });
    }
  }
}
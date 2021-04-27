import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Kelas } from '../model/kelas';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  addDataForm!: FormGroup;
  namaVar!: string;
  ketVar!: string;
  daftarKelas!: Kelas;
  values!: boolean;
  indicator!: number;
  kelasList!: Kelas[];
  constructor() { }

  ngOnInit(): void {
    this.addDataForm = new FormGroup({
      nama: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      keterangan: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      umur: new FormControl(null, [Validators.required])
    });

    this.values = false;
  }

  simpanData(): void {

    if (this.values == false) {
      if (this.addDataForm.valid) {
        const KelasTmp = new Kelas;
        KelasTmp.nama = this.addDataForm.controls.nama.value;
        KelasTmp.keterangan = this.addDataForm.controls.keterangan.value;
        KelasTmp.umur = this.addDataForm.controls.umur.value;
        this.daftarKelas = KelasTmp;
        console.log(this.daftarKelas);
      }
      console.log(this.addDataForm.controls.nama.value);
      console.log(this.addDataForm.controls.keterangan.value);
      this.namaVar = this.addDataForm.controls.nama.value;
      this.ketVar = this.addDataForm.controls.keterangan.value;
    } else {
      if (this.addDataForm.valid) {
        const KelasTmp = new Kelas;
        KelasTmp.nama = this.addDataForm.controls.nama.value;
        KelasTmp.keterangan = this.addDataForm.controls.keterangan.value;
        KelasTmp.umur = this.addDataForm.controls.umur.value;
        this.daftarKelas = KelasTmp;
        console.log(this.daftarKelas);
      }
      console.log(this.addDataForm.controls.nama.value);
      console.log(this.addDataForm.controls.keterangan.value);
      this.namaVar = this.addDataForm.controls.nama.value;
      this.ketVar = this.addDataForm.controls.keterangan.value;
    }
  }

  editData(datakelas: Kelas): void {
    this.values = true;
    console.log(datakelas);
    this.addDataForm.controls.nama.setValue(datakelas.nama);
    this.addDataForm.controls.keterangan.setValue(datakelas.keterangan);
    this.addDataForm.controls.umur.setValue(datakelas.umur);
  }

}

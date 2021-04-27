import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { Kelas } from '../model/kelas';

@Component({
  selector: 'app-detail-kelas',
  templateUrl: './detail-kelas.component.html',
  styleUrls: ['./detail-kelas.component.css']
})
export class DetailKelasComponent implements OnInit, OnChanges {
  @Input() kelasDetail!: Kelas;
  @Output() kelasKirim = new EventEmitter;
  @Output() var = new EventEmitter;
  kelasParam!: Kelas;
  kelasList!: Kelas[];
  constructor() { }

  ngOnInit(): void {
    this.kelasList = [];
  }


  ngOnChanges(ubah: SimpleChanges): void {
    if (ubah.hasOwnProperty('kelasDetail')) {
      if (this.kelasList) {
        this.kelasList.push(this.kelasDetail);
        console.log(this.kelasList);
      }
    }
  }

  editData(namaPar: string): void {

    let tmpKelas;
    let i = 0;
    for (const kela of this.kelasList) {

      if (kela.nama === namaPar) {
        tmpKelas = kela;
      };

      console.log(namaPar);
      i++;
    }

    this.kelasKirim.emit(tmpKelas);
    this.var.emit(i);

  }

}
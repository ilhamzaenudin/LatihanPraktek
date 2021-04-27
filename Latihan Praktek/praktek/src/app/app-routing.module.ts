import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabelComponent } from './tabel/tabel.component';
import { UtamaComponent } from './utama/utama.component';

const routes: Routes = [
    { path: 'utama', component: UtamaComponent },
    { path: 'tabel', component: TabelComponent },
    { path: 'edit/:id', component: UtamaComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
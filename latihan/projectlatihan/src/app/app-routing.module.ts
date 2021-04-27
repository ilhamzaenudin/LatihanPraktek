import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CobaComponent } from './coba/coba.component';
import { DaftarkelasComponent } from './daftarkelas/daftarkelas.component';
import { FormComponent } from './form/form.component';
import { Form2Component } from './form2/form2.component';

const routes: Routes = [
  { path: 'coba', component: CobaComponent },
  { path: 'form', component: FormComponent },
  { path: 'daftarKelas', component: DaftarkelasComponent },
  { path: 'form2', component: Form2Component },
  { path: 'editkelas/:id', component: Form2Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

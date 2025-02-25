import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './pages/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { CategoryModule } from '../category/category.module';
import { MaterialModule } from '../shared/material.module';



@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CategoryModule,
    MaterialModule
  ]
})
export class DashboardModule { }

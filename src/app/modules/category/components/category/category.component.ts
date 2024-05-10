import { Component, Inject, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';
import { CategoryService } from 'src/app/modules/shared/services/category.service';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{
  @ViewChild('miFormulario', { static: false }) miFormulario!: NgForm; // Reemplaza NgForm con el tipo de formulario que estés usando

  cliente: string = '';
  mascota: string = '';
  descripcion: string = '';


  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: { id: number,nombre_cliente: string; nombre_mascota: string; razon_cita: string; fecha: string; }[] = [];


  private categoryService = inject(CategoryService);
  private snackBar = inject(MatSnackBar);
  public dialog = inject(MatDialog);
  datos=null;
  ngOnInit(): void {
    this.getCategories();
  }
  

  submitForm() {
    
    const fechaActual = new Date();
    const fechaActualLegible = fechaActual.toLocaleString();
    console.log(this.dataSource[this.dataSource.length-1].nombre_cliente)
    console.log("Fecha actual en formato legible:", fechaActualLegible);
    const id=this.dataSource[this.dataSource.length-1].id +1;
    const nuevoItem={id: id, nombre_cliente:this.cliente, nombre_mascota:this.mascota, razon_cita: this.descripcion,fecha: fechaActualLegible }
    this.dataSource.push(nuevoItem)
    console.log(this.dataSource)
  }
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getCategories(): void {

    this.categoryService.getCategories()
      .subscribe( (data:any) => {
        this.dataSource=data
        console.log(this.dataSource);
      }, (error: any) => {
        console.log("error: ", error);
      })
  }



  openCategoryDialog(){
    const dialogRef = this.dialog.open(NewCategoryComponent , {
      width: '450px'
    });

    
    
  }



  delete(id: any){
    console.log(id)
    this.dataSource.splice(id, 1);

  }

  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action, {
      duration: 2000
    })

  }

  buscar(dato: any){
    console.log("Buscar")
  }

}

export interface CategoryElement {
  id:Number
  nombre_cliente: string;
  nombre_mascota: string;
  razon_cita: string;
  fecha: string;
}

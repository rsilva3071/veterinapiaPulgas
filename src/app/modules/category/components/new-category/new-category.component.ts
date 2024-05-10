import { Component, EventEmitter, Inject, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/modules/shared/services/category.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit{
  @Output() datosGuardados = new EventEmitter<{ name: string, name_mascota: string, description: string  }>();
  public categoryForm!: FormGroup;
  private fb = inject(FormBuilder);
  private categoryService= inject(CategoryService);
  private dialogRef= inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);
  estadoFormulario: string = "";

  ngOnInit(): void {

    console.log(this.data);
    this.estadoFormulario = "Agregar";
    
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    })

    if (this.data != null ){
      this.updateForm(this.data);
      this.estadoFormulario = "Actualizar";
    }
  }

  onSave(){

    let data = {
      name: this.categoryForm.get('name')?.value,
      name_mascota: this.categoryForm.get('name')?.value,
      description: this.categoryForm.get('description')?.value
    }
    console.log(data)
    this.datosGuardados.emit(data);
    //this.dialogRef.close(3);

  }

  onCancel(){
    this.dialogRef.close(3);
  }

  updateForm(data: any){
    this.categoryForm = this.fb.group( {
      name: [data.name, Validators.required],
      description: [data.description, Validators.required]
    });

  }


}

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from "src/app/material.module";
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-import-wells',
  imports: [MaterialModule,CommonModule],
  templateUrl: './import-wells.html',
  styleUrl: './import-wells.scss'
})
export class ImportWells {
  selectedFile: File | null = null;
  uploadMessage = '';
  uploadSuccess = false;
  loading = false;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.files?.length) {
      this.selectedFile = event.dataTransfer.files[0];
    }
  }

  cancelUpload() {
    this.selectedFile = null;
    this.uploadMessage = '';
  }

  uploadFile() {
    if (!this.selectedFile) return;

    this.loading = true;
    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post('http://localhost:3000/upload-pozos', formData)
      .subscribe({
        next: (res: any) => {
          this.uploadMessage = res.message;
          this.uploadSuccess = true;
          this.loading = false;
          this.snackBar.open('✅ Archivo importado correctamente', 'Cerrar', { duration: 3000 });
        },
        error: () => {
          this.uploadMessage = '❌ Error al subir el archivo';
          this.uploadSuccess = false;
          this.loading = false;
          this.snackBar.open('❌ Error al subir el archivo', 'Cerrar', { duration: 3000 });
        }
      });
  }

  openHelp() {
    this.snackBar.open('Formato esperado: PozoID, Nombre, Campo, ProduccionDiaria...', 'Ok', { duration: 5000 });
  }
}
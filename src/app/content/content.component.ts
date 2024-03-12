import { Component } from '@angular/core';
import { DirectusService } from '../directus.service';
import { LoginService } from '../login.service';
import { CollectionComponent } from '../collection/collection.component';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CollectionComponent],
  templateUrl: './content.component.html'
})
export class ContentComponent {
  private access_token = JSON.parse(sessionStorage.getItem("user") || '[]').access_token;
  private contenedor:any[] = [];

  cat = 0
  
  constructor(private directusService:DirectusService, private loginService:LoginService) {

    // if (this.isAuthenticated()) {
    //   this.directusService.fetchCollections(this.access_token);
    // }

    this.directusService.fetchCollections();


  }

  getCollections() {
    return this.directusService.getCollections();
  }

  // getColls() {
  //   this.directusService.getColls().subscribe({
  //     next: ((res:any) => {
  //       this.contenedor = res.data;
  //     })
  //   })
  // }

  getColls2() {
    return this.contenedor;
  }

  isAuthenticated() {
    return this.loginService.getAuthenticationStatus();
  }

  download() {
    const fileUrl = 'http://localhost:8055/assets/a1b0ad08-d3f4-4b25-99e1-e227fc3843f5?download';
    this.directusService.downloadFile(fileUrl);
  }

  handleFileInput(event: any): void {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;
    if (files && files.length > 0) {
      const fileToUpload = files[0];
      this.directusService.uploadFile(fileToUpload);
    } else {
      console.error('No se seleccionó ningún archivo.');
    }
  }
}

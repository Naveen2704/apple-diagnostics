import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-upload-prescription',
  templateUrl: './upload-prescription.component.html',
  styleUrls: ['./upload-prescription.component.scss'],
})
export class UploadPrescriptionComponent implements OnInit {

  imageElement: any = [];
  constructor() { }

  ngOnInit() {}

  async takePic() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
  
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image.webPath;
  
    // Can be set to the src of an image now
    this.imageElement.src = imageUrl;
    // const takePicture = async () => {
      
    // };
  }

}

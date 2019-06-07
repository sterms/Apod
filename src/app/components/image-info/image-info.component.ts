import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../services/image/image.service';

@Component({
  selector: 'apod-image-info',
  templateUrl: './image-info.component.html',
  styleUrls: ['./image-info.component.scss']
})
// Image Info Component - Displays the image meta-data.
export class ImageInfoComponent implements OnInit {

  public explanation: string;

  public copyright: string;

  public title: string;

  constructor(private imageService: ImageService) { }

  // Subscribes to the image service's current image info.
  ngOnInit() {
    this.imageService.currentImageInfo.subscribe(info => {
      if (info) {
        this.explanation = info.explanation;
        this.title = info.title;
        this.copyright = info.copyright;
      }
    });
  }
}

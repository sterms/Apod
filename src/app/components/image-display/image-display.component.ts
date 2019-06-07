import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../services/image/image.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeUrl } from '@angular/platform-browser/src/security/dom_sanitization_service';

@Component({
  selector: 'apod-image-display',
  templateUrl: './image-display.component.html',
  styleUrls: ['./image-display.component.scss']
})
// Image Display Component - Displays a given URL.
export class ImageDisplayComponent implements OnInit {

  public dataSource: SafeUrl;

  public media_type: string;

  constructor(private imageService: ImageService, private sanitizer: DomSanitizer) { }

  // Subscribes to the image service's image sources behavior subject. Uses a sanitizer for video URLS
  // in an IFrame element.
  ngOnInit() {
    this.imageService.currentImageSources.subscribe(sources => {
      if (sources) {
        this.dataSource = this.sanitizer.bypassSecurityTrustResourceUrl(sources.displayHd ? sources.hdurl : sources.url);
        this.media_type = sources.media_type;
      }
    });
  }

}

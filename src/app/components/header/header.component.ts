import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../services/image/image.service';

@Component({
  selector: 'apod-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
// Header Component - Displays title information.
export class HeaderComponent implements OnInit {

  public selectedDate: Date;

  constructor(private imageService: ImageService) { }

  ngOnInit() {
    this.imageService.currentImageInfo.subscribe(info => {
      if (info) {
        this.selectedDate = info.date;
      }
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NasaResponse, NasaService } from '../../services/nasa/nasa.service';
import { ImageService } from '../../services/image/image.service';

@Component({
  selector: 'apod-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
// Image Component - Controls the selected date and updates the image service for child components.
export class ImageComponent implements OnInit {

  public earliestDate: Date;

  public currentDate: Date;

  public dateControl: FormControl;

  public currentLimit: number;

  public remainingCalls: number;

  public hasHd: boolean;

  private cachedResponses: Map<string, NasaResponse>;

  // Sets current date to today, but discards time since we only care about the date portion.
  constructor(private nasaService: NasaService, private imageService: ImageService) {
    this.currentDate = new Date(Date.now());
    this.earliestDate = this.getPastDate(this.currentDate);
    this.dateControl = new FormControl(this.currentDate);
    this.cachedResponses = new Map<string, NasaResponse>();
  }

  ngOnInit() {
    this.dateControl.valueChanges.subscribe((value) => {
      this.setImage(value);
    });

    this.imageService.currentApiCallLimit.subscribe(value => {
      this.currentLimit = value;
    });

    this.imageService.currentApiCallsRemaining.subscribe(value => {
      this.remainingCalls = value;
    });

    this.dateControl.setValue(this.currentDate);
  }

  // Setups up the minimum date of 2 months ago.
  private getPastDate(fromDate: Date): Date {
    const pastDate = new Date(fromDate);
    pastDate.setMonth(fromDate.getMonth() > 2 ? fromDate.getMonth() - 2 : 12 + (fromDate.getMonth() - 2));
    pastDate.setFullYear( fromDate.getMonth() > 2 ? fromDate.getUTCFullYear() : fromDate.getFullYear() - 1);

    return pastDate;
  }

  // Updates the image to a new date.
  private setImage(date: Date): void {
    const dateString = date.toLocaleDateString();

    // Check cache first.
    if (this.cachedResponses.has(dateString)) {
      this.setImageServiceInfo(this.cachedResponses.get(dateString));
      return;
    }

    this.nasaService.getApod(date).subscribe(response => {

      // NASA Api currently does not have 'access-control-allow-headers' set to contain the limits, so
      // JavaScript won't display them. The code will attempt, maybe in the future this will change.
      this.imageService.currentApiCallLimit.next(+response.headers.get(this.nasaService.CallLimitHeader));
      this.imageService.currentApiCallsRemaining.next(+response.headers.get(this.nasaService.RemainingCallsHeader));

      const data = response.body;

      if (!this.cachedResponses.has(dateString)) {
        this.cachedResponses.set(dateString, data);
      }

      this.setImageServiceInfo(data);
    });
  }

  // Sets a nasa response in the image service.
  private setImageServiceInfo(data: NasaResponse) {

    this.imageService.currentImageInfo.next({
      copyright: data.copyright,
      date: data.date,
      explanation: data.explanation,
      title: data.title
    });

    this.imageService.currentImageSources.next({
      url: data.url,
      hdurl: data.hdurl,
      media_type: data.media_type,
      displayHd: false
    });

    this.hasHd = data.hdurl != null;
  }

  // Toggles the display between SD and HD.
  public setHd(): void {
    const currentUrls = this.imageService.currentImageSources.getValue();

    this.imageService.currentImageSources.next({
      url: currentUrls.url,
      hdurl: currentUrls.hdurl,
      media_type: currentUrls.media_type,
      displayHd: !currentUrls.displayHd
    });
  }

  // Returns true if currently displaying the HD image.
  public isDisplayingHd(): boolean {
    return this.imageService.currentImageSources.getValue().displayHd;
  }
}

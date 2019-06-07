import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// 'Singleton' image service, use to transmit data changes between sibling and child components.
export class ImageService {

  public readonly currentImageInfo: BehaviorSubject<ImageInfo> = new BehaviorSubject<ImageInfo>(null);

  public readonly currentImageSources: BehaviorSubject<ImageSources> = new BehaviorSubject<ImageSources>(null);

  public readonly currentApiCallsRemaining: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  public readonly currentApiCallLimit: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() { }
}

export interface ImageInfo {
  copyright: string;
  date: Date;
  explanation: string;
  title: string;
}

export interface ImageSources {
  url: string;
  hdurl: string;
  displayHd: boolean;
  media_type: string;
}

import { ImageService } from './image.service';
import { FactoryProvider } from '@angular/core';

const imageServiceFactory = () =>  {
  return new ImageService();
};

export const ImageServiceProvider: FactoryProvider = {
  provide: ImageService,
  useFactory: imageServiceFactory
};

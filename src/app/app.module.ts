import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule, Routes} from '@angular/router';
import { ImageComponent } from './components/image/image.component';
import { ImageDisplayComponent } from './components/image-display/image-display.component';
import { ImageInfoComponent } from './components/image-info/image-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImageServiceProvider } from './services/image/image.provider';
import { HttpClientModule } from '@angular/common/http';

const apodRoutes: Routes = [
  {
    path: '',
    component: ImageComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ImageComponent,
    ImageDisplayComponent,
    ImageInfoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    RouterModule.forRoot(apodRoutes)
  ],
  entryComponents: [
    ImageComponent
  ],
  providers: [
    ImageServiceProvider
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

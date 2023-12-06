import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MusicPlayRoutingModule } from './musica-play-routing.module';
import { MusicPlayComponent } from './music-play.component';

import { NativeAudio } from '@awesome-cordova-plugins/native-audio/ngx/index';

import { Media } from '@awesome-cordova-plugins/media/ngx/index';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'app/security/interceptor/interceptor.module';

@NgModule({
  declarations: [MusicPlayComponent],
  imports: [IonicModule, CommonModule, FormsModule, MusicPlayRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    NativeAudio,
    Media,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class MusicPlayModule {}

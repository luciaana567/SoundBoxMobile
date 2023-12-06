import { HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StreamingMedia } from '@awesome-cordova-plugins/streaming-media';

import { Observable, catchError, of } from 'rxjs';
import { environment } from 'environments/environment';
import { MusicDTO } from '../dtos/music.dto';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import data from '../../mokListaggem.json';
import { configHttpService } from './config-http.service';

@Injectable({ providedIn: 'root' })
export class StyleService {
  private url = environment.API_URL + 'style/';

  constructor(
    private httpClient: HttpClient,
    private configHttpService: configHttpService
  ) {}

  public getAllStyles(): Observable<any> {
    const sendUrl = this.url + 'get';

    return this.httpClient
      .get(sendUrl, this.configHttpService.httpOptions())
      .pipe(catchError(this.configHttpService.handleError));
  }
}

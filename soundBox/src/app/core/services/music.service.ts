import { HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StreamingMedia } from '@awesome-cordova-plugins/streaming-media';

import { Observable, catchError, of, Subject } from 'rxjs';
import { environment } from 'environments/environment';
import { MusicDTO } from '../dtos/music.dto';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import data from '../../mokListaggem.json';
import { configHttpService } from './config-http.service';

@Injectable({ providedIn: 'root' })
export class MusicService {
  private url = environment.API_URL + 'music/';
  private music: MusicDTO = new MusicDTO();
  private stateMusic: boolean = false;
  private musicFire: any;
  private userId = localStorage.getItem('idUser');
  playlist = new Subject();

  constructor(
    private http: HttpClient,
    private httpClient: HttpClient,
    private configHttpService: configHttpService,
    private fireStorage: AngularFireStorage
  ) {}

  public getMusic(): MusicDTO {
    return this.music;
  }

  public setMusic(idMusic: string) {
    this.getMusicById(idMusic).subscribe((res) => {
      this.music = res;
      this.getMusicByIdFirebase(this.music.idTrack);
      this.getImageMusicByIdFirebase(this.music.idImgMusic);
    });
  }

  public getStateMusic(): boolean {
    return this.stateMusic;
  }

  public changeStateMusic() {
    this.stateMusic = !this.stateMusic;
  }

  public playMusic() {
    if (this.getMusic().id != undefined || this.getMusic().id != null) {
      if (this.getStateMusic() == true) {
        var options = {
          bgColor: '#FFFFFF',
          bgImage: '',
          bgImageScale: 'fit', // other valid values: "stretch", "aspectStretch"
          initFullscreen: false, // true is default. iOS only.
          keepAwake: false, // prevents device from sleeping. true is default. Android only.
          successCallback: function () {
            console.log('Player closed without error.');
          },
          errorCallback: (errMsg: string) => {
            console.log('Error! ' + errMsg);
          },
        };
        StreamingMedia.playAudio(this.music.urlTrack!, options!);
        this.changeStateMusic();
      } else {
        StreamingMedia.stopAudio();
        this.changeStateMusic();
      }
    }
  }

  public getMusicById(id: string): Observable<any> {
    const sendUrl = this.url + 'get/' + id + '/user/' + this.userId;

    return this.httpClient
      .get(sendUrl, this.configHttpService.httpOptions())
      .pipe(catchError(this.configHttpService.handleError));

    // return this.http.get<MusicDTO[]>(`${this.url}`, { params });
  }

  getMusicByIdFirebase(music: string) {
    this.fireStorage
      .ref('songs')
      .child(music)
      .getDownloadURL()
      .subscribe((url) => {
        this.musicFire = url;
        this.music.urlTrack = url;
      });
  }

  getImageMusicByIdFirebase(music: string): string {
    var urlImg = '';
    this.fireStorage
      .ref('images')
      .child(music)
      .getDownloadURL()
      .subscribe((url) => {
        urlImg = url;
        this.music.urlImgMusic = url;
      });
    return urlImg;
  }
}

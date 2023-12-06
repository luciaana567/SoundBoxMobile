import { HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, Observer, Subject, catchError, of } from 'rxjs';
import { environment } from 'environments/environment';
import { MusicDTO } from '../dtos/music.dto';

import data from '../../mokListaggem.json';
import { MusicPlaylistToSaveDTO } from '../dtos/music-playlist-to-save.dto';
import { configHttpService } from './config-http.service';
import { BuilderHttpParams } from './builder-http-params.service';
import { ListStyleToGetMusicNeverAlreadyHeardDTO } from '../dtos/list-style-to-get-music-never-already-heard.dto';
import { AlreadyHeardToSaveDTO } from '../dtos/already-heard-to-save.dto';

@Injectable({ providedIn: 'root' })
export class PlaylistService {
  private url = environment.API_URL + 'playlist/';
  playlist = new Subject();
  valuesGetPlaylisRadom = new Subject();

  constructor(
    private httpClient: HttpClient,
    private configHttpService: configHttpService
  ) {}

  public getPlaylistParaUsuario(idUsuario: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('idUsuario', idUsuario);

    var observable = of(data.listagem);
    return observable;

    // return this.http.get<MusicDTO[]>(`${this.url}`, { params });
  }

  public getPlaylist(idUsuario: number): Observable<any> {
    const sendUrl = this.url + 'get/user/' + idUsuario;

    return this.httpClient
      .get(sendUrl, this.configHttpService.httpOptions())
      .pipe(catchError(this.configHttpService.handleError));
  }

  public getRadomPlaylistAlreadyHeard(idUsuario: number): Observable<any> {
    const sendUrl = this.url + 'get/MusicAlreadyHeardRadom/user/' + idUsuario;

    return this.httpClient
      .get(sendUrl, this.configHttpService.httpOptions())
      .pipe(catchError(this.configHttpService.handleError));
  }

  public getRadomNeverAlreadyHeard(stylesId: number[]): Observable<any> {
    const userId = Number(localStorage.getItem('idUser'));

    const sendUrl = this.url + 'get/MusicNeverAlreadyHeard';

    var value: ListStyleToGetMusicNeverAlreadyHeardDTO =
      new ListStyleToGetMusicNeverAlreadyHeardDTO();
    value.userId = userId;
    value.stylesId = stylesId;

    const body = JSON.stringify(value);

    return this.httpClient
      .post(sendUrl, body, this.configHttpService.httpOptions())
      .pipe(catchError(this.configHttpService.handleError));
  }

  public getRadomPlaylist(idUsuario: number): Observable<any> {
    const sendUrl = this.url + 'get/MusicRadom/user/' + idUsuario;

    return this.httpClient
      .get(sendUrl, this.configHttpService.httpOptions())
      .pipe(catchError(this.configHttpService.handleError));
  }

  public searchByName(name: string): Observable<any> {
    ///find/music/{name}/user{id}
    const idUsuario = localStorage.getItem('idUser');
    const sendUrl = this.url + 'find/music/' + name + '/user/' + idUsuario;

    return this.httpClient
      .get(sendUrl, this.configHttpService.httpOptions())
      .pipe(catchError(this.configHttpService.handleError));

    // let params = new HttpParams();
    // params = params.append('name', name);
    // console.log(data);
    // const listagem = data.listagem.filter(
    //   (x) =>
    //     x.name.toLowerCase().includes(name.toLowerCase()) ||
    //     x.artistName.toLowerCase().includes(name.toLowerCase())
    // );
    // var observable = of(listagem);
    // return observable;
    // return this.http.get<MusicDTO[]>(`${this.url}`, { params });
  }

  addMusicToPlaylist(value: MusicPlaylistToSaveDTO): Observable<any> {
    const body = JSON.stringify(value);
    const sendUrl = this.url + 'add/music';

    return this.httpClient
      .post(sendUrl, body, this.configHttpService.httpOptions())
      .pipe(catchError(this.configHttpService.handleError));
  }

  deleteMusicToPlaylist(value: MusicPlaylistToSaveDTO): Observable<any> {
    const body = JSON.stringify(value);
    const sendUrl = this.url + 'delete';

    return this.httpClient
      .post(sendUrl, body, this.configHttpService.httpOptions())
      .pipe(catchError(this.configHttpService.handleError));
  }

  alreadyHeardToSave(value: AlreadyHeardToSaveDTO): Observable<any> {
    const body = JSON.stringify(value);
    const sendUrl = environment.API_URL + 'AlreadyHeard/save';

    return this.httpClient
      .post(sendUrl, body, this.configHttpService.httpOptions())
      .pipe(catchError(this.configHttpService.handleError));
  }
}

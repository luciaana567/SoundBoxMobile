import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginService, PlaylistService } from '@services';
import { ActivatedRouteSnapshot } from '@angular/router';
import { MusicDTO } from '../core/dtos/music.dto';

@Injectable({
  providedIn: 'root',
})
export class TabLibraryResolver {
  constructor(
    private playlistService: PlaylistService,
    private loginService: LoginService
  ) {}

  resolve(routeSnapshot: ActivatedRouteSnapshot): Observable<MusicDTO[]> | [] {
    const idUser: number = Number(this.loginService.getIdUser());
    if (this.loginService.getIdUser() != null) {
      return this.playlistService.getPlaylist(idUser).pipe(
        map((res) => {
          return res;
        })
      );
    }
    return [];
  }
}

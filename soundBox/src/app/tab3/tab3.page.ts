import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MusicDTO, StyleDTO } from '@dtos';
import { MusicService, PlaylistService } from '@services';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  styleList: StyleDTO[] = [];
  dados = this.route.snapshot.data['dadosPagina'];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private playlisService: PlaylistService,
    private musicService: MusicService
  ) {}

  ngOnInit() {
    this.setDados();
  }

  setDados() {
    this.styleList = this.dados;
  }

  addToSearch(style: StyleDTO) {
    this.styleList.map((x) => {
      if (x.id == style.id) x.touched = true;
      return x;
    });
  }

  removeListSearch(style: StyleDTO) {
    this.styleList.map((x) => {
      if (x.id == style.id) x.touched = false;
    });
  }

  sendList() {
    var toSearch: number[] = [];
    this.styleList.forEach((x) => {
      if (x.touched == true && x.id != null) toSearch.push(x.id);
    });

    this.playlisService.valuesGetPlaylisRadom.next(toSearch);

    this.getPlaylist(toSearch);
  }

  private getPlaylist(value: number[]) {
    this.playlisService
      .getRadomNeverAlreadyHeard(value)
      .subscribe((x: MusicDTO[]) => {
        this.musicService.playlist.next(x);
        this.navigateToMusic(x[0].id);
      });
  }

  public navigateToMusic(musicId: number | undefined) {
    if (musicId != null || musicId != undefined)
      this.router.navigateByUrl('/musicPlay', {
        state: {
          musicId: musicId,
          pageOrigem: '/tabs/tab1',
          radom: true,
          isLibrary: false,
        },
      });
  }
}

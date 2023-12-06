import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { MusicDTO, MusicPlaylistToSaveDTO } from '@dtos';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { PlaylistService } from '@services';

@Component({
  selector: 'app-tab-library',
  templateUrl: './tab-library.component.html',
  styleUrls: ['./tab-library.component.scss'],
})
export class TabLibraryComponent implements OnInit {
  list: MusicDTO[] = [];
  dados = this.route.snapshot.data['dadosPagina'];
  falseList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(
    private playlistService: PlaylistService,
    private router: Router,
    private route: ActivatedRoute,
    private fireStorage: AngularFireStorage,
    private playlistSevice: PlaylistService
  ) {}

  ngOnInit() {
    setInterval(() => {
      this.carregarDados();
      this.setImages();
    }, 2000);
    this.playlistService.playlist.subscribe((x: any) => {
      this.list = x;
    });
  }

  private carregarDados() {
    this.playlistService.playlist.next(this.dados);
    // this.list = this.dados;
  }

  delete(id: number) {
    var dto: MusicPlaylistToSaveDTO = new MusicPlaylistToSaveDTO();
    dto.musicId = id;
    dto.userId = Number(localStorage.getItem('idUser'));
    this.playlistSevice.deleteMusicToPlaylist(dto).subscribe((x) => {
      this.list.forEach((x) => {
        if (x.id == id) x.inPlaylist = false;
      });
      this.list = this.list.filter((x) => x.id != id);
      this.playlistService.playlist.next(this.list);
    });
  }

  public navigateToMusic(musicId: number | undefined) {
    if (musicId != null || musicId != undefined)
      this.router.navigateByUrl('/musicPlay', {
        state: {
          musicId: musicId,
          pageOrigem: '/tabs/tab-library',
          radom: false,
          isLibrary: true,
        },
      });
  }

  // onIonInfinite(ev) {
  //   this.generateItems();
  //   setTimeout(() => {
  //     (ev as InfiniteScrollCustomEvent).target.complete();
  //   }, 500);
  // }

  setImages() {
    this.list.forEach((x) => {
      if (x.urlImgMusic == '' || x.urlImgMusic == undefined) {
        this.fireStorage
          .ref('images')
          .child(x.idImgMusic)
          .getDownloadURL()
          .subscribe((url) => {
            x.urlImgMusic = url;
          });
      }
    });
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { MusicDTO } from '@dtos';
import { MusicService } from '@services';
import Swiper from 'swiper';

@Component({
  selector: 'app-listagem-horizontal',
  templateUrl: './listagem-horizontal.component.html',
  styleUrls: ['./listagem-horizontal.component.scss'],
})
export class ListagemHorizontalComponent implements OnInit {
  @Input() listMusicOne: MusicDTO[] = [];
  @Input() listMusicTwo: MusicDTO[] = [];
  @Input() listMusicThree: MusicDTO[] = [];

  constructor(
    private router: Router,
    private musicService: MusicService,
    private fireStorage: AngularFireStorage
  ) {}
  ngOnInit() {
    this.setImages();
  }

  public navigateToMusic(musicId: number | undefined) {
    if (musicId != null || musicId != undefined)
      this.router.navigateByUrl('/musicPlay', {
        state: {
          musicId: musicId,
          pageOrigem: '/tabs/tab1',
          radom: false,
          isLibrary: false,
        },
      });
  }

  getUrlImg(name: string): string {
    return this.musicService.getImageMusicByIdFirebase(name);
  }

  setImages() {
    this.listMusicOne.forEach((m) => {
      if (m.urlImgMusic == '' || m.urlImgMusic == undefined) {
        this.fireStorage
          .ref('images')
          .child(m.idImgAlbum)
          .getDownloadURL()
          .subscribe((url) => {
            m.urlImgMusic = url;
          });
      }
    });
    this.listMusicTwo.forEach((m) => {
      if (m.urlImgMusic == '' || m.urlImgMusic == undefined) {
        this.fireStorage
          .ref('images')
          .child(m.idImgAlbum)
          .getDownloadURL()
          .subscribe((url) => {
            m.urlImgMusic = url;
          });
      }
    });
    this.listMusicThree.forEach((m) => {
      if (m.urlImgMusic == '' || m.urlImgMusic == undefined) {
        this.fireStorage
          .ref('images')
          .child(m.idImgAlbum)
          .getDownloadURL()
          .subscribe((url) => {
            m.urlImgMusic = url;
          });
      }
    });
  }
}

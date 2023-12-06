import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { MusicDTO, MusicPlaylistToSaveDTO } from '@dtos';
import { PlaylistService } from '@services';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  list: MusicDTO[] = [];
  falseList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  lookingNow = false;
  nullList = false;
  resposeToNullList = '';
  playlist: MusicDTO[] = [];

  constructor(
    private playlistService: PlaylistService,
    private router: Router,
    private route: ActivatedRoute,
    private fireStorage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.playlistService.playlist.subscribe((x: any) => {
      this.playlist = x;
    });
  }

  search(event: any) {
    var searchName = event.target.value.toString();
    if (searchName != '' && searchName != null && searchName) {
      this.lookingNow = true;
      this.playlistService.searchByName(searchName).subscribe((res) => {
        this.lookingNow = false;
        if (res.length > 0) {
          this.list = res;
          this.setImages();
        } else {
          this.nullList = true;
          this.resposeToNullList =
            'Nenhum resultado encontrado para ' + searchName;
        }
      });
    } else {
      this.clear();
    }
  }

  clear() {
    this.lookingNow = false;
    this.list = [];
    this.resposeToNullList = '';
    this.nullList = false;
  }

  public navigateToMusic(musicId: number | undefined) {
    if (musicId != null || musicId != undefined)
      this.router.navigateByUrl('/musicPlay', {
        state: {
          musicId: musicId,
          pageOrigem: '/tabs/tab2',
          radom: false,
          isLibrary: false,
        },
      });
  }

  removeOrAddLibrary(id: number) {
    this.list.forEach((x) => {
      if (x.id == id) x.musicAlreadyHeard = !x.musicAlreadyHeard;
    });
  }

  addToPlaylist(music: MusicDTO) {
    var dto: MusicPlaylistToSaveDTO = new MusicPlaylistToSaveDTO();
    dto.musicId = music.id;
    dto.userId = Number(localStorage.getItem('idUser'));
    this.playlistService.addMusicToPlaylist(dto).subscribe((x) => {
      music.inPlaylist = true;
      this.list.map((x) => {
        if (x.id == music.id) x.inPlaylist = true;
      });
      this.playlist.push(music);
      this.playlistService.playlist.next(this.playlist);
    });
  }

  deleteMusicPlaylist(music: MusicDTO) {
    var dto: MusicPlaylistToSaveDTO = new MusicPlaylistToSaveDTO();
    dto.musicId = music.id;
    dto.userId = Number(localStorage.getItem('idUser'));
    this.playlistService.deleteMusicToPlaylist(dto).subscribe((x) => {
      music.inPlaylist = false;
      this.list.map((x) => {
        if (x.id == music.id) x.inPlaylist = false;
      });
      this.playlist.map((x) => {
        if (x.id == music.id) x.inPlaylist = false;
      });
      this.playlistService.playlist.next(this.playlist);
    });
  }

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

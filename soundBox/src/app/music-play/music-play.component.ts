import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MusicDTO } from '../core/dtos/music.dto';
import { MusicService } from '../core/services/music.service';
import { Media } from '@awesome-cordova-plugins/media/ngx';
import { MediaObject } from '@awesome-cordova-plugins/media';
import { DatePipe } from '@angular/common';
import { Platform } from '@ionic/angular';

import { NativeAudio } from '@awesome-cordova-plugins/native-audio/ngx/index';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { PlaylistService } from '@services';
import { AlreadyHeardToSaveDTO, MusicPlaylistToSaveDTO } from '@dtos';

@Component({
  selector: 'app-music-play',
  templateUrl: './music-play.component.html',
  styleUrls: ['./music-play.component.scss'],
})
export class MusicPlayComponent implements OnInit {
  music: MusicDTO = new MusicDTO();
  pageOrigem: string = '';
  stateMusic: boolean = false;
  playlist: MusicDTO[] = [];
  listMusic: MusicDTO[] = [];
  // duration: number = 0;
  // position: number = 0;

  curreant_play: MediaObject = new MediaObject('');
  display_duration: any;
  duration: any = -1;
  position: any = 0;
  get_position_interval: any;
  is_playing = false;
  is_in_play = false;
  is_ready = false;
  get_duration_interval: any;
  display_position: any = '00:00';
  isRadom = false;
  isLibrary = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    // private musicPlayService: MusicPlayService
    private musicService: MusicService,
    private datePipe: DatePipe,
    public platform: Platform,
    private natievAudio: NativeAudio,
    private media: Media,
    private fireStorage: AngularFireStorage,
    private playlistSevice: PlaylistService
  ) {}

  ngOnInit() {
    this.getDataByRoute();
    this.playlistSevice.playlist.subscribe((x: any) => {
      this.playlist = x;
    });
    this.musicService.playlist.subscribe((x: any) => {
      this.listMusic = x;
    });
  }

  prepareAudioFile() {
    this.platform.ready().then((res) => {
      this.play();
    });
  }

  private getDataByRoute() {
    var state = this.router.getCurrentNavigation()?.extras.state;
    this.pageOrigem = state?.pageOrigem;
    this.isRadom = state?.radom;
    this.isLibrary = state?.isLibrary;
    var idMusic =
      state?.musicId != undefined || state?.musicId != null
        ? state?.musicId
        : 1;
    if ((idMusic != null || idMusic != undefined) && this.pageOrigem != null) {
      // this.musicService.getMusicById(idMusic).subscribe((res: MusicDTO) => {
      //   this.music = res;
      // });
      this.musicService.getMusicById(idMusic).subscribe((res) => {
        this.music = res;
        if (this.isLibrary == false && this.isRadom == false) {
          this.listMusic.push(this.music);
          this.getPlaylist();
        }
        if (this.music.urlImgMusic == '' || this.music.urlImgMusic == undefined)
          this.getImageMusicByIdFirebase(this.music.idImgMusic);

        if (this.music.urlTrack == '' || this.music.urlTrack == undefined)
          this.getMusicByIdFirebase(this.music.idTrack);
        this.prepareAudioFile();
      });

      var value: AlreadyHeardToSaveDTO = new AlreadyHeardToSaveDTO();
      value.userId = Number(localStorage.getItem('idUser'));
      value.musicId = this.music.id;
      this.playlistSevice.alreadyHeardToSave(value);
      // this.play();
    }
  }

  private getPlaylist() {
    const idUsuario = Number(localStorage.getItem('idUser'));
    if (this.isLibrary == false && this.isRadom == false) {
      this.playlistSevice.getRadomPlaylist(idUsuario).subscribe((x) => {
        // this.listMusic = x;
        this.musicService.playlist.next(x);
      });
    } else if (this.isRadom == true) {
      var values: number[] = [];
      this.playlistSevice.valuesGetPlaylisRadom.subscribe((x: any) => {
        values = x;
      });
      this.playlistSevice.getRadomNeverAlreadyHeard(values).subscribe((x) => {
        this.listMusic = x;
      });
    } else {
      this.playlistSevice.playlist.subscribe((x: any) => {
        this.listMusic = x;
      });
    }
  }

  nextSong(music: MusicDTO) {
    var item: number = this.listMusic.indexOf(music);
    var id = item + 1;
    if (this.listMusic.length == id + 1) {
      var values: number[] = [];
      this.playlistSevice.valuesGetPlaylisRadom.subscribe((x: any) => {
        values = x;
      });
      if (values.length > 0) {
        this.playlistSevice
          .getRadomNeverAlreadyHeard(values)
          .subscribe((x: MusicDTO[]) => {
            x.forEach((m) => {
              this.listMusic.push(m);
            });
          });
        this.music = this.listMusic[id];
        this.getImageMusicByIdFirebase(this.music.idImgAlbum);
        this.getMusicByIdFirebase(this.music.idTrack);

        // this.playlistSevice.getRadomPlaylist()
      }
    } else {
      this.music = this.listMusic[id];
      this.getImageMusicByIdFirebase(this.music.idImgAlbum);
      this.getMusicByIdFirebase(this.music.idTrack);
    }
  }

  previos() {
    var item: number = this.listMusic.indexOf(this.music);
    var id = item - 1;
    if (id == 0 || id < 0) {
      this.music = this.listMusic[0];
      this.getImageMusicByIdFirebase(this.music.idImgAlbum);
      this.getMusicByIdFirebase(this.music.idTrack);
    } else {
      this.music = this.listMusic[id];
      this.getImageMusicByIdFirebase(this.music.idImgAlbum);
      this.getMusicByIdFirebase(this.music.idTrack);
    }
  }

  play() {
    this.curreant_play = this.media.create(this.music.urlTrack);
    this.curreant_play.play();
    this.stateMusic = !this.stateMusic;
  }

  pause() {
    // this.natievAudio.stop(this.music.name);
    this.curreant_play.stop();
    this.stateMusic = !this.stateMusic;
  }

  getState(): boolean {
    return this.stateMusic;
  }

  // getDuration() {
  //   this.curr_playing_file = this.media.create(this.music.encodeTrack);
  //   // On occassions, the plugin only gives duration of the file if the file is played
  //   // at least once
  //   this.curr_playing_file.play();
  //   console.log(this.curr_playing_file.onError);
  //   this.stateMusic = !this.stateMusic;
  //   this.curr_playing_file.setVolume(0.0); // you don't want users to notice that you are playing the file
  //   const self = this;
  //   // The plugin does not give the correct duration on playback start
  //   // need to check for duration repeatedly
  //   let temp_duration = self.duration;
  //   this.get_duration_interval = setInterval(() => {
  //     if (self.duration === -1 || !self.duration) {
  //       self.duration = ~~self.curr_playing_file.getDuration(); // make it an integer
  //     } else {
  //       if (self.duration !== temp_duration) {
  //         temp_duration = self.duration;
  //       } else {
  //         self.curr_playing_file.stop();
  //         self.curr_playing_file.release();
  //         clearInterval(self.get_duration_interval);
  //         this.display_duration = this.toHHMMSS(self.duration);
  //         self.setToPlayback();
  //       }
  //     }
  //   }, 100);
  // }

  // setToPlayback() {
  //   this.curr_playing_file = this.media.create(this.music.encodeTrack);
  //   this.curr_playing_file.onStatusUpdate.subscribe((status: any) => {
  //     switch (status) {
  //       case 1:
  //         break;
  //       case 2: // 2: playing
  //         this.is_playing = true;
  //         break;
  //       case 3: // 3: pause
  //         this.is_playing = false;
  //         break;
  //       case 4: // 4: stop
  //       default:
  //         this.is_playing = false;
  //         break;
  //     }
  //   });
  //   this.is_ready = true;
  //   this.getAndSetCurrentAudioPosition();
  // }

  // getAndSetCurrentAudioPosition() {
  //   const diff = 1;
  //   const self = this;
  //   this.get_position_interval = setInterval(() => {
  //     const last_position = self.position;
  //     self.curr_playing_file.getCurrentPosition().then((position: any) => {
  //       if (position >= 0 && position < self.duration) {
  //         if (Math.abs(last_position - position) >= diff) {
  //           // set position
  //           self.curr_playing_file.seekTo(last_position * 1000);
  //         } else {
  //           // update position for display
  //           self.position = position;
  //           this.display_position = this.toHHMMSS(self.position);
  //         }
  //       } else if (position >= self.duration) {
  //         self.stop();
  //         self.setToPlayback();
  //       }
  //     });
  //   }, 100);
  // }

  controlSeconds(action: any) {
    const step = 5;
    const numberRange = this.position;
    switch (action) {
      case 'back':
        this.position = numberRange < step ? 0.001 : numberRange - step;
        break;
      case 'forward':
        this.position =
          numberRange + step < this.duration
            ? numberRange + step
            : this.duration;
        break;
      default:
        break;
    }
  }

  // stop() {
  //   this.curr_playing_file.stop();
  //   this.curr_playing_file.release();
  //   clearInterval(this.get_position_interval);
  //   this.position = 0;
  // }

  toHHMMSS(secs: string): string {
    var sec_num = parseInt(secs, 10);
    var minutes = Math.floor(sec_num / 60) % 60;
    var seconds = sec_num % 60;

    return [minutes, seconds]
      .map((v) => (v < 10 ? '0' + v : v))
      .filter((v, i) => v !== '00' || i >= 0)
      .join(':');
  }

  back() {
    if (
      this.pageOrigem != null ||
      this.pageOrigem != undefined ||
      this.pageOrigem != ''
    ) {
      this.router.navigateByUrl(this.pageOrigem, {
        state: { pageOrigem: null },
      });
    } else {
      this.router.navigateByUrl('/tabs/tab1', {
        state: { pageOrigem: null },
      });
    }
  }

  getMusicByIdFirebase(music: string) {
    this.fireStorage
      .ref('songs')
      .child(music)
      .getDownloadURL()
      .subscribe((url) => {
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

  addToPlaylist() {
    var dto: MusicPlaylistToSaveDTO = new MusicPlaylistToSaveDTO();
    dto.musicId = this.music.id;
    dto.userId = Number(localStorage.getItem('idUser'));
    this.playlistSevice.addMusicToPlaylist(dto).subscribe((x) => {
      this.music.inPlaylist = true;
      this.playlist.push(this.music);
      this.playlistSevice.playlist.next(this.playlist);
    });
  }

  deleteMusicPlaylist() {
    var dto: MusicPlaylistToSaveDTO = new MusicPlaylistToSaveDTO();
    dto.musicId = this.music.id;
    dto.userId = Number(localStorage.getItem('idUser'));
    this.playlistSevice.deleteMusicToPlaylist(dto).subscribe((x) => {
      this.music.inPlaylist = false;
      this.playlist.map((x) => {
        if (x.id == this.music.id) x.inPlaylist = false;
      });
      // var index = this.playlist.findIndex((m) => this.music.id == m.id);
      // this.playlist.slice(index, 1);
      this.playlistSevice.playlist.next(this.playlist);
    });
  }
}

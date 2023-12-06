import { EventEmitter, Injectable } from '@angular/core';

import { environment } from 'environments/environment';
import { MusicDTO } from '../dtos/music.dto';

import data from '../../mokListaggem.json';
import { MusicService } from './music.service';

import { ToastController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
// import { NativeAudio } from '@awesome-cordova-plugins/native-audio';

@Injectable({ providedIn: 'root' })
export class MusicPlayService {
  private url = environment.API_URL + 'music';
  private music: MusicDTO = new MusicDTO();
  private stateMusic: boolean = false;

  mensage: any;
  // mediaObject: MediaObject = new MediaObject('');
  duration: EventEmitter<number> = new EventEmitter();
  private auxDuration = -1;
  position: EventEmitter<number> = new EventEmitter();
  private auxPosition = 0;

  isPlaying: boolean = false;
  isInPlay: boolean = false;
  isReady: boolean = false;

  getDurationInterval: any;
  getPositionInterval: any;

  constructor(
    private toastCtrl: ToastController,
    private datePipe: DatePipe,
    // private media: Media,
    private musicService: MusicService // private nativeAudio: NativeAudio,
  ) {
    this.duration.emit(-1);
    this.position.emit(0);
  }

  public getMusic(): MusicDTO {
    return this.music;
  }

  public setMusic(idMusic: string) {
    this.musicService.getMusicById(idMusic).subscribe((res: any) => {
      this.music = res;
    });
  }

  public getStateMusic(): boolean {
    return this.stateMusic;
  }

  public changeStateMusic() {
    this.stateMusic = !this.stateMusic;
  }

  public getPosition() {
    return this.position;
  }

  public getDuration() {
    return this.duration;
  }

  public playMusic() {}

  // public playMusic() {
  //   if (this.getMusic().id != undefined || this.getMusic().id != null) {
  //     if (this.getStateMusic() == true) {
  //       this.nativeAudio.preloadSimple(this.music.name, this.music.urlTrack);
  //       this.nativeAudio.play(this.music.name);
  //     }
  //   }
  // }

  // private createAudioFile(url: string): MediaObject {
  //   return Media.create(url);
  // }

  // getAndSetCurrentAudioPosition() {
  //   let diff = 1;
  //   let self = this;
  //   this.getPositionInterval = setInterval(function () {
  //     let last_position = self.auxPosition;
  //     self.mediaObject.getCurrentPosition().then((position) => {
  //       if (position >= 0 && position < self.auxDuration) {
  //         if (Math.abs(last_position - position) >= diff) {
  //           // set position
  //           self.mediaObject.seekTo(last_position * 1000);
  //         } else {
  //           // update position for display
  //           self.position.emit(position);
  //         }
  //       } else if (position >= self.auxDuration) {
  //         self.stopPlayRecording();
  //         self.setRecordingToPlay();
  //       }
  //     });
  //   }, 100);
  // }

  // setRecordingToPlay() {
  //   this.mediaObject = this.createAudioFile(this.music.urlTrack);
  //   this.mediaObject.onStatusUpdate.subscribe((status) => {
  //     // 2: playing
  //     // 3: pause
  //     // 4: stop
  //     this.mensage = status;
  //     switch (status) {
  //       case 1:
  //         this.isInPlay = false;
  //         break;
  //       case 2: // 2: playing
  //         this.isInPlay = true;
  //         this.isPlaying = true;
  //         break;
  //       case 3: // 3: pause
  //         this.isInPlay = true;
  //         this.isPlaying = false;
  //         break;
  //       case 4: // 4: stop
  //       default:
  //         this.isInPlay = false;
  //         this.isPlaying = false;
  //         break;
  //     }
  //   });
  //   console.log('audio file set');
  //   this.mensage = 'audio file set';
  //   this.isReady = true;
  //   this.getAndSetCurrentAudioPosition();
  // }

  // playRecording() {
  // this.mediaObject.play();
  // this.nativeAudio.play(this.music.name);
  // this.changeStateMusic();
  // this.toastCtrl
  //   .create({
  //     message: `Start playing from ${this.fmtMSS(this.position)}`,
  //     duration: 2000,
  //   })
  //   .then((toastEl) => toastEl.present());
  // }

  // pausePlayRecording() {
  // this.mediaObject.pause();
  // this.nativeAudio.stop(this.music.name);
  // this.changeStateMusic();
  // this.toastCtrl
  //   .create({
  //     message: `Paused at ${this.fmtMSS(this.position)}`,
  //     duration: 2000,
  //   })
  //   .then((toastEl) => toastEl.present());
  // }

  // stopPlayRecording() {
  //   this.mediaObject.stop();
  //   this.mediaObject.release();
  //   clearInterval(this.getPositionInterval);
  //   this.position.emit(0);
  // }

  // fmtMSS(s: number) {
  //   return this.datePipe.transform(s * 1000, 'mm:ss');
  // }
}

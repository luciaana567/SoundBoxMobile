import { Component, OnInit } from '@angular/core';

import { PlaylistService } from '../core/services/playlist.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MusicDTO } from '../core/dtos/music.dto';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  listOne: MusicDTO[] = [];
  listTwo: MusicDTO[] = [];
  listThree: MusicDTO[] = [];
  dados = this.route.snapshot.data['dadosPagina'];
  component = Tab1Page;

  constructor(
    playlistService: PlaylistService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  private carregarDados() {
    this.listOne = this.dados?.lista1;
    this.listTwo = this.dados?.lista2;
    this.listThree = this.dados?.lista3;
  }
}

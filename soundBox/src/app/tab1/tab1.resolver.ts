import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginService, PlaylistService } from '@services';
import { ActivatedRouteSnapshot } from '@angular/router';
import { MusicDTO } from '../core/dtos/music.dto';
import { ListagemTab1DTO } from '@dtos';

@Injectable({
  providedIn: 'root',
})
export class Tab1Resolver {
  constructor(
    private playlistService: PlaylistService,
    private loginService: LoginService
  ) {}

  resolve(
    routeSnapshot: ActivatedRouteSnapshot
  ): ListagemTab1DTO | Observable<unknown> {
    const dados: ListagemTab1DTO = new ListagemTab1DTO();
    const idUser: number | null = Number(this.loginService.getIdUser());
    if (idUser != null || idUser != '') {
      return forkJoin([
        this.playlistService.getRadomPlaylist(idUser),
        this.playlistService.getRadomPlaylistAlreadyHeard(idUser),
        this.playlistService.getRadomPlaylist(idUser),
      ]).pipe(
        map((res) => {
          dados.lista1 = res[0];
          dados.lista2 = res[1];
          dados.lista3 = res[2];
          return dados;
        })
      );
    }
    return dados;
  }

  //   resolve(): Observable<DadoPessoalFormularioDto> {
  //   const dados: DadoPessoalFormularioDto = new DadoPessoalFormularioDto();
  //   return forkJoin([
  // 		this.tipoSexoService.findAll(),
  //     this.tipoEscolaridadeService.findAll(),
  //     this.tipoSanguineoService.findAll(),
  //     this.racaCorService.findAll(),
  //     this.tipoLogradouroService.findAll(),
  //     this.estadoService.findAllOrByName(null),
  // 	]).pipe(
  // 		map(res => {
  // 			dados.tipoSexo = res[0];
  // 			dados.escolaridade = res[1];
  // 			dados.tipoSanguineo = res[2];
  // 			dados.racaCor = res[3];
  // 			dados.tipoLogradouro = res[4];
  // 			dados.estado = res[5];
  // 			return dados;
  // 		})
  // 	);
  // }
}

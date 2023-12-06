import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StyleService } from '@services';
import { ActivatedRouteSnapshot } from '@angular/router';
import { StyleDTO } from '@dtos';

@Injectable({
  providedIn: 'root',
})
export class Tab3Resolver {
  constructor(private styleService: StyleService) {}

  resolve(routeSnapshot: ActivatedRouteSnapshot): Observable<StyleDTO[]> | [] {
    return this.styleService.getAllStyles().pipe(
      map((res: StyleDTO[]) => {
        res.forEach((x) => {
          x.touched = false;
        });
        return res;
      })
    );
  }
}

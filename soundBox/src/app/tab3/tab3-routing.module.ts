import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab3Page } from './tab3.page';
import { Tab3Resolver } from './tab3.resolver';

const routes: Routes = [
  {
    path: '',
    component: Tab3Page,
    resolve: {
      dadosPagina: Tab3Resolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab3PageRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabLibraryComponent } from './tab-library.component';
import { TabLibraryResolver } from './tab-library.resolver';

const routes: Routes = [
  {
    path: '',
    component: TabLibraryComponent,
    resolve: {
      dadosPagina: TabLibraryResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabLibraryPageRoutingModule {}

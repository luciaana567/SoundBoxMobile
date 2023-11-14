import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabLibraryComponent } from './tab-library.component';

const routes: Routes = [
  {
    path: '',
    component: TabLibraryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabLibraryPageRoutingModule {}

import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { TabLibraryComponent } from './tab-library.component';
import { TabLibraryPageRoutingModule } from './tab-library-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    TabLibraryPageRoutingModule,
  ],
  declarations: [TabLibraryComponent],
})
export class TabLibraryPageModule {}

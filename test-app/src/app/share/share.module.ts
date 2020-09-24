import { CommonModule }          from '@angular/common';
import { NgModule }              from '@angular/core';
import { NgScrollbarModule }     from 'ngx-scrollbar';
import { BriefingPageComponent } from './components/briefing-page/briefing-page.component';
import { DeepListComponent }     from './components/deep-list/deep-list.component';
import { MaterialModule }        from './modules/material.module';
import { PipesModule }           from './modules/pipes/pipes.module';

const modules = [
  CommonModule,
  MaterialModule,
  NgScrollbarModule,
  PipesModule
];
const components = [
  BriefingPageComponent,
  DeepListComponent
];

@NgModule({
  imports: [
    ...modules
  ],
  exports: [
    ...modules,
    ...components,
  ],
  declarations: [
    ...components,
  ]
})
export class ShareModule {

}

import { NgModule }                 from '@angular/core';
import { MatButtonModule }          from '@angular/material/button';
import { MatRippleModule }          from '@angular/material/core';
import { MatDialogModule }          from '@angular/material/dialog';
import { MatExpansionModule }       from '@angular/material/expansion';
import { MatIconModule }            from '@angular/material/icon';
import { MatProgressBarModule }     from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule }          from '@angular/material/select';
import { MatSidenavModule }         from '@angular/material/sidenav';
import { MatSnackBarModule }        from '@angular/material/snack-bar';
import { MatToolbarModule }         from '@angular/material/toolbar';
import { MatTooltipModule }         from '@angular/material/tooltip';

const modules = [
  MatToolbarModule,
  MatSidenavModule,
  MatDialogModule,
  MatButtonModule,
  MatExpansionModule,
  MatRippleModule,
  MatTooltipModule,
  MatSelectModule,
  MatProgressBarModule,
  MatSnackBarModule
];

@NgModule({
  imports: [
    ...modules
  ],
  exports: [
    ...modules
  ],
})
export class MaterialModule {
}

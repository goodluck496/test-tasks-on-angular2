import { CommonModule } from '@angular/common';
import { NgModule }     from '@angular/core';
import { MomentPipe }   from './moment.pipe';
import { NumeralPipe }  from './numeral.pipe';


const pipes = [
    MomentPipe,
    NumeralPipe
];


@NgModule({
    imports: [
        CommonModule
    ],
	exports: [
		...pipes,
	],
    declarations: [
        ...pipes,
    ]
})
export class PipesModule {
}

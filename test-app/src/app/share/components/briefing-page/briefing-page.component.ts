import { Component, Input, OnInit } from '@angular/core';
import { DeepListItem }             from '../deep-list/deep-list.component';

@Component({
  selector: 'app-briefing-page',
  templateUrl: './briefing-page.component.html',
  styleUrls: ['./briefing-page.component.scss']
})
export class BriefingPageComponent implements OnInit {

  @Input() briefTitle: string;
  @Input() description: string;
  @Input() workItems: DeepListItem;

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, Input, OnInit } from '@angular/core';

export interface DeepListItem {
  name: string;
  children: DeepListItem[];
}

@Component({
  selector: 'app-deep-list',
  templateUrl: './deep-list.component.html',
  styleUrls: ['./deep-list.component.scss']
})
export class DeepListComponent implements OnInit {

  @Input() item: DeepListItem;
  constructor() { }

  ngOnInit(): void {
  }

}

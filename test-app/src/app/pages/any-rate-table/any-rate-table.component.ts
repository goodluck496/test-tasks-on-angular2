import { Component, OnInit } from '@angular/core';
import { DeepListItem }      from '../../share/components/deep-list/deep-list.component';

@Component({
  selector: 'app-any-rate-table',
  templateUrl: './any-rate-table.component.html',
  styleUrls: ['./any-rate-table.component.scss']
})
export class AnyRateTablePageComponent implements OnInit {

  workItems: DeepListItem = {
    name: '',
    children: [
      {
        name: 'Из указанной ссылки необходимо получить данные https://5f2293720e9f660016d8846a.mockapi.io/api/v1/beacons',
        children: []
      },
      {name: 'Полученные данные отобразить в таблице', children: []},
      {
        name: `Необходимо написать алгоритм, который реализует следующую бизнес логику`, children: [
          {name: 'таблица сортируется по полую rating', children: []},
          {
            name: 'через случайный промежуток времени случайная запись в таблице получает случайное значение рейтинга',
            children: []
          },
          {
            name: 'таблица снова сортируется по рейтингу ( можно сделать пайп для автоматической сортировки)',
            children: []
          },
        ]
      },
      {
        name: 'Дополнительные условия', children: [
          {name: 'Необходимо разместить код в любом открытом репозитории', children: []},
          {name: 'Показать, что есть понимание как создать pull/merge request', children: []},
          {name: 'Можно пользоваться любым UI фреймворком', children: []},
          {name: 'Написать по возможности минимум один unit тест', children: []},
        ]
      },
    ]
  };

  constructor() {
  }

  ngOnInit(): void {
  }

}

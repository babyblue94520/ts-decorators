import { Component } from '@angular/core';
import { Debounce } from 'ts/decorators/debounce';
import { Throttle } from 'ts/decorators/throttle';
import { CacheLocal, CacheSession } from 'ts/decorators/cache';
import { LocalStorageManager } from 'ts/storage/storage-manager';
import { jsonToHtml } from '../ts/json';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @CacheLocal('App', 'ts-decorators')
  public title;
  @CacheSession('App', {
    debounce: true
    , throttle: false
    , aab: '<script><//"122&emsp;\naaa'
    , test: [1, 2, 3, 4, 5, 6]
    , bb: [7, 8]
    , cc: []
  })
  public expandeds;

  constructor() {
    window.addEventListener('resize', this.debounce.bind(this));
    window.addEventListener('resize', this.throttle.bind(this));
    console.log(LocalStorageManager.get('test'));
  }

  @Debounce(300)
  private debounce() {
    console.log(this, 'debounce');
  }

  @Throttle(1000)
  private throttle() {
    console.log(this, 'throttle');
  }

  public toHtml(d): string {
    return jsonToHtml(d);
  }
}

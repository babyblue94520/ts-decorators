import { Component, ViewChild, ElementRef } from '@angular/core';
import { Debounce } from 'ts/decorators/debounce';
import { Throttle } from 'ts/decorators/throttle';
import { CacheLocal, CacheSession } from 'ts/decorators/cache';
import { jsonToHtml } from '../ts/json';
import { deepClone } from '../ts/clone';
import { Async } from 'ts/decorators/async';


interface Status {
  'Debounce & Throttle': boolean;
  cache: boolean;
  async: boolean;
  message: string;
  count: number;
}

export function defaultStatus(): Status {
  return {
    'Debounce & Throttle': true
    , cache: false
    , async: false
    , message: '顯示訊息'
    , count: 0
  };
}

interface User {
  name: string;
  birthday: string;
  phone: string;
  email: string;
}

export function defauleUser(): User {
  return {
    name: ''
    , birthday: ''
    , phone: ''
    , email: ''
  };
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public static debounceTime = 300;
  public static throttleTime = 1000;

  @CacheLocal<Status>('App', defaultStatus())
  public status;

  @CacheSession<User>('App', defauleUser())
  public user: User;

  @CacheSession<User>('App', defauleUser())
  public userClone: User;

  @ViewChild('messageWrap')
  public messageWrapRef: ElementRef;

  constructor() {
    window.addEventListener('resize', this.debounce.bind(this));
    window.addEventListener('resize', this.throttle.bind(this));
    this.changeTitle();
  }

  private changeTitle() {
    document.head.querySelector('title').innerText = `TS-Decorators(${this.status.count})`;

  }

  @Debounce(AppComponent.debounceTime)
  public debounce() {
    this.count();
  }

  @Throttle(AppComponent.throttleTime)
  public throttle() {
    this.count();
  }

  public count() {
    this.status.count++;
    this.changeTitle();
  }

  public clear() {
    this.status = defaultStatus();
    this.changeTitle();
  }

  public showMessage() {
    let message = document.createElement('div');
    message.className = 'message';
    message.innerText = this.status.message;
    this.messageWrapRef.nativeElement.appendChild(message);
    this.doShow(message);
  }

  @Async()
  private doShow(message: HTMLElement) {
    message.classList.add('show');
    this.doClose(message);
  }

  @Async(3000)
  private doClose(message: HTMLElement) {
    message.classList.remove('show');
    this.doRemove(message);
  }

  @Async(310)
  private doRemove(message: HTMLElement) {
    message.remove();
  }

  public clearUser() {
    this.user = defauleUser();
  }

  public cloneUser() {
    this.userClone = deepClone(this.user);
  }

  public toHtml(d): string {
    return jsonToHtml(d);
  }
}

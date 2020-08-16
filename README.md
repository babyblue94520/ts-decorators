# TS Decorators

利用 TypeScript 開發好用的 Decorator

## Debounce

避免短時間執行多次的方法，造成效能上的浪費，譬如： resize、scroll


    // 連續執行該方法，間隔時間在300ms內，僅會在最後一次間隔超過300ms，才執行    
    @Debounce(300)
    public debounce() {
        // TODO
    }


## Throttle

限制該方法間隔時間內，不會被重新執行

    // 該方法被執行後，1000ms內無法再被執行
    @Throttle(1000)
    public throttle() {
        // TODO
    }

## Async

其實就是 setTimeout，用來寫動畫還滿好用的

    // 顯示訊息
    public showMessage() {
        let message = document.createElement('div');
        message.className = 'message';
        message.innerText = this.status.message;
        this.messageWrapRef.nativeElement.appendChild(message);
        this.doShow(message);
    }

    // 顯示
    @Async()
    private doShow(message: HTMLElement) {
        message.classList.add('show');
        this.doClose(message);
    }

    // 3000ms後，隱藏
    @Async(3000)
    private doClose(message: HTMLElement) {
        message.classList.remove('show');
        this.doRemove(message);
    }

    // 配合動畫時間，310ms後，移除
    @Async(310)
    private doRemove(message: HTMLElement) {
        message.remove();
    }

## Cache 

簡單的使用 **localStorage**、**sessionStorage**

### CacheLocal

從 **localStorage** 讀取變數名稱的值，**window.unload**時，將變數值回寫到 **localStorage**

    @CacheLocal('App', defaultStatus())
    public status: Status;

### CacheSession

從 **sessionStorage** 讀取變數名稱的值，**window.unload**時，將變數值回寫到 **sessionStorage**

    @CacheSession<User>('App', defauleUser())
    public user: User;

## Json Viewer

將 **js object** 轉成 **html** 格式

    element.innerHTML = jsonToHtml(obj);
    // or
    <div [innerHTML]="jsonToHtml(obj)||safeHtml">
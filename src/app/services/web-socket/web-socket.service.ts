import { Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { Subject, EMPTY } from 'rxjs';
import { switchAll, catchError, tap } from 'rxjs/operators';
const socketDATA = 'ws://192.168.0.1:8999/' ;

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private socket$: WebSocketSubject<any>;
  public messagesSubject$ = new Subject<any>();
  public messages$ = this.messagesSubject$.pipe(switchAll(), catchError(e => { throw e }));
 
  public connect(): void {
 
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket();
      const messages = this.socket$.pipe(
        tap({
          error: error => console.log(error),
        }), catchError(_ => EMPTY));
      this.messagesSubject$.next(messages);
    }
  }
 
  private getNewWebSocket() {
    return webSocket(socketDATA);
  }
  
  sendMessage(msg: any) {
    this.socket$.next(msg);
  }
  close() {
    this.socket$.complete(); }
    
}

import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import * as Rx from 'rxjs/Rx';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socket;
  messages: Subject<any>;

  constructor() {   }

  connect(): Subject<MessageEvent> {
    // If you aren't familiar with environment variables the
    // you can hard code `environment.ws_url` as `http://localhost:5000`
    this.socket = io('ws://192.168.0.102:7777/');

    // We define our observable which will observe any incoming messages
    // from our socket.io server.
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        console.log('Received message from Websocket Server' , data );
        observer.next(data);
      });

      this.socket.on('broadcast', (message) => {
        alert( message );
        console.log(message);
      });

      return () => {
        this.socket.disconnect();
      }
  });

    // We define our Observer which will listen to messages
    // from our other components and send messages back to our
    // socket server whenever the `next()` method is called.
    let observer = {
        next: (data: Object) => {
            this.socket.emit('message', JSON.stringify(data));
        },
    };

    // we return our Rx.Subject which is a combination
    // of both an observer and observable.
    return Subject.create(observer, observable);
  }

   // Our simplified interface for sending
  // messages back to our socket.io server
  sendMsg(msg) {
    this.messages.next(msg);
  }
}

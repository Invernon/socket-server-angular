import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

const MESSAGE_ENUM = Object.freeze({
  SELF_CONNECTED: "SELF_CONNECTED",
  CLIENT_CONNECTED: "CLIENT_CONNECTED",
  CLIENT_DISCONNECTED: "CLIENT_DISCONNECTED",
  CLIENT_MESSAGE: "CLIENT_MESSAGE",
})

@Injectable({
  providedIn: 'root'
})
export class WebSocketFinalService {

  ws = null;

  serverMessage = new Subject<any>();

  constructor() {
    // this.ws.binaryType = 'arraybuffer';
    // this.ws = new WebSocket('wss://192.168.0.162:8080/');
    // this.ws.onopen = () => {
    //   alert("[open] Connection established");
    // };

    // this.ws.onerror = function(error) {
    //   alert(`[error] ${error.message}`);
    // };

    // this.ws.onmessage = (message) => {
    //   /* Request a new animation frame on first draw */
    //   let msg = JSON.parse(message.data);
    //   switch (msg.type) {
    //     case MESSAGE_ENUM.CLIENT_MESSAGE:
    //       console.log(`${msg.sender} says: ${msg.body}`);
    //       this.serverMessage.next( msg.body );
    //       break;
    //     case MESSAGE_ENUM.CLIENT_CONNECTED:
    //       console.log(`${msg.body.name} has joined the chat.`);
    //       break;
    //     case MESSAGE_ENUM.CLIENT_DISCONNECTED:
    //       console.log(`${msg.body.name} has left the chat.`);
    //       break;
    //     case MESSAGE_ENUM.SELF_CONNECTED:
    //       console.log(`You are connected! Your username is ${msg.body.name}`);
    //       break;
    //     default:
    //       console.log('Unknown message type.');
    //   }
    //   /* Add this draw to the pending buffer */

    //   // this.ws.send('');
    // };
  }

  sendMessage(message: string) {
    let msg = {
      type: MESSAGE_ENUM.CLIENT_MESSAGE,
      body: message
    }
    this.ws.send( JSON.stringify(msg) );
  }

  startConnection(){

  }

  closeConnection(){
    this.ws.close();
  }
}

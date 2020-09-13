import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WebSocketFinalService } from 'src/app/services/web-socket/final/web-socket-final.service';
// import * as AudioAPI from 'node_modules/ws-audio-api';

declare var WSAudioAPI: any;
@Component({
  selector: 'app-uws-connection',
  templateUrl: './uws-connection.component.html',
  styleUrls: ['./uws-connection.component.scss']
})
export class UwsConnectionComponent implements OnInit {
  streamer = new WSAudioAPI.Streamer({
    server: {
        host: window.location.hostname, //websockets server addres. In this example - localhost
        port: 5000 //websockets server port
  }});
  message = null;
  serverMessages = null;
  _navigator: any;


  constructor(private webSocket: WebSocketFinalService) { }

  @ViewChild('player') private player: ElementRef;

  ngOnInit(): void {
    this.serverMessages = this.webSocket.serverMessage;
    this._navigator = (navigator as any);

    console.log(this.streamer);
    
  }


  sendMessage() {
    this.webSocket.sendMessage(this.message)
  }

  connect() {
    // this.webSocket.startConnection();
    // this._navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(this.handleSuccess).catch(this.didntGetStream);
    this.streamer.start();
  }

  disconnect() {
    this._navigator.mediaDevices.getUserMedia({ audio: false, video: false });
    this.streamer.stop();
    // this.webSocket.closeConnection();
  }

  handleSuccess(stream) {
    const context = new AudioContext();
    const input = context.createMediaStreamSource(stream);
    const processor = context.createScriptProcessor(1024, 1, 1);

    processor.onaudioprocess = function (e) {

    };

    // source.connect(processor);
    processor.connect(context.destination);

    processor.onaudioprocess = function (e) {
      // Do something with the data, i.e Convert this to WAV
      // console.log(e.inputBuffer);
    };
  };

  didntGetStream() {
    alert('Stream generation failed.');
  }
}

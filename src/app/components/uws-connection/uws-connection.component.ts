import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WebSocketFinalService } from 'src/app/services/web-socket/final/web-socket-final.service';

@Component({
  selector: 'app-uws-connection',
  templateUrl: './uws-connection.component.html',
  styleUrls: ['./uws-connection.component.scss']
})
export class UwsConnectionComponent implements OnInit {

  message = null;
  serverMessages = null;
  _navigator: any;

  constructor(private webSocket: WebSocketFinalService) { }

  @ViewChild('player') private player: ElementRef;

  ngOnInit(): void {
    this.serverMessages = this.webSocket.serverMessage;
    this._navigator = (navigator as any);

    let handleSuccess = (stream) => {
      // if (window.URL) {
      //   this.player.src = window.URL.createObjectURL(stream);
      // } else {
      //   this.player.src = stream;
      // }

      let context = new AudioContext();
      let input = context.createMediaStreamSource(stream)
      let processor = context.createScriptProcessor(1024, 1, 1);

      // source.connect(processor);
      processor.connect(context.destination);

      processor.onaudioprocess = function (e) {
        // Do something with the data, i.e Convert this to WAV
        // console.log(e.inputBuffer);
      };
    };

    this._navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(handleSuccess);
  }


  sendMessage() {
    this.webSocket.sendMessage(this.message)
  }

  connect(){
    this.webSocket.startConnection();
  }
  disconnect(){
    this.webSocket.closeConnection();
  }
}

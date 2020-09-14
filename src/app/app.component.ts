import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Subject, EMPTY, Observable } from 'rxjs';
import { catchError, tap, switchAll, map } from 'rxjs/operators';
import { WebsocketService } from 'src/app/services/web-socket/websocket.service';
import { MsgSenderService } from 'src/app/services/web-socket/msg-sender.service';
import { WebSocketFinalService } from 'src/app/services/web-socket/final/web-socket-final.service';
import { AudioRecorderService } from 'src/app/services/recorder/audio-recorder.service'
import { DomSanitizer } from '@angular/platform-browser';
export const WS_ENDPOINT = 'ws://localhost:8999';

export class Message {
  constructor(
    public sender: string,
    public content: string,
    public isBroadcast = false,
  ) { }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  @ViewChild('viewer') private viewer: ElementRef;

  public serverMessages = new Array<Message>();

  public clientMessage = '';
  public isBroadcast = false;
  public sender = '';

  //
  isRecording = false;
  recordedTime;
  blobUrl;

  private messagesSubject$ = new Observable<any>();
  // public messages$ = this.messagesSubject$.pipe(switchAll(), catchError(e => { throw e }));

  private socket$: WebSocketSubject<any>;
  liveData$: any;
  msgs = [];

  constructor(
    // private webSocket: WebSocketFinalService,
    private audioRecordingService: AudioRecorderService,
    private sanitizer: DomSanitizer) {

    this.audioRecordingService.recordingFailed().subscribe(() => {
      this.isRecording = false;
    });

    this.audioRecordingService.getRecordedTime().subscribe((time) => {
      this.recordedTime = time;
    });

    this.audioRecordingService.getRecordedBlob().subscribe((data) => {
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data.blob));
    });

    // this.msgSender.messages.subscribe(msg => {
    //   this.msgs.push(msg.text);
    //   console.log(msg);
    // })

  }

  ngAfterViewInit(): void {
    this.scroll();
  }

  public toggleIsBroadcast(): void {
    this.isBroadcast = !this.isBroadcast;
  }

  public send(): void {
    const message = new Message(this.sender, this.clientMessage, this.isBroadcast);
    // this.msgSender.sendMsg(message);
    this.clientMessage = '';
    this.scroll();
  }

  startRecording() {
    if (!this.isRecording) {
      this.isRecording = true;
      this.audioRecordingService.startRecording();
    }
  }

  abortRecording() {
    if (this.isRecording) {
      this.isRecording = false;
      this.audioRecordingService.abortRecording();
    }
  }

  stopRecording() {
    if (this.isRecording) {
      this.audioRecordingService.stopRecording();
      this.isRecording = false;
    }
  }

  clearRecordedData() {
    this.blobUrl = null;
  }

  ngOnDestroy(): void {
    this.abortRecording();
  }





  // Chat Functions
  public isMine(message: Message): boolean {
    return message && message.sender === this.sender;
  }

  public getSenderInitials(sender: string): string {
    return sender && sender.substring(0, 2).toLocaleUpperCase();
  }

  public getSenderColor(sender: string): string {
    const alpha = '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZ';
    const initials = this.getSenderInitials(sender || 'BOT');
    const value = Math.ceil((alpha.indexOf(initials[0]) + alpha.indexOf(initials[1])) * 255 * 255 * 255 / 70);
    return '#' + value.toString(16).padEnd(6, '0');
  }

  private scroll(): void {
    setTimeout(() => {
      this.scrollToBottom();
    }, 100);
  }

  private getDiff(): number {
    if (!this.viewer) {
      return -1;
    }

    const nativeElement = this.viewer.nativeElement;
    return nativeElement.scrollHeight - (nativeElement.scrollTop + nativeElement.clientHeight);
  }

  private scrollToBottom(t = 1, b = 0): void {
    if (b < 1) {
      b = this.getDiff();
    }
    if (b > 0 && t <= 120) {
      setTimeout(() => {
        const diff = this.easeInOutSin(t / 120) * this.getDiff();
        this.viewer.nativeElement.scrollTop += diff;
        this.scrollToBottom(++t, b);
      }, 1 / 60);
    }
  }

  private easeInOutSin(t): number {
    return (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2;
  }
}
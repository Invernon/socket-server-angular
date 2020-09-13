import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import * as RecordRTC from 'recordrtc';
import adapter from 'webrtc-adapter';

@Component({
  selector: 'app-record-rtc',
  templateUrl: './record-rtc.component.html',
  styleUrls: ['./record-rtc.component.scss']
})
export class RecordRtcComponent implements OnInit, AfterViewInit {
  @ViewChild('video') video: any;
  stream: MediaStream;
  recordRTC: any;
  errorCallback: any;
  // tslint:disable-next-line: variable-name
  _navigator = navigator as any;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // set the initial state of the video
    let video: HTMLVideoElement = this.video.nativeElement;
    // this._navigator = adapter;
    this._navigator = (navigator as any);

    video.muted = false;
    video.controls = true;
    video.autoplay = false;
  }

  startRecording() {

    const mediaConstraints = {
      audio: true,
    };

    // navigator.mediaDevices.getUserMedia( {audio:true} ).then( this.successCallback.bind(this) )
    console.log(this._navigator);
     this._navigator.getUserMedia = ( this._navigator.getUserMedia || this._navigator.webkitGetUserMedia
    || this._navigator.mozGetUserMedia || this._navigator.msGetUserMedia );

    this._navigator.mediaDevices
    .getUserMedia(mediaConstraints)
    .then( stream => this.successCallback(stream), err => console.log(err) );

  }

  successCallback(stream: MediaStream) {

    var options = {
      mimeType: 'audio/aac', // or video/webm\;codecs=h264 or video/webm\;codecs=vp9
      // audioBitsPerSecond: 128000,
      // videoBitsPerSecond: 128000,
      bitsPerSecond: 128000 // if this line is provided, skip above two
    };
    this.stream = stream;
    this.recordRTC = RecordRTC(stream, options);
    this.recordRTC.startRecording();
    let video: HTMLVideoElement = this.video.nativeElement;
    video.src = window.URL.createObjectURL(stream);
    this.toggleControls();
  }

  toggleControls() {
    let video: HTMLVideoElement = this.video.nativeElement;
    video.muted = !video.muted;
    video.controls = !video.controls;
    video.autoplay = !video.autoplay;
  }

  stopRecording() {
    let recordRTC = this.recordRTC;
    recordRTC.stopRecording(this.processVideo.bind(this));
    let stream = this.stream;
    stream.getAudioTracks().forEach(track => track.stop());
    stream.getVideoTracks().forEach(track => track.stop());
  }

  processVideo(audioVideoWebMURL) {
    let video: HTMLVideoElement = this.video.nativeElement;
    let recordRTC = this.recordRTC;
    video.src = audioVideoWebMURL;
    this.toggleControls();
    var recordedBlob = recordRTC.getBlob();
    recordRTC.getDataURL(function (dataURL) { });
  }

  download() {
    this.recordRTC.save('video.webm');
  }
}

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AppComponent } from './app.component';
import { RecordRtcComponent } from './lib/record-rtc/record-rtc.component';
import { UwsConnectionComponent } from './components/uws-connection/uws-connection.component';

@NgModule({
    declarations: [
        AppComponent,
        RecordRtcComponent,
        UwsConnectionComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatIconModule,
        MatInputModule,
        MatCheckboxModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
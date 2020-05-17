import { Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';

declare const require: any;
export const Encoding = require('encoding-japanese');

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  encoding: string;

  constructor() { }

  onUpload(event: any) {
    console.log(event.currentTarget.files[0].type);
    this.detectEncoding(event.currentTarget.files[0]).subscribe(
      encoding => {
        this.encoding = encoding;
        if (encoding === 'UTF8') {
          console.log('File encoding is: ' + encoding);
        } else {
          // encoding isn't UTF-8
        }
      }
    );

    this.readFileContent(event.currentTarget.files[0]).subscribe(
      content => {
        for(const line of content.split(/[\r\n]+/)) {
          if (line !== '') {
            console.log(line);
          }
        }
      }
    );
  }

  private detectEncoding(file): Observable<string> {
    let result = new Subject<string>();

    const reader = new FileReader();
    reader.onload = (e) => {
      const codes = new Uint8Array(e.target.result as ArrayBuffer);
      console.log(codes);
      const detectedEncoding = Encoding.detect(codes);
      result.next(detectedEncoding);
    };
    reader.readAsArrayBuffer(file);

    return result.asObservable();
  }


  private readFileContent(file): Observable<any> {
    let result = new Subject<any>();

    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContent = e.target.result;
      result.next(fileContent);
    };
    reader.readAsText(file);

    return result.asObservable();
  }
}

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SlackService {

  private webHook = 'https://hooks.slack.com/services/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';
  private options = {
    headers: new HttpHeaders(
      {'Content-Type': 'application/x-www-form-urlencoded'}
    )
  };

  constructor(private http: HttpClient) {
  }

  postErrorOnSlack(error: Error): void {


    const message = {
      channel: '#logging',
      text: error.message,
      attachments: [
        {
          author_name: window.location.href,
          color: 'danger',
          title: 'Trace',
          text: error.stack
        }
      ]
    };

    this.http.post(this.webHook, message, this.options).subscribe();
  }
}

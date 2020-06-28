import {Component, OnInit} from '@angular/core';
import {SlackService} from './services/slack.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dia-alpha';


  constructor(private slackService: SlackService) {
  }


  ngOnInit(): void {
  }

  throwError() {
    this.slackService.postErrorOnSlack(new Error('Infinity Error'));
  }
}



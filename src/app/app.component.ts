import {SlackService} from './services/slack.service';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {UiService} from './services/ui/ui.service';
import {Router} from '@angular/router';
import {FbService} from './services/fb/fb.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'dia-alpha';
  showMenu = false;
  darkModeActive: boolean;

  userEmail = '';
  loggedIn = this.fb.isAuth();
  sub1;

  constructor(public ui: UiService, public fb: FbService, public router: Router, private slackService: SlackService) {

  }

  ngOnInit(): void {
    this.sub1 = this.ui.darkModeState.subscribe((value) => {
      this.darkModeActive = value;
    });

    this.fb.auth.userData().subscribe((user) => {
      this.userEmail = user.email;
    });
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  modeToggleSwitch() {
    this.ui.darkModeState.next(!this.darkModeActive);
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
  }

  logout() {
    this.toggleMenu();
    this.router.navigateByUrl('/login');
    this.fb.auth.signout();
  }

  throwError() {
    this.slackService.postErrorOnSlack(new Error('Infinity Error'));
  }
}

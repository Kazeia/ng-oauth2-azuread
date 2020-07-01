import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'oauth-ad';

  constructor(private oauthService: OAuthService) {

  }

  private async ConfigureAuth(): Promise<void> {
    // TODO: update these fields with Azure AD
    this.oauthService.loginUrl = '';
    this.oauthService.clientId = '';
    this.oauthService.resource = '';
    this.oauthService.logoutUrl = '';
    this.oauthService.redirectUri = window.location.origin + '/';
    this.oauthService.scope = 'openid';
    this.oauthService.oidc = true;
    this.oauthService.setStorage(sessionStorage);
  }

  async ngOnInit() {
    await this.ConfigureAuth();
    this.oauthService.tryLogin({});

    if (!this.oauthService.getAccessToken()) {
      await this.oauthService.initImplicitFlow();
    }

    console.log(this.oauthService.getAccessToken())
  }
}

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

interface AuthConfig {
  client_id: string;
  response_type: 'token' | string;
  redirect_uri: string;
  state: string;
  show_dialog: boolean;
  scope?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private requestAuthUrl = 'https://accounts.spotify.com/authorize';
  constructor() {}

  private authConfig: AuthConfig = {
    client_id: environment.spotifyClientId, // WebPortal App Id. Shoud be config
    response_type: 'token',
    redirect_uri: environment.appUrl, // My URL
    state: '',
    show_dialog: false
  };

  public authorize() {
    window.location.href = this.buildAuthUrl();
  }

  private buildAuthUrl(): string {
    const params = [];
    for (const [key, value] of Object.entries(this.authConfig)) {
      if (typeof value === 'object') {
        params.push(`${key}=${(value as string[]).join('')}`);
      } else {
        params.push(`${key}=${value}`);
      }
    }

    return `${this.requestAuthUrl}?${params.join('&')}`;
  }
}

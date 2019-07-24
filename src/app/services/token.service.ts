import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SpotifyAuthResponse } from '../interfaces/spotifyAuth.interface';
import { BehaviorSubject } from 'rxjs';
import { StorageHelperService } from '../helpers/storage-helper.service';

@Injectable()
export class TokenService {
  private token = '';
  private token$ = new BehaviorSubject(this.token);

  constructor(private storageHelperS: StorageHelperService) {}

  public get oAuthToken(): string {
    this.token = this.storageHelperS.getLocalStorageItem('aC');
    return this.token;
  }

  public clearToken(): void {
    this.token = '';
    this.token$.next(this.token);
  }

  public get authHeader(): { [name: string]: string } {
    return this.token
      ? { Authorization: `Bearer ${this.token['access']}` }
      : {};
  }

  public get authTokens(): Observable<string> {
    return this.token$.asObservable();
  }

  public setAuthToken(spotifyResponse: SpotifyAuthResponse): boolean {
    if (!!spotifyResponse && !!spotifyResponse.access_token) {
      this.token = spotifyResponse.access_token;
      this.storageHelperS.setLocalStorageItem('aC', { access: this.token });
    } else {
      this.token = '';
    }
    this.token$.next(this.token);
    return !!this.token;
  }
}

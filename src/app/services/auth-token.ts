import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild
} from '@angular/router';
import { fromPairs } from 'lodash';
import { SpotifyAuthResponse } from '../interfaces/spotifyAuth.interface';
import { TokenService } from './token.service';

@Injectable()
export class AuthToken implements CanActivate, CanActivateChild {
  constructor(private tokenSvc: TokenService) {}

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.canActivateChild(next);
  }

  public canActivateChild(next: ActivatedRouteSnapshot): boolean {
    const response = this.extractApiResponse(next.fragment);
    if (response) {
      this.tokenSvc.setAuthToken(response);
    }
    return !!response;
  }

  private extractApiResponse(fragment: string): SpotifyAuthResponse | null {
    if (!!fragment) {
      return fromPairs(
        fragment.split('&').map(s => s.split('='))
      ) as SpotifyAuthResponse;
    }
    return null;
  }
}

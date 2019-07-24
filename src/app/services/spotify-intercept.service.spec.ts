import { TestBed } from '@angular/core/testing';

import { SpotifyInterceptService } from './spotify-intercept.service';

describe('SpotifyInterceptService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpotifyInterceptService = TestBed.get(SpotifyInterceptService);
    expect(service).toBeTruthy();
  });
});

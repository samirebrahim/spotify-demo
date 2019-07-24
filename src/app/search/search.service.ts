import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SearchService {
  artistsResult = [];
  searchQ = '';
  nextArtists = '';
  constructor(private http: HttpClient) {}
  searchArtits(term): Observable<any> {
    this.searchQ = term;
    return this.http
      .get(`https://api.spotify.com/v1/search?q=${term}&type=artist`)
      .pipe(
        map((response: any) => {
          const data = response;
          const searchRes = this.mapArtists(data);
          this.artistsResult = searchRes.artists;
          return searchRes;
        })
      );
  }
  getNextPage(url, isAlbum) {
    return this.http.get(url).pipe(
      map((response: any) => {
        const searchRes: any = isAlbum
          ? this.mapAlbums(response)
          : this.mapArtists(response);
        if (!isAlbum) {
          this.artistsResult = this.artistsResult.concat(searchRes.artists);
          return { artists: this.artistsResult, next: searchRes.next };
        }
        return { albums: searchRes.albums, next: searchRes.next };
      })
    );
  }
  getAlbum(id): Observable<any> {
    return this.http
      .get(`https://api.spotify.com/v1/artists/${id}/albums`)
      .pipe(
        map((response: any) => {
          const data = response;
          return this.mapAlbums(data);
        })
      );
  }

  private mapArtists(data) {
    const artists = [];
    data = data.artists;
    for (let i = 0; i < data.items.length; i++) {
      artists.push({
        image: data.items[i].images.length
          ? data.items[i].images[1].url
          : 'assets/placeholder.artist.jpg',
        name: data.items[i].name,
        followers: data.items[i].followers.total,
        ratings: this.calculateRating(data.items[i].popularity),
        id: data.items[i].id
      });
    }
    this.nextArtists = data.next;
    return { artists: artists, next: data.next };
  }

  private mapAlbums(data) {
    const albums = [];
    for (let i = 0; i < data.items.length; i++) {
      const year = new Date(data.items[i].release_date).getFullYear();
      albums.push({
        image: data.items[i].images.length
          ? data.items[i].images[1].url
          : 'assets/placeholder.artist.jpg',
        name: data.items[i].name,
        artists: data.items[i].artists.length
          ? data.items[i].artists.map(ar => ar.name).join(', ')
          : null,
        release_year: year,
        url: data.items[i].external_urls.spotify,
        total_tracks: data.items[i].total_tracks
      });
    }
    return { albums: albums, next: data.next };
  }

  private calculateRating(pop): number {
    return Math.ceil(pop / 20);
  }
}

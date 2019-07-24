import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import {
  switchMap,
  debounceTime,
  tap,
  distinctUntilChanged,
  catchError,
  filter
} from 'rxjs/operators';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchForm: FormControl;
  artists = [];
  albums = [];
  searchQ: FormControl = new FormControl();
  nextArtists: string;
  nextAlbums: string;

  constructor(private searchServ: SearchService) {}

  ngOnInit() {
    this.artists = this.searchServ.artistsResult;
    this.nextArtists = this.searchServ.nextArtists;
    this.searchQ.setValue(this.searchServ.searchQ);
    this.searchQ.valueChanges
      .pipe(
        debounceTime(400),
        filter(term => term),
        distinctUntilChanged(),
        switchMap(term => this.searchServ.searchArtits(term))
      )
      .subscribe((res: any) => {
        this.albums = [];
        this.artists = res.artists;
        this.nextArtists = res.next;
      });
  }
  onScroll(isAlbums?) {
    if (isAlbums) {
      if (this.nextAlbums) {
        this.searchServ
          .getNextPage(this.nextAlbums, isAlbums)
          .subscribe((res: any) => {
            this.albums = res.albums;
            this.nextAlbums = res.next;
          });
      }
    } else {
      if (this.nextArtists) {
        this.searchServ
          .getNextPage(this.nextArtists, isAlbums)
          .subscribe((res: any) => {
            this.artists = res.artists;
            this.nextArtists = res.next;
          });
      }
    }
  }

  trackBy(index: number, item: any): number {
    return item.id;
  }

  search() {
    if (this.searchQ.value) {
      this.albums = [];
      this.nextAlbums = '';
      this.searchServ.searchArtits(this.searchQ.value).subscribe(res => {
        this.artists = res;
        this.nextArtists = res.next;
      });
    }
  }

  clearInput() {
    this.searchQ.setValue('');
  }

  getAlbum(id) {
    this.searchServ.getAlbum(id).subscribe(res => {
      this.albums = res.albums;
      this.nextAlbums = res.next;
    });
  }
}

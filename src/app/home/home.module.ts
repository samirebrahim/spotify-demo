import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { LoginComponent } from '../login/login.component';
import { SearchComponent } from '../search/search.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchService } from '../search/search.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpotifyInterceptService } from '../services/spotify-intercept.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [HomeComponent, SearchComponent, LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    InfiniteScrollModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent
      }
    ])
  ],
  providers: [
    SearchService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpotifyInterceptService,
      multi: true
    }
  ]
})
export class HomeModule {}

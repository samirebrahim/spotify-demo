import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AutComponent } from './aut/aut.component';
import { AuthGuard } from './services/auth.guard';
import { TokenService } from './services/token.service';

@NgModule({
  declarations: [AppComponent, AutComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [AuthGuard, TokenService],
  bootstrap: [AppComponent]
})
export class AppModule {}

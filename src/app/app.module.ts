import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AutComponent } from './aut/aut.component';
import { AuthToken } from './services/auth-token';
import { TokenService } from './services/token.service';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [AppComponent, AutComponent, LoginComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [AuthToken, TokenService],
  bootstrap: [AppComponent]
})
export class AppModule {}

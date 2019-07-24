import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isAuthenticated: boolean;
  constructor(private tokenSrv: TokenService) {}

  ngOnInit() {
    this.isAuthenticated = this.tokenSrv.oAuthToken ? true : false;
  }
}

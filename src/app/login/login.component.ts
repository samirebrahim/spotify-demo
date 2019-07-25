import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { TokenService } from '../services/token.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  fromUnAuth = false;
  constructor(
    private authService: AuthenticationService,
    private tokenSrv: TokenService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    const isAuthenticated = this.tokenSrv.oAuthToken ? true : false;
    if (isAuthenticated) {
      this.router.navigate(['/search']);
    }
    if (this.route.snapshot.queryParams['returnUrl'] === 'unAuth') {
      this.fromUnAuth = true;
    }
  }

  login() {
    this.authService.authorize();
  }
}

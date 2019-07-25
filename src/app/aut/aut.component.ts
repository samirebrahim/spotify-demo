import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aut',
  templateUrl: './aut.component.html'
})
export class AutComponent implements OnInit {
  constructor(private tokenSvc: TokenService, private router: Router) {}

  ngOnInit() {
    if (!!this.tokenSvc.oAuthToken) {
      this.router.navigate(['']);
    }
  }
}

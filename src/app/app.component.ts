import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from './services/util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-2023';
  isLogged = false;

  constructor(private router: Router, private utilSvc: UtilService) {}

  ngOnInit(): void {
    this.isLogged = !!this.utilSvc.getToken();
    this.utilSvc.isLogged.subscribe({
      next: (val) => {
        this.isLogged = val;
      },
    });
  }

  logout() {
    this.utilSvc.deleteToken();
    this.router.navigate(['login']);
  }
}

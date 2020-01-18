import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class HelperService {

  constructor(private router: Router) { }

  redirectTo(link: string, param?: any) {
    if (link) {
      if (param) {
        this.router.navigate([link, param]);
      } else {
        this.router.navigate([link]);
      }
    }
  }
}

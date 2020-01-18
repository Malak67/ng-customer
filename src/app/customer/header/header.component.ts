import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Logout } from '../../appStore/app.actions';
import { AppState } from '../../appStore/app.store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Select(AppState.isAuthenticated) isAuthenticated$: Observable<boolean>;

  constructor(
    private store: Store,
  ) { }

  ngOnInit() {
  }

  logout() {
    this.store.dispatch(new Logout());
  }


}

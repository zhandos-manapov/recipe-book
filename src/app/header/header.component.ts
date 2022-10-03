import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() navItemClicked = new EventEmitter<string>()

  isAuthenticated = false
  private _userSub!: Subscription

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this._userSub = this.authService.user$.subscribe(
      user => {
        this.isAuthenticated = !!user
      }
    )
  }

  onNavItemClick(eventData: string) {
    this.navItemClicked.emit(eventData)
  }

  onSaveData() {
    this.dataStorageService.storeRecipes()
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe()
  }

  onLogout(){
    this.authService.logout()
  }

  ngOnDestroy(): void {
    this._userSub.unsubscribe()
  }
}

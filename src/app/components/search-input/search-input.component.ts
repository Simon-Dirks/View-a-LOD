import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';
import { NgClass, NgIf } from '@angular/common';
import { SearchService } from '../../services/search/search.service';
import { debounceTime, distinctUntilChanged, Subject, tap } from 'rxjs';
import { Settings } from '../../config/settings';
import { featherSearch } from '@ng-icons/feather-icons';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [FormsModule, NgIcon, NgIf, NgClass],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
})
export class SearchInputComponent implements OnInit {
  private readonly _searchSubject = new Subject<string | undefined>();

  constructor(
    public search: SearchService,
    public router: Router,
  ) {}

  ngOnInit() {
    this.initDebouncedSearch();
  }

  initDebouncedSearch() {
    this._searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap((searchQuery) => {
          if (searchQuery === undefined) {
            return;
          }

          const queryParams: NavigationExtras = {
            queryParams: { q: searchQuery },
          };

          void this.router.navigate([''], queryParams);
        }),
      )
      .subscribe();
  }

  onSearchInputChange(event: Event) {
    const searchQuery = (event.target as HTMLInputElement).value;
    this._searchSubject.next(searchQuery?.trim());
  }

  protected readonly Settings = Settings;
  protected readonly featherSearch = featherSearch;
}

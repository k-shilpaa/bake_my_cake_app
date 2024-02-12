import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Output() 
  searchEvent = new EventEmitter<string>();
  searchText: string | undefined;

  search() {
    this.searchEvent.emit(this.searchText);
  }
}

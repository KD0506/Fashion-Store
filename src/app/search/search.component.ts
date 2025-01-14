import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchResult: undefined | product[];
  noResultsFound: boolean = false;  // New flag to track if no results are found
  
  constructor(private activeRoute: ActivatedRoute, private product: ProductService) { }

  ngOnInit(): void {
    const query = this.activeRoute.snapshot.paramMap.get('query');
    console.warn(query);
    if (query) {
      this.product.searchProduct(query).subscribe((result) => {
        if (result.length > 0) {
          this.searchResult = result;
          this.noResultsFound = false;
        } else {
          this.searchResult = [];
          this.noResultsFound = true;
        }
      });
    }
  }
}

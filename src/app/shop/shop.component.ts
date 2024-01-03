import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from '../shared/models/product';
import { ShopService } from './shop.service';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';
import { ShopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
@ViewChild('search') searchTerm?: ElementRef;

  products: Product[] = [];
  brands: Brand[] = [];
  types: Type[] = [];
  shopParams = new ShopParams();
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to high', value: 'priceAsc' },
    { name: 'Price: High to low', value: 'priceDesc' }
  ];

  constructor(private shopServices: ShopService) { }

  ngOnInit(): void {
    this.getProducts()
    this.getBrands()
    this.getTypes()
  }

  getProducts() {
    this.shopServices.getProducts(this.shopParams).subscribe({
      next: res => {
        console.log(res)
        this.products = res.data;
        this.shopParams.pageIndex = res.pageIndex;
        this.shopParams.pageSize = res.pageSize;
        this.shopParams.totalCount = res.count;
      },
      error: error => console.log(error),
      complete: () => console.log(this.products)
    });
  }

  getBrands() {
    this.shopServices.getBrands().subscribe({
      next: res => this.brands = [{ id: 0, name: 'All' }, ...res],
      error: error => console.log(error),
      complete: () => console.log('getBrands')
    });
  }

  getTypes() {
    this.shopServices.getTypes().subscribe({
      next: res => this.types = [{ id: 0, name: 'All' }, ...res],
      error: error => console.log(error),
      complete: () => console.log('getTypes')
    });
  }

  onBrandSelected(brandId: number) {
    this.shopParams.brandId = brandId;
    this.shopParams.pageIndex = 1;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.shopParams.pageIndex = 1;
    this.getProducts();
  }

  onSortSelected(event: any) {
    this.shopParams.sort = event.target.value;
    this.getProducts();
  }

  onPageChanged(event: any) {
    if (this.shopParams.pageIndex !== event) {
      this.shopParams.pageIndex = event;
      this.getProducts();
    }
  }

onSearch(){
  this.shopParams.search = this.searchTerm?.nativeElement.value;
  this.shopParams.pageIndex = 1;
  this.getProducts();
}

onReset(){
    if(this.searchTerm) this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
}

}

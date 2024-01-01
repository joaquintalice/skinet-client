import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/models/product';
import { ShopService } from './shop.service';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products: Product[] = [];
  brands: Brand[] = [];
  types: Type[] = [];
  brandIdSelected = 0;
  typeIdSelected = 0;
  sortSelected = "name";
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to high', value: 'priceAsc' },
    { name: 'Price: High to low', value: 'priceDesc' }
  ]
  constructor(private shopServices: ShopService) { }

  ngOnInit(): void {
    this.getProducts()
    this.getBrands()
    this.getTypes()
  }

  getProducts() {
    this.shopServices.getProducts(this.brandIdSelected, this.typeIdSelected, this.sortSelected).subscribe({
      next: res => this.products = res.data,
      error: error => console.log(error),
      complete: () => console.log('Completed')
    });
  }

  getBrands() {
    this.shopServices.getBrands().subscribe({
      next: res => this.brands = [{ id: 0, name: 'All' }, ...res],
      error: error => console.log(error),
      complete: () => console.log('Completed')
    });
  }

  getTypes() {
    this.shopServices.getTypes().subscribe({
      next: res => this.types = [{ id: 0, name: 'All' }, ...res],
      error: error => console.log(error),
      complete: () => console.log('Completed')
    });
  }

  onBrandSelected(brandId: number) {
    this.brandIdSelected = brandId;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.typeIdSelected = typeId;
    this.getProducts();
  }

  onSortSelected(event: any) {
    this.sortSelected = event.target.value;
    this.getProducts();
  }

}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/models/pagination';
import { Product } from '../shared/models/product';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }


  getProduct(id:number){
    return this.http.get<Product>(this.baseUrl + 'products/' + id);
  }

  getProducts({ brandId, pageIndex, pageSize, sort, typeId, search }: ShopParams) {
    let params = new HttpParams();

    if (brandId > 0) params = params.append('brandId', brandId);
    if (typeId) params = params.append('typeId', typeId);
    params = params.append('sort', sort);
    params = params.append('pageIndex', pageIndex);
    params = params.append('pageSize', pageSize);
    if(search) params = params.append('search', search);
  

    return this.http.get<Pagination<Product[]>>(this.baseUrl + 'products', { params });
  }

  getBrands() {
    return this.http.get<Brand[]>(this.baseUrl + 'products/brands')
  }

  getTypes() {
    return this.http.get<Type[]>(this.baseUrl + 'products/types')
  }

}

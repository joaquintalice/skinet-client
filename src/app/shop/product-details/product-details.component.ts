import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product?: Product;
  
constructor(private shopService: ShopService, private activatedRoot: ActivatedRoute){}
  
  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(){
    const id = this.activatedRoot.snapshot.paramMap.get('id');
    if(id) this.shopService.getProduct(+id).subscribe({
      next: res=> {
        this.product = res
        console.log(res)
      },
      error: error => console.log(error),
      complete: ()=> console.log('product completed')
    });;
  }

}

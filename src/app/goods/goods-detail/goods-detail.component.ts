import {Component, Input, OnInit, OnChanges, OnDestroy} from '@angular/core';
import {Goods} from '../../http/goods.type';
import {GoodsService} from '../../http/goods.service';
import {FormControl, Validators} from '@angular/forms';
import {DecimalPipe} from '@angular/common';
import {debounceTime, distinctUntilChanged, filter, mergeMap, takeUntil, tap} from 'rxjs/operators';
import {UnsubOnDestroy} from '../../utils/unsub-on-destroy';
import {EMPTY, of} from 'rxjs';

@Component({
  selector: 'app-goods-detail',
  templateUrl: './goods-detail.component.html',
  styleUrls: ['./goods-detail.component.css']
})
export class GoodsDetailComponent extends UnsubOnDestroy implements OnChanges, OnInit, OnDestroy{
  @Input() goods!: Goods;
  priceInput!: FormControl;
  public prices: {[key: string]: number} = {
    USD: 70,
    RUB: 1,
  };
  public selectedPrice = 1;

  constructor(private goodsService: GoodsService) {
    super();
  }

  ngOnInit(): void {
    this.priceInput.valueChanges.pipe(
      debounceTime(2000),
      distinctUntilChanged(),
      mergeMap((params) => {
        console.log(params);
        if (this.priceInput.valid){
          this.goods.attributes[0].price = parseFloat(params.replace(',', '.'))  * this.selectedPrice;
          return this.goodsService.updateGoodPrice(this.goods.id, this.goods);
        }
        return EMPTY;
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe();
  }

  ngOnChanges(): void {
    this.priceInput = new FormControl(this.goods.attributes[0].price / this.selectedPrice, Validators.pattern('^(?!,$)[\\d,.]+$'));
  }

  selectPrice(event: any): void {
    this.selectedPrice = event.target.value;
    this.priceInput.setValue(new DecimalPipe('en-US').transform(this.goods.attributes[0].price / this.selectedPrice, '1.2-2'));
  }
}

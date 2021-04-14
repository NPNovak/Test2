import {Component, Input, OnInit, OnChanges, OnDestroy} from '@angular/core';
import {Goods} from '../../http/goods.type';
import {GoodsService} from '../../http/goods.service';
import {FormControl, Validators} from '@angular/forms';
import {DecimalPipe} from '@angular/common';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-goods-detail',
  templateUrl: './goods-detail.component.html',
  styleUrls: ['./goods-detail.component.css']
})
export class GoodsDetailComponent implements OnChanges, OnInit, OnDestroy{
  private destroy$ = new Subject();
  @Input() goods!: Goods;
  priceInput!: FormControl;
  public prices: {[key: string]: number} = {
    USD: 70,
    RUB: 1,
  };
  public selectedPrice = 1;

  constructor(private goodsService: GoodsService) {}

  ngOnInit(): void {
    this.priceInput.valueChanges.pipe(
      debounceTime(2000),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe((value) => {
      if (this.priceInput.valid){
        this.goods.attributes[0].price = parseFloat(value.replace(',', '.'))  * this.selectedPrice;
        this.goodsService.updateGoodPrice(this.goods.id, this.goods).subscribe();
      }
    });
  }

  ngOnChanges(): void {
    this.priceInput = new FormControl(this.goods.attributes[0].price / this.selectedPrice, Validators.pattern('^(?!,$)[\\d,.]+$'));
  }

  selectPrice(event: any): void {
    this.selectedPrice = event.target.value;
    this.priceInput.setValue(new DecimalPipe('en-US').transform(this.goods.attributes[0].price / this.selectedPrice, '1.2-2'));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

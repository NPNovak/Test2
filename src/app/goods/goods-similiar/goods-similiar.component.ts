import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {GoodsService} from '../../http/goods.service';
import {Observable} from 'rxjs';
import {Goods} from '../../http/goods.type';

@Component({
  selector: 'app-goods-similiar',
  templateUrl: './goods-similiar.component.html',
  styleUrls: ['./goods-similiar.component.css']
})
export class GoodsSimiliarComponent implements OnChanges {
  @Input() category!: string;
  public goodsCategoryData$!: Observable<Goods[]>;

  constructor(private goodsService: GoodsService) { }

  ngOnChanges(): void {
    this.goodsCategoryData$ = this.goodsService.getGoodsByCategory(this.category);
  }

}

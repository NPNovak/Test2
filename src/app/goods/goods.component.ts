import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Goods} from '../http/goods.type';
import {GoodsService} from '../http/goods.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.css']
})
export class GoodsComponent implements OnInit, OnDestroy {
  public goodsData$!: Observable<Goods[]>;
  public selectedGoods!: Goods;

  private sub!: Subscription;

  constructor(private goodsService: GoodsService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.goodsData$ = this.goodsService.getAll();
    this.route.queryParams.subscribe(params => {
      if (params.index){
        this.sub = this.goodsService.getGoodByID(params.index)
          .subscribe((item) => {
            this.selectedGoods = item;
          });
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

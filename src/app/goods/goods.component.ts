import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Goods} from '../http/goods.type';
import {GoodsService} from '../http/goods.service';
import {ActivatedRoute} from '@angular/router';
import {filter, mergeMap, takeUntil} from 'rxjs/operators';
import {UnsubOnDestroy} from '../utils/unsub-on-destroy';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.css']
})
export class GoodsComponent extends UnsubOnDestroy implements OnInit, OnDestroy {
  public goodsData$!: Observable<Goods[]>;
  public selectedGoods!: Goods;

  private sub!: Subscription;

  constructor(private goodsService: GoodsService,
              private route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.goodsData$ = this.goodsService.getAll();
    this.route.queryParams
      .pipe(
        filter(params => params.index),
        mergeMap((params) => {
          return this.goodsService.getGoodByID(params.index);
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(item => {
        this.selectedGoods = item;
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

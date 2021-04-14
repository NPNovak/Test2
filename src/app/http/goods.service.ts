import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Goods} from './goods.type';
import {debounceTime, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GoodsService {
  private path = 'http://localhost:3000/';

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Goods[]> {
    return this.httpClient.get<Goods[]>(this.path + 'goods');
  }

  getGoodsByCategory(category: string): Observable<Goods[]>{
      return this.httpClient.get<Goods[]>(this.path + 'goods?category=' + category);
  }

  getGoodByID(id: number): Observable<Goods>{
    return this.httpClient.get<Goods>(this.path + 'goods/' + id);
  }

  updateGoodPrice(id: number, good: Goods): any {
    return this.httpClient.put<Goods>(this.path + 'goods/' + id, good)
      .pipe(debounceTime( 2000));
  }
}

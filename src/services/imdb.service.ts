import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';
import { Production } from '../interfaces/production';
import { ProductionTypeEnum } from '../enums/productionsTypeEnum';
import { Trailer } from '../interfaces/trailer';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Genre } from '../interfaces/genre';
import { Casting } from '../interfaces/casting';

@Injectable({
  providedIn: 'root',
})
export class ImdbService {
  private headers: HttpHeaders;

  constructor(
    private httpClient: HttpClient,
    private domSanitizer: DomSanitizer
  ) {
    //header build
    this.headers = new HttpHeaders()
      .set('accept', 'application/json')
      .set('Authorization', `Bearer ${environment.acessToken}`);
  }

  ///Get movies currently on theatres
  getNowPlaying(): Observable<{ results: Production[] }> {
    return this.httpClient.get<{ results: Production[] }>(
      `${environment.baseUrl}/movie/now_playing?api_key=${environment.apiKey}&language=pt-BR`,
      { headers: this.headers }
    );
  }
  //Get popular series
  getPopularSeries(): Observable<{ results: Production[] }> {
    return this.httpClient.get<{ results: Production[] }>(
      `${environment.baseUrl}/tv/popular?api_key=${environment.apiKey}&language=pt-BR`,
      { headers: this.headers }
    );
  }
  //Get trending movies based on time_window(day , week)
  getTrendingMovies(
    time_window: string
  ): Observable<{ results: Production[] }> {
    return this.httpClient.get<{ results: Production[] }>(
      `${environment.baseUrl}/trending/movie/${time_window}?api_key=${environment.apiKey}&language=pt-BR`,
      { headers: this.headers }
    );
  }
  //get trailers of productions by id
  getTrailers(
    id: number,
    productionType: ProductionTypeEnum
  ): Observable<{ results: Production[] }> {
    return this.httpClient.get<{ results: Production[] }>(
      `${environment.baseUrl}/${productionType}/${id}/videos?api_key=${environment.apiKey}`,
      { headers: this.headers }
    );
  }
  //get productions genre list
  getGenre(
    productionType: ProductionTypeEnum
  ): Observable<{ genres: Genre[] }> {
    return this.httpClient.get<{ genres: Genre[] }>(
      `${environment.baseUrl}/genre/${productionType}/list?api_key=${environment.apiKey}&language=pt-BR`,
      { headers: this.headers }
    );
  }

  //get productions casting
  // prettier-ignore
  getCasting(productionType : ProductionTypeEnum , id : number) : Observable<  {cast: Casting[], crew : Casting[]}>{
    return this.httpClient.get<{cast: Casting[], crew : Casting[]}>(
      `${environment.baseUrl}/${productionType}/${id}/credits?api_key=${environment.apiKey}&language=pt-BR`,{ headers: this.headers }
    )

  }
  // prettier-ignore

  getProductionList(productionType : ProductionTypeEnum , page : number) : Observable<{results : Production[]}>{
    return this.httpClient.get<{results : Production[]}>(
      `${environment.baseUrl}/discover/${productionType}?api_key=${environment.apiKey}&language=pt-BR&page=${page}`,{ headers: this.headers }
    )
  }
}

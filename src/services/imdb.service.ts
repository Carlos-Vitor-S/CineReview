import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';
import { Production } from '../interfaces/production';
import { ProductionTypeEnum } from '../enums/productionsTypeEnum';

@Injectable({
  providedIn: 'root',
})
export class ImdbService {
  private headers: HttpHeaders;

  constructor(private httpClient: HttpClient) {
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
      `${environment.baseUrl}/trending/movie/${time_window}?api_key=${environment.apiKey}&language=pt-BR`
    );
  }

  getTrailers(
    id: number,
    type: ProductionTypeEnum
  ): Observable<{ results: Production[] }> {
    return this.httpClient.get<{ results: Production[] }>(
      `${environment.baseUrl}/${type}/${id}/videos?api_key=${environment.apiKey}&language=pt-BR`
    );
  }

  //get any production by id (Movies and series)
}

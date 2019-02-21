// Used for dependency injection in Angular
import { Injectable } from '@angular/core';

// The defacto libraries for working with HTTP
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

// RxJS library for extending observable results through error handling
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from '../classes/hero';
import { HEROES } from '../classes/mock-heroes';
import { MessageService } from './message.service';

// The @Injectable decorator marks thi class as one that
// participates in Angulars DI system.
@Injectable({
  // Angular creates a single, shared instance of HeroService and injects into any class that asks for it.
  // Checkout more about providers 'https://angular.io/guide/providers'

  // You should always provide your service in the root injector 
  // unless there is a case where you want the service to be available only if the consumer imports a particular @NgModule.
  providedIn: 'root'
})
export class HeroService {

  // Base URL to Heroes Web API
  private heroesUrl = 'api/heroes';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  hero: Observable<Hero>

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  // This calls data that's in memory, but calls to a REST API will have a different signiture (see getObservableHeroes below).
  // getHeroes(): Hero[] {
  //   return HEROES;
  // }

  getHeroesFauxAsync(): Observable<Hero[]> {
    // This is a typical "service-in-service" scenario: 
    // you inject the MessageService into the HeroService which is injected into the HeroesComponent.
    // this.messageService.add('HeroService: fetched heroes');
    this.log('HeroService: fetched heroes');

    // The 'of()' function simulates getting data from a server.
    return of(HEROES);
  }

  getHeroFauxAsync(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    // Note the backticks ( ` ) that define a JavaScript template literal for embedding the id.
    // this.messageService.add(`HeroService: fetched hero id=${id}`);
    this.log(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
    //this.messageService.add(`HeroService: fetched ${this.hero.name}`);
  }

  // GETS heroes from the in memory Web API created by the HttpClientInMemoryWebApiModule.
  // Gets the heroes using Angular's HttpClient.
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).
      pipe(
        // The tap() function looks at the observable values, does something with those values, 
        // and passes them along the pipe line.
        tap(_ => this.log('Fetched heroes')),

        // The 'catchError()' function handles a call that failed,
        // and returns and empty result.
        catchError(this.handleError('getHeroes', []))
      );
  }

  // GETS heroes from the in memory Web API created by the HttpClientInMemoryWebApiModule.
  // Gets the heroes using Angular's HttpClient.
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
      .pipe
      (
        tap(_ => this.log(`HeroService: fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`HeroService: fetched hero id=${id}`))
      )
  }

  /** POST: add a new hero to the server */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /** PUT: Update an existing hero on the server */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /** DELETE: Delete an existing hero on the server */
  deleteHero(hero: Hero): Observable<any> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreakpointsService {

  /*
  Decidi moverlo a un servicio ya que es algo que se puede reutilizar en toda la aplicación.
  ---
  Observables of each breakpoint, using shareReplay(1) to avoid multiple subscriptions.
  */
  public isXsmall$ = this.breakpointObserver.observe(Breakpoints.XSmall).pipe(shareReplay(1));
  public isSmall$ = this.breakpointObserver.observe(Breakpoints.Small).pipe(shareReplay(1));
  public isMedium$ = this.breakpointObserver.observe(Breakpoints.Medium).pipe(shareReplay(1));
  public isLarge$ = this.breakpointObserver.observe(Breakpoints.Large).pipe(shareReplay(1));
  public isXlarge$ = this.breakpointObserver.observe(Breakpoints.XLarge).pipe(shareReplay(1));

  constructor(
    private breakpointObserver: BreakpointObserver,
  ) { }
}

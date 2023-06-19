import { Injectable, isDevMode } from '@angular/core';

/*
  This service is used to log messages to the console.
  It is only used in development mode.
  It allows to avoid having to remove all the console.log() calls when the app is ready for production.
*/
@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  log(...args: any[]) {
    if (isDevMode()) {
      console.log(...args);
    }
  }
}

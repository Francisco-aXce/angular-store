import { Component, ViewEncapsulation } from '@angular/core';
import { BreakpointsService } from 'src/app/services/breakpoints.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None, // To be able to override the styles of the Angular Material components
})
export class NavbarComponent {

  constructor(
    public bpService: BreakpointsService,
  ) { }

}
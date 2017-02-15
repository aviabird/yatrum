import { Component, ViewContainerRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Travel app';

  constructor(private router: Router) { }
  
  ngOnInit() {
      this.router.events.subscribe((evt) => {
          if (!(evt instanceof NavigationEnd)) {
              return;
          }
          document.body.scrollTop = 0;
      });
  }
}

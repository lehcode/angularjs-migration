import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  template: `
    <!-- Hybrid app template -->
    <div class="app-container">
      <!-- AngularJS router outlet -->
      <div ui-view></div>
      <!-- Add components here -->
    </div>
  `
})
export class AppComponent {
  title = 'barq';
}

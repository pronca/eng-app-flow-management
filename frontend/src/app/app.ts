import { Component } from '@angular/core';

interface FlowItem {
  name: string;
  status: 'Completed' | 'In Progress' | 'Blocked';
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = 'Flow Manager';

  protected readonly flows: readonly FlowItem[] = [
    { name: 'Requirements Review', status: 'Completed' },
    { name: 'Frontend Implementation', status: 'In Progress' },
    { name: 'QA Validation', status: 'Blocked' }
  ];
}

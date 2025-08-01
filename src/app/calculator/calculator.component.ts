import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  imports: [],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss'
})
export class CalculatorComponent {
  display = '';

  onClick(value: string): void {
    if (value === 'C') {
      this.display = '';
    } else if (value === '←') {
      this.display = this.display.slice(0, -1);
    } else if (value === '=') {
      try {
        this.display = Function(`return ${this.display}`)().toString();
      } catch {
        this.display = 'Error';
      }
    } else {
      this.display += value;
    }
  }

  getClass(value: string): string {
    if (value === 'C') return 'btn-danger';
    if (value === '←' || value === '%') return 'btn-secondary';
    if (['/', '*', '-', '+'].includes(value)) return 'btn-primary';
    if (value === '=') return 'btn-success';
    return 'btn-light';
  }
}

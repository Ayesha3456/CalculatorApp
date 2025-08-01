import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  imports: [],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss'
})
export class CalculatorComponent {
  display = '';
  justEvaluated = false;

  onClick(value: string): void {
    if (value === 'C') {
      this.display = '';
      this.justEvaluated = false;
    } else if (value === '←') {
      this.display = this.display.slice(0, -1);
    } else if (value === '=') {
      try {
        const expression = this.display.replace(/%/g, '/100');
        this.display = Function(`return ${expression}`)().toString();
      } catch {
        this.display = 'Error';
      }
      this.justEvaluated = true;
    } else {
      if (this.justEvaluated && !['+', '-', '*', '/', '%'].includes(value)) {
        this.display = '';
      }
      this.justEvaluated = false;
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

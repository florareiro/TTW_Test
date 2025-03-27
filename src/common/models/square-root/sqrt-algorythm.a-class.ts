import { Algorithm } from "./algorythm.interface";

export abstract class SqrtAlgorithm implements Algorithm {
  protected number: number = 0;
  protected result: number = 0;
  
  protected iteration: number = 0;
  protected readonly tolerance: number = 1e-7;
  protected readonly iterationLimit: number = 1000;

  setTarget(number: number): void {
    this.number = number;
  }

  process(): number {
    if (this.isProcessable()) {
      while (this.shouldContinue()) {
        this.iteration++;
        this.result = this.approximateGuess();
      }
    }

    return this.result;
  }

  private isProcessable(): boolean {
    return this.number > 0;
  }

  private shouldContinue(): boolean {
    return !this.isIterationLimitReached() && !this.isToleranceReached();
  }

  private isIterationLimitReached(): boolean {
    return this.iteration > this.iterationLimit;
  }

  private isToleranceReached(): boolean {
    return this.getTargetAndResultDifference() < this.tolerance;
  }

  private getTargetAndResultDifference(): number {
    return Math.abs(this.number - this.result * this.result);
  }

  protected abstract approximateGuess(): number;
}

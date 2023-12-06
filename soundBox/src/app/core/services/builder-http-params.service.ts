import { HttpParams } from '@angular/common/http';

export class BuilderHttpParams<T> {
  constructor(private resource: T) {}

  createParams(): HttpParams {
    const paramsValue: any = {};

    if (!this.resource) return new HttpParams();

    for (const prop in this.resource) {
      const value = this.resource[prop];
      if (
        value ||
        (typeof value === 'number' && Number(value) == Number(0)) ||
        typeof value === 'boolean'
      ) {
        paramsValue[prop] = String(value);
      }
    }

    return new HttpParams({ fromObject: { ...paramsValue } });
  }
}

export class StyleDTO {
  id?: number;
  name?: string;
  touched: boolean = false;

  constructor(init?: Partial<StyleDTO>) {
    Object.assign(this, init);
  }
}

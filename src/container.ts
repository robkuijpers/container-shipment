export class Container {

  static NETTO_WEIGHT = 4000;
  static MAX_BRUTTO_WEIGHT = 30_000;
  static MAX_LOAD_ON_TOP = 120_000;

  code: string;
  netto_weight: number = Container.NETTO_WEIGHT;  // weight without content
  bruto_weight: number = Container.NETTO_WEIGHT;  // weight of container including content

  constructor(code: string, bruto_weight: number) {

    if (!code) {
      throw new Error("ERROR: container must have a code");
    } else {
      this.code = code;
    }

    if (bruto_weight > 0) {
      this.bruto_weight = bruto_weight;
    } else {
      throw new Error("ERROR: brutto weight must be > 0");
    }

    if (bruto_weight > Container.MAX_BRUTTO_WEIGHT) {
      throw new Error(`ERROR: bruto weight must be less than: ${Container.MAX_BRUTTO_WEIGHT}`);
    }

  }
}

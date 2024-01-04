import { Container } from './container.js';

export class RegularContainer extends Container {

    static readonly type: string = 'regular';

    constructor(code: string, bruto_weight: number) {
        super(code, bruto_weight);
    }

}

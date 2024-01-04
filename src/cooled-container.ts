import { Container } from './container.js';
 
export class CooledContainer extends Container {

    static readonly type: string = 'cooled';

    constructor(code: string, bruto_weight: number) {
        super(code, bruto_weight);
    }
    
}

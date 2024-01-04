import { CooledContainer } from '../src/cooled-container';

describe('CooledContainer', () => {
    it('should create a new CooledContainer instance', () => {
        const code = 'ABC123';
        const bruto_weight = 1000;

        const cooledContainer = new CooledContainer(code, bruto_weight);

        expect(cooledContainer).toBeInstanceOf(CooledContainer);
        expect(cooledContainer.code).toBe(code);
        expect(cooledContainer.bruto_weight).toBe(bruto_weight);
    });
});

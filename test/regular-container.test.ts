import { RegularContainer } from '../src/regular-container';

describe('RegularContainer', () => {
    it('should create a new ValueContainer instance', () => {
        const code = 'ABC123';
        const bruto_weight = 1000;

        const cooledContainer = new RegularContainer(code, bruto_weight);

        expect(cooledContainer).toBeInstanceOf(RegularContainer);
        expect(cooledContainer.code).toBe(code);
        expect(cooledContainer.bruto_weight).toBe(bruto_weight);
    });
});

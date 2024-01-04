import { ValueContainer } from '../src/value-container';

describe('ValueContainer', () => {
    it('should create a new ValueContainer instance', () => {
        const code = 'ABC123';
        const bruto_weight = 1000;

        const cooledContainer = new ValueContainer(code, bruto_weight);

        expect(cooledContainer).toBeInstanceOf(ValueContainer);
        expect(cooledContainer.code).toBe(code);
        expect(cooledContainer.bruto_weight).toBe(bruto_weight);
    });
});

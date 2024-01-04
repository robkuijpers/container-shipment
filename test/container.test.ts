import { Container } from '../src/container';

describe('Container', () => {
    it('should create a container with valid code and weight', () => {
        const code = 'ABC123';
        const brutoWeight = 25000;

        const container = new Container(code, brutoWeight);

        expect(container.code).toBe(code);
        expect(container.bruto_weight).toBe(brutoWeight);
        expect(container.netto_weight).toBe(Container.NETTO_WEIGHT);
    });

    it('should throw an error when creating a container without a code', () => {
        const code = '';
        const brutoWeight = 25000;

        expect(() => new Container(code, brutoWeight)).toThrow('ERROR: container must have a code');
    });

    it('should throw an error when creating a container with a negative bruto weight', () => {
        const code = 'ABC123';
        const brutoWeight = -5000;

        expect(() => new Container(code, brutoWeight)).toThrow('ERROR: brutto weight must be > 0');
    });

    it('should throw an error when creating a container with a bruto weight exceeding the maximum', () => {
        const code = 'ABC123';
        const brutoWeight = 40000;

        expect(() => new Container(code, brutoWeight)).toThrow(`ERROR: bruto weight must be less than: ${Container.MAX_BRUTTO_WEIGHT}`);
    });
});

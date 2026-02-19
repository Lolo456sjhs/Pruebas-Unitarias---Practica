const TaxService = require('../../src/service/TaxService');

describe('Servicio de Impuesto', () => {
    const taxService = new TaxService();

    test('aplica 16% de impuesto correctamente', () => {
        expect(taxService.applyTax(1000)).toBeCloseTo(1160);
    });

    test('aplica impuesto a monto 0', () => {
        expect(taxService.applyTax(0)).toBe(0);
    });
});

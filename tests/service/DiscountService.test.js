const DiscountService = require('../../src/service/DiscountService');

describe('Servicio de Descuento', () => {
    const discountService = new DiscountService();

    test('aplica 15% de descuento para total > 10000', () => {
        expect(discountService.applyDiscount(15000)).toBeCloseTo(12750);
    });

    test('aplica 10% de descuento para total > 5000', () => {
        expect(discountService.applyDiscount(7000)).toBeCloseTo(6300);
    });

    test('no deberia aplicar descuento para total <= 5000', () => {
        expect(discountService.applyDiscount(4000)).toBe(4000);
    });
});

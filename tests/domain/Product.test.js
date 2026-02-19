const Product = require('../../src/domain/Product');

describe('Producto', () => {
    test('crea el producto correctamente', () => {
        const product = new Product("p1", "Laptop", 1000, 2);
        expect(product.name).toBe("Laptop");
        expect(product.price).toBe(1000);
        expect(product.stock).toBe(2);
    });

    test('debería calcular el subtotal correctamente', () => {
        const product = new Product("p1", "Laptop", 1000, 2);
        expect(product.price * product.stock).toBe(2000);
    });

    test('lanza error si el precio es cero o negativo', () => {
        expect(() => new Product("p1", "Laptop", 0, 1)).toThrow("Precio inválido");
        expect(() => new Product("p1", "Laptop", -100, 1)).toThrow("Precio inválido");
    });

    test('lanza error si el stock es negativo', () => {
        expect(() => new Product("p1", "Laptop", 1000, -1)).toThrow("Stock inválido");
    });

    test('debe reducir el stock correctamente', () => {
        const product = new Product("p1", "Laptop", 1000, 5);
        product.reduceStock(3);
        expect(product.stock).toBe(2);
    });

    test('lanza error si reduceStock es inválido', () => {
        const product = new Product("p1", "Laptop", 1000, 5);
        expect(() => product.reduceStock(0)).toThrow("Cantidad inválida");
        expect(() => product.reduceStock(-1)).toThrow("Cantidad inválida");
        expect(() => product.reduceStock(10)).toThrow("Stock insuficiente");
    });
});

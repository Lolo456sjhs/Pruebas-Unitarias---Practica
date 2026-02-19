const Product = require('../../src/domain/Product');

class OrderItem {
    constructor(product, quantity) {
        if (!product) throw new Error("Producto requerido");
        this.product = product;
        this.quantity = quantity;
    }

    getSubtotal() {
        return this.product.price * this.quantity;
    }
}

describe('Item de Orden', () => {
    test('calcula el subtotal correctamente', () => {
        const product = new Product("p1", "Laptop", 1000, 5);
        const item = new OrderItem(product, 1);
        expect(item.getSubtotal()).toBe(1000);
    });

    test('lanza error si el producto es nulo', () => {
        expect(() => new OrderItem(null, 1)).toThrow("Producto requerido");
    });
});

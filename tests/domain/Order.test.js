const Order = require('../../src/domain/Order');
const Product = require('../../src/domain/Product');

class OrderItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    getSubtotal() {
        return this.product.price * this.quantity;
    }
}

describe('Orden', () => {
    test('agrega items correctamente', () => {
        const order = new Order("order1");
        const product = new Product("p1", "Laptop", 1000, 5);
        const item = new OrderItem(product, 2);
        order.addItem(item);
        expect(order.items.length).toBe(1);
        expect(order.items[0]).toBe(item);
    });

    test('calcula el total correctamente', () => {
        const order = new Order("order1");
        const product = new Product("p1", "Laptop", 1000, 5);
        const item = new OrderItem(product, 2);
        order.addItem(item);
        expect(order.calculateTotal()).toBe(2000);
    });

    test('retorna 0 si la orden está vacía', () => {
        const order = new Order("order1");
        expect(order.calculateTotal()).toBe(0);
    });

    test('lanza error si el id es nulo o vacío', () => {
        expect(() => new Order("")).toThrow("Id requerido");
        expect(() => new Order(null)).toThrow("Id requerido");
        expect(() => new Order("   ")).toThrow("Id requerido");
    });
});

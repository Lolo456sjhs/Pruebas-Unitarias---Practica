const OrderService = require('../../src/service/OrderService');
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

describe('Servicio de Orden', () => {
    let mockRepository, mockPaymentGateway, mockInventoryService, mockDiscountService, mockTaxService, orderService;

    beforeEach(() => {
        mockRepository = { save: jest.fn() };
        mockPaymentGateway = { processPayment: jest.fn(() => true) };
        mockInventoryService = { updateStock: jest.fn() };
        mockDiscountService = { applyDiscount: jest.fn((total) => total) };
        mockTaxService = { applyTax: jest.fn((total) => total) };

        orderService = new OrderService(
            mockRepository,
            mockPaymentGateway,
            mockInventoryService,
            mockDiscountService,
            mockTaxService
        );
    });

    test('procesa la orden correctamente', () => {
        const order = new Order("order1");
        const product = new Product("p1", "Laptop", 1000, 5);
        const item = new OrderItem(product, 2);
        order.addItem(item);

        const result = orderService.checkout(order);

        expect(mockDiscountService.applyDiscount).toHaveBeenCalled();
        expect(mockTaxService.applyTax).toHaveBeenCalled();
        expect(mockPaymentGateway.processPayment).toHaveBeenCalled();
        expect(mockInventoryService.updateStock).toHaveBeenCalledWith(product, 2);
        expect(mockRepository.save).toHaveBeenCalledWith(order);
        expect(order.paid).toBe(true);
        expect(result).toBe(true);
    });

    test('lanza error si la orden está vacía', () => {
        const order = new Order("order2");
        expect(() => orderService.checkout(order)).toThrow("Orden vacía");
    });

    test('retornar false si el pago falla', () => {
        mockPaymentGateway.processPayment = jest.fn(() => false);
        orderService = new OrderService(
            mockRepository,
            mockPaymentGateway,
            mockInventoryService,
            mockDiscountService,
            mockTaxService
        );

        const order = new Order("order3");
        const product = new Product("p1", "Laptop", 1000, 5);
        const item = new OrderItem(product, 1);
        order.addItem(item);

        const result = orderService.checkout(order);

        expect(result).toBe(false);
        expect(mockRepository.save).not.toHaveBeenCalled();
    });

    test('lanza error si falla el repository', () => {
        mockRepository.save = jest.fn(() => { throw new Error("Database error"); });

        const order = new Order("order4");
        const product = new Product("p1", "Laptop", 1000, 5);
        const item = new OrderItem(product, 1);
        order.addItem(item);

        expect(() => orderService.checkout(order)).toThrow("Database error");
    });
});

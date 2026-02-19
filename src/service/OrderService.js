class OrderService {

    constructor(repository,
                paymentGateway,
                inventoryService,
                discountService,
                taxService) {

        this.repository = repository;
        this.paymentGateway = paymentGateway;
        this.inventoryService = inventoryService;
        this.discountService = discountService;
        this.taxService = taxService;
    }

    checkout(order) {

        if (order.items.length === 0)
            throw new Error("Orden vacía");

        let total = order.calculateTotal();

        total = this.discountService.applyDiscount(total);
        total = this.taxService.applyTax(total);

        const paymentSuccess =
            this.paymentGateway.processPayment(total);

        if (!paymentSuccess)
            return false;

        for (const item of order.items) {
            this.inventoryService.updateStock(
                item.product,
                item.quantity
            );
        }

        order.markAsPaid();
        this.repository.save(order);

        return true;
    }
}

module.exports = OrderService;

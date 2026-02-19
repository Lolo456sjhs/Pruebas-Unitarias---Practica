class Order {

    constructor(id) {

        if (!id || id.trim() === "")
            throw new Error("Id requerido");

        this.id = id;
        this.items = [];
        this.paid = false;
    }

    addItem(item) {
        this.items.push(item);
    }

    calculateTotal() {
        return this.items
            .map(i => i.getSubtotal())
            .reduce((a, b) => a + b, 0);
    }

    markAsPaid() {
        this.paid = true;
    }
}

module.exports = Order;

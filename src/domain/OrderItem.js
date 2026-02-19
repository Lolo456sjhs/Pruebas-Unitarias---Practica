class OrderItem {

    constructor(product, quantity) {

        if (!product)
            throw new Error("Producto requerido");

        if (quantity <= 0)
            throw new Error("Cantidad inválida");

        this.product = product;
        this.quantity = quantity;
    }

    getSubtotal() {
        return this.product.price * this.quantity;
    }
}

module.exports = OrderItem;

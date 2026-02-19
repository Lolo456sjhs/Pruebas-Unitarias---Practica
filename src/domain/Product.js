class Product {
    constructor(id, name, price, stock) {

        if (!id || id.trim() === "")
            throw new Error("Id requerido");

        if (price <= 0)
            throw new Error("Precio inválido");

        if (stock < 0)
            throw new Error("Stock inválido");

        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
    }

    reduceStock(quantity) {

        if (quantity <= 0)
            throw new Error("Cantidad inválida");

        if (quantity > this.stock)
            throw new Error("Stock insuficiente");

        this.stock -= quantity;
    }
}

module.exports = Product;

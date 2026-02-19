class InMemoryOrderRepository {

    constructor() {
        this.database = [];
    }

    save(order) {
        this.database.push(order);
    }

    count() {
        return this.database.length;
    }
}

module.exports = InMemoryOrderRepository;

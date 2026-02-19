class DiscountService {

    applyDiscount(total) {

        if (total > 10000)
            return total * 0.85;

        if (total > 5000)
            return total * 0.90;

        return total;
    }
}

module.exports = DiscountService;

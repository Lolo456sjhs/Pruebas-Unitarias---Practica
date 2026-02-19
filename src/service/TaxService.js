class TaxService {

    applyTax(amount) {
        return amount * 1.16; // IVA 16%
    }
}

module.exports = TaxService;

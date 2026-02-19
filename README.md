# ExampleOrders - JavaScript Version

Proyecto para práctica de pruebas unitarias con Jest.

## 1. Requisitos

- Node.js 18+
- npm 9+

Verificar versión:

```bash
node -v
npm -v
```

---

## 2. Instalación

Inicializar proyecto:

```bash
npm init -y
```

Instalar Jest:

```bash
npm install --save-dev jest
```

Modificar `package.json`:

```json
"scripts": {
  "test": "jest"
}
```

---

## 3. Estructura del Proyecto

```
example-orders/
│
├── src/
│   ├── Order.js
│   ├── Product.js
│   ├── OrderService.js
│
├── tests/
│   ├── OrderService.test.js
│   ├── Product.test.js
│
├── package.json
```

---

## 4. Crear un Test Básico

```javascript
const Product = require('../src/Product');

test('should calculate subtotal', () => {
    const product = new Product("Laptop", 1000, 2);
    expect(product.getSubtotal()).toBe(2000);
});
```

---

## 5. Asserts principales en Jest

```javascript
expect(value).toBe(10);
expect(value).toEqual(object);
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBeNull();
expect(() => fn()).toThrow();
expect(array).toContain(item);
expect(mockFn).toHaveBeenCalled();
expect(mockFn).toHaveBeenCalledTimes(1);
```

---

## 6. Crear un Mock en Jest

### Mock simple

```javascript
const mockRepository = {
    save: jest.fn().mockReturnValue(1)
};
```

---

### Verificar que fue llamado

```javascript
expect(mockRepository.save).toHaveBeenCalledTimes(1);
```

---

## 7. Hacer que un Mock lance un error

### Opción 1: Usando mockImplementation

```javascript
const mockRepository = {
    save: jest.fn().mockImplementation(() => {
        throw new Error("Database error");
    })
};
```

Test:

```javascript
test('should throw error if repository fails', () => {

    const mockRepository = {
        save: jest.fn().mockImplementation(() => {
            throw new Error("Database error");
        })
    };

    const service = new OrderService(mockRepository);
    const order = new Order();

    expect(() => {
        service.processOrder(order);
    }).toThrow("Database error");
});
```

---

### Opción 2: Usando mockRejectedValue (para funciones async)

Si el método es async:

```javascript
const mockRepository = {
    save: jest.fn().mockRejectedValue(new Error("Database error"))
};
```

Test async:

```javascript
test('should throw error if repository fails', async () => {

    const mockRepository = {
        save: jest.fn().mockRejectedValue(new Error("Database error"))
    };

    const service = new OrderService(mockRepository);

    await expect(service.processOrder(order))
        .rejects
        .toThrow("Database error");
});
```

---

## 8. Ejecutar Pruebas

```bash
npm test
```

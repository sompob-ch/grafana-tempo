const axios = require('axios');

async function checkStock(productId, quantity) {
    try {
        const url = 'http://localhost:3101/api/products/check-quantity';
        const body = { productId, quantity };
        const response = await axios.post(url, body);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

module.exports = checkStock;
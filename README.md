# Project Setup & API Usage

## Prerequisites
Ensure you have the following installed:
- [Docker & Docker Compose](https://docs.docker.com/get-docker/)
- [Node.js & npm](https://nodejs.org/)

## Setup & Monitoring with Grafana

1. Start the services using Docker Compose:
   ```sh
   docker compose up -d
   ```
2. Open Grafana in your browser:
   - URL: [http://localhost:3000](http://localhost:3000)
3. Log in to Grafana and set a new password.
4. Configure Tempo as a Data Source:
   - Navigate to **Data Sources** → **Add new data source** → Select **Tempo**
   - Set the connection URL: `http://tempo:3200`
   - Save & Test the connection
5. Explore traces:
   - Go to **Explore** → Select **Tempo**
   - Run a query

---

## Running APIs

### Start Order API
```sh
cd services/order-api
npm install
npm start
```

### Start Product API
```sh
cd services/product-api
npm install
npm start
```

---

## Calling APIs

### Create an Order
Use the following cURL command to place an order:
```sh
curl --location 'http://localhost:3100/api/orders' \
--header 'Content-Type: application/json' \
--data '{
    "customerName": "test",
    "product": {
        "productId": "67af012eb72df8f09ea00aa1",
        "quantity": "1"
    }
}'
```

---

## Notes
- Ensure all services are running before making API calls.
- Check logs for troubleshooting:
  ```sh
  docker compose logs -f
  ```
- Update dependencies regularly using:
  ```sh
  npm update
  ```


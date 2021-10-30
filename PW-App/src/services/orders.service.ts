import http from "../http-common";
import { Order } from "../models/orders-model";

class OrderDataService {
    getAll() {
        return http.get("/order");
    }

    get(id: number) {
        return http.get(`/order/${id}`);
    }

    create(data: Order) {
        return http.post("/order", data);
    }

    delete(id: number) {
        return http.delete(`/order/${id}`);
    }
}
export default new OrderDataService();
import http from "../http-common";
import { Women } from "../models/women-model";

class WomenDataService {
  getAll() {
    return http.get("/women");
  }

  get(id: number) {
    return http.get(`/women/${id}`);
  }

  create(data: Women) {
    return http.post("/women", data);
  }

  update(id: number, data: Women) {
    return http.put(`/women/${id}`, data);
  }

  delete(id: number) {
    return http.delete(`/women/${id}`);
  }

//   deleteAll() {
//     return http.delete(`/tutorials`);
//   }

//   findByTitle(title) {
//     return http.get(`/tutorials?title=${title}`);
//   }
}

export default new WomenDataService();
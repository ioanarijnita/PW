import http from "../http-common";
import { Men } from "../models/men-model";

class MenDataService {
  getAll() {
    return http.get("/men");
  }

  get(id: number) {
    return http.get(`/men/${id}`);
  }

  create(data: Men) {
    return http.post("/men", data);
  }

//   update(id, data) {
//     return http.put(`/tutorials/${id}`, data);
//   }

//   delete(id) {
//     return http.delete(`/tutorials/${id}`);
//   }

//   deleteAll() {
//     return http.delete(`/tutorials`);
//   }

//   findByTitle(title) {
//     return http.get(`/tutorials?title=${title}`);
//   }
}

export default new MenDataService();
import http from "../http-common";
import { Kids } from "../models/kids-model";

class KidsDataService {
  getAll() {
    return http.get("/kids");
  }

  get(id: number) {
    return http.get(`/kids/${id}`);
  }

  create(data: Kids) {
    return http.post("/kids", data);
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

export default new KidsDataService();
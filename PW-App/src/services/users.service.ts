import http from "../http-common";
import { User } from "../models/user-model";

class StoreDataService {
  getAll() {
    return http.get("/users");
  }

  get(username: string) {
    return http.get(`/users/${username}`);
  }

  create(data: User) {
    return http.post("/users", data);
  }
  login(data: any) {
    return http.post("/users", data);
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

export default new StoreDataService();
import Api from "./api.service";

export default {
  getTasks: (params = {}) => {
    return Api.get("/api/tasks", { params });
  },
  createTask: (data) => {
    return Api.post("/api/tasks", data);
  },
  markAsComplete: (taskId) => {
    return Api.patch(`/api/tasks/${taskId}`);
  },
  deleteTask: (taskId) => {
    return Api.delete(`/api/tasks/${taskId}`);
  },
};

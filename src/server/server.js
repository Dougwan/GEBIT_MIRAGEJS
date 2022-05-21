import { createServer, Factory, Model } from "miragejs";

export default function () {
  createServer({
    models: {
      task: Model.extend({}),
    },

    factories: {
      task: Factory.extend({
        description(idx) {
          return `Atividade ${idx + 1}`;
        },
        completed() {
          return false;
        },
      }),
    },

    seeds(server) {
      server.createList("task", 5);
    },

    routes() {
      this.namespace = "api";
      this.urlPrefix = "http://api.miragemocking.com.br";

      this.get("/tasks", async (schema, request) => {
        const completed = request.queryParams.completed;

        return {
          tasks: await schema.tasks.where({
            completed: Boolean(parseInt(completed)),
          }).models,
        };
      });

      this.patch("/tasks/:id", async (schema, request) => {
        const model = schema.tasks.find(request.params.id);
        model.update({ completed: true });

        return {
          tasks: await schema.tasks.where({
            completed: false,
          }).models,
        };
      });

      this.delete("/tasks/:id", async (schema, request) => {
        const model = schema.tasks.find(request.params.id);
        model.destroy();

        return {
          tasks: await schema.tasks.where({
            completed: true,
          }).models,
        };
      });
    },
  });
}

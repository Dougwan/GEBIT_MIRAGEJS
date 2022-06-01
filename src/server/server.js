import { createServer, Factory, Model, Response } from "miragejs";

export default function (environment = "development") {
  createServer({
    environment,
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

      this.post("/tasks", async (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        if (attrs.description.length <= 3) {
          return response(422, {}, [
            "A descrição da atividade precisa ter mais que 3 caracteres",
          ]);
        } else {
          schema.tasks.create({ ...attrs });
        }

        return {
          tasks: await schema.tasks.where({
            completed: false,
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

      // this.passthrough("http://localhost:3000/api/tasks", ["get"]);
    },
  });
}

function response(statusCode, headers = {}, errors = []) {
  return new Response(statusCode, headers, { errors });
}

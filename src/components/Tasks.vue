<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="card">
      <div class="card-header">
        <div class="card-header-logo">
          <img src="@/assets/logo.png" />
        </div>
      </div>
      <div class="card-body">
        <div>
          <b-form-input
            @keydown="onKeyDown"
            v-model="task"
            :disabled="!canShowInput"
            placeholder="Qual a atividade?"
            prepend-html='<i class="fa fa-pencil"></i>'
          ></b-form-input>
        </div>
        <hr />

        <b-tabs no-fade card fill v-model="tabIndex" content-class="mt-3">
          <b-tab
            title="A FAZER"
            @click="getTasks({ completed: 0 })"
            active
            :title-link-class="linkClass(0)"
          >
            <div class="tasks">
              <b-spinner
                v-if="isLoading"
                variant="secondary"
                class="spinner"
              ></b-spinner>

              <div v-if="!isLoading && !tasks.length">
                Nenhum registro encontrado
              </div>

              <div v-if="!isLoading && tasks.length">
                <div v-for="(task, idx) in tasks" :key="idx" class="task-card">
                  {{ task.description }}

                  <b-icon
                    @click="markAsComplete(task.id)"
                    icon="check-circle-fill"
                    class="icon"
                  ></b-icon>
                </div>
              </div>
            </div>
          </b-tab>
          <b-tab
            title="CONCLUÍDOS"
            @click="getTasks({ completed: 1 })"
            :title-link-class="linkClass(1)"
          >
            <div class="tasks">
              <b-spinner
                v-if="isLoading"
                variant="secondary"
                class="spinner"
              ></b-spinner>

              <div v-if="!isLoading && !tasks.length">
                Nenhum registro encontrado
              </div>

              <div v-if="!isLoading && tasks.length">
                <div v-for="(task, idx) in tasks" :key="idx" class="task-card">
                  {{ task.description }}

                  <b-icon
                    @click="deleteTask(task.id)"
                    icon="trash-fill"
                    class="icon"
                    variant="danger"
                  ></b-icon>
                </div>
              </div>
            </div>
          </b-tab>
        </b-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import TasksService from "@/services/tasks.sevice";

export default {
  data: () => ({
    task: "",
    tasks: [],
    tabIndex: 0,
    isLoading: false,
  }),
  computed: {
    canShowInput() {
      return this.tabIndex != 1;
    },
  },
  methods: {
    linkClass(idx) {
      if (this.tabIndex === idx) {
        return ["text-dark"];
      } else {
        return ["bg-light", "text-dark"];
      }
    },
    onKeyDown(event) {
      if (event.keyCode === 13 && this.task.length) {
        this.createTask();
      }
    },
    createTask() {
      TasksService.createTask({ description: this.task, completed: false })
        .then(({ data }) => {
          const { tasks } = data;
          this.tasks = tasks;
          this.task = null;
        })
        .catch(({ data }) => {
          const { errors } = data;

          this.$bvToast.toast(errors[0], {
            solid: true,
            title: "Erro ao tentar salvar atividade",
            variant: "danger",
            toaster: "b-toaster-top-center",
          });
        });
    },
    markAsComplete(id) {
      TasksService.markAsComplete(id).then(({ data }) => {
        const { tasks } = data;
        this.tasks = tasks;
      });
    },
    deleteTask(id) {
      TasksService.deleteTask(id).then(({ data }) => {
        const { tasks } = data;
        this.tasks = tasks;
      });
    },
    getTasks(params = {}) {
      this.isLoading = true;

      TasksService.getTasks(params)
        .then(({ data }) => {
          const { tasks } = data;
          this.tasks = tasks;
        })
        .catch(() => {
          this.$bvToast.toast("Um erro inesperado aconteceu", {
            solid: true,
            title: "Erro ao buscar registro de atividades",
            variant: "danger",
            toaster: "b-toaster-top-center",
          });
        })
        .finally(() => (this.isLoading = false));
    },
  },
  mounted() {
    this.getTasks({ completed: 0 });
  },
};
</script>

<style scoped>
.card {
  width: 550px;
}

.card-header {
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 10px;
  background-color: #1a1c1d;
}

.card-header-logo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #fff;
  display: flex;

  justify-content: center;
  align-items: center;
}

.card-header-logo img {
  width: 90%;
  height: 90%;
  border-radius: 50%;
}

.tasks {
  height: 275px;
  overflow-y: auto;
  text-align: center;
  scroll-padding-left: 15px;
}

.tasks .spinner {
  margin-top: 15px;
}
.tasks::-webkit-scrollbar-track {
  background-color: #f5f5f5;
}
.tasks::-webkit-scrollbar {
  width: 0vw;
  background-color: #f5f5f5;
}

.tasks .task-card {
  width: 100%;
  height: 50px;
  padding: 3%;
  background-color: #f8f9fa;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 10px;
}

.tasks .task-card .icon {
  font-size: 1.3rem;
  color: grey;
}

.tasks .task-card .icon:hover {
  color: #08b071;
  cursor: pointer;
}
</style>

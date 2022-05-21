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
          <b-tab title="A FAZER" active :title-link-class="linkClass(0)">
            <div class="tasks">
              <div
                v-for="(task, idx) in uncompletedTasks"
                :key="idx"
                class="task-card"
              >
                {{ task.description }}

                <b-icon
                  @click="markAsComplete(task.id)"
                  icon="check-circle-fill"
                  class="icon"
                ></b-icon>
              </div>
            </div>
          </b-tab>
          <b-tab title="CONCLUÍDOS" :title-link-class="linkClass(1)">
            <div class="tasks">
              <div
                v-for="(task, idx) in completedTasks"
                :key="idx"
                class="task-card"
              >
                {{ task.description }}

                <b-icon
                  @click="deleteTask(task.id)"
                  icon="trash-fill"
                  class="icon"
                  variant="danger"
                ></b-icon>
              </div>
            </div>
          </b-tab>
        </b-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    task: null,
    tasks: [{ id: 1, description: "Atividade 1", completed: false }],
    tabIndex: 0,
  }),
  computed: {
    canShowInput() {
      return this.tabIndex != 1;
    },
    completedTasks() {
      return this.tasks.filter((task) => task.completed);
    },
    uncompletedTasks() {
      return this.tasks.filter((task) => !task.completed);
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
      if (event.keyCode === 13 && this.task) {
        this.createTask();
      }
    },
    createTask() {
      const lastIdx = this.tasks[this.tasks.length - 1].id;

      this.tasks.push({
        id: lastIdx + 1,
        description: this.task,
        completed: false,
      });
      this.task = null;
    },
    markAsComplete(id) {
      const idx = this.tasks.findIndex((task) => task.id == id);
      this.tasks[idx].completed = true;
    },
    deleteTask(id) {
      const idx = this.tasks.findIndex((task) => task.id == id);
      this.tasks.splice(idx, 1);
    },
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

  scroll-padding-left: 15px;
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

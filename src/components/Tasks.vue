<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="card">
      <div class="card-header">
        <div class="card-header-logo">
          <img src="@/assets/logo.png" />
        </div>
        <h5 class="card-title">ITEMS A FAZER</h5>
      </div>
      <div class="card-body">
        <div>
          <b-form-input
            @keydown="onKeyDown"
            v-model="task"
            placeholder="Qual a atividade?"
            prepend-html='<i class="fa fa-pencil"></i>'
          ></b-form-input>
        </div>
        <hr />
        <div class="tasks">
          <div class="card">
            <div v-for="(task, idx) in tasks" :key="idx" class="card-body">
              <div
                class="task"
                style="display: flex; justify-content: space-between"
              >
                {{ task.description }}

                <p class="h5">
                  <b-icon icon="trash-fill" variant="danger"></b-icon>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    task: "",
    tasks: [{ id: 1, description: "Atividade 1", done: false }],
  }),
  methods: {
    onKeyDown(event) {
      if (event.keyCode === 13) {
        console.log(this.task);
      }
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
  align-items: flex-end;

  padding: 10px;
  background-color: #3094d2;
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

.card-title {
  font-size: 1.8rem;
  color: #fff;
  letter-spacing: 1px;

  margin-left: 10px;
}

.tasks .card {
  width: 100%;
}
</style>

<template>
  <q-page class="bg-grey-3 column">
    <div class="row q-pa-sm bg-primary">
      <q-input @keyup.enter="addNewTask" filled v-model="newTaskName" placeholder="New Task" dense bg-color="white" class="col" square>
        <template v-slot:append>
          <q-btn round dense flat icon="add" @click="addNewTask" />
        </template>
      </q-input>
    </div>
    <q-list 
    separator
    bordered
    class="bg-white">

      <q-item 
      v-for=" (task, index) in tasks"
      :key="task.timestamp"
      @click="switchDone(index)"
      :class="{ 'done bg-blue-1' : task.done }"
      clickable
      v-ripple>
        <q-item-section avatar>
          <q-checkbox v-model="task.done" class="no-pointer-events" color="primary" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{task.title}}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-btn
           @click.stop = "editTask(index)"
           flat round color="primary" icon="edit_note" />
        </q-item-section>
        <q-item-section side>
          <q-btn
           @click.stop = "deleteTask(index)"
           flat round color="primary" icon="delete" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { api } from 'boot/axios'

export default {
  data() {
    return {
      newTaskName: '',
      tasks: []
    }
  },
  async mounted() {
    const response = await api.get('/todo')
    this.tasks = response.data.todos
  },
  methods: {
    deleteTask(index){
      this.$q.dialog({
        message: 'タスクを削除しますか？',
        cancel: true,
        persistent: true
      }).onOk(async () => {
        const taskId = this.tasks[index].id
        await api.delete(`/todo/${taskId}`)

        this.tasks.splice(index,1)
        this.$q.notify('削除しました')
      })
    },
    editTask(index){
      this.$q.dialog({
        message: '新しいタスク名を入力',
        cancel: true,
        presistent: true,
        prompt: {
          model: '',
          type: 'text'
        }
      }).onOk(async data => {
        const taskId = this.tasks[index].id
        await api.put(`/todo/${taskId}`, { title: data })
        this.tasks[index].title = data
      })
    },
    async switchDone(index){
      const newDone = !this.tasks[index].done
      const taskId = this.tasks[index].id

      await api.put(`/todo/${taskId}`, { done: newDone })

      this.tasks[index].done = newDone
    },
    async addNewTask(){
      let data = {
        title: this.newTaskName,
        done: false
      }

      const response = await api.post('/todo', data)
      data.id = response.data.id

      this.tasks.unshift(data)
      this.newTaskName = ''

      console.log(this.tasks)
    }
  }
}
</script>

<style lang="scss">
  .done{
    .q-item__label {
      text-decoration:line-through;
      color: #bbb;
    }
  }
</style>
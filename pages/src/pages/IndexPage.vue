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
      @click="task.done = !task.done"
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
export default {
  data() {
    return {
      newTaskName: '',
      tasks: []
    }
  },
  methods: {
    deleteTask(index){
      this.$q.dialog({
        message: 'タスクを削除しますか？',
        cancel: true,
        persistent: true
      }).onOk(() => {
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
      }).onOk(data => {
        this.tasks[index].title = data
      })
    },
    addNewTask(){
      const timestamp = Math.floor(Date.now() / 1000)

      this.tasks.unshift({
        id: timestamp,
        title: this.newTaskName,
        done: false
      })
      this.newTaskName = ''
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
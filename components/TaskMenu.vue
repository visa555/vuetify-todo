<template>
  <div>
    <v-menu bottom left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="handleClick(index)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <DialogDelete
      v-if="dialog.delete"
      :task="task"
      @close="dialog.delete = false"
    />
    <DialogEdit v-if="dialog.edit" :task="task" @close="dialog.edit = false" />
    <DialogDueDate
      v-if="dialog.dueDate"
      :task="task"
      @close="dialog.dueDate = false"
    />
  </div>
</template>

<script>
export default {
  props: ['task'],
  data: () => ({
    dialog: {
      edit: false,
      delete: false,
      dueDate: false,
    },
    items: [
      {
        title: 'Edit',
        icon: 'mdi-pencil',
        click() {
          this.dialog.edit = true
        },
      },
      {
        title: 'Due Date',
        icon: 'mdi-calendar',
        click() {
          this.dialog.dueDate = true
        },
      },
      {
        title: 'Delete',
        icon: 'mdi-delete',
        click() {
          this.dialog.delete = true
        },
      },
    ],
  }),
  methods: {
    handleClick(index) {
      this.items[index].click.call(this)
      console.log(index)
    },
  },
}
</script>

<style lang="scss" scoped></style>

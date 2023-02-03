<template>
  <div>
    <v-list-item
      :class="{ 'blue lighten-5': task.done }"
      @click="$store.dispatch('doneTask', task.id)"
    >
      <template #default>
        <v-list-item-action>
          <v-checkbox :input-value="task.done" color="primary"></v-checkbox>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title
            :class="{ 'text-decoration-line-through': task.done }"
            >{{ task.title }}</v-list-item-title
          >
        </v-list-item-content>
        <v-list-item-action v-if="task.dueDate">
          <v-list-item-action-text>
            <v-icon small>mdi-calendar</v-icon
            >{{ $dayjs(task.dueDate).format('DD MMM YY') }}
          </v-list-item-action-text>
        </v-list-item-action>
        <v-list-item-action>
          <TaskMenu :task="task" />
        </v-list-item-action>
      </template>
    </v-list-item>
  </div>
</template>

<script>
export default {
  name: 'TaskItemComponent',
  props: ['task'],
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped></style>

<template>
  <div>
    <v-dialog :value="true" persistent max-width="290">
      <v-card>
        <v-card-title class="headline"> Edit Task </v-card-title>
        <v-card-text>
          Edit the title of this task:
          <v-text-field v-model="taskTitle" @keyup.enter="saveTask" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="darken-1" text @click="$emit('close')"> CANCEL </v-btn>
          <v-btn
            color="red darken-1"
            text
            @click="saveTask"
            :disabled="taskTitleInvalid"
          >
            SAVE
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ['task'],
  data() {
    return {
      taskTitle: null,
    }
  },
  computed: {
    taskTitleInvalid() {
      return !this.taskTitle || this.taskTitle === this.task.title
    },
  },
  mounted() {
    this.taskTitle = this.task.title
  },
  methods: {
    saveTask() {
      if (!this.taskTitleInvalid) {
        const payload = {
          id: this.task.id,
          title: this.taskTitle,
        }
        this.$store.dispatch('updateTaskTitle', payload)
        this.$emit('close')
      }
    },
  },
}
</script>

<style lang="sass" scoped></style>

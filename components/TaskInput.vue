<template>
  <div>
    <v-text-field
      v-model="newTaskTitle"
      class="pa-3"
      hide-details
      outlined
      label="Add Task"
      clearable
      @keyup.enter="addTask"
    >
      <template v-slot:append>
        <v-icon @click="addTask" color="primary" :disabled="newTaskInvalid">
          mdi-plus
        </v-icon>
      </template>
    </v-text-field>
  </div>
</template>

<script>
export default {
  name: 'TaskInputComponent',
  data() {
    return {
      newTaskTitle: '',
    }
  },
  computed: {
    newTaskInvalid() {
      return !this.newTaskTitle
    },
  },
  methods: {
    addTask() {
      if (!this.newTaskInvalid) {
        this.$store.dispatch('addTask', this.newTaskTitle)
        this.newTaskTitle = ''
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>

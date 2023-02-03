<template>
  <div>
    <TaskInput />
    <ListTask v-if="tasks && tasks.length" :tasks="tasks" />
    <NoTask v-else />
  </div>
</template>

<script>
export default {
  layout: 'basic',

  computed: {
    tasks() {
      return this.$store.getters.taskFiltered
    },
  },
  mounted() {
    this.$store.dispatch('getTasks')
  },
  methods: {},
}
</script>

<style lang="scss" scoped></style>

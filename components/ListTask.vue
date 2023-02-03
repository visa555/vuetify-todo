<template>
  <v-list subheader flat>
    <div v-for="task in tasks" :key="task.id">
      <Task :task="task" />
      <v-divider></v-divider>
    </div>
  </v-list>
</template>

<script>
export default {
  name: 'ListTaskComponent',
  props: ['tasks'],
}
</script>

<style lang="scss" scoped></style>

<template>
  <div>
    <v-dialog :value="true" persistent max-width="290">
      <v-card>
        <v-card-title class="headline"> Delete Task? </v-card-title>
        <v-card-text>Are you sure you wanna delete this task?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="$emit('close')"> NO </v-btn>
          <v-btn
            color="red darken-1"
            text
            @click="$store.dispatch('deleteTask', task.id)"
          >
            YES
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ['task'],
}
</script>

<style lang="sass" scoped></style>

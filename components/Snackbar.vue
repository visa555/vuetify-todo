<template>
  <div>
    <v-snackbar v-model="show">
      {{ $store.state.snackbar.text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="$store.commit('hideSnackbar')"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'SnackbarComponent',
  computed: {
    show: {
      get() {
        return this.$store.state.snackbar.show
      },
      set(value) {
        if (!value) {
          this.$store.commit('hideSnackbar')
        }
      },
    },
  },
}
</script>

<style lang="scss" scoped></style>

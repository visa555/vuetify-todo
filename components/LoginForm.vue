<template>
  <div>
    <div>
      <v-text-field v-model="username" label="Regular"></v-text-field>
    </div>
    <div>
      <v-text-field
        v-model="password"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        label="Normal with hint text"
        hint="At least 8 characters"
        counter
        @click:append="showPassword = !showPassword"
      ></v-text-field>
    </div>
    <p v-if="showResult && loginResult">Status {{ loginResult }}</p>
    <div>
      <v-btn @click="handleLogin">Login</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginFormComponent',
  props: {
    showResult: {
      type: Boolean,
      default: false,
    },
    // password: {
    //   type: String,
    //   required: true,
    //   default: '',
    // },
  },
  data() {
    return {
      username: '',
      password: '',
      showPassword: false,
      loginSuccess: false,
      loginResult: '',
    }
  },
  methods: {
    handleLogin() {
      if (
        this.username === 'ammr.visa@gmail.com' &&
        this.password === '12345'
      ) {
        this.loginSuccess = true
        this.loginResult = 'Login Complete'
      } else {
        this.loginResult = 'Login Fail'
      }
      this.$emit('login-submit', this.loginSuccess)
    },
  },
}
</script>

<style lang="scss" scoped></style>

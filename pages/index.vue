<template>
  <div>
    <v-btn @click="counter++">Counter</v-btn>
    <div>{{ counter }}</div>
    <a href="http://localhost:3000/member">Click</a>
    <LoginForm :show-result="true" @login-submit="handleSubmit" />
    <Upload />
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      counter: 0,
    }
  },
  watch: {
    counter(val) {
      setTimeout(() => {
        this.counter = 0
      }, 2000)
    },
  },
  methods: {
    handleSubmit(loginStatus) {
      if (loginStatus) {
        console.log('Login Success')
      } else {
        console.log('Login Fail')
      }
    },
  },
}
</script>

<template>
  <div class="login-form bg-gradient-primary">
    <h2>Hello, ${Request.username!}</h2>
    <button @click="logout">Logout</button>
    <p>{{msg}}</p>
  </div>
</template>
<script>

export default {
  name: 'Member',
  data () {
    return {
      msg: "",
    }
  },
  methods: {
    logout() {
      let url = "http://localhost:8080/api/user/logout";
      fetch(url, {
        method: "GET",
        credentials: 'include',
      })
          .then(response => response.json())
          .then(data => {
            console.log('Request succeeded with JSON response', data);
          })
    },

    loadData() {
      let url = "http://localhost:8080/api/user/random";
      fetch(url, {
        method: "GET",
        credentials: 'include',
      })
          .then(response => response.json())
          .then(data => {
            console.log('Request succeeded with JSON response', data);
          })
    }

  },
  created() {
    this.loadData();
  }
}
</script>
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
    loadData() {
      let url = "http://localhost:8080/api/admin/random";
      fetch(url, {
        method: "GET",
        credentials: 'include',
      })
          .then(response => response.json())
          .then(data => {
            document.cookie = data.name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            console.log('Request succeeded with JSON response', data);
          })
    }
  },
  created() {
    this.loadData();
  }
}
</script>
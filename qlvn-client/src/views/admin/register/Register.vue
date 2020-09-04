<template >
<div class = "container" >
    
    <div class="card o-hidden border-0 shadow-lg my-5 mx-5 col-lg-8 ">
      <div class="card-body p-5">
        <!-- Nested Row within Card Body -->
        <div class="row">
          <!-- <div>
            <img src="../../../assets/ds_logomark.png" alt="logo"  class="col-lg-5 d-none d-lg-block " >
          </div> -->
          <!-- <div class = "col-lg-2"></div> -->
          <div class="col-lg-12">
            <div class="p-0">
              <div class="text-center mb-5">
                <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
              </div>
              <form class="user" v-on:submit.prevent = "createUser">
                
                 <div class="form-group">
                   <ValidationProvider rules="required" v-slot="{ errors }" name = "'Fullname'">
                    <input type="text" class="form-control form-control-user" id="name" placeholder="Full name" v-model="name">
                      <ul>
                          <li v-for="error in errors" v-bind:key="error">* {{ error }}</li>
                      </ul>
                  </ValidationProvider>
                  <!-- {{this.name}} -->
                </div>
                 <div class="form-group">
                   <ValidationProvider rules="required|email" v-slot="{ errors }" name = "'Email Address'">
                      <input type="text" class="form-control form-control-user" id="email" placeholder="Email Address" v-model="email">
                      <ul>
                        <li v-for="error in errors" v-bind:key="error">* {{ error }}</li>
                      </ul>
                  </ValidationProvider>
                  <!-- {{this.email}} -->
                </div>
                <div class="form-group">
                   <ValidationProvider rules="required|numeric|max:10" v-slot="{ errors }" name = "'Phone'">
                    <input type="phone" class="form-control form-control-user" id="phone" placeholder="Phone" v-model="phone">
                      <ul>
                          <li v-for="error in errors" v-bind:key="error">* {{ error }}</li>
                      </ul>
                  </ValidationProvider>
                  <!-- <input type="phone" class="form-control form-control-user" id="phone" placeholder="Phone" v-model="phone"> -->
                  <!-- {{this.phone}} -->
                </div>
                <div class="form-group row">
                  <div class="col-sm-6 mb-3 mb-sm-0">
                    <ValidationProvider rules="required" v-slot="{ errors }" name = "'Password'">
                      <input type="password" class="form-control form-control-user" id="password" placeholder="Password" v-model="password">
                        <ul>
                            <li v-for="error in errors" v-bind:key="error">* {{ error }}</li>
                        </ul>
                    </ValidationProvider>
                    
                    <!-- {{this.password}} -->
                  </div>
                  <div class="col-sm-6">
                    <ValidationProvider rules="required" v-slot="{ errors }" name = "'Retype Password'">
                      <input type="password" class="form-control form-control-user" id="retype_password" placeholder="Repeat Password" v-model="retype_password">
                        <ul>
                            <li v-for="error in errors" v-bind:key="error">* {{ error }}</li>
                        </ul>
                    </ValidationProvider>
                    
                  </div>
                </div>
                <input type = "submit" class="btn btn-primary btn-user btn-block" value="Register"> 
                
                <hr>
                <a href="index.html" class="btn btn-google btn-user btn-block">
                  <i class="fab fa-google fa-fw"></i> Register with Google
                </a>
                <a href="index.html" class="btn btn-facebook btn-user btn-block">
                  <i class="fab fa-facebook-f fa-fw"></i> Register with Facebook
                </a>
              </form>
              <hr>
              <div class="text-center">
                <a class="small" href="forgot-password.html">Forgot Password?</a>
              </div>
              <div class="text-center">
                <a class="small" href="login.html">Already have an account? Login!</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
</template>
<script>
import axios from 'axios';
export default {
    data(){
        return {
            name: '',
            email:'',
            password:'',
            phone:'',
            retype_password:'',
            display_order:1,
            errors:[],
        }
    },
    methods:{
        createUser: function(){
            if(!this.errors){
              alert(this.errors);
              return;
            }
            axios
            .post("http://localhost:8088/register",{
                username: this.name,
                email: this.email,
                password: this.password,
                phone: this.phone,
                display_order:this.display_order
            }).then(
                response => {
                    alert(response.data)
                }
            ).catch(e=> {
              console.log(e)
            });
        }
    }
}
</script>

<style scoped>

ul{
  list-style-type: none;
  font-size:0.8em;
  padding-left: 0;
  margin-left: 0;
}
li{
  display: block;
  text-align: left;
  margin-top: 1em;
  margin-bottom: 1em;
  margin-left: 0.4em;
  margin-right: 0;
  color:red;
  
}
</style>
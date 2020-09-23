<template >
  <div id="wrapper">
    
    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">
      <!-- Main Content -->
      <div id="content" class="bg-gradient-primary">
       <nav-ad></nav-ad>
        <!-- Begin Page Content -->
        <div class="container-fluid">
          <div class>
            <div class="container">
              <div class="card o-hidden border-0 shadow-lg p-4">
                <div class="row text-center p-2">
                  <img src="../../../assets/dslogo.png" alt="logo" width="30%" />
                </div>
                <div class="card-body p-5">
                  <!-- Nested Row within Card Body -->

                  <div class="row">
                    <div class="col-lg-12">
                      <div class="p-0">
                        <div class="text-center mb-5">
                          <h1
                            class="text-gray-900 mb-4"
                            style="font-family:Comic Sans MS, cursive, sans-serif"
                          >Create an Account</h1>
                        </div>

                        <ValidationObserver v-slot="{ handleSubmit }" ref="form">
                          <form class="user" v-on:submit.prevent="handleSubmit(createUser)" >
                            <div class="form-group">
                              <ValidationProvider rules="required" v-slot="{ errors }" name="'Fullname'">
                                <input type="text" class="form-control form-control-user" id="name" placeholder="Full name" v-model="name" />
                                <ul>
                                  <li v-for="error in errors" v-bind:key="error">* {{ error }}</li>
                                </ul>
                              </ValidationProvider>
                            </div>
                            <div class="form-group">
                              <ValidationProvider rules="required|email" v-slot="{ errors }" name="'Email Address'">
                                <input type="text" class="form-control form-control-user" id="email" placeholder="Email Address" v-model="email" />
                                <ul>
                                  <li v-for="error in errors" v-bind:key="error">* {{ error }}</li>
                                </ul>
                              </ValidationProvider>
                            </div>
                            <div class="form-group">
                              <ValidationProvider rules="required|numeric|max:10" v-slot="{ errors }" name="'Phone'">
                                <input type="phone" class="form-control form-control-user" id="phone" placeholder="Phone" v-model="phone"/>
                                <ul>
                                  <li v-for="error in errors" v-bind:key="error">* {{ error }}</li>
                                </ul>
                              </ValidationProvider>
                            </div>
                            <div class="form-group row">
                              <div class="col-sm-6 mb-3 mb-sm-0">
                                <ValidationProvider rules="required" v-slot="{ errors }" name="'Password'" vid="password">
                                  <input type="password" class="form-control form-control-user" id="password" placeholder="Password" v-model="password"/>
                                  <ul>
                                    <li v-for="error in errors" v-bind:key="error">* {{ error }}</li>
                                  </ul>
                                </ValidationProvider>

                                <!-- {{this.password}} -->
                              </div>
                              <div class="col-sm-6">
                                <ValidationProvider rules="required|confirmed:password" v-slot="{ errors }" name="'Retype Password'"
                                >
                                  <input type="password" class="form-control form-control-user" id="retype_password" placeholder="Repeat Password" v-model="retype_password"/>
                                  <ul>
                                    <li v-for="error in errors" v-bind:key="error">* {{ error }}</li>
                                  </ul>
                                </ValidationProvider>
                              </div>
                            </div>
                            <input type="submit" class="btn btn-primary btn-user btn-block" value="Register"/>

                            <hr />
                            <a href="index.html" class="btn btn-google btn-user btn-block">
                              <i class="fab fa-google fa-fw"></i> Register with Google
                            </a>
                            <a href="index.html" class="btn btn-facebook btn-user btn-block">
                              <i class="fab fa-facebook-f fa-fw"></i> Register with Facebook
                            </a>
                          </form>
                        </ValidationObserver>
                        <hr />
                        <div class="text-center">
                          <a class="small" href="forgot-password.html">Forgot Password?</a>
                        </div>
                        <router-link to="/login" tag="a"  class="small">Already have an account? Login!</router-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- /.container-fluid -->
      </div>
      <!-- End of Main Content -->
      <footer-ad></footer-ad>
    </div>
    <!-- End of Content Wrapper -->
  </div>
</template>
<script>
import axios from "axios";
import footerAdmin from '@/components/common/Footer'
import navAdmin from '@/components/common/Nav'
import Api from '../../../api'
import router from '../../../router'
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      phone: "",
      retype_password: "",
      display_order: 1,
      form_valid: false,
    };
  },
  components: {
        'footer-ad': footerAdmin,
        'nav-ad': navAdmin
    },
  methods: {
    createUser: function () {
      axios
        .post("http://localhost:8088/api/register", {
          name: this.name,
          email: this.email,
          password: this.password,
          phone: this.phone,
          display_order: this.display_order,
        })
        .then((response) => {
          if(response.data.status==200){
            alert("Registration sucessfully!!");
             Api.apiParamPost("http://localhost:8088/api/login",{
                    "username": this.email,
                    "password": this.password,  
                }).then(res=>{
                    if(res.data.status !=200){
                    
                    alert(res.data.message);
                
                }else{
                    console.log(res.data.message )
                    this.$cookies.set('user',{
                        'id':res.data.object.id,
                        'token':res.data.object.token
                        },res.data.object.tokenEnd)
                    
                    router.push({ name: 'hrmHome'});
                    }
                })
          }else{
            alert("The email existed!!!. Please try again !!");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  beforeCreate() {
    if(this.$cookies.get('user')){
              router.push({ name: 'hrmHome'});
            }
        }

};
</script>

<style scoped>
ul {
  list-style-type: none;
  font-size: 0.8em;
  padding-left: 0;
  margin-left: 0;
}
li {
  display: block;
  text-align: left;
  margin-top: 1em;
  margin-bottom: 1em;
  margin-left: 0.4em;
  margin-right: 0;
  color: red;
}
.container{
  padding:0rem 12rem 12rem 12rem ;
}
</style>
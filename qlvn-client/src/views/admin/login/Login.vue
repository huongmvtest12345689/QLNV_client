<template>
  <div class="login-form bg-gradient-primary">
    <div class="container">
      <!-- Outer Row -->
      <div class="row justify-content-center">
        <div class="col-xl-10 col-lg-12 col-md-9">
          <div class="card o-hidden border-0 shadow-lg my-5">
            <div class="card-body p-0">
              <!-- Nested Row within Card Body -->
              <div class="row align-items-center">
                <div class="col-lg-6 d-none d-lg-block">
                  <img src="../../../assets/ds_logomark.png" alt="logo" width="70%" height="70%">
                </div>
                <div class="col-lg-6">
                  <div class="p-5">
                    <div class="text-center">
                      <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                      <p>{{this.email}}</p>
                    </div>
                    <ValidationObserver v-slot="{ handleSubmit }" ref="form">
                    <form class="user" v-on:submit.prevent="handleSubmit(login)">
                      <div class="form-group">
                         <ValidationProvider rules="required|email" v-slot="{  errors,failedRules   }" >
                            <input :value="email" @input="setEmail(($event.target.value))" type="email" class="form-control form-control-user" aria-describedby="emailHelp" placeholder="Enter Email Address...">
                            <ul>
                                <li v-for="error in errors"  v-bind:key="error">
                                    <div v-if="failedRules.required">* Please enter your Email Address.</div>
                                    <div v-if="failedRules.email">* Invalid email.</div>
    
                                </li>
                            </ul>
                        </ValidationProvider>
                        
                      </div>
                      <div class="form-group">
                        <ValidationProvider rules="required|max:8|min:3" v-slot="{  errors,failedRules  }" name="'current_pass'" >
                           <input :value="password" @input="setPassword(($event.target.value))" type="password" class="form-control form-control-user" placeholder="Password">
                            <ul>
                                <li v-for="error in errors"  v-bind:key="error">
                                    <div v-if="failedRules.required">* Please enter your Password..</div>
                                    <div v-if="failedRules.max">* Invalid password: The password may not be greater than 8 characters</div>
                                    <div v-if="failedRules.min">* Invalid password: The password must be at least 3 characters</div>
                                </li>
                            </ul>
                        </ValidationProvider>
                        
                      </div>
                      <div class="form-group">
                        <div class="custom-control custom-checkbox small">
                          <input :value="checked" @input="rememberMe" type="checkbox" class="custom-control-input" id="customCheck">
                          <label class="custom-control-label" for="customCheck">Remember Me</label>
                        </div>
                      </div>
                      <input type="submit" class="btn btn-primary btn-user btn-block" value ="Login">
                      
                    </form>
                    </ValidationObserver>
                    <hr>
                    <div class="text-center">
                      <a class="small" href="#" data-toggle="modal" data-target="#forgotPasswordModal">Forgot Password?</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="forgotPasswordModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content forgot-pass-modal">
          <div class="text-center">
            <h1 class="h4 text-gray-900 mb-2">Forgot Your Password?</h1>
            <p class="mb-4">We get it, stuff happens. Just enter your email address below and we'll send you a link to reset your password!</p>
          </div>
          <form class="user">
            <div class="form-group">
              <input v-model="emailReset" type="email" class="form-control form-control-user" aria-describedby="emailHelp" placeholder="Enter Email Address...">
            </div>
            <a href="login.html" class="btn btn-primary btn-user btn-block">
              Reset Password
            </a>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState,mapGetters} from 'vuex'
  export default {
    name: 'Login',
    methods:{
      login: function(){
        alert(this.email);
        alert(this.password);
        alert(this.checked)
      },
      ...mapActions('login',["setEmail",'setPassword','rememberMe'])
    },  
     computed: {
       ...mapState('login',["email","password","checked","emailReset"]),
       ...mapGetters('login',['email','password','checked','emailReset'])
     }
  }
</script>

<style>
  .login-form{
    width: 100%;
    height: 100%;
  }
  .forgot-pass-modal{
    padding: 3rem !important;
  }
</style>
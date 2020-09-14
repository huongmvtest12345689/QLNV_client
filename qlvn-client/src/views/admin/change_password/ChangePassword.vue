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
                      <h1 class="h4 text-gray-900 mb-4">Change Password</h1>
                    </div>
                    <ValidationObserver v-slot="{ handleSubmit }" ref="form">
                    <form class="user" v-on:submit.prevent="handleSubmit(changePassword)">
                      <div class="form-group">
                        <ValidationProvider rules="required|max:8|min:3" v-slot="{  errors,failedRules  }" name="'current_pass'" >
                            <input v-model="curr_password" type="password" class="form-control form-control-user" placeholder="Enter Current Password ...">
                            <ul>
                                <li v-for="error in errors"  v-bind:key="error">
                                    <div v-if="failedRules.required">* Please enter your Current Password..</div>
                                    <div v-if="failedRules.max">* Invalid password.</div>
                                    <div v-if="failedRules.max">* Invalid password: The password may not be greater than 8 characters</div>
                                    <div v-if="failedRules.min">* Invalid password: The password must be at least 3 characters</div>
                                </li>
                            </ul>
                        </ValidationProvider>
                      </div>
                      <div class="form-group">
                        <ValidationProvider rules="required|max:8|min:3" v-slot="{  errors,failedRules   }" name="'new_pass'" vid = "new_pass" >
                            <input v-model ="new_password" type="password" class="form-control form-control-user" placeholder="Enter New Password ...">
                            <ul>
                                <li v-for="error in errors"  v-bind:key="error">
                                    <div v-if="failedRules.required">* Please enter your New Password..</div>
                                    <div v-if="failedRules.max">* Invalid password: The password may not be greater than 8 characters</div>
                                    <div v-if="failedRules.min">* Invalid password: The password must be at least 3 characters</div>
                                </li>
                            </ul>
                        </ValidationProvider>
                      </div>
                      <div class="form-group">
                        <ValidationProvider rules="required|confirmed:new_pass" v-slot="{ errors,failedRules  }" name="'new_pass'" >
                            <input v-model="confirm_password" type="password" class="form-control form-control-user" placeholder="Confirm New Password ...">
                            <ul>
                                <li v-for="error in errors"  v-bind:key="error">
                                
                                    <div v-if="failedRules.required">* Please enter your Confirm Password.</div>
                                    <div v-if="failedRules.confirmed">* Your password and confirm password do not match.</div>
                                </li>
                            </ul>
                        </ValidationProvider>
                      </div>
                       
                      <input type="submit" class="btn btn-primary btn-user btn-block" value="Update Password"/>
                    </form>
                    </ValidationObserver>
                    <hr />
                    <div class="text-center">
                        <a class="small" href="forgot-password.html">Create an account</a>
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
      </div>
    </div>
   
  </div>
</template>

<script>
import Api from '../../../api'
  export default {
    name: 'ChangePassword',
    data () {
      return {
        new_password : "",
        curr_password: "",
        confirm_password: "",
      }
    },
    methods:{
        reset: function(){
            this.$refs.form.reset()
            this.new_password = ""
            this.curr_password= ""
            this.confirm_password= ""
            this.errors.clear()  
        },
        changePassword: function(){
        // add api here 
        Api.apiParamPost("http://localhost:8088/update",{
          "id":1,// change while userid of session is existed.
          "password": this.password,
          "newPassword": this.new_password
        }).then(res=>{
          alert(res.data.message);
        });
            
        }
    }
  }
</script>

<style>
  .login-form{
    width: 100%;
    height: 100%;
  }
 
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
</style>
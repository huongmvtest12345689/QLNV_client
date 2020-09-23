<template>
<div class="bg-gradient-primary">
  <div class="container">

    <!-- Outer Row -->
    <div class="row justify-content-center">

      <div class="col-lg-6">

        <div class="card o-hidden border-0 shadow-lg my-5">
          <div class="card-body">
                <div class="p-5">
                  <div class="text-center p-2">
                    <h1 class="h4 text-gray-900 mb-2">Change Password</h1>
                  </div>
                  <ValidationObserver v-slot="{ handleSubmit }" ref="form">
                    <form class="user" v-on:submit.prevent="handleSubmit(changePassword)">

                      <div class="form-group">
                        <ValidationProvider rules="required|max:8|min:3" v-slot="{  errors,failedRules   }" name="'new_pass'" vid = "new_pass" >
                            <input :value="newPassword" @input="setNewPassword(($event.target.value))" type="password" class="form-control form-control-user" placeholder="Enter New Password ...">
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
                            <input :value="confirmPassword" @input="setConfirmPassword(($event.target.value))" type="password" class="form-control form-control-user" placeholder="Confirm New Password ...">
                            <ul>
                                <li v-for="error in errors"  v-bind:key="error">
                                
                                    <div v-if="failedRules.required">* Please enter your Confirm Password.</div>
                                    <div v-if="failedRules.confirmed">* Your password and confirm password do not match.</div>
                                </li>
                            </ul>
                        </ValidationProvider>
                      </div>
                      <div class="form-group">
                        <ValidationProvider rules="required" v-slot="{  errors,failedRules   }"  >
                            <input :value="code" @input="setCode(($event.target.value))" type="text" class="form-control form-control-user" placeholder="Enter Code ...">
                            <ul>
                                <li v-for="error in errors"  v-bind:key="error">
                                    <div v-if="failedRules.required">* Please enter your Code..</div>
                                </li>
                            </ul>
                        </ValidationProvider>
                      </div>
                    
                    <button type="submit" class="btn btn-primary btn-user btn-block">
                      Change Password
                    </button>
                  </form>
                  </ValidationObserver>
                  <hr>
                  <div class="text-center">
                    <a class="small" href="register.html">Create an Account!</a>
                  </div>
                  <div class="text-center">
                    <a class="small" href="login.html">Already have an account? Login!</a>
                  </div>
                </div>
              <!-- </div> -->
            <!-- </div> -->
          </div>
        </div>

      </div>

    </div>

  </div>
</div>
</template>
<script>
import Api from '../../../api'
import router from '../../../router'
import { mapGetters, mapActions,mapState } from 'vuex';
export default {
    name: "ResetPassword",
    methods:{
      changePassword: function(){
        console.log(this.code)
        console.log(this.newPassword)
        console.log(this.$cookies.get('reset_pass_id'))
        Api.apiParamPost("http://localhost:8088/resetPassword/reset",{
          'id':this.$cookies.get('reset_pass_id'),
          'code': this.code,
          'newPassword': this.newPassword
        }).then(
          res=>{
            if(res.data.status!=200){
              alert(res.data.message)
            }else{
               alert(res.data.message)
              router.push({name:"Login"})
            }
          }
        )
        
      },
      ...mapActions('reset_password',['setCode','setNewPassword','setConfirmPassword']),
    },
    computed: {
       ...mapState('reset_password',["code","newPassword","confirmPassword"]),
       ...mapGetters('reset_password',['code','newPassword','confirmPassword'])
     },
}
</script>
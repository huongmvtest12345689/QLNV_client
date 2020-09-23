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
                    </div>
                    <form class="user" @submit.prevent="loginSubmit">
                      <div v-if="Submitted && msgErrorLogin!=''" class="error">
                        <span>{{ msgErrorLogin }}</span>
                      </div>
                      <div class="form-group">
                        <input v-model="login.email" :class="{ 'is-invalid': Submitted && $v.login.email.$error }" class="form-control form-control-user" aria-describedby="emailHelp" placeholder="Enter Email Address...">
                        <div v-if="Submitted && $v.login.email.$error" class="invalid-feedback">
                          <span v-if="!$v.login.email.required">Email không được trống</span>
                          <span v-if="!$v.login.email.email">Email không đúng định dạng</span>
                        </div>
                      </div>
                      <div class="form-group">
                        <input v-model="login.password" type="password" :class="{ 'is-invalid': Submitted && $v.login.password.$error }" class="form-control form-control-user" placeholder="Password">
                        <div v-if="Submitted && $v.login.password.$error" class="invalid-feedback">
                          <span v-if="!$v.login.password.required">Password không được trống</span>
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="custom-control custom-checkbox small">
                          <input v-model="checked" type="checkbox" class="custom-control-input" id="customCheck">
                          <label class="custom-control-label" for="customCheck">Remember Me</label>
                        </div>
                      </div>
                      <button class="btn btn-primary btn-user btn-block">
                        Login
                      </button>
                    </form>
                    <hr>
                    <div class="text-center">
                      <a class="small" href="javascript:;" data-toggle="modal" data-target="#forgotPasswordModal">Forgot Password?</a>
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
          <div v-if="resetSubmitted && msgErrorForgot!=''" class="error">
            <span>{{ msgErrorForgot }}</span>
          </div>
          <form class="user" @submit.prevent>
            <div class="form-group">
              <input v-model="forgot.emailReset" :class="{ 'is-invalid': resetSubmitted && $v.forgot.emailReset.$error }" class="form-control form-control-user" aria-describedby="emailHelp" placeholder="Enter Email Address...">
              <div v-if="resetSubmitted && $v.forgot.emailReset.$error" class="invalid-feedback">
                <span v-if="!$v.forgot.emailReset.required">Email không được trống</span>
                <span v-if="!$v.forgot.emailReset.email">Email không đúng định dạng</span>
              </div>
            </div>
            <button class="btn btn-primary btn-user btn-block" @click="forgotPassword">
              Reset Password
            </button>
          </form>
          <Toast position="top-right" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from "@/api";
  import {email, required} from "vuelidate/lib/validators";
  export default {
    name: 'Login',
    data () {
      return {
        login: {
          email: "",
          password: "",
        },
        forgot: {
          emailReset: "",
        },
        checked: false,
        msgErrorLogin: '',
        msgErrorForgot: '',
        resetSubmitted: false,
        Submitted: false,
      }
    },
    validations: {
      login: {
        email: { required, email },
        password: { required },
      },
      forgot: {
        emailReset: { required, email },
      }
    },
    methods: {
      forgotPassword() {
        this.resetSubmitted = true;
        this.msgErrorForgot = "";
        this.$v.forgot.$touch()
        if (this.$v.forgot.$invalid) {
          return;
        }
        let url = "http://localhost:8080/api/user/forgot-password?email="+this.forgot.emailReset;
        api.apiNotParamPost(url).then(res => {
          if (res.data.status !== 200){
            this.msgErrorForgot = res.data.message;
          } else {
            this.$toast.add({severity:'success', summary: 'Thông báo', detail: res.data.message, life: 3000});
            location.reload();
          }
        })
      },

      loginSubmit() {
        this.Submitted = true;
        let url = "http://localhost:8080/api/user/login";
        let dataForm = {
          email: this.login.email,
          password : this.login.password,
        }
        api.apiParamPost(url, dataForm).then(res => {
          if (res.status == 200) {
            // let url_api = "http://localhost:8080/api/user/random";
            // api.apiNotParamGet(url_api).then(data => {
            //   console.log(data);
            // })
            console.log(res.data.object);
            this.$router.push({ name: 'Member' })
            // authenticationService.currUser(res.data.object);
          }
        })
      }
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
  .error {
    font-size: 80%;
    color: #dc3545;
    width: 100%;
    padding-bottom: 5px;
  }
</style>
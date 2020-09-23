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
                      <h1 class="h4 text-gray-900 mb-4">Forgot Password</h1>
                    </div>
                    <form class="user" @submit.prevent="handleSubmit">
                      <div class="form-group">
                        <div v-if="submitted && msgError != ''">
                          <span class="error">{{ msgError }}</span>
                        </div>
                        <input v-model="user.email" type="email" class="form-control form-control-user" :class="{ 'is-invalid': submitted && $v.user.email.$error }" aria-describedby="emailHelp" placeholder="Email">
                        <div v-if="submitted && $v.user.email.$error" class="invalid-feedback">
                          <span v-if="!$v.user.email.required">Email không được trống</span>
                          <span v-if="!$v.user.email.email">Email không đúng định dạng</span>
                       </div>
                      </div>
                      <div class="form-group">
                        <input v-model="user.newPassword" class="form-control form-control-user" :class="{ 'is-invalid': submitted && $v.user.newPassword.$error }" aria-describedby="emailHelp" placeholder="New password">
                        <div v-if="submitted && !$v.user.newPassword.required" class="invalid-feedback">Password không được trống</div>
                      </div>
                      <div class="form-group">
                        <input v-model="user.confirmPassword" type="password" class="form-control form-control-user" :class="{ 'is-invalid': submitted && $v.user.confirmPassword.$error }" placeholder="Repeat password">
                        <div v-if="submitted && $v.user.confirmPassword.$error" class="invalid-feedback">
                          <span v-if="!$v.user.confirmPassword.required">Mật khẩu comfirm không được để trống</span>
                          <span v-if="!$v.user.confirmPassword.sameAsPassword">Mật khẩu comfirm không khớp</span>
                        </div>
                      </div>
                      <div class="form-group">
                        <input v-model="user.code" class="form-control form-control-user" :class="{ 'is-invalid': submitted && $v.user.code.$error }" placeholder="Code forgot password">
                        <div v-if="submitted && !$v.user.code.required" class="invalid-feedback">Code không được trống</div>
                      </div>
                      <button class="btn btn-primary btn-user btn-block">
                        Reset Password
                      </button>
                    </form>
                    <hr>
                    <div class="text-center">
                      <a class="small" href="#" data-toggle="modal" data-target="#forgotPasswordModal">Login</a><br>
                      <a class="small" href="#" data-toggle="modal" data-target="#forgotPasswordModal">Register</a>
                    </div>
                    <Toast position="top-right" />
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
import api from '@/api/index'
import {email, required, sameAs} from "vuelidate/lib/validators";
export default {
  name: 'ForgotPassword',
  data () {
    return {
      /*reg: "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{4,8}$",*/
      user: {
        email: "",
        newPassword: "",
        confirmPassword: "",
        code: "",
      },
      submitted: false,
      msgError: '',
    }
  },

  validations: {
    user: {
      email: { required, email },
      newPassword: { required },
      confirmPassword: { required, sameAsPassword: sameAs('newPassword') },
      code: { required },
    }
  },
  methods: {
    handleSubmit() {
      this.submitted = true;

      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
/*      if (!this.reg.test(this.passwordCurrent) || !this.reg.test(this.newPass)) {
        this.msgErrorPassword = "Mật khẩu không đúng định dạng.";
        this.passwordRepeat = "";
        this.password = "";
      }*/
      // let apiUser = 'user'+this.$router.currentRoute.fullPath;
      let dataForm = {
        email: this.user.email,
        newPass : this.user.newPassword,
        code: this.user.code,
      }
      // api.apiParamPut(apiUser , dataForm).then(res => {
      //   console.log(res)
      // })

      var url = "http://localhost:8080/api/user/reset-password";

      api.apiParamPut(url, dataForm).then(res => {
        if (res.data.status != 200){
          this.msgError = res.data.message;
        } else {
          console.log(res);
          this.$toast.add({severity:'info', summary: 'Thông báo', detail: res.data.message, life: 3000});
          this.$router.push({ name: 'hrmHome' })
        }
      })
    },
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
}
</style>
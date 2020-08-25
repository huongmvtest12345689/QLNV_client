<template>
    <div>
        <Toast/>
        <div class="login-body">
            <div class="card login-panel ui-fluid">
                <div class="login-panel-content">
                    <div class="p-grid">
                        <div class="p-col-12 p-sm-6 p-md-6 logo-container">
                            <img src="/assets/layout/images/logo.png" alt="roma"/>
                            <span class="guest-sign-in">Welcome to the hell</span>
                        </div>
                        <div class="p-col-12 username-container">
                            <label>Tên đăng nhập</label>
                            <div class="login-input">
                                <InputText type="text" v-model="username" autocomplete="off"/>
                            </div>
                        </div>
                        <div class="p-col-12 password-container">
                            <label>Mật khẩu</label>
                            <div class="login-input">
                                <InputText type="password" v-model="password" autocomplete="off" v-on:keyup.enter="doLogin"/>
                            </div>
                        </div>

                        <div class="p-col-12 p-sm-6 p-md-6">
                            <Button label="Đăng nhập" icon="pi pi-check" @click="doLogin"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import 'primevue/resources/themes/nova-light/theme.css'
    export default {
        data() {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            doLogin () {
                this.$toast.add({severity:'error', summary: 'Lỗi', detail:'Method is not implemented', life: 3000})
            }

        }
    }
</script>

<style scoped>
    @import '../App.scss';
</style>

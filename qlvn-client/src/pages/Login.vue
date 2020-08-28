<template>
    <div class="login-body">
        <Toast/>
        <div class="login-panel ui-fluid">
            <div class="login-panel-header">
                <img src="assets/layout/images/logo.png" alt="sapphire"/>
            </div>
            <div class="login-panel-content">
                <div class="p-grid">
                    <div class="p-col-12">
                        <h1>DSVN</h1>
                        <h2>Welcome, please use the form to sign-in</h2>
                    </div>
                    <div class="p-col-12">
						<span class="p-float-label">
							<InputText id="username" type="text" style="width: 100%" v-model="username"/>
							<label for="username">Username</label>
						</span>
                    </div>
                    <div class="p-col-12">
						<span class="p-float-label">
							<InputText id="password" type="password" style="width: 100%" v-model="password" v-on:keyup.enter="doLogin"/>
							<label for="password">Password</label>
						</span>
                    </div>
                    <div class="p-col-6">
                        <button class="p-link" @click="display = true">Forget Password?</button>
                    </div>
                    <div class="p-col-6" style="text-align: right">
                        <Button label="NEXT" @click="doLogin" style="width:100%"/>
                    </div>
                </div>
            </div>
        </div>
        <Dialog header="Forgot Password" :visible.sync="display" :style="{width: '30vw'}" :position="'bottom'">
            <div class="p-fluid">
                <div class="p-field p-grid">
                    <label for="email" class="p-col-fixed" style="width:80px; display: flex; align-items: center">Email</label>
                    <div class="p-col">
                        <InputText id="email" v-model="email" type="text" />
                    </div>
                </div>
            </div>
            <template #footer>
                <Button label="Confirm" icon="pi pi-check" @click="doSendPassword"/>
            </template>
        </Dialog>
    </div>
</template>

<script>
    import './moveGradient'
    import {mapActions} from 'vuex'
    export default {
        data() {
            return {
                username: '',
                password: '',
                display: false,
                email: '',

            }
        },
        methods: {
            ...mapActions('account', ['login', 'getUser']),
            doLogin() {
                let {username, password} = this;
                if (!username)
                    this.$toast.add({
                        severity: 'error',
                        summary: 'Error Message',
                        detail: 'User name is empty!',
                        life: 3000
                    });
                if (!password)
                    this.$toast.add({
                        severity: 'error',
                        summary: 'Error Message',
                        detail: 'Password is empty!',
                        life: 3000
                    });
                if (username && password)
                    this.login({username, password})
                        .then(() => {
                            this.getUser();
                            this.$router.push("/");
                        })
                        .catch(res => {
                            this.$toast.add({severity: 'error', summary: 'Error Message', detail: res, life: 3000})
                        })
            },
            doSendPassword(){

            }
        }

    }
</script>

<style scoped>
</style>

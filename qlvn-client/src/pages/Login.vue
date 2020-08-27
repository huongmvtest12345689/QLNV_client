<template>
    <div class="radial-gradient" style="width: 100%">
        <Toast/>
        <div class="app">
            <div class="bg"></div>

            <form>
                <header>
                    <img src="/assets/layout/images/logo.png">
                </header>

                <div class="inputs">
                    <input type="text" placeholder="username or email" v-model="username">
                    <input type="password" placeholder="password" v-model="password" v-on:keyup.enter="doLogin">

                    <p class="light"><a href="#" @click="display = true">Forgot password?</a></p>
                </div>

            </form>

            <footer>
                <Button label="Login" @click="doLogin"/>
            </footer>
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
                <Button label="Confirm" icon="pi pi-check" autofocus @click="doSendPassword"/>
            </template>
        </Dialog>
    </div>

</template>

<script>
    import $ from 'jquery'
    import 'primevue/resources/themes/nova-light/theme.css'
    import {mapActions} from 'vuex'
    export default {
        data() {
            return {
                username: '',
                password: '',
                display: false,
                email: ''
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

    $(document).mousemove(function(event) {
        let windowWidth = $(window).width();
        let windowHeight = $(window).height();

        let mouseXpercentage = Math.round(event.pageX / windowWidth * 100);
        let mouseYpercentage = Math.round(event.pageY / windowHeight * 100);

        $('.radial-gradient').css('background', 'radial-gradient(at ' + mouseXpercentage + '% ' + mouseYpercentage + '%, #3498db, #9b59b6)');
    });
</script>

<style scoped>
    .radial-gradient {
        position:fixed;
        top:0px;
        left:0px;
        height:100%;
        width:100%;
        background: #9b59b6;
        background:
                radial-gradient(
                        at center, #3498db, #9b59b6
                );
    }

    .radial-gradient img {
        max-width: 100%;
    }

    .radial-gradient .app {
        background-color: #fff;
        width: 330px;
        height: 570px;
        margin: 7em auto;
        border-radius: 5px;
        padding: 1em;
        position: relative;
        overflow: hidden;
        box-shadow: 0 6px 31px -2px rgba(0, 0, 0, .3);
    }

    .radial-gradient a {
        text-decoration: none;
        color: #257aa6;
    }

    .radial-gradient p {
        font-size: 13px;
        color: #333;
        line-height: 2;
    }
    .radial-gradient .light {
        text-align: right;
        color: #fff;
    }
    .radial-gradient .light a {
        color: #fff;
    }

    .radial-gradient .bg {
        width: 400px;
        height: 550px;
        background: #257aa6;
        position: absolute;
        top: -5em;
        left: 0;
        right: 0;
        margin: auto;
        clip-path: ellipse(69% 46% at 48% 46%);
    }

    .radial-gradient form {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        text-align: center;
        padding: 2em;
    }

    .radial-gradient header {
        width: 220px;
        height: 220px;
        margin: 1em auto;
    }

    .radial-gradient form input {
        width: 100%;
        padding: 13px 15px;
        margin: 0.7em auto;
        border-radius: 100px;
        border: none;
        background: rgba(255,255,255,0.3);
        font-family: 'Poppins', sans-serif;
        outline: none;
        color: #fff;
    }
    .radial-gradient input::placeholder {
        color: #fff;
        font-size: 13px;
    }

    .radial-gradient .inputs {
        margin-top: -4em;
    }

    .radial-gradient footer {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 2em;
        text-align: center;
    }

    .radial-gradient .button {
        width: 100%;
        padding: 13px 15px;
        border-radius: 100px;
        border: none;
        background: #257aa6;
        font-family: 'Poppins', sans-serif;
        outline: none;
        color: #fff;
    }

    @media screen and (max-width: 640px) {
        .app {
            width: 100%;
            height: 100vh;
            border-radius: 0;
        }

        .bg {
            top: -7em;
            width: 450px;
            height: 95vh;
        }
        header {
            width: 90%;
            height: 250px;
        }
        .inputs {
            margin: 0;
        }
        input, .button {
            padding: 18px 15px;
        }
    }
    .radial-gradient a:hover {
        color: #FFF !important;
    }

</style>

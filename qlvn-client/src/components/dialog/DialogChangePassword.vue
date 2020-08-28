<template>
    <Dialog header="Change Password" :visible.sync="display" v-on:update:visible="doClose">
        <div class="p-fluid">
            <div class="p-field">
                <label for="oldPassword">Old password</label>
                <InputText id="oldPassword" type="password" v-model="oldPassword"/>
            </div>
            <div class="p-field">
                <label for="newPassword">New Password</label>
                <InputText id="newPassword" type="password" v-model="newPassword"/>
            </div>
            <div class="p-field">
                <label for="confirmPassword">Confirm Password</label>
                <InputText id="confirmPassword" type="password" v-model="confirmPassword"/>
            </div>
        </div>
        <template #footer>
            <Button label="Confirm" icon="pi pi-check" @click="doChangePassword"/>
        </template>
    </Dialog>
</template>
<script>
    import {mapActions} from 'vuex'

    export default {
        props: {
            display: Boolean
        },
        data() {
            return {
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
            }
        },
        methods: {
            ...mapActions('account', ['changePassword']),
            doChangePassword() {
                let data = {
                    newPassword: this.newPassword,
                    oldPassword: this.oldPassword
                }
                this.changePassword(data).then(() => {
                    this.$toast.add({severity: 'success', summary: 'Change password', detail: 'DONE!', life: 3000})
                    this.doClose(false)
                }).catch(err => {
                    this.$toast.add({severity: 'error', summary: 'Error Message', detail: err, life: 3000})
                })

            },
            doClose(value) {
                if (!value)
                    this.$emit('close')
            }
        }
    }
</script>

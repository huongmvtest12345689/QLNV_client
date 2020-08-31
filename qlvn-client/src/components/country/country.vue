<template>
<div class="app-country">
    <select v-model="$i18n.locale" placeholder="Select" @change="handleChangeLocal">
        <option
            v-for="item in country"
            :key="item.id"
            :label="item.countryName"
            :value="item.countryCode">
        </option>
    </select>
</div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
    data () {
        return {
            country: []
        }
    },
    computed: {
        ...mapState(['countryChange'])
    },
    methods: {
        ...mapMutations([
        'CHANGE_COUNTRY'
        ]),
        handleChangeLocal () {
            this.CHANGE_COUNTRY(this.$i18n.locale)
        }
    },
    created () {
        this.country = [
            { 'id': 1, 'countryName': 'Việt Nam', 'countryCode': 'vi' },
            { 'id': 2, 'countryName': 'English', 'countryCode': 'en' }
        ]
        console.log(this.country)
    }
}
</script>

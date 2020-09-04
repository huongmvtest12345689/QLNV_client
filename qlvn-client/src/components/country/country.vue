<template>
<div class="app-country">
    <div class="btn-group" style="margin:10px;">    <!-- CURRENCY, BOOTSTRAP DROPDOWN -->
        <!--<a class="btn btn-primary" href="javascript:void(0);">Currency</a>-->                    
        <a class="btn btn-primary dropdown-toggle" data-toggle="dropdown" href="#"> {{this.countryChange}} <span class="caret"></span></a>
        <ul class="dropdown-menu">
            <li v-for="item in country" :key="item.id" :value="item.countryCode"><a @click="handleChangeLocal(item.countryCode)">{{item.countryName}}</a></li>
        </ul>
    </div>
    <!-- <select v-model="$i18n.locale" placeholder="Select" @change="handleChangeLocal">
        <option
            v-for="item in country"
            :key="item.id"
            :label="item.countryName"
            :value="item.countryCode">
        </option>
    </select> -->
</div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
    data () {
        return {
            country: [],
            choice: this.countryChange
        }
    },
    computed: {
        ...mapState(['countryChange'])
    },
    methods: {
        ...mapMutations([
        'CHANGE_COUNTRY'
        ]),
        handleChangeLocal (val) {
            this.$i18n.locale = val
            this.CHANGE_COUNTRY(val)
        }
    },
    created () {
        this.country = [
            { 'id': 1, 'countryName': 'Việt Nam', 'countryCode': 'vi' },
            { 'id': 2, 'countryName': 'English', 'countryCode': 'en' }
        ]
    }
}
</script>

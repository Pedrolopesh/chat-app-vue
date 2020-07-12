<template>
    <div id="app_p">
        <router-view/>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    data:() => ({

    }),

    created(){
        this.changeUserData()
    },
    
    methods: {
        ...mapActions({
            changeUserData: 'changeUserData'
        })
    },

}
</script>
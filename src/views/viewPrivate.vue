<template>
    <div id="app_p">

        <!-- <vs-alert class="global-alert-message" dark :progress="progress" v-show="active"> -->
        <vs-alert class="global-alert-message ac" danger :progress="progress" v-show="active">
            <template #title>
            Nova mensagem
            </template>
           Nova mensagem recebida
        </vs-alert>
        <router-view/>

        <!-- <vs-button @click="active=true">
            Alerta ae
        </vs-button> -->
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    data:() => ({
        progress: 0,
        active: false,
        time: 6000,
    }),

    created(){
        this.changeUserData()
    },

    computed: {

        ...mapGetters({
            
            newMessage: 'newMessage',

        }),

    },
    
    methods: {
        ...mapActions({
            changeUserData: 'changeUserData'
        })
    },
    watch: {
        active(val) {
          if(val) {
            var interval = setInterval(() => {
              this.progress++
            }, this.time / 100);

            setTimeout(() => {
            //   this.active = false
              clearInterval(interval)
              this.progress = 0
            }, this.time);
          }
        }
        
    }

}
</script>
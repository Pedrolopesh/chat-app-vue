<template>
    <div>
        <componentHeader/>
        <h3>Preferências de usuário</h3>
            <div class="container-list-chats mt-7 ac">
                <!-- <b-btn variant="outline-primary" class="chat-item display-b ac mt-2">
                    <div class="display-f mt-2">
                        <BIconPerson class="mr-2"/>
                        <span class="mr-a display-b">Seu Perfil</span>
                    </div>
                </b-btn> -->

                    <vs-button
                        gradient
                        color="rgb(59,222,200)"
                        class="mw-w-100 mt-3"
                        size="large"
                        to="/Profile"
                        :active="active == 1"
                        @click="active = 1"
                    >
                        Seu Perfil
                        <b-avatar class="ml-2" :src='userData.imageProfile'></b-avatar>
                    </vs-button>


                    <vs-button
                        gradient
                        color="rgb(59,222,200)"
                        class="mw-w-100 mt-3"
                        size="xl"
                        to="/RequestList"
                        :active="active == 1"
                        @click="active = 1"
                    >
                        <BIconReceipt class="mr-2"/>
                        Pedidos
                    </vs-button>
      
                    <vs-button
                        gradient
                        color="rgb(59,222,200)"
                        class="mw-w-100 mt-3"
                        size="xl"
                        to="/RequestList"
                        :active="active == 1"
                        @click="active = 1"
                    >
                        <BIconChatDotsFill class="mr-2"/>
                        Conversas
                    </vs-button>
                    
                    <vs-button
                        gradient
                        color="rgb(59,222,200)"
                        class="mw-w-100 mt-3"
                        size="xl"
                        :active="active == 1"
                        @click="active = 1"
                    >
                        ?
                        Perguntas frequentes
                    </vs-button>
                
            </div>
    </div>
</template>
<script>
import svgs from '../../assets/svgs/svgSet';
import componentHeader from '@/components/cpmHeader';
import { BIconPerson, BIconReceipt, BIconChatDotsFill } from 'bootstrap-vue'
import { mapGetters, mapActions } from 'vuex';


export default {
    data:() => ({
            active:'',
            svgs:svgs,
            items:[
                {prefName:'Seu Perfil', svgstitle:'whatsapp_icon'},
                {prefName:'Suas Ordens', svgstitle:''},
                {prefName:'Sair', svgstitle:''},
        ]
    }),

        computed: {

        ...mapGetters({
            userData: 'userData',
        })

    },

    components:{
        componentHeader
    }
}
</script>
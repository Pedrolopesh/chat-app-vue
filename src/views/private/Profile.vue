<template>
    <div>
        <componentHeader/>
        <h1>Profile</h1>

        <div class="p10">

            <div class="ac card-style-1 p15 mw-w-25">
                 <b-avatar size="7rem" :src='userData.imageProfile'></b-avatar>
                 <h2 class="mt-2 display-b">{{ userData.name }}</h2>
                 <h4 class="mt-2 display-b">{{ userData.email }}</h4>
                       <vs-button
                            gradient
                            style="min-width: 60px"
                            warn
                            class="ml-a display-b"
                            size="large"
                            animation-type="scale"
                        >
                            <BIconPencil class="icon-size-20"/>
                            <template #animate >
                                Editar
                            </template>
                        </vs-button>
            </div>

            <div class="mt-5">
                <h5>Raio para atendimento do seu pedido</h5>
                <div class="mw-w-25 ac">
                    <Map/>
                </div>
            </div>
        </div>


    </div>
</template>
<script>
import componentHeader from  '../../components/cpmHeader'
import Map from  '../../components/cpmSetMapCircle'
import { mapGetters, mapActions } from 'vuex';
import { BIconPencil } from 'bootstrap-vue'


export default {
    components:{
        componentHeader,
        BIconPencil,
        Map
    },

    computed: {

        ...mapGetters({
            userData: 'userData',
        }),

    },
}
</script>
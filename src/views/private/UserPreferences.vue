<template>
    <div>
        <componentHeader/>
        <h3>Preferências de usuário</h3>
            <div class="container-list-chats mt-7 ac">
                <b-btn variant="outline-primary" class="chat-item display-b ac mt-2">
                    <div class="display-f mt-2">
                        <BIconPerson class="mr-2"/>
                        <span class="mr-a display-b">Seu Perfil</span>
                    </div>
                </b-btn>

                <b-btn to="/Profile" variant="outline-primary" class="chat-item display-b ac mt-2">
                    <div class="display-f mt-2">
                        <BIconReceipt class="mr-2"/>
                        <span class="mr-a display-b">Pedidos</span>
                    </div>
                </b-btn>

                <b-btn variant="outline-primary" class="chat-item display-b ac mt-2">
                    <div class="display-f mt-2">
                        <!-- <BIconReceipt class="mr-2"/> -->
                        <span class="mr-2 ml-1"> ? </span>
                        <span class="mr-a display-b">Perguntas frequentes</span>
                    </div>
                </b-btn>
                
            </div>
    </div>
</template>
<script>
import svgs from '../../assets/svgs/svgSet';
import componentHeader from '@/components/cpmHeader';
import { BIconPerson, BIconReceipt } from 'bootstrap-vue'


export default {
    data:() => ({
            svgs:svgs,
            items:[
                {prefName:'Seu Perfil', svgstitle:'whatsapp_icon'},
                {prefName:'Suas Ordens', svgstitle:''},
                {prefName:'Sair', svgstitle:''},
        ]
    }),

    components:{
        componentHeader
    }
}
</script>
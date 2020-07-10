<template>
    <div>
        <componentHeader/>
        <h3>Chats</h3>

            {{ chatSteper }}
            <div v-if="chatSteper == 1">

            <div class="container-list-chats ac" v-for="(item, i) in items" :key='i'>
                <b-btn @click="selectUser(item)" variant="outline-primary" class="chat-item display-b ac mt-2">
                    <div class="display-b mt-2">
                        <span class="mr-2">{{ item.userName }} </span>
                        <b-avatar :src='item.userPicture'></b-avatar>
                    </div>
                </b-btn>
            </div>

            </div>

            <div v-else>
                <ChatComponent/>
            </div>

<div>
        <Map/>
</div>


    </div>
</template>
<script>
import ChatComponent from '../../components/cpmLiveChat';
import componentHeader from '@/components/cpmHeader';
import Map from '@/components/cpmMap'

import {
  mapGetters, mapActions
} from 'vuex';


export default {
    data:() => ({
        step:1,
        items:[
            {userName:'Pedro Lopes', userPicture:'https://placekitten.com/300/300'},
            {userName:'Fernanda', userPicture:'https://picsum.photos/500/500/?image=54'},
        ]
    }),
    
    computed: {

        ...mapGetters({
            chatSteper: 'chatSteper',
        }),

    },

    components:{
        componentHeader,
        ChatComponent,
        Map
    },

    methods:{
        ...mapActions({
            changeChatSteper: 'changeChatSteper'
        }),

        selectUser(param){
            console.log(param)
            console.log(this.chatSteper)
            this.changeChatSteper(2)
        }
    }
}
</script>
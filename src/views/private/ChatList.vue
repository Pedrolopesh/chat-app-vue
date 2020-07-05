<template>
    <div>
        <h1>CONVERSAS</h1>

            {{ step }}
            <div v-if="step == 1">

            <div class="display-b" v-for="(item, i) in items" :key='i'>
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

    </div>
</template>
<script>
import ChatComponent from '../../components/cpmLiveChat';

export default {
    data:() => ({
        step:2,
        items:[
            {userName:'Pedro Lopes', userPicture:'https://placekitten.com/300/300'},
            {userName:'Fernanda', userPicture:'https://picsum.photos/500/500/?image=54'},
        ]
    }),

    components:{
        ChatComponent
    },

    methods:{
        selectUser(param){
            console.log(param)
            this.step = 2
        }
    }
}
</script>
import { axios } from '../../main'

export default {

    state: {
        userData:'',
        listRequest:'',
        listRequestByStatus:'',
        userChats:'',
        requestById:'',
        chatById:'',
        freeRequests:'',
    },

    getters: {
        userData: state => state.userData,
        listRequest: state => state.listRequest,
        listRequestByStatus: state => state.listRequestByStatus,
        userChats: state => state.userChats,
        requestById: state => state.requestById,
        chatById: state => state.chatById,
        freeRequests: state => state.freeRequests,
    },

    mutations: {
        setUserData(state, newSate){
            state.userData = newSate
        },
        setListRequest(state, newSate){
            state.listRequest = newSate
        },
        setListRequestByStatus(state, newSate){
            state.listRequestByStatus = newSate
        },
        setUserChats(state, newSate){
            state.userChats = newSate
        },
        setRequestById(state, newSate){
            state.requestById = newSate
        },
        setChatById(state, newSate){
            state.chatById = newSate
        },
        setFreeStatus(state, newSate){
            state.freeRequests = newSate
        },
    },

    actions: {
        async changeUserData(context){
            
            let id = localStorage.getItem('id')
            await axios.get(process.env.VUE_APP_PROD_URL + `/user/${id}`).then(response => {

                context.commit('setUserData', response.data)
                console.log("rodou de novo")
            
            })
        },

        async changeChatById(context, newData){
            
            let chat_id = newData
            await axios.get(process.env.VUE_APP_PROD_URL + `/chat/messages/${chat_id}`).then(response => {

                // context.commit('setChatById', response.data)

                return response.data

            })
        },

        async changeRequestById(context, newData){
            
            let request_id = newData
            await axios.get(process.env.VUE_APP_PROD_URL + `/request/${request_id}`).then(response => {

                context.commit('setRequestById', response.data)

            })
        },

        changeFreeRequests(context){
            axios.get(process.env.VUE_APP_PROD_URL + '/free/requests').then(response => {
              context.commit('setFreeStatus', response.data)
            })
        },

        changeListRequest(context){
            axios.get(process.env.VUE_APP_PROD_URL + '/list/request').then(response => {
              // console.log(response)
              context.commit('setListRequestByStatus', response.data)
            })
        },

        changeListRequestByStatus(context, newData){

            let status = newData
            axios.get(process.env.VUE_APP_PROD_URL + `/list/status/${status}`).then(response => {
                console.log(response.data)
                context.commit('setListRequestByStatus', response.data)
            })

        },

        changeUserChats(context, newData){

            let user_id = newData

            axios.get(process.env.VUE_APP_PROD_URL + `/user/chats/${user_id}`).then(response => {
                context.commit('setUserChats', response.data)
              })
        }
        
    }
}
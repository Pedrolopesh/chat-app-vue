import { axios } from '../../main'

export default {

    state: {
        userData:'',
        listRequest:'',
        listRequestByStatus:'',
        listOpenChats:'',
    },

    getters: {
        userData: state => state.userData,
        listRequest: state => state.listRequest,
        listRequestByStatus: state => state.listRequestByStatus,
        listOpenChats: state => state.listOpenChats,
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
        setOpenChats(state, newSate){
            state.listOpenChats = newSate
        },
    },

    actions: {
        async changeUserData(context){
            
            let id = localStorage.getItem('id')
            await axios.get(process.env.VUE_APP_PROD_URL + `/user/${id}`).then(response => {

                context.commit('setUserData', response.data)
            
            })
        },

        changeListRequest(context){
            axios.get(process.env.VUE_APP_PROD_URL + '/list/request').then(response => {
              // console.log(response)
              context.commit('setListRequest', response.data)
            })
        },

        changeListRequestByStatus(context, newData){

            let status = newData
            axios.get(process.env.VUE_APP_PROD_URL + `/list/status/${status}`).then(response => {
                console.log(response.data)
                context.commit('setListRequestByStatus', response.data)
            })

        },

        changeListOpenChats(context, newData){

            let type = newData.type
            let user_id = newData.user_id

            axios.get(process.env.VUE_APP_PROD_URL + `/active/chats?type=${type}&id=${user_id}`).then(response => {
                // console.log(response)
                context.commit('setOpenChats', response.data)
              })
        }
        
    }
}
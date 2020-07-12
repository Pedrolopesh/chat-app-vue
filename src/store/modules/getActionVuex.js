import { axios } from '../../main'

export default {

    state: {
        userData:''
    },

    getters: {
        userData: state => state.userData,
    },

    mutations: {
        setUserData(state, newSate){
            state.userData = newSate
        },
    },

    actions: {
        async changeUserData(context){
            
            let id = localStorage.getItem('id')
            await axios.get(process.env.VUE_APP_PROD_URL + `/user/${id}`).then(response => {

                context.commit('setUserData', response.data)
            
            })
            

        }
        
    }
}
import { axios } from '../../main'
// import sweetAlert from 'sweetalert2';

export default {

    state: {
    },

    getters: {
    },

    mutations: {
    },

    actions: {
        async answerRequest(context, newData){
      
            await axios.post(process.env.VUE_APP_PROD_URL + '/answer/request', newData).then(response => {
              console.log(response)
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
}
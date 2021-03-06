import { axios } from '../../main'
import sweetAlert from 'sweetalert2';

export default {

    state: {
    },

    getters: {
    },

    mutations: {
    },

    actions: {
        async createNewRequestApp(context, newData){
      
            await axios.post(process.env.VUE_APP_PROD_URL + '/create/request', newData).then(response => {
              console.log(response)

            })
            .catch(err => {
                console.log(err)
                sweetAlert.fire({
                    icon: 'error',
                    title: 'ops! algo deu errado.',
                    showConfirmButton: true
                })
            })
        }
    }
}
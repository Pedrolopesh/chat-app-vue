import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import postActionsVuex from './modules/postActionsVuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userRequestData:'',
    chatSteper:1,
    listRequest:'',
    requestSelectedId:'',
    coordinateSelectedRequest:'',
    createModalState: false,
  },
  getters:{
    userRequestData: state => state.userRequestData,
    chatSteper: state => state.chatSteper,
    listRequest: state => state.listRequest,
    requestSelectedId: state => state.requestSelectedId,
    createModalState: state => state.createModalState,
    coordinateSelectedRequest: state => state.coordinateSelectedRequest,
  },
  mutations: {
    setCoordinateSelectedRequest(state, newSate){
      state.coordinateSelectedRequest = newSate
    },
    setStateCreateRequestModal(state, newSate){
      state.createModalState = newSate
    },
    setuserRequestData(state, newSate){
      state.userRequestData = newSate
    },
    setchatSteper(state, newSate){
      state.chatSteper = newSate
    },
    setListRequest(state, newSate){
      state.listRequest = newSate
    },
    setRequestSelectedId(state, newSate){
      state.requestSelectedId = newSate
    }
  },
  actions: {
    changeUserRequestData(context, newData){
      context.commit('setuserRequestData', newData)
    },
    changeChatSteper(context, newData){
      context.commit('setchatSteper', newData)
    },
    changeListRequest(context){
      axios.get(process.env.VUE_APP_PROD_URL + '/list/request').then(response => {
        // console.log(response)
        context.commit('setListRequest', response.data)
      })
    },
    async changeRequestById(context, newData){
      let id = newData
      await axios.get(process.env.VUE_APP_PROD_URL + `/request/${id}`).then(response => {
        console.log(response)
        context.commit('setRequestSelectedId', response.data)
      })
    },
  },
  modules: {
    postActionsVuex
  }
})

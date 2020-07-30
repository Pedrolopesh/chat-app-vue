import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import postActionsVuex from './modules/postActionsVuex'
import getActionVuex from './modules/getActionVuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedChatData:'',

    userRequestData:'',
    requestSelectedId:'',
    coordinateSelectedRequest:'',
    createModalState: false,
    detailRequestModalState: false,
    chatData:''
  },
  getters:{
    selectedChatData: state => state.selectedChatData,
    userRequestData: state => state.userRequestData,
    requestSelectedId: state => state.requestSelectedId,
    createModalState: state => state.createModalState,
    coordinateSelectedRequest: state => state.coordinateSelectedRequest,
    detailRequestModalState: state => state.detailRequestModalState,
    chatData: state => state.chatData,
  },
  mutations: {
    setSelectedChatData(state, newSate){
      state.selectedChatData = newSate
    },
    setChatData(state, newSate){
      state.chatData = newSate
    },
    setStateDetailRequestModal(state, newSate){
      state.detailRequestModalState = newSate
    },
    setCoordinateSelectedRequest(state, newSate){
      state.coordinateSelectedRequest = newSate
    },
    setStateCreateRequestModal(state, newSate){
      state.createModalState = newSate
    },
    setuserRequestData(state, newSate){
      state.userRequestData = newSate
    },

    setRequestSelectedId(state, newSate){
      state.requestSelectedId = newSate
    }
  },
  actions: {
    changeUserRequestData(context, newData){
      context.commit('setuserRequestData', newData)
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
    postActionsVuex,
    getActionVuex
  }
})

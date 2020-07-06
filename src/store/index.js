import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userRequestData:'',
    chatSteper:1,
  },
  getters:{
    userRequestData: state => state.userRequestData,
    chatSteper: state => state.chatSteper,
  },
  mutations: {
    setuserRequestData(state, newSate){
      state.userRequestData = newSate
    },
    setchatSteper(state, newSate){
      state.chatSteper = newSate
    }
  },
  actions: {
    changeUserRequestData(context, newData){
      context.commit('setuserRequestData', newData)
    },
    changeChatSteper(context, newData){
      context.commit('setchatSteper', newData)
    }
  },
  modules: {
  }
})

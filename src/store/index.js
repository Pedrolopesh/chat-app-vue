import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userRequestData:''
  },
  getters:{
    userRequestData: state => state.userRequestData,
  },
  mutations: {
    setuserRequestData(state, newSate){
      state.userRequestData = newSate
    }
  },
  actions: {
    changeUserRequestData(context, newData){
      context.commit('setuserRequestData', newData)
    }
  },
  modules: {
  }
})

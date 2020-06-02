import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        token:"",
        userName:"",
        history_list:[]
    },
    mutations:{
        setToken(state,obj){
            state.token=obj.token;
            state.userName=obj.userName
        },
        setHis(state,arr){
            state.history_list=arr
        }
    }
})
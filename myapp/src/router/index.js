import Vue from 'vue'
import Router from 'vue-router'
// import sadjb from '@/components/sadjb'
import fwsyqk from '@/components/fwsyqk'
import fzxxdj from '@/components/fzxxdj'
import fwsyrqr from '@/components/fwsyrqr'
import ryjzqkxx from '@/components/ryjzqkxx'
import ryrzjbxx from '@/components/ryrzjbxx'
import index from '@/components/index'
import { resolve } from 'url'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'sadjb',
    //   component: resolve=>(require(["@/components/index"],resolve))
    // },
    {
      path: '/',
      name: '',
      component: index
      
    },
    {
      path: '/fwsyrqr',
      name: '',
      component: fwsyrqr
      
    },
    {
      path:'/fzxxdj',
      component:fzxxdj
    },
    {
      path:'/fwsyqk',
      component:fwsyqk
    },
    {
      path:'/ryjzqkxx',
      component:ryjzqkxx
    },
    {
      path:'/ryrzjbxx',
      component:ryrzjbxx
  }

  ]
})

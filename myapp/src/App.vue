<template>
  <div id="app" >
 
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){},
  methods:{
    // onSwipeLsft(){
    //   this.$router.go(-1)
    // }
     
  }
}
</script>

<style>
#app{
   background-image: url(../static/img/ba.png);
  background-repeat: no-repeat;
  background-position: center center
}
</style>

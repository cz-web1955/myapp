import './loading.css'
export default{
    install(Vue){
        let node=document.createElement('div');
        node.id='vue_loading_plugin';
        document.body.appendChild(node);
        node.addEventListener('transitionend',function(){
                var o=getComputedStyle(this,null).opacity;
                if(o==0){
                    this.style.display='none'
                }
        })
        Vue.prototype.$showLoading=function(){
            node.style.display='block';
            setTimeout(function(){
                node.style.opacity=0.8;
            },16.7)
        }
        Vue.prototype.$hideLoading=function(){
            var o=getComputedStyle(node,null).opacity;
            if(o==0){
                node.style.display='none';

            }
            setTimeout(()=>{
                node.style.opacity=0
            },16.7)
        }
    }
}
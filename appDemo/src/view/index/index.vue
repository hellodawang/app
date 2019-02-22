<template>
    <div class="index-wrapper">
        
        <router-view/>
        <div class="tabbar">
            <div class="tabbar-item" v-for="item in tabbar" :key="item.id" @click="clickTab(item)" :class="{selected: selected==item.id}">
                <i class="icon iconfont" :class="'icon-'+item.icon"></i>
            </div>
        </div>
    </div>   
</template>
<script>
export default{
    data(){
        return{
            selected:'index',
            tabbar:[{id:'index',icon:'index',url:'/gui/homePage'},{id:'complaintMessage',icon:'message',url:'/gui/complaintMessage'},{id:'customerService',icon:'kefu',url:'/gui/customerService'},{id:'user',icon:'user',url:'/gui/me'},]
        }
    },
    methods:{
        clickTab(item){
            this.selected = item.id;
            this.$router.push(item.url)
        }
    },
    mounted(){
        this.$router.replace(this.tabbar[0].url)
    }
}
</script>
<style >
 .hht-header{
    height: 0.5rem;
    background-color: #409EFF;
    color: #fff;
    text-align: center;
    line-height: 0.5rem;
  }
.index-wrapper{
    height: 100%;
    overflow: scroll
}
    .index-wrapper .iconfont{
        line-height: 0.5rem;
        font-size: 0.36rem;
    }
    .tabbar{
        display: flex;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        text-align: center;
        background-color: #fafafa;
    }
    .tabbar .tabbar-item{
        flex: 1;
        text-align: center;
        padding: 0.1rem 0;
    }
    .tabbar .tabbar-item.selected{
        background-color: #409EFF;
        color: #fff;
    }
</style>
<template>
    <canvas ref="chart" height="height"></canvas>   
</template>
<script>
import chart from 'chart.js'
export default{
    props: ["data",'styleCss'],
    data(){
        return{
            chart:'',
        }
    },
    mounted(){
        let dom = this.$refs.chart.getContext('2d');
        this.chart = new chart(dom,this.data);
    },
    watch:{
        data(){
            let dom = this.$refs.chart.getContext('2d');
            this.chart = new chart(dom,this.data);
        },
    }
}
</script>
<style >

</style>
<template>
    <div>   
        <div class="chart-header" >集群状态</div>
        <chart :data='config' ></chart>  
    </div>
</template>
<script>
import chart from '../../components/chart'
let baseConfig ={
    type: 'doughnut',
    data: {
        labels: [],
        datasets: [{}]
    },
    options: {
        responsive: true,
        legend: {
            position: 'top',
        },
        animation:{
            duration:0
        }
    }
}
export default{
    props:['storageData'],
    data(){
        return{
        }
    },
    components:{
        chart
    },
    computed:{
        config(){
            let cfg = Object.assign({}, baseConfig);
            // cfg.data.labels = this.storageData.xAxis
            cfg.data.datasets[0].data = [this.storageData.available,this.storageData.all]
            // this.storageData.forEach((item,index) => {
            //    cfg.data.datasets.push({
            //         label:item.name,
            //         data: [item.available,item.all],
            //         borderColor:'#AD9CD6',
            //         backgroundColor: 'rgba(255,0,0,0.1)',
            //         borderWidth:2,
            //         pointRadius:2,
            //         fill:true
            //    }) 
            // });
            return cfg
        }
    },
}
</script>
<style >
    .chart-header{
        height: 0.6rem;
        line-height: 0.6rem;
        font-size: 0.28rem;
        text-indent: 2em;
    }
</style>
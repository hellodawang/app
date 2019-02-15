<template>
    <div>   
        <div class="chart-header" >cpu And Ram</div>
        <chart :data='config' :styleCss="{width:'6rem',height:'6rem'}"></chart>  
    </div>
</template>
<script>
import chart from '../../components/chart'
let baseConfig ={
    type: 'line',
    data: {
        labels: [],
        datasets: []
    },
    options: {
        responsive:true,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                },
                gridLines: { 
                    lineWidth: 0,
                    display:false,
                    color:'#000' 
                } 
            }],
            xAxes: [{
                gridLines: { 
                    lineWidth: 0,
                    display:false,
                    color:'#000', 
                } 
            }],
        },
        legend: {
            display: true,
            labels: {
                fontColor: 'rgb(255, 99, 132)',
                boxWidth:10
            },
        },
        animation:{
            duration:0
        }
    }
}
export default{
    props:['cpuData'],
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
            cfg.data.labels = this.cpuData.xAxis
            cfg.data.datasets=[]
            this.cpuData.data.forEach((item,index) => {
               cfg.data.datasets.push({
                    label:item.name,
                    data: item.data,
                    borderColor:'#AD9CD6',
                    backgroundColor: 'rgba(255,0,0,0.1)',
                    borderWidth:2,
                    pointRadius:2,
                    fill:true
               }) 
            });
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
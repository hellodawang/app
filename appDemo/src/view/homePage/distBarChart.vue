<template>
    <chart :data='config' :styleCss="{width:'6rem',height:'4rem'}"></chart>
</template>
<script>
import chart from '../../components/chart'
export default{
    props:['data','title'],
    data(){
        return{
            baseConfig:{
                type: 'bar',
                data: {
                    labels: [],
                    datasets: [{
                        // label: '# of Votes',
                        data: [],
                        backgroundColor: [
                            '#AD9CD6',
                            '#6BADEF',
                            '#29C5C5',
                            '#FFBD84',
                        ],
                    }]
                },
                options: {
                    legend: {
                        display: false,
                    },
                    title:{
                        display:true,
                        // text:'上线设备'
                    },
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
                    }
                }
            }
        }
    },
    components:{
        chart
    },
    computed:{
        config(){
            let cfg = Object.assign({}, this.baseConfig);
            cfg.data.labels = ['国内','商用','海外','其他']
            cfg.data.datasets[0].data = this.data.value;
            cfg.options.title.text = this.title;
            return cfg
        }
    }
}
</script>
<style >

</style>
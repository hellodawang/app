<template>
    
    <div>
        <chart :data='baseConfig' :styleCss="{width:'6rem',height:'4rem'}"></chart>   
    </div>
</template>
<script>
import chart from '../../components/chart'
export default{
    data(){
        return{
            dateType:1,
            distributionList:[],
            baseConfig:{
                type: 'line',
                data: {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [{
                        label:'人',
                        data: [1,10,20,8,13,25],
                        borderColor:'#AD9CD6',
                        backgroundColor: '#AD9CD6',
                        borderWidth:2,
                        pointRadius:2,
                        fill:false
                    },{
                        label:'设备',
                        data: [5,2,8,18,7,22],
                        borderColor:'#FFBD84',
                        backgroundColor: '#FFBD84',
                        borderWidth:2,
                        pointRadius:2,
                        fill:false
                    }]
                },
                options: {
                    title:{
                        display:true,
                        text:'活跃度'
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
    mounted(){
        this.handleChange(this.dateType)
    },
    computed:{
        config(){
            let cfg = Object.assign({}, this.baseConfig);
            // cfg.legend.data = [this.$i18n.t('common.user'),this.$i18n.t('common.device')]
            // cfg.
            // cfg.yAxis[0].name = this.$i18n.t('cockpit.activity')
            cfg.data.labels = this.distributionList.map((v) => {
                let time = v.onlineDateInfo.slice(4)
                return time.slice(0, 2) + '/' + time.slice(2)
            }) 

            this.distributionList.forEach((item,index)=>{
                cfg.data.datasets[0].data.push(item.distributionUserInfo)
                cfg.data.datasets[1].data.push(item.distributionTerminalInfo)
            })
            // cfg.series[0].data = this.distributionList.map(v => v.distributionUserInfo) // this.accountData
            // cfg.series[0].name = this.$i18n.t('common.user') 
            // cfg.series[1].data = this.distributionList.map(v => v.distributionTerminalInfo) // this.deviceData
            // cfg.series[1].name = this.$i18n.t('common.device')
            return cfg;
        }
    },
    methods: {
        handleChange(type) {
            this.$axios
            .post("/userapi/userReport/findActiveDistribution", {dateType: type}, { responseType: "json" })
            .then((res) => {
                if (res.data.code != '0000') {
                return console.log("get data error: ", res.message);
                }
                this.distributionList = res.data.data.distributionList.reverse();
                this.dateType = parseInt(res.data.data.onlineDateType)
            })
            .catch(function(error) {
                console.log(error);
            });
        }
    }
}
</script>
<style >

</style>
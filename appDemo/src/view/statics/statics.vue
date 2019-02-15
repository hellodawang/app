<template>
    <div class="statics-wrapper">
        <div class="hht-header">
            鸿合云管理平台
        </div>
        <div class="content">
            <section class="">
                <bendWidth :bendWidthData='bendWidthData'></bendWidth>
                <cpuAndRam :cpuData='cpuData'></cpuAndRam>
            </section>
        </div>
    </div>
</template>
<script>
import bendWidth from './bendWidth'
import cpuAndRam from './cpuAndRam'
import storageStats from './storageStats'
export default{
    data(){
        return{
           cloudStats:{}
        }
    },
    components:{
        bendWidth,
        cpuAndRam,
        storageStats
    },
    mounted(){
        this.$axios   // 云端设备监控信息
            .post('/cloudplatinfo/cloudplat/clouddevicemonitort', { responseType: "json" })
            .then(res => {
                if (res.data.code != '0000') {
                return console.log("get data error: ", res.data.message);
                }
                res.data.data.cloudInfoList.forEach((v) => {
                    if (!v.messList) return
                    v.messList.sort((a, b) => {
                        let l = new Date(a.gatherTime.split('-').join('/')).getTime()
                        let r = new Date(b.gatherTime.split('-').join('/')).getTime()
                        if (l < r) return -1
                        if (l > r) return 1
                        return 0
                    })
                })
                this.cloudStats = res.data.data
            })
            .catch(function(error) {
                console.log(error);
            });
    },
    computed:{
        bendWidthData(){
            let data = this.cloudStats.cloudInfoList
            if (!data) {
                return {
                    data: [
                        {
                        name: "Amax",
                        data: [], // [0, 50, 70, 90, 65, 69, 0]
                        },
                        {
                        name: "Aavg",
                        data: [], // [0, 38, 56, 74, 59, 58, 0]
                        },
                        {
                        name: "Bmax",
                        data: [], // [0, 10, 20, 40, 30, 48, 0]
                        },
                        {
                        name: "Bavg",
                        data: [], // [0, 8, 14, 50, 34, 26, 0]
                        },
                        {
                        name: "Cmax",
                        data: [], // [0, 57, 23, 48, 12, 8, 0]
                        },
                        {
                        name: "Cavg",
                        data: [], // [0, 25, 18, 30, 48, 24, 0]
                        }
                    ],
                    xAxis: [], 
                    };
            }
            let d = []
            data.forEach((v) => {
                d.push({
                name: v.cloudLocation + 'max',
                data: v.messList.map(u => u.bandwidthMax)
                })
                d.push({
                name: v.cloudLocation + 'avg',
                data: v.messList.map(v => v.bandwidthAvr)
                })
            })
            let xAxis = [];
            data[0].messList.forEach((item,index)=>{
                xAxis.push(item.gatherTime.substring(11, 16))
            })
            return {data: d, xAxis: xAxis}
        },
        cpuData(){
            let data = this.cloudStats.cloudInfoList
            if (!data) {
                return {
                data: [
                    {
                    name: "ACPU",
                    data: [], //[30, 50, 70, 40, 65, 69, 70]
                    },
                    {
                    name: "AMEM",
                    data: [], // [0, 50, 2, 35, 5, 80, 18]
                    },
                    {
                    name: "BCPU",
                    data: [], // [1, 5, 2, 30, 80, 2, 10]
                    },
                    {
                    name: "BMEM",
                    data: [], // [5, 5, 40, 20, 60, 0, 15]
                    },
                    {
                    name: "CCPU",
                    data: [], // [2, 90, 60, 4, 50, 21, 7]
                    },
                    {
                    name: "CMEM",
                    data: [], // [90, 5, 20, 0, 40, 10, 17]
                    },

                ],
                xAxis: [], // ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00"]
                }
            }
            let d = []
            data.forEach((v) => {
                d.push({
                name: v.cloudLocation + 'CPU',
                data: v.messList.map(u => u.cpuRate)
                })
                d.push({
                name: v.cloudLocation + 'MEM',
                data: v.messList.map(v => v.memoryRate)
                })
            })
            let xAxis = [];
            data[0].messList.forEach((item,index)=>{
                xAxis.push(item.gatherTime.substring(11, 16))
            })
            return {data: d, xAxis: xAxis}
        },
        storageData(){
            let data = this.cloudStats.cloudInfoList 
            if (!data) {
                return [
                {name:'A',available:100,},
                {name:'B',available:100,},
                {name:'C',available:100,},
                ]
            }
            return data.map((v) => {
                v.cloudCondition = parseInt(v.cloudCondition)
                return {
                name: v.cloudLocation,
                all: 100, 
                available: v.cloudCondition,
                // level: v.cloudCondition >= 90 ? this.$i18n.t('common.excellent') : (v.cloudCondition < 90 && v.cloudCondition >= 80 ? this.$i18n.t('common.good') :( v.cloudCondition <= 80 && v.cloudCondition >= 60 ? this.$i18n.t('common.average') :this.$i18n.t('common.poor')))
                // }
                }
            })
        }
    }
}
</script>
<style >
    .circle{
        display: flex;
    }
    .circle .circle-item{
        flex: 1
    }
</style>
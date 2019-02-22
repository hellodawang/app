<template>
    <div class="homepage-wrapper">
        <div class="hht-header">鸿合云管理系统</div>
        <div class="content">
            <section class="online">

            </section>
            <section class="">
                <distBarChart :data='deviceBarchartData' :title="'上线设备'"></distBarChart>
                <distBarChart :data='userBarchartData' :title="'上线用户'"></distBarChart>
                <activity ></activity>
            </section>
        </div>
    </div>
</template>
<script>
import distBarChart from './distBarChart'
import activity from './activity'
export default{
    data(){
        return{
            device: { online: 0, all: 1, terminalTypeList: []},
            user: { online: 0, all: 1, accountTypeList: []},
        }
    },
    components:{
        distBarChart,
        activity
    },
    mounted(){
        this.$axios   // 在线终端统计
            .post("/terminalweb/terminalReport/findOnlineStatistical", {}, { responseType: "json" })
            .then(res => {
                if (res.data.code != '0000') {
                return console.log("get data error: ", res.data.message);
                }
                this.device = res.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
        this.$axios   // 在线用户统计
            .post("/userapi/userReport/findOnlineUser", {}, { responseType: "json" })
            .then(res => {
                if (res.data.code != '0000') {
                return console.log("get data error: ", res.data.message);
                }
                this.user = res.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },
    computed:{
        deviceBarchartData(){
            return{
                value:this.device.terminalTypeList.map(v => v.onlineTotal),
                label:this.device.terminalTypeList.map(v => v.terminalType)
            }
        },
        userBarchartData(){
            return{
                value:this.user.accountTypeList.map(v => v.typeOnline),
                label:this.user.accountTypeList.map(v => v.accountType)
            }
        },
    }
}
</script>
<style >
    .hht-header{
        height: 0.6rem;
        background-color: #409EFF;
        text-align: center;
        line-height: 0.6rem;
        color: #fff;
        font-size: 0.28rem;
    }
    /* .homepage-wrapper .content section{

    } */
</style>
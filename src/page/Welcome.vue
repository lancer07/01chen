<template>
    <div id="welcome" v-bind:class="{hideWelcome : !isShow}">
        <span>{{time}}</span>
    </div>
</template>

<script>
    export default {
        props: ['isShow','time'],
        methods : {
            callMe(){
                window.location.href = 'tel://(+86) 13661472175';
            },
        },
        data () {
            return {
                
            }
        },
        created(){
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    #welcome{
        background:url('../assets/portrait.png') 50% 50% no-repeat #ffcdce;
        height:100%;
        width:100%;
        left:0;
        top:0;
        position:fixed;
        z-index:1000;
        text-align:right;
        span{
            margin:10px;
        }
    }
    .hideWelcome{
        display:none
    }
</style>

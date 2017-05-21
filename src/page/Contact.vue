<template>
    <div>
        <mt-cell title="名字" value="林艺宸"></mt-cell>
        <mt-cell title="出生地" value="上海"></mt-cell>
        <mt-cell title="手机" value="(+86) 13661472175"></mt-cell>
        <mt-cell title="QQ" value="180003000"></mt-cell>
        <mt-cell title="微信" value="lancer07"></mt-cell>
        <div class="call-btn">
            <mt-button @click="callMe" type="danger" size="large">电话</mt-button>
        </div>
    </div>
</template>

<script>
    export default {
        props: [],
        methods : {
            callMe(){
                window.location.href = 'tel://(+86) 13661472175';
            },
        },
        data () {
            return {
                
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .call-btn{
        position:fixed;
        bottom:60px;
        left:0;
        margin:5%;
        width:90%;
    }
</style>

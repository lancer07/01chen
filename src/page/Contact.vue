<template>
    <div>
        <mt-cell title="Name" value="YiChen Lin"></mt-cell>
        <mt-cell title="Location" value="Shanghai China"></mt-cell>
        <mt-cell title="Mobile" value="(+86) 13661472175"></mt-cell>
        <mt-cell title="QQ" value="180003000"></mt-cell>
        <mt-cell title="WeChart" value="lancer07"></mt-cell>
        <div class="call-btn">
            <mt-button @click="callMe" type="danger" size="large">Call</mt-button>
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

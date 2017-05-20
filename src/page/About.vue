<template>
    <div>
        <div class="portrait">
            <img src="../assets/portrait.png" />
        </div>
        <mt-cell title="Name" value="YiChen Lin"></mt-cell>
        <mt-cell title="Gender" value="Female"></mt-cell>
        <mt-cell title="Birth Day" value="18/07/2016"></mt-cell>
        <mt-cell title="Blood Type" value="A"></mt-cell>
        <mt-cell title="Constellation" value="Cancer"></mt-cell>
        <mt-cell title="Ability" value="Sleep/Climb/Eat"></mt-cell>
    </div>
</template>

<script>
    export default {
        props: [],
        data () {
            return {
                
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .portrait{
        padding:60px 10px 10px 10px;
        height:200px;
        margin-top:-50px;
        text-align:center;
        background:#ffcdce;
        img{
            height:100%
        }
    }
</style>

<template>
    <div>
        <div class="portrait">
            <img src="../assets/portrait.png" />
        </div>
        <mt-cell title="名字" value="林艺宸"></mt-cell>
        <mt-cell title="性别" value="女"></mt-cell>
        <mt-cell title="生日" value="2016-07-18"></mt-cell>
        <mt-cell title="血型" value="A"></mt-cell>
        <mt-cell title="星座" value="巨蟹座"></mt-cell>
        <mt-cell title="爱好" value="睡觉，吃，爬"></mt-cell>
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

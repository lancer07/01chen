<template>
    <div id="photos">
        <div class="page-header-main article">
            <ul>
                <li v-for="item in content">
                    <img v-lazy="item.url">
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { Indicator } from 'mint-ui';
    
    export default {
        props: ['content'],
        methods : {
        },
        activated(){
             Indicator.open();
        },
        data () {
            return {
                url : 'http://w848658.s234.ufhosted.com/linqing07/?json=1&'
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .page-title {
        font-size: 20px;
        text-align: center;
        display: block;
        line-height: 50px;
        position:fixed;
        width:100%;
        height:50px;
        left:0;
        top:0;
        z-index:100;
        background:#fafafa;
        box-sizing: border-box;
    }
    .article{
        ul{
            list-style:none;
            padding:0;
            margin:0;
            li{
                padding:0;
                margin:10px;
                background:#f4f4f4;
            }
        }
        img{
            width:100%;
            height:auto;
        }
    }
</style>

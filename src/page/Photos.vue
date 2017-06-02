<template>
    <div id="photos">
        <div class="page-header-main article">
            <ul>
                <li v-for="(item,index) in content">
                    <img v-lazy="item" @click="showSinglePopup(index)">
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { Indicator , Swipe, SwipeItem  } from 'mint-ui';

    export default {
        props: ['content'],
        methods : {
            showSinglePopup(index){
                bus.$emit('showSinglePopup',index);
            }
        },
        activated(){
             Indicator.open();
        },
        data () {
            var that = this;
            return {
                url : 'http://w848658.s234.ufhosted.com/linqing07/?json=1&',
                
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    
    .single-page{
        background:#343434;
        position:absolute;
        z-index:3000;
        left:0;
        top:0;
    }
    .page-close{
       position:absolute;
       padding:0px;
       top:5px;
       left:5px;
       a{
            display:block;
            border-radius:50%;
            background:rgba(255,255,255,0.9);
            img{
                vertical-align:bottom;
            }
       }
    }
    .mint-popup{
        position:fixed
    }
    #photos{
        height:100%;
    }
    .article{
        height:100%;
        text-align:center;
        ul{
            list-style:none;
            padding:0;
            margin:0;
            column-count : 2;
            column-gap : 5px;
            column-fill: balance;
            li{
                padding:0;
                margin:0px;
                -webkit-column-break-inside: avoid;
                break-inside: avoid;
                img{
                   vertical-align:middle;
                   width:100%;
                }
            }
        }
        .swipe-img{
            margin:100px auto 0 auto;
            max-width:100%;
            max-height:500px;
        }
    }
</style>

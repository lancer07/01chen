<template>
    <div id="swipePhotos">
        <mt-popup
            position="bottom"
            v-model="show">
            <div class="single-page">
                <div class="page-close">
                    <a @touchstart="closeSinglePopup" >
                        <img src="../assets/close.png" width="40" />
                    </a>
                </div>
                <mt-swipe :auto="0">
                    <mt-swipe-item v-for="(item,index) in content">
                        <img class="swipe-img" v-lazy="item">
                    </mt-swipe-item>
                </mt-swipe>
            </div>  
        </mt-popup>
    </div>
</template>

<script>
    import { Indicator , Swipe, SwipeItem  } from 'mint-ui';

    export default {
        props: ['content','show'],
        methods : {
            closeSinglePopup(){
                this.$emit('closeSinglePopup',item);
            }
        },
        activated(){
             Indicator.open();
        },
        data () {
            var that = this;
            return {
                download : '',
                popupVisible : false,
                noModel : false
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    #swipePhotos{
        background: #343434;
        height: 100%;
        position: fixed;
        z-index: 2000;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        .mint-popup{
            background:inherit;
        }
        .single-page{
            height: 100%;
        }
    }
    .page-close{
       position:absolute;
       padding:0px;
       top:5px;
       left:5px;
       z-index:2001;
       a{
            display:block;
            border-radius:50%;
            background:rgba(255,255,255,0.9);
            img{
                vertical-align:bottom;
            }
       }
    }
    .swipe-img{
        margin:100px auto 0 auto;
        max-width:100%;
        max-height:500px;
    }
</style>

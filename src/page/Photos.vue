<template>
    <div id="photos">
        <div class="page-header-main article">
            <div v-if="content.length">
                <img v-lazy="content[0].url" @click="showSinglePopup(content[0].url)">
            </div>
            <ul>
                <li v-for="(item,index) in content">
                    <img v-if="index > 0" v-lazy="item.url" @click="showSinglePopup(item.url)">
                </li>
            </ul>
        </div>
        <!--<mt-actionsheet
            :actions="actions"
            v-model="sheetVisible"
            cancelText=""
            closeOnClickModal="false">
        </mt-actionsheet>-->
        <mt-popup
            v-model="popupVisible"
            position="bottom"
            v-bind:modal="noModel">
            <div class="single-page">
                <div class="page-close">
                    <a @touchstart="closeSinglePopup" >
                        <img src="../assets/close.png" width="40" />
                    </a>
                </div>
                <img v-bind:src="download" width="100%"/>
            </div>
                
        </mt-popup>
    </div>
</template>

<script>
    import { Indicator  } from 'mint-ui';
    
    export default {
        props: ['content'],
        methods : {
            showSinglePopup(url){
                this.$emit('showSinglePopup',url);
            },
            closeSinglePopup(){
               this.$emit('closeSinglePopup');
            }
        },
        activated(){
             Indicator.open();
        },
        data () {
            var that = this;
            return {
                url : 'http://w848658.s234.ufhosted.com/linqing07/?json=1&',
                download : '',
                popupVisible : false,
                noModel : false,
                actions : [{
                    name : 'Save to Album',
                    method : function(){
                        document.querySelector('.v-modal').style.display='none';
                    }},
                    {
                        name : 'Cancel',
                        method : function(){
                            document.querySelector('.v-modal').style.display='none'
                        }}
                    ]
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
    .single-page{
        background:#fff;
    }
    .page-close{
       text-align:right;
       position:absolute;
       padding:0px;
       top:5px;
       right:5px;
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
    .article{
        ul{
            list-style:none;
            padding:0;
            margin:0;
            column-count : 2;
            column-gap : 0px;
            li{
                padding:0;
                margin:0px;
                background:#f4f4f4;
                img{
                   vertical-align:middle;
                }
            }
        }
        img{
            width:100%;
            height:auto;
        }
    }
</style>

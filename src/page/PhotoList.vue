<template>
    <div ref="piclist" class="monent-wrap">
        <div class="loading" v-show="list.length == 0">
            <mt-spinner type="fading-circle" :size="60"></mt-spinner>
        </div>
        <ul ref="photolist"
            v-infinite-scroll="loadMorePhoto"
            infinite-scroll-distance="90">
            <li v-for="(item,index) in list">
                <h2 class="tit"><span>{{item.title}}</span></h2>
                <!-- video -->
                <div v-if="item.categories[1].id==17" class="video" >
                    <video v-bind:src="item.images[0]" autoplay="true" controls="controls"></video>
                </div>
                <!-- images -->
                <div v-else @click="showImageDetail(index)">
                    <div class="pic">
                        <img v-lazy="item.thumbnail">
                        <span class="total">{{item.total}} 图</span>
                    </div>
                    <ul class="thumbnail" v-if="item.images.length > 3">
                        <li v-for="(pic,index) in item.images" v-if="index < 3">
                            <img v-lazy="pic">
                        </li>
                    </ul>
                </div>
                <div class="date">{{item.date}}</div>
            </li>
        </ul>
        <div class="page-popup">
            <mt-popup
            v-model="popupDetail"
            position="right"
            closeOnClickModal="false">
                <div class="page-wrap">
                    <a @touchstart="closePopup" class="page-back">
                        <img src="../assets/back.png" width="10" />
                    </a>
                    <div class="page-title">{{article.title}}</div>
                    <div class="iframeWrap">
                        <photos :content="article.content" v-on:showSinglePopup="showSinglePopup"/>
                    </div>
                </div>
            </mt-popup>
        </div>
        <swipe-photos :show="popupSingle" :defaultindex="singlePicIndex" :content="article.content" v-on:closeSinglePopup="closeSinglePopup"/>
    </div>
</template>

<script>
    import { Indicator, InfiniteScroll } from 'mint-ui';
    import Photos from './Photos';
    import SwipePhotos from './SwipePhotos';

    export default {
        props: ['filterCat'],
        components: {
            Photos,
            SwipePhotos
        },
        methods : {
            showImageDetail(index){
                var that = this;
                var detail = this.list[index];
                this.popupDetail = true;
                this.article.title = detail.title;
                that.article.content = detail.images;
                Indicator.close();
            },
            // 用来过滤出url链接
            buildData(data){
                var urlReg = /src=['"]?([^"'\s]+)/g;
                for(var i = 0 ;i < data.length;i++){
                    data[i].images = [];
                    while(urlReg.exec(data[i].content)) {
                        data[i].images.push(RegExp.$1);
                    }
                    data[i].total = data[i].images.length;
                }
                return data;
            },
            renderList(page){
                var that = this;
                that.$http.jsonp(that.url,{
                    params: {
                        json : 1,
                        cat : that.cat,
                        page : page
                    }
                }).then(function(response){
                    var newList = this.buildData(response.body.posts);
                    that.list = that.list.concat(newList);
                    that.max = response.body.pages;
                    this.nextPage = this.nextPage + 1;
                    Indicator.close();
                },function(response){
                    console.log(response);
                });
            },
            findIn(){
                for(var i=0;i<this.pagesArea.length;i++){
                    if(this.nextPage == this.pagesArea[i]){
                        return true
                    }
                }
                return false;
            },
            loadMorePhoto() {
                if(!this.findIn()){
                    if(this.nextPage <= this.max){
                        this.renderList(this.nextPage,);
                        this.pagesArea.push(this.nextPage);
                    }
                }
            },
            closePopup(){
                this.article.title = '';
                this.article.content = '';
                this.popupDetail = false;
            },
            showSinglePopup(index){
                this.singlePicIndex = index;
                this.popupSingle = true;
            },
            closeSinglePopup(){
                this.singlePicIndex = 0;
                this.popupSingle = false;
            }
        },
        activated(){
            Indicator.open();
        },
        created(){
           Indicator.open();
        },
        data() {
            return {
                url : 'http://w848658.s234.ufhosted.com/linqing07/',
                list : [],
                nextPage : 1,
                max : 2,
                popupDetail : false,
                popupSingle : false,
                singlePicIndex:0,
                article : {
                    title : '',
                    content : ''
                },
                cat : 9,
                pagesArea : []
            }
        },
        watch : {
            filterCat(newCat,oldCat){
                if(newCat != oldCat){
                    this.list = [];
                    this.nextPage = 1;
                    this.cat = newCat;
                    this.pagesArea=[];
                    this.renderList(1);
                }
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .mint-search{
        height:auto;
    }
    .mint-search-list{
        display:none!important;
    }
    .monent-wrap{
        background:#f4f4f4;
        .mint-loadmore{
            overflow:auto;
        }
        .loading{
            text-align:center;
            background:#fff;
            height:50vh;
            display: flex;
            align-items: center;
            justify-content: center;
            >span{
                margin:0 auto;
                width:60px;
                height:60px;
                display:block;
            }
        }
        ul{
            margin:0;
            list-style:none;
            padding: 0;
            li{
                padding:5px 15px 15px 15px;
                background:#f9f9f9;
                border-bottom:1px solid #fafafa;
                margin: 0 0 10px 0;
                .video{
                    height:240px;
                    overflow:hidden;
                    display: flex; 
                    justify-content: center; 
                    flex-direction: column;
                    video{
                        width:100%;
                        height:auto;
                    }
                }
                .pic{
                    background:#f8f8f8;
                    position:relative;
                    img{
                        vertical-align:middle;
                        width:100%;
                    }
                }
                .tit{
                    line-height:40px;
                    font-size:16px;
                    padding:0;
                    margin:0;
                    color:#959595;
                    font-weight:normal;
                    span{
                        margin-left:10px;
                    }
                }
                .total{
                    position : absolute;
                    right:10px;
                    bottom:10px;
                    color:#fff;
                    padding:5px;
                    border-radius:10px;
                    font-size:12px;
                    background:rgba(0,0,0,0.5);
                }
                .thumbnail{
                    margin-top:5px;
                    li{
                        float:left;
                        width:33.0333%;
                        padding:0.1%;
                        margin:0;
                        height: 70px;
                        overflow:hidden;
                        position:relative;
                        img{
                            width:100%;
                            height:auto;
                            top: 50%;
                            position:absolute;
                            transform: translateY(-50%);
                        }
                    }
                }
                .date{
                    font-size:12px;
                    color:#959595;
                    line-height:2;
                }
            }
        }
    }
    .mint-popup{
        width:100%;
        height:100%;
        background:#fff;
        .page-back {
            display: inline-block;
            top: 0;
            left: 0;
            position: fixed;
            width: 40px;
            height: 50px;
            line-height:50px;
            text-align: center;
            z-index:2000;
            background:inherit;
            img{
                vertical-align:middle;
            }
        }
        
    }
</style>

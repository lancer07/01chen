<template>
    <div ref="piclist" class="monent-wrap">
        <!--<mt-search 
            v-model="searchKey"
            cancel-text="cancel"
            placeholder="search"
        ></mt-search>-->
        <ul ref="photolist"
            v-infinite-scroll="loadMorePhoto"
            infinite-scroll-distance="90">
            <li v-for="(item,index) in list" @click="showDetail(index)">
                <h2 class="tit"><span>{{item.title}}</span></h2>
                <div class="pic">
                    <img v-lazy="item.thumbnail">
                    <span class="total">{{item.total}} Photos</span>
                </div>
                <ul class="thumbnail" v-if="item.images.length > 3">
                     <li v-for="(pic,index) in item.images" v-if="index < 3">
                        <img v-lazy="pic">
                     </li>
                </ul>
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
        <swipe-photos :show="popupSingle"  :defaultindex="singlePicIndex" :content="article.content" v-on:closeSinglePopup="closeSinglePopup"/>
    </div>
</template>

<script>
    var pagesArea=[];
    import { Indicator, InfiniteScroll } from 'mint-ui';
    import Photos from './Photos';
    import SwipePhotos from './SwipePhotos';

    export default {
        props: [],
        components: {
            Photos,
            SwipePhotos
        },
        methods : {
            showDetail(index){
                var that = this;
                var detail = this.list[index];
                this.popupDetail = true;
                this.article.title = detail.title;
                that.article.content = detail.images;
                Indicator.close();
            },
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
                        cat : 9,
                        page : page,
                        s : that.searchKey == '' ? ' ' : that.searchKey
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
                for(var i=0;i<pagesArea.length;i++){
                    if(this.nextPage == pagesArea[i]){
                        return true
                    }
                }
                return false;
            },
            loadMorePhoto() {
                if(!this.findIn()){
                    if(this.nextPage <= this.max){
                        this.renderList(this.nextPage);
                        pagesArea.push(this.nextPage);
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
            //this.page = 1;
           // this.renderList(1);
        },
        data() {
            return {
                url : 'http://w848658.s234.ufhosted.com/linqing07/',
                list : [],
                searchKey : '',
                bottomStatus: '',
                nextPage : 1,
                max : 2,
                popupDetail : false,
                popupSingle : false,
                singlePicIndex:0,
                article : {
                    title : '',
                    content : ''
                }
            }
        },
        watch : {
            searchKey : function(newValue,oldValue){
                this.nextPage = 1;
                this.max = 1;
                this.list = [];
                pagesArea = [];
                this.renderList(1);
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
        ul{
            margin:0;
            list-style:none;
            padding: 0;
            li{
                
                padding:5px 15px 15px 15px;
                background:#fff;
                border-bottom:1px solid #fafafa;
                margin: 10px 0;
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
                        img{
                            width:100%;
                            height:auto;
                            vertical-align:middle;
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
            background:rgba(255,255,255,0.9);
            img{
                vertical-align:middle;
            }
        }
        
    }
</style>

<template>
    <div ref="piclist" class="monent-wrap">
        <mt-search 
            v-model="searchKey"
            cancel-text="cancel"
            placeholder="search"
        ></mt-search>
        <ul
            ref="photolist"
            v-infinite-scroll="loadMorePhoto"
            infinite-scroll-distance="90">
            <li v-for="(item,index) in list" @click="showDetail(item.id,item.title)">
                <div class="pic">
                    <img v-lazy="item.attachments[0].url">
                </div>
                <div class="tit"><span>{{item.title}}</span></div>
            </li>
        </ul>
    </div>
</template>

<script>
    var pagesArea=[];
    import { Indicator, InfiniteScroll } from 'mint-ui';
    
    export default {
        props: [],
        methods : {
            showDetail(id,title){
               this.$emit('showDetail',id,title);
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
                    that.list = that.list.concat(response.body.posts);
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
                loading : false
            }
        },
        watch : {
            searchKey : function(newValue,oldValue){
                this.nextPage = 1;
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
        .mint-loadmore{
            overflow:auto;
        }
        ul{
            margin:0;
            list-style:none;
            column-count : 1;
            column-gap : 5px;
            column-fill: balance;
            padding: 0;
            li{
                position:relative;
                padding:10px 10px 0 10px;
                background:#f4f4f4;
                border:1px solid #f0f0f0;
                -webkit-column-break-inside: avoid;
                break-inside: avoid;
                margin: 10px 0;
                .pic{
                    background:#f8f8f8;
                    img{
                        vertical-align:middle
                    }
                }
                .tit{
                    position:absolute;
                    bottom:0;
                    left:0;
                    height:50px;
                    line-height:50px;
                    width:100%;
                    color:#fff;
                    span{
                        margin: 0 10px;
                        padding:0 10px;
                        display:block;
                        background:rgba(0,0,0,0.5);
                    }

                }
                img{
                    width:100%;
                }
            }
        }
    }
</style>

<template>
    <div class="monent-wrap">
        <mt-search 
            v-model="searchKey"
            cancel-text="cancel"
            placeholder="search"
        ></mt-search>
           
        <ul 
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10">
            <li v-for="(item,index) in list" @click="showDetail(item.id,item.title)">
                <!--<div class="pic" v-if="index == 0">
                    <img v-bind:src="item.attachments[0].url">
                </div>-->
                <div class="pic">
                    <img v-lazy="item.attachments[0].url">
                </div>
                <div class="tit"><span>{{item.title}}</span></div>
            </li>
        </ul>
    </div>
</template>

<script>
    import { Indicator } from 'mint-ui';
    export default {
        props: [],
        methods : {
            showDetail(id,title){
               this.$emit('showDetail',id,title);
            },
            renderList(){
                var that = this;
                that.$http.jsonp(that.url,{
                    params: {
                        json : 1,
                        cat : 9,
                        s : that.searchKey == '' ? ' ' : that.searchKey
                    }
                }).then(function(response){
                    that.list = response.body.posts;
                    Indicator.close();
                },function(response){
                    console.log(response);
                });
            }
        },
        activated(){
            Indicator.open();
        },
        created(){
            this.renderList();
        },
        data() {
            return {
                url : 'http://w848658.s234.ufhosted.com/linqing07/',
                list : [],
                searchKey : ''
            }
        },
        watch : {
            searchKey : function(newValue,oldValue){
                this.renderList();
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
        ul{
            margin:0;
            list-style:none;
            column-count : 2;
            column-gap : 5px;
            padding: 0;
            li{
                position:relative;
                padding:0;
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
                    height:30px;
                    line-height:30px;
                    width:100%;
                    color:#fff;
                    font-size:12px;
                    background:rgba(0,0,0,0.5);
                    span{
                        margin: 0 10px;
                    }

                }
                img{
                    width:100%;
                }
            }
        }
    }
</style>

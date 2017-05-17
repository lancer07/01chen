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
                <p>{{item.title}}</p>
                <div v-if="index == 0">
                    <img v-bind:src="item.attachments[0].url">
                </div>
                <div v-else>
                    <img v-lazy="item.attachments[0].url">
                </div>
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
            searchKey : function(oldValue,newValue){
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
            padding:0;
            list-style:none;
            li{
                margin:0;
                padding:0px;
                background:#f4f4f4;
                border:1px solid #f0f0f0;
                margin:10px 0;
                p{
                    padding:10px;
                    margin:0;
                    color:#777;
                    background:#f8f8f8;
                }
                img{
                    width:100%;
                }
            }
        }
    }
</style>

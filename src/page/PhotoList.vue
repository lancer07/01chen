<template>
    <div class="monent-wrap">
        <ul 
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10">
            <li v-for="item in list" @click="showDetail(item.id,item.title)">
                <p>{{item.title}}</p>
                <img v-lazy="item.attachments[0].url">
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: [],
        methods : {
            showDetail(id,title){
               this.$emit('showDetail',id,title);
            }
        },
        created(){
            var that = this;
            var url = that.url + 'cat=9';
            this.$http.jsonp(url).then(function(response){  
                that.list = response.body.posts;
            },function(response){
                console.log(response);
            });
        },
        data() {
            return {
                url : 'http://www.sh1993.com/linqing07/?json=1&',
                list : []
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
   image[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
    }
    .monent-wrap{
        ul{
            margin:0;
            padding:0;
            list-style:none;
            li{
                margin:0;
                padding:0px;
                background:#fff;
                border:1px solid #f0f0f0;
                margin:10px;
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

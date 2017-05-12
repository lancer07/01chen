<template>
    <div>
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
    function GetQueryString(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }
    export default {
        props: [],
        methods : {
            
        },
        created(){
            var that = this;
            var url = that.url + 'p=' + GetQueryString('id');
            that.$http.jsonp(url).then(function(response){
                that.content = response.body.post.attachments;
            },function(response){
                console.log(response);
            });
        },
        data () {
            return {
                url : 'http://www.sh1993.com/linqing07/?json=1&',
                content : ''
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
            }
        }
        img{
            width:100%;
            height:auto;
        }
    }
</style>

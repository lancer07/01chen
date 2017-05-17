<template>
    <div id="app" >
        <welcome v-bind:class="{hideWelcome:!showWelcome}" v-bind:time="time" />
        <div class="page-wrap">
            <div class="page-title">{{selected}}</div>
            <mt-tab-container v-model="selected">
                <div class="page-header-main">
                    <mt-tab-container-item id="Monent">
                        <photo-list v-on:showDetail="showDetail" />
                    </mt-tab-container-item>
                    <mt-tab-container-item id="About Me">
                        <about />
                    </mt-tab-container-item>
                    <mt-tab-container-item id="Contact Me">
                        <contact />
                    </mt-tab-container-item>
                </div>
            </mt-tab-container>
        </div>
        <mt-tabbar v-model="selected" fixed>
            <mt-tab-item id="Monent">
                <img slot="icon" src="./assets/camera.png">
                Monent
            </mt-tab-item>
            <mt-tab-item id="About Me">
                <img slot="icon" src="./assets/me.png">
                About Me
            </mt-tab-item>
            <mt-tab-item id="Contact Me">
                <img slot="icon" src="./assets/phone.png">
                Contact Me
            </mt-tab-item>
        </mt-tabbar>
        
        <div class="page-popup">
            <mt-popup
            v-model="popupDetail"
            position="right"
            closeOnClickModal="false">
                <div class="page-wrap">
                    <a @click="closePopup" class="page-back">
                        <img src="./assets/back.png" width="10" />
                    </a>
                    <div class="page-title">{{article.title}}</div>
                    <div class="iframeWrap">
                        <photos :content="article.content" />
                    </div>
                </div>
            </mt-popup>
        </div>
    </div>
</template>

<script>
    import { Indicator } from 'mint-ui';
    import About from './page/About';
    import Contact from './page/Contact';
    import Welcome from './page/Welcome';
    import PhotoList from './page/PhotoList';
    import Photos from './page/Photos';

    export default {
        name: 'app',
        components: {
            Welcome,
            About,
            Contact,
            PhotoList,
            Photos
        },
        methods: {
            showDetail(id,title){
                var that = this;
                this.popupDetail = true;
                this.article.title = title;
                var url = that.url + 'p=' + id;
                that.$http.jsonp(url).then(function(response){
                    that.article.content = response.body.post.attachments;
                    Indicator.close();
                },function(response){
                    console.log(response);
                });
            },
            closePopup(){
                this.article.title = '';
                this.article.content = [];
                this.popupDetail = false;
            }
        },
        created(){
            var that = this;
            var welcome = setInterval(function(){
                that.time -- ;
                if(that.time == 0){
                    that.showWelcome = false;
                    clearInterval(welcome);
                }
            },1000);
            
        },
        data () {
            return {
                url : 'http://w848658.s234.ufhosted.com/linqing07/?json=1&',
                //photosUrl : '',
                selected : 'About Me',
                time : 3,
                showWelcome : true,
                popupDetail : false,
                article : {
                    title : '',
                    content : []
                }
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    body{
        margin: 0;
        padding: 0;     
        .page-header-main {
            width:100%;
            background:#fff;
            margin-top:50px;
            margin-bottom: 55px;
        }
        .page-wrap{
            overflow: hidden;
            height: 100%;
            padding-bottom: 100px;
        }
        .iframeWrap{
            -webkit-overflow-scrolling: touch; 
            overflow-y: scroll; 
            height: 100%;
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
                img{
                    vertical-align:middle;
                }
            }
            
        }
    }
</style>
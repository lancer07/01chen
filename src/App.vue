<template>
    <div id="app" >
        <welcome v-bind:class="{hideWelcome:!showWelcome}" v-bind:time="time" />
        <div class="page-wrap">
            <div class="page-title">
                {{pages[selected]}}
                <search v-show="selected=='Monent'"  />
            </div>
            <mt-tab-container v-model="selected">
                <div class="page-header-main">
                    <mt-tab-container-item id="Monent">
                        <photo-list :filterCat="filterCat"/>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="AboutMe">
                        <about />
                    </mt-tab-container-item>
                    <mt-tab-container-item id="ContactMe">
                        <contact />
                    </mt-tab-container-item>
                </div>
            </mt-tab-container>
        </div>
        <mt-tabbar v-model="selected" fixed>
            <mt-tab-item id="Monent">
                <img slot="icon" src="./assets/camera.png">
                相册
            </mt-tab-item>
            <mt-tab-item id="AboutMe">
                <img slot="icon" src="./assets/me.png">
                我的介绍
            </mt-tab-item>
            <mt-tab-item id="ContactMe">
                <img slot="icon" src="./assets/phone.png">
                联系我
            </mt-tab-item>
        </mt-tabbar>
        
    </div>
</template>

<script>
    import { Indicator } from 'mint-ui';
    import About from './page/About';
    import Contact from './page/Contact';
    import Welcome from './page/Welcome';
    import PhotoList from './page/PhotoList';
    import Search from './components/Search';
    export default {
        name: 'app',
        components: {
            Welcome,
            About,
            Contact,
            PhotoList,
            Search
        },
        methods: {
            // filter(cat){
            //     this.filterCat = cat;
            // }
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
                selected : 'Monent',
                time : 4,
                showWelcome : true,
                pages : {
                    Monent : '相册',
                    AboutMe: '我的介绍',
                    ContactMe:'联系我'
                },
                filterCat : '9'
            }
        },
        watch : {
            selected : function(newValue,oldValue){
                if(newValue == 'Monent'){
                    window.scrollTo(0,55);
                }else{
                    window.scrollTo(0,0);
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
            background:rgba(255,255,255,0.75);
            box-sizing: border-box;
        }
        .iframeWrap{
            -webkit-overflow-scrolling: touch; 
            overflow-y: scroll; 
            height: 100%;
        }
    }
</style>
<template>
  <div class="search">
    <img src="../assets/filter.png" width="22" @touchstart="toggleSearch"/>
    
    <mt-popup
    v-model="popupSearch"
    position="middle"
    closeOnClickModal="false">
        <mt-radio
        title=""
        v-model="searchKey"
        :options="[{
            label: '全部',
            value: '9'
        },
        {
            label: '艺术照',
            value: '14'
        },
        {
            label: '生活照',
            value: '15'
        },
        {
            label: '视频',
            value: '17'
        }]">
        </mt-radio>
    </mt-popup>
  
  </div>
</template>

<script>
import { Popup } from 'mint-ui';

export default {
  name: 'search',
  props: [],
  methods : {
    toggleSearch(e){
        e.preventDefault();
        this.popupSearch = true;
    }
  },
  data () {
    return {
            popupSearch: false,
            searchKey : '9'
        }
    },
    watch : {
        searchKey : function(newValue,oldValue){
            this.popupSearch = false;
            bus.$emit('filter', newValue);
            //this.$emit('filter',newValue);
        }
    }
}
</script>

<style lang="less" rel="stylesheet/less">
    body{
        .page-title{
            .search{
                position:absolute;
                top:0;
                right:10px;
                height:50px;
                line-height:50px;
                img{
                    vertical-align:text-top;
                }
                .mint-popup{
                    height:60px;
                    top:75px;
                    text-align: left;
                    width: 40%;
                    margin-left: 32%;
                    .mint-radiolist-title{
                        display:none;
                    }
                }
            }
        }
        
    }
</style>

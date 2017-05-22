<template>
  <div class="search">
    <img src="../assets/search.png" width="24" @click="toggleSearch"/>
    
    <mt-popup
    v-model="popupSearch"
    position="middle">
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
    toggleSearch(){
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
            this.$emit('filter',newValue);
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
                    top:70px;
                    text-align:left;
                    .mint-radiolist-title{
                        display:none;
                    }
                }
            }
        }
        
    }
</style>

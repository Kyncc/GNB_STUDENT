<template>
  <div class='settings'>
    <x-header :left-options="{showBack: true}">设置</x-header>
    <group>
      <cell title="应用评价" link="javascript:;" @click="_openStore">
        <span class="demo-icon" slot="icon"></span>
      </cell>
      <cell title="意见反馈" link="advice">
        <span class="demo-icon" slot="icon"></span>
      </cell>
      <cell title="修改密码" link="resetPwd">
        <span class="demo-icon" slot="icon"></span>
      </cell>
      <cell title="退出登录" @click="_quitlogin">
        <span class="demo-icon" slot="icon"></span>
      </cell>
      <cell title="清除缓存" @click="_clear" >
        <span class="demo-icon" slot="icon"></span>
      </cell>
    </group>
    <alert :show.sync="show" title="清除缓存成功"></alert>
    <confirm :show.sync="quit" confirm-text="确定" cancel-text="取消" title="是否退出登录" @on-confirm="_quit('确认')" @on-cancel="_quit('取消')"></confirm>
  </div>
</template>

<script>
import { XHeader,Cell,Group,Alert,Confirm} from 'vux'
import { mapActions,mapGetters } from 'vuex'

export default {
  components: {
    XHeader,Cell,Group,Alert,Confirm
  },
  data() {
    return {
      show: false,
      quit:false
    }
  },
  methods: {
    _clear() {
      this.show = true
    },
    _quitlogin(){
        this.quit = true
    },
    _quit(type) {
        if(type=='确认'){
            localStorage.removeItem('token');
            try{
              plus.runtime.restart(); //重启应用
            }catch(e){
              this.$router.go('/login');
            }
        }
    },
    _openQQ() {
      window.location.href = "mqqapi://card/show_pslcard?src_type=internal&version=1&uin=458410557&card_type=group&source=qrcode";
    },
    _openStore() {
      if(this.System == 'IOS' ){
         window.location.href = "itms-apps://itunes.apple.com/gb/app/yi-dong-cai-bian/id391945719?mt=8"; 
         return; 
      }
      window.location.href = "market://details?id=com.sanbao.guinaben.student";
    }
  },
  computed:{
    ...mapGetters(['System'])
  }
}
</script>
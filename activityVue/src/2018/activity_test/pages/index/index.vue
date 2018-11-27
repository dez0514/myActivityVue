<template>
  <div>
    <div class="btn" @click="clickShare">btn</div>
    <share v-model="shareShow"></share>
  </div>
</template>

<script>
import Share from '../../../../components/share/share.vue'
  export default {
    data() {
      return {
        shareShow: false
      }
    },
    components: {
      Share
    },
    methods: {
      clickShare() {
        console.log(1)
        this.shareShow = !this.shareShow
      }
    },
    mounted() {
      let a = this.getQueryString('id')
      console.log(a)
      // console.log('store:',this.$store)
      console.log('mediator:',this.$mediator)
    }
  }
</script>
<style lang="scss" scoped>
@import '../../styles/variable.scss';
.btn {
  width: Px(100);
  height: Px(80);
  line-height: Px(80);
  background: pink;
  text-align: center;
}
</style>



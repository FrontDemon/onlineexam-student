<template>
  <section class="paper_container">
    试卷容器
  </section>
  <!--<section class="paper_container">
    <section class="single_que">
      <div class="single_content">
        <span class="que_type">(单选题)</span>
        <span class="que_content">{{singleQueList[0].singleContent}}<span class="que_score">[{{paperInfo.singleScore}}分]</span></span>

        <div class="single_option" v-for="(item, index) in singleQueList[0].options" :key="index">
&lt;!&ndash;          <mt-radio
            v-model="singleAnswer"
            :options="singleQueList[0].options">
          </mt-radio>&ndash;&gt;
          <mu-radio :value="item.value" v-model="singleAnswer"  :label="item.label"></mu-radio>
        </div>
      </div>
    </section>

    &lt;!&ndash;上一题和下一题按钮&ndash;&gt;
    <div class="paper_button">
      <mt-button type="primary" :disabled="currentIndex < 1">{{currentIndex < 1 ? '无' : '上一题'}}</mt-button>
      <mt-button type="primary" @click.native="">下一题</mt-button>
    </div>-->
  </section>
</template>

<script>
  export default {
    name: "",
    data() {
      return {}
    },
    created(){
      console.log(this.$route.params.paperId)
    },
    methods: {}
  }
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>

</style>

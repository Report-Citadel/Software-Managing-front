<template>
  <div>
    <div
      style="
        margin-bottom: 30px;
        color: grey;
        font: 32px Microsoft YaHei;
        font-weigh: 900;
        text-align: center;
      "
    >
      {{ title }}
    </div>
  </div>
</template>

<script>
export default {
  name: "RZC",
  components: {},
  data() {
    return {
      id: "",
      title: "",
    };
  },

  methods: {
    getParams: function () {
      this.id = this.$route.query.id;
      this.title = this.$route.query.title;
    },
  },

  mounted() {
    this.getParams();
  },
};
</script>

<style scoped>
</style>


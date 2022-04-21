<template>
  <el-table
    :data="
      stuList.filter(
        (data) =>
          !searchP ||
          data.name.toLowerCase().includes(searchP.toLowerCase()) ||
          data.id.toLowerCase().includes(searchP.toLowerCase()) ||
          data.role.toLowerCase().includes(searchP.toLowerCase())
      )
    "
    style="width: 100%"
  >
    <el-table-column prop="s_id" label="学号" sortable />
    <el-table-column prop="name" label="姓名" sortable />
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      searchP: "",
      searchG: "",
      class_id: "",
      stuList: [],
      groupData: [
        {
          leader: "组长",
          member: [
            {
              name: "1",
            },
            {
              name: "2",
            },
          ],
        },
        {
          leader: "组长",
          member: [
            {
              name: "1",
            },
            {
              name: "2",
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    filterIdentity(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    getStuList() {

    },
    getParams: function () {

    },
  },
  mounted() {

  },
};
</script>

<style scoped>
.box-card {
  border-radius: 15px;
  box-shadow: 7px 7px 10px rgba(0, 0, 0, 0.15);
}
.el-card {
  margin-bottom: 20px;
  margin-top: 15px;
}
</style>

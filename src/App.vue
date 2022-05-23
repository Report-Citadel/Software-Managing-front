<template>
  <div id="app">
    <div id="nav">
      <!-- <a href="/"><img src="@/assets/SystemLogo.png" /></a> -->
      <el-menu :default-active="activeIndex" class="el-menu-demo" id="el-menu-demo" mode="horizontal" @select="handleSelect" style="background-color: unset">
      <el-menu-item index="1" disabled style="opacity:0.8"><img src="@/assets/SystemLogo.png" /></el-menu-item>
      <el-menu-item index="2"><a href="/" target="_blank">主页</a></el-menu-item>
    </el-menu>
    </div>
    <router-view />
  </div>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  padding: 1px;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, #8ab9eb),
    color-stop(40%, #5c9ddc),
    color-stop(100%, #2374c5)
  );
  box-shadow: 2px 2px 2px #888888;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #f8f8f8;
}


.naviga {
  color: white;
  float: right;
}
</style>

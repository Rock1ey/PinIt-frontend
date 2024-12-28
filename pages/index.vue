<template>
  <div class="home">
    <div class="content">
      <h1>欢迎来到MapPost</h1>
      <img src="../assets/logo.jpg" alt="MapPost Logo" class="logo" />
      <h2>您的社交地图探索平台！</h2>
      <p>在这里，您可以在地图上标记任何您钟爱的地方，分享您的旅行故事和生活点滴。</p>
      <p>通过我们的应用，您可以轻松发现全球各地的隐藏宝藏，与其他用户互动，评论和收藏您感兴趣的帖子。</p>
      <p>加入 MapPost，开始您的探索之旅，与世界分享您的视角。</p>
      <p>让我们一起绘制一个充满故事的世界地图！</p>
      <div class="actions">
        <NuxtLink to="/login" class="button">  登录  </NuxtLink>
        <NuxtLink to="/register" class="button">  注册  </NuxtLink>
      </div>
    </div>
  </div>
</template>

 <style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.9); /* 半透明白色背景 */
  background-image: url('../assets/background.png');
}

.content {
  border: 2px solid #ccc; /* 添加边框 */
  border-radius: 8px; /* 可选，为边框添加圆角 */
  padding: 20px; /* 为内容添加内边距 */
  text-align: center; /* 使内容居中 */
  line-height: 2;
  backdrop-filter:blur;
}

.button {
  display: inline-block;
  margin: 5px;
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  margin-top: 20px;
}

.button:hover {
  background-color: #369f7e;
}

.logo {
  width: 200px; /* 设置图片宽度 */
  height: auto; /* 高度自动调整 */
}
</style>
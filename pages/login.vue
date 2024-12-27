<template>
  <div class="login-container">
    <div class="login-box">
      <h2 class="txt">登录</h2>
      <div class="form-container">
        <input 
          type="text" 
          v-model="loginForm.username" 
          placeholder="用户名"
          class="input-field"
        >
        <input 
          type="password" 
          v-model="loginForm.password" 
          placeholder="密码"
          class="input-field"
        >
        <button class="login-btn" @click="handleLogin">登录</button>
        <p class="register-link">
          还没有账户？
          <router-link to="/register">注册</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    handleLogin() {
      if (!this.loginForm.username || !this.loginForm.password) {
        alert('请填写完整信息');
        return;
      }
      // 模拟登录验证
      const isValidLogin = this.loginForm.username === '123' && this.loginForm.password === '123';
      
      if (isValidLogin) {
        // 登录成功，跳转到主页
        this.$router.push('/home'); // 跳转到根路径，即主页
      } else {
        // 登录失败，提示用户
        alert('用户名或密码错误');
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  background-color: #f0f7ff;
  position: relative;
  overflow: hidden;
  background-image: url('../assets/background.png');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column; /* 确保子元素垂直排列 */
  justify-content: center; /* 垂直居中 */
  align-items: center; /* 水平居中 */
}

.login-box {
  border: 2px solid #ccc; /* 添加边框 */
  border-radius: 8px; /* 可选，为边框添加圆角 */
  backdrop-filter:blur;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 400px;
  margin: 120px auto;
  padding: 30px;
  text-align: center; /* 使内容居中 */
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top:50px;
}

.input-field {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.login-btn {
  background-color: #42b983;
  color: white;
  margin-top:40px;
  padding: 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.login-btn:hover {
  background: #66b1ff;
}

.register-link {
  text-align: center;
  font-size: 14px;
  color: #666;
}

.register-link a {
  color: #409EFF;
  text-decoration: none;
}

.txt {
  margin:20px;
}
</style>
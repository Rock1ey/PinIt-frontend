<template>
  <div class="register-container">
    <div class="register-box">
      <h2>注册</h2>

      <div class="form-container">
        <input 
          type="text" 
          v-model="registerForm.phone" 
          placeholder="手机号"
          class="input-field"
          @blur="validatePhone"
        >
        <div class="error-message" v-if="phoneError">{{ phoneError }}</div>

        <input 
          type="text" 
          v-model="registerForm.username" 
          placeholder="用户名"
          class="input-field"
        >

        <input 
          type="password" 
          v-model="registerForm.password" 
          placeholder="密码"
          class="input-field"
        >

        <button class="register-btn" @click="handleRegister">注册</button>
        <p class="login-link">
          已有账户？
          <router-link to="/login">返回登录</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      registerForm: {
        phone: '',
        username: '',
        password: ''
      },
      phoneError: ''
    }
  },
  methods: {
    validatePhone() {
      const phoneRegex = /^1[3-9]\d{9}$/
      if (!this.registerForm.phone) {
        this.phoneError = '请输入手机号'
      } else if (!phoneRegex.test(this.registerForm.phone)) {
        this.phoneError = '请输入正确的手机号格式'
      } else {
        this.phoneError = ''
      }
    },
    handleRegister() {
      this.validatePhone()
      if (this.phoneError) {
        return
      }
      if (!this.registerForm.username || !this.registerForm.password) {
        alert('请填写完整信息')
        return
      }
      console.log('注册:', this.registerForm)
    }
  }
}
</script>

<style scoped>
.register-container {
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

.register-box {
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
}

.input-field {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.error-message {
  color: #f56c6c;
  font-size: 12px;
  margin-top: -10px;
}

.register-btn {
  background-color: #42b983;
  color: white;
  padding: 12px;
  margin-top:20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.register-btn:hover {
  background: #66b1ff;
}

.login-link {
  text-align: center;
  font-size: 14px;
  color: #666;
}

.login-link a {
  color: #409EFF;
  text-decoration: none;
}
</style>
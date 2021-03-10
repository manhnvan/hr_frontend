<template>
  <div class="login-container">
    <div class="login-form">
      <h1>Đăng nhập</h1>
      <p>{{message}}</p>
      <form>
        <b-form-group label="Email:" label-for="input-2">
          <b-form-input id="input-2" v-model="email" placeholder="Nhập email" required></b-form-input>
        </b-form-group>
        <b-form-group label="Password:">
          <b-form-input v-model="password" placeholder="Nhập mật khẩu" type="password" required></b-form-input>
        </b-form-group>

        <b-form-group v-if="loginFailedCount >= 5" label="Captcha">
          <span>captcha {{serverCaptcha}}</span>
          <b-form-input v-model="captcha" placeholder="Enter name" required></b-form-input>
        </b-form-group>

        <b-button variant="success" @click="loginHandler">Đăng nhập</b-button>
      </form>
    </div>
  </div>
</template>

<script>
import employeeApi from "../../apis/employee.api";

export default {
  data() {
    return {
      email: "",
      password: "",
      message: "",
      serverCaptcha: null,
      captcha: null,
      loginFailedCount: 0
    };
  },
  methods: {
    loginHandler: async function() {
      const response = await employeeApi.login(
        this.email,
        this.password,
        this.captcha
      );
      console.log(response.success);
      if (response.success) {
        const { user, token } = response;
        localStorage.setItem("token", token);
        this.$store.dispatch("setUserInformation", user);

        if (user.role_id === 7) {
          this.$router.push({ path: "admin" });
        } else {
          this.$router.push({ path: "employee" });
        }
      } else {
        const { message, login_failed_count, captcha } = response;
        this.message = message;
        this.loginFailedCount = login_failed_count;
        this.serverCaptcha = captcha;
        console.log(this.captcha);
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  background: linear-gradient(20deg, #e66465, #9198e5);
  height: 100vh;
}

.login-form {
  width: 500px;
  background: white;
  padding: 40px 20px 20px 30px;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.login-form h1 {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.login-container button {
  margin-left: auto;
  margin-right: auto;
}
</style>
<template>
  <div class="employee-profile">
    <div class="logout-button">
      <b-button variant="danger" @click="logoutHandler">Đăng xuất</b-button>
    </div>
    <div class="employee-avatar">
      <img src="../../assets/logo.png" />
    </div>

    <b-container>
      <div class="employee-information">
        <b-form>
          <b-form-group label="Email:" label-for="input-1">
            <b-form-input type="email" v-model="email" placeholder="Enter email" required></b-form-input>
          </b-form-group>

          <b-form-group label="Tên:" label-for="input-2">
            <b-form-input v-model="first_name" placeholder="Nhập tên của bạn" required></b-form-input>
          </b-form-group>

          <b-form-group label="Họ:" label-for="input-2">
            <b-form-input v-model="last_name" placeholder="Nhập họ của bạn" required></b-form-input>
          </b-form-group>

          <b-form-group label="Số điện thoại:" label-for="input-3">
            <b-form-input v-model="phone_number" placeholder="Nhập số điện thoại" required></b-form-input>
          </b-form-group>

          <b-form-group label="Làm việc tại:" label-for="input-3">
            <b-form-select v-model="department_id" :options="departmentSelectOptions" required></b-form-select>
          </b-form-group>

          <b-form-group label="Vai trò:" label-for="input-3">
            <b-form-select v-model="role_id" :options="rolesSelectOptions" required></b-form-select>
          </b-form-group>

          <b-form-group label="Lương cứng:" label-for="input-3">
            <b-form-input v-model="hard_salary" placeholder="Nhập số lương" required></b-form-input>
          </b-form-group>
        </b-form>
        <b-button variant="success" @click="submitEditEmployeeInformationHandler">Cập nhật</b-button>
      </div>
    </b-container>
  </div>
</template>

<script>
import employAPI from "../../apis/employee.api";

export default {
  data() {
    return {
      id: null,
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
      role_id: null,
      department_id: null,
      hard_salary: null,
      createdEmployeeSuccessfully: false,
      createdEmployeeFailt: false
    };
  },
  created: async function() {
    if (this.$store.getters.departmentList.length === 0) {
      this.$store.dispatch("fetchDepartmentData");
    }
    if (this.$store.getters.roleList.length === 0) {
      this.$store.dispatch("fetchRoleData");
    }
    const {
      id,
      first_name,
      last_name,
      phone_number,
      email,
      role_id,
      department_id,
      hard_salary
    } = this.$store.getters.userInformation;
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.phone_number = phone_number;
    this.email = email;
    this.role_id = role_id;
    this.department_id = department_id;
    this.hard_salary = hard_salary;
  },
  computed: {
    rolesSelectOptions: function() {
      return this.$store.getters.roleList.map(role => {
        return {
          text: role.title,
          value: role.id
        };
      });
    },
    departmentSelectOptions: function() {
      return this.$store.getters.departmentList.map(department => {
        return {
          text: department.name,
          value: department.id
        };
      });
    }
  },
  methods: {
    submitEditEmployeeInformationHandler: async function() {
      const response = await employAPI.updateEmployeeInformation(this.id, {
        first_name: this.first_name,
        last_name: this.last_name,
        phone_number: this.phone_number,
        email: this.email,
        role_id: this.role_id,
        department_id: this.department_id,
        hard_salary: this.hard_salary
      });
      if (!response.success) {
        this.createdEmployeeFailt = true;
      } else {
        this.createdEmployeeSuccessfully = true;
        this.$store.dispatch("fetchEmployeesData");
      }
    },
    logoutHandler: async function() {
      this.$router.push({ path: "login" });
      localStorage.removeItem("token");
    }
  }
};
</script>

<style scope>
.logout-button {
  position: absolute;
  right: 10px;
  top: 10px;
}

.employee-profile {
  margin-top: 70px;
  text-align: center;
}

.employee-information {
  text-align: start;
}
</style>

<template>
  <div>
    <b-alert v-model="createdEmployeeFailt" variant="danger" dismissible>Tạo nhân viên mới thất bại</b-alert>

    <b-alert
      v-model="createdEmployeeSuccessfully"
      variant="success"
      dismissible
    >Tạo nhân viên mới thành công</b-alert>

    <div class="create-button">
      <b-button @click="$bvModal.show('employee-create-modal')">Thêm nhân viên mới</b-button>
    </div>

    <b-modal id="employee-create-modal" size="lg" title="Thêm nhân viên mới">
      <div>
        <b-form>
          <b-form-group label="Email:">
            <b-form-input type="email" v-model="email" placeholder="Enter email" required></b-form-input>
          </b-form-group>

          <b-form-group label="Tên:">
            <b-form-input v-model="first_name" placeholder="Nhập tên của bạn" required></b-form-input>
          </b-form-group>

          <b-form-group label="Họ:">
            <b-form-input v-model="last_name" placeholder="Nhập họ của bạn" required></b-form-input>
          </b-form-group>

          <b-form-group label="Số điện thoại:">
            <b-form-input v-model="phone_number" placeholder="Nhập số điện thoại" required></b-form-input>
          </b-form-group>

          <b-form-group label="Làm việc tại:">
            <b-form-select v-model="department_id" :options="departmentSelectOptions" required></b-form-select>
          </b-form-group>

          <b-form-group label="Vai trò:">
            <b-form-select v-model="role_id" :options="rolesSelectOptions" required></b-form-select>
          </b-form-group>

          <b-form-group label="Lương cứng:">
            <b-form-input v-model="hard_salary" placeholder="Nhập số lương" required></b-form-input>
          </b-form-group>

          <b-form-group label="Mật khẩu:">
            <b-form-input v-model="password" placeholder="Nhập mật khẩu" required></b-form-input>
          </b-form-group>
        </b-form>
      </div>

      <template #modal-footer>
        <div class="w-100">
          <b-button
            variant="primary"
            size="md"
            class="float-right ml-3"
            @click="$bvModal.hide('employee-create-modal')"
          >Đóng</b-button>
          <b-button
            variant="primary"
            size="md"
            class="float-right ml-3"
            @click="submitCreateEmployeeHandler"
          >Tạo</b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import departmentApi from "../../../apis/department.api";
import roleApi from "../../../apis/role.api";
import EmployAPI from "../../../apis/employee.api";

export default {
  props: {},
  data() {
    return {
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
      password: "",
      role_id: null,
      department_id: null,
      hard_salary: null,
      departments: [],
      roles: [],
      createdEmployeeSuccessfully: false,
      createdEmployeeFailt: false
    };
  },
  created: async function() {
    Promise.all([
      departmentApi.fetchAllDepartmentInformation(),
      roleApi.fetchAllRoleInformation()
    ]).then(result => {
      this.departments = result[0].departments;
      this.roles = result[1].roles;
    });
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
    submitCreateEmployeeHandler: async function() {
      const response = await EmployAPI.createNewEmployee({
        first_name: this.first_name,
        last_name: this.last_name,
        phone_number: this.phone_number,
        email: this.email,
        role_id: this.role_id,
        department_id: this.department_id,
        hard_salary: this.hard_salary,
        password: this.password
      });
      if (!response.success) {
        this.createdEmployeeFailt = true;
      } else {
        this.createdEmployeeSuccessfully = true;
        this.$store.dispatch("fetchEmployeesData");
      }
    }
  }
};
</script>

<style scoped>
.create-button {
  display: flex;
  margin-top: 20px;
}

.create-button button {
  margin-left: auto;
}
</style>
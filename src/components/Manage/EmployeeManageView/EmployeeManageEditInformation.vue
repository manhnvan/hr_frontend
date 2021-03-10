<template>
  <span class="eidt-button">
    <b-button size="sm" @click="$bvModal.show(modalId)" variant="success" class="mr-2">
      <i class="far fa-edit"></i>
    </b-button>

    <b-modal :id="modalId" size="lg" title="Thêm nhân viên mới">
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
        </b-form>
      </div>

      <template #modal-footer>
        <div class="w-100">
          <b-button
            variant="primary"
            size="md"
            class="float-right ml-3"
            @click="$bvModal.hide(modalId)"
          >Đóng</b-button>
          <b-button
            variant="primary"
            size="md"
            class="float-right ml-3"
            @click="submitEditEmployeeInformationHandler"
          >Chỉnh sửa</b-button>
        </div>
      </template>
    </b-modal>
  </span>
</template>

<script>
import employAPI from "../../../apis/employee.api";

export default {
  props: {
    information: Object
  },
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
    const {
      id,
      first_name,
      last_name,
      phone_number,
      email,
      role_id,
      department_id,
      hard_salary
    } = this.information;
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
      const roles = this.$store.getters.roleList;
      return roles.map(role => {
        return {
          text: role.title,
          value: role.id
        };
      });
    },
    departmentSelectOptions: function() {
      const departments = this.$store.getters.departmentList;
      return departments.map(department => {
        return {
          text: department.name,
          value: department.id
        };
      });
    },
    modalId: function() {
      return "employee-edit-modal-" + this.information.id;
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
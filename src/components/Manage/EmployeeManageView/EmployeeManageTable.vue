<template>
  <div>
    <b-table striped hover :items="employeeList" :fields="fields">
      <template #cell(actions)="row">
        <employee-manage-edit-information :information="row.item" />
        <emplyee-manage-delete-employee :information="row.item" />
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import EmployeeManageEditInformation from "./EmployeeManageEditInformation";
import EmployeeManageDeleteEmloyee from "./EmpoyeeManageDeleteEmployee";

export default {
  components: {
    "employee-manage-edit-information": EmployeeManageEditInformation,
    "emplyee-manage-delete-employee": EmployeeManageDeleteEmloyee
  },
  data() {
    return {
      fields: [
        "id",
        "first_name",
        "last_name",
        { key: "role.title", label: "Role" },
        "phone_number",
        "email",
        { key: "department.name", label: "Department" },
        "hard_salary",
        "actions"
      ],
      items: []
    };
  },
  created: async function() {
    this.$store.dispatch("fetchEmployeesData");
  },
  methods: {},
  computed: {
    ...mapGetters(["employeeList"])
  }
};
</script>
<template>
  <span>
    <b-button size="sm" @click="$bvModal.show(modalId)" variant="danger" class="mr-2">
      <i class="fas fa-trash"></i>
    </b-button>
    <b-modal :id="modalId" title="Xóa thông tin nhân viên">
      <p class="my-4">Bạn có chắc muốn xóa thông tin nhân viên {{information.name}}</p>
      <template #modal-footer>
        <div class="w-100">
          <b-button
            variant="primary"
            size="md"
            class="float-right ml-3"
            @click="$bvModal.hide(modalId)"
          >Đóng</b-button>
          <b-button
            variant="danger"
            size="md"
            class="float-right ml-3"
            @click="deleteEmployeeInformationHandler"
          >Xóa</b-button>
        </div>
      </template>
    </b-modal>
  </span>
</template>

<script>
import employeeApi from "../../../apis/employee.api";

export default {
  props: {
    information: Object
  },
  data() {
    return {};
  },
  computed: {
    modalId: function() {
      console.log(this.information);
      return "delete-employee-modal-" + this.information.id;
    }
  },
  methods: {
    deleteEmployeeInformationHandler: async function() {
      const response = await employeeApi.deleteEmployeeInformation(
        this.information.id
      );

      console.log(response);
      if (response.success) {
        this.$store.dispatch("fetchEmployeesData");
      } else {
        console.log(response);
      }
    }
  }
};
</script>

<style>
</style>
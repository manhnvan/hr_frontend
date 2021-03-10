<template>
  <b-container>
    <div class="create-modal">
      <EmployeeManageCreateEmployeeModal />
    </div>
    <div>
      <EmployeeManageTable />
    </div>
  </b-container>
</template>

<script>
import EmployeeManageTable from "./EmployeeManageTable";
import EmployeeManageCreateEmployeeModal from "./EmployeeManageCreateEmployeeModal";

export default {
  components: {
    EmployeeManageTable,
    EmployeeManageCreateEmployeeModal
  }
};
</script>

<style scope>
.create-modal {
  margin-top: 70px;
  margin-bottom: 20px;
}
</style>
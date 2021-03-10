<template>
  <div class="layout">
    <input type="checkbox" id="check-sidebar-button" />
    <header>
      <div class="left-area">
        <label for="check-sidebar-button">
          <div class="burger">
            <div class="slide"></div>
            <div class="slide"></div>
            <div class="slide"></div>
          </div>
        </label>
        <span>Stringee Human Resourses</span>
      </div>
      <div class="right-area">
        <b-button variant="danger" @click="logoutHandler">Đăng xuất</b-button>
      </div>
    </header>

    <div class="sidebar">
      <div class="avatar">
        <img src="../../assets/logo.png" />
      </div>
      <div class="sidebar-item">
        <i class="fas fa-user-friends"></i>
        <span>Employees</span>
      </div>
      <div class="sidebar-item">
        <i class="fas fa-building"></i>
        <span>Departments</span>
      </div>
      <div class="sidebar-item">
        <i class="fas fa-user-tag"></i>
        <span>Roles</span>
      </div>
      <div class="sidebar-item">
        <i class="fas fa-tasks"></i>
        <span>Tasks</span>
      </div>
      <div class="sidebar-item">
        <i class="fas fa-file-word"></i>
        <span>Reports</span>
      </div>
    </div>

    <div class="view">
      <EmployeeManageView></EmployeeManageView>
    </div>
  </div>
</template>

<script>
import EmployeeManageView from "../Manage/EmployeeManageView/EmployeeManageView";

export default {
  components: {
    EmployeeManageView
  },
  data() {
    return {
      isOpenSidebar: false
    };
  },
  created: async function() {
    this.$store.dispatch("fetchEmployeesData");
    this.$store.dispatch("fetchDepartmentData");
    this.$store.dispatch("fetchRoleData");
  },
  computed: {},
  methods: {
    logoutHandler: async function() {
      this.$router.push({ path: "login" });
      localStorage.removeItem("token");
    }
  },
  watch: {
    isOpenSidebar: function() {
      console.log(this.isOpenSidebar);
    }
  }
};
</script>

<style scoped>
#check-sidebar-button {
  display: none;
}

header {
  position: fixed;
  background: #222f3e;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
}

.left-area span {
  color: #fff;
  margin: 0;
  text-transform: uppercase;
  font-size: 22px;
  font-weight: 900;
}

.left-area label {
  margin: 0px;
  padding: 0px;
}

.left-area label .burger {
  display: inline-block;
  height: 100%;
  margin-right: 20px;
  margin-left: 10px;
  z-index: 1;
}

.left-area .burger .slide {
  width: 25px;
  height: 3px;
  background: #fff;
  margin-bottom: 3px;
}

.right-area {
  margin-left: auto;
  margin-right: 20px;
}

.sidebar {
  background: #222f3e;
  margin-top: 50px;
  padding-top: 30px;
  position: fixed;
  left: 0;
  width: 250px;
  height: 100%;
  transition: 0.5s;
  transition-property: left;
}

.sidebar .avatar {
  text-align: center;
}

.sidebar .avatar img {
  margin-top: 40px;
  width: 100px;
  margin-bottom: 40px;
}

.sidebar .sidebar-item img {
  height: 20px;
  margin-right: 10px;
}

.sidebar-item {
  color: white;
  line-height: 60px;
  padding-left: 30px;
  font-size: 1.3rem;
  font-weight: bolder;
  box-sizing: border-box;
  transition: 0.5s;
}

.sidebar-item span {
  margin-left: 15px;
}

.sidebar-item:hover {
  background: #0d9dbb;
}

.sidebar .sidebar-item img {
  height: 20px;
  margin-right: 10px;
}

#check-sidebar-button:checked ~ .sidebar {
  left: -190px;
}

#check-sidebar-button:checked ~ .sidebar .sidebar-item span {
  display: none;
}

#check-sidebar-button:checked ~ .sidebar .sidebar-item i {
  margin-left: 175px;
}

.view {
  margin-left: 250px;
  padding-top: 50px;
  transition: 0.5s;
}

#check-sidebar-button:checked ~ .view {
  margin-left: 60px;
}
</style>

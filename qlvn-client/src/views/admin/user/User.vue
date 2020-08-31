<template>
  <div>
    <Toast />
    <Toast position="top-right" />
    <div class="title-user-home text-left">
      <h1 class="h3 mb-2 text-gray-800">Danh sách nhân viên</h1>
      <p class="mb-4">Thông tin danh sách các nhân viên.</p>
    </div>
    <div class="button-action">
      <Toolbar>
        <template slot="right">
          <Button label="Tạo mới" icon="pi pi-plus" class="p-mr-2" />
          <button type="button" class="p-button p-component p-button-secondary">
            <span class="pi pi-download p-button-icon p-button-icon-left"></span>
            <span class="p-button-label">Tải xuống</span>
          </button>
          <input type="file" id="file" class="inputfile" name="attachment[]" @change="onFileChange" multiple>
          <label for="file"><i class="pi pi-upload"></i>
            <span v-if="files.length==0">Tải lên</span>
            <span v-else>{{files.length}} file đã được tải lên</span>
          </label>
          <button v-if="files.length!=0" type="button" class="p-button p-component">
            <span class="pi pi-upload p-button-icon p-button-icon-left"></span>
            <span class="p-button-label">Tải lên</span>
          </button>
          <button v-if="files.length!=0" type="button" class="p-button p-component p-button-danger" @click="resetFileUpload">
            <span class="pi pi-times p-button-icon p-button-icon-left"></span>
            <span class="p-button-label">Cancel</span>
          </button>
        </template>
      </Toolbar>
      <div :class="files.length!=0 ? 'fileNameUpload show' : 'fileNameUpload'">
        <h6>Thông tin File tải lên</h6>
        <div v-for="(item, index) in files" :key="index">
          <span>{{item.name}}</span>
        </div>
      </div>
    </div>
    <DataTable :value="data" :paginator="true" :rows="10"
               paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
               :rowsPerPageOptions="[10,20,50]"
               currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
      <Column field="name" header="Tên nhân viên"></Column>
      <Column field="email" header="Địa chỉ email"></Column>
      <Column field="phone" header="Số điện thoại"></Column>
      <Column field="roles_name" header="Quyền hạn"></Column>
      <template #paginatorLeft>
        <Button type="button" icon="pi pi-refresh" class="p-button-text" />
      </template>
      <template #paginatorRight>
        <Button type="button" icon="pi pi-cloud" class="p-button-text" />
      </template>
    </DataTable>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        userList: null,
        data: [
          {"name": "Volkswagen", "email": 2012, "roles_name": "Orange", "phone": "dsad231ff"},
          {"name": "Audi", "email": 2011, "roles_name": "Black", "phone": "gwregre345"},
          {"name": "Renault", "email": 2005, "roles_name": "Gray", "phone": "h354htr"},
          {"name": "BMW", "email": 2003, "roles_name": "Blue", "phone": "j6w54qgh"},
          {"name": "Mercedes", "email": 1995, "roles_name": "phone", "vin": "hrtwy34"},
          {"name": "Volvo", "email": 2005, "roles_name": "Black", "phone": "jejtyj"},
          {"name": "Honda", "email": 2012, "roles_name": "Yellow", "phone": "g43gr"},
          {"name": "Jaguar", "email": 2013, "roles_name": "Orange", "phone": "greg34"},
          {"name": "Ford", "email": 2000, "roles_name": "Black", "phone": "h54hw5"},
          {"name": "Fiat", "email": 2013, "roles_name": "Red", "phone": "245t2s"}
        ],
        files: [],
        filename: '',
        messages: [],
      }
    },
    methods: {
      onFileChange(event) {
        this.files = event.target.files || event.dataTransfer.files;
        if (!this.files.length)
          this.$toast.add({severity:'error', summary: 'Thông báo lỗi', detail:'Upload file không thành công', life: 3000});
      },
      resetFileUpload(){
        this.files = [];
      }
    },
    created() {

    },
    mounted() {
    }
  }
</script>
<style>
  .title-user-home h1{
    font-size: 25px !important;
    font-weight: 700 !important;
  }
  .button-action Button{
    margin-right: 10px;
  }
  .button-action .p-toolbar {
    border: none;
  }
  .inputfile {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }
  .button-action label{
    color: #ffffff;
    background: #689F38;
    border: 1px solid #689F38;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
    border-radius: 3px;
    margin-bottom: 0;
    cursor: pointer;
    margin-right: 0.5rem;
  }
  .button-action label i{
    margin-right: 0.5rem;
  }
  .fileNameUpload{
    display: none;
    text-align: right;
    padding-right: 2rem;
  }
  .show{
    display: block;
  }
</style>
<template>
  <div>
    <p>{{ $t('message.hello') }}</p>
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
          <button v-if="files.length!=0" type="button" class="p-button p-component p-button-danger" @click="resetFiles">
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
      <Column field="username" header="Tên nhân viên"></Column>
      <Column field="email" header="Địa chỉ email"></Column>
      <Column field="phone" header="Số điện thoại"></Column>
      <Column field="roles_id" header="Quyền hạn"></Column>
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
import http from '../../../http-common';
import { mapGetters, mapActions } from 'vuex';
  export default {
    // data() {
    //   return {
    //     userList: null,
    //     data: [],
    //     files: [],
    //     filename: '',
    //     messages: []
    //   }
    // },
    methods: {
      async onFileChange(event) {
        this.setFiles(event.target.files || event.dataTransfer.files);
        let formData = new FormData();
        console.log(this.files.length);
        for(var i=0;i<this.files.length;i++){
          let file = this.files[i];
          let fileBase64 = await this.getBase64(file);
          formData.append('files', fileBase64);
        }

        console.log(formData.getAll("files"));
        http.post( '/uploadBase64', formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          },
        }
        ).then(
          (res) =>{
            alert(res.data.message);
            
          }
        ).then(this.updateUserList);
        
        if (!this.files.length)
          this.$toast.add({severity:'error', summary: 'Thông báo lỗi', detail:'Upload file không thành công', life: 3000});
      },
      // resetFileUpload(){
      //   this.files = [];
      // },
      getBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      },
      ...mapActions(['setFiles','resetFiles','updateUserList']),
      // async updateList(){
       
      //   await http.get('/api/admin/user/all')
      //   .then(res => {
      //     this.data = res.data.object;
          
      //     });
      // }
    },
    computed: mapGetters(['userList','data','files','filename','messages']),
    created() {
      
    },
    mounted() {
      this.updateUserList()
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
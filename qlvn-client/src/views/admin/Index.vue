<template>
    <!-- Page Wrapper -->
    <div id="wrapper">
        <sidebar />
        <config />
        <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column">
            <!-- Main Content -->
            <div id="content">
                <nav-ad></nav-ad>
                <!-- Begin Page Content -->
                <div class="container-fluid">
                    <router-view></router-view>
                </div>
                <!-- /.container-fluid -->
            </div>
            <!-- End of Main Content -->
            <footer-ad></footer-ad>
        </div>
        <!-- End of Content Wrapper -->
    </div>
</template>
<script>
import sidebar from '@/components/common/Sidebar'
import config from '@/components/common/layout_config/LayoutConfig'
import navAdmin from '@/components/common/Nav'
import footerAdmin from '@/components/common/Footer'
export default {
    components: {
        config,
        sidebar,
        'nav-ad': navAdmin,
        'footer-ad': footerAdmin
    },
    data() {
        return {
            test: 'a'
        }
    }
}
</script>
<style>
@import "../../assets/css/customer/sb-admin.css";
@import "../../assets/css/customer/admin.css";
</style>

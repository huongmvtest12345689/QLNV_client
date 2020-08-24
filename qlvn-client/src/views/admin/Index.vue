<template>
    <!-- Page Wrapper -->
    <div id="wrapper">
        <slide></slide>
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
import slideBar from '@/components/common/Sidebar'
import navAdmin from '@/components/common/Nav'
import footerAdmin from '@/components/common/Footer'
export default {
    components: {
        'slide': slideBar,
        'nav-ad': navAdmin,
        'footer-ad': footerAdmin
    }
}
</script>
<style>
@import "../../assets/css/customer/sb-admin.css";
@import "../../assets/css/customer/admin.css";
</style>

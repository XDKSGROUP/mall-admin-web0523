<template>
    <el-dialog :title="title" :visible.sync="show" class="import">
        <div class="download">
            <div class="li">
                1、<a :href="durl">点击下载</a>《导入模板》
            </div>
            <div class="li">
                2、每次最大允许导入1000条，若数据过多，请分批提交
            </div>
            <div class="li">
                3、公支持上传Excel文件，重复数据以最后一条为准
            </div>
        </div>
        <div class="upload">
            <el-upload class="upload-demo" :show-file-list="false" drag accept=".xlsx"
                :action="/^https?\:\/\//.test(url) ? url : baseApiUrl + url" :multiple="false" :headers="headers"
                :before-upload="beforeUpload" :on-success="handleUploadSuccess" :before-close="handleClose">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传xlsx文件，且不超过1mb</div>
            </el-upload>
        </div>
    </el-dialog>
</template>
<script>
import { getToken } from '@/utils/auth';
import config from '@/utils/config';

export default {
    name: 'LImportXlsx',
    model: {
        prop: "isShow",
        event: "isShow",
    },
    props: {
        isShow: Boolean,
        title: String,
        url: String,
        durl: String,
    },
    watch: {
        isShow(nv, ov) {
            this.show = nv;
        },
        show(nv, ov) {
            this.$emit("isShow", nv);
        }
    },
    data() {
        return {
            show: false,
            headers: {
                Authorization: getToken()
            },
            baseApiUrl: config.baseApiUrl,
        };
    },
    methods: {
        beforeUpload(file) {

        },
        handleClose() {
            this.$emit("isShow", false);
        },
        handleUploadSuccess(res, file) {
            this.$message({
                type: res.code == 200 ? "success" : "warning",
                dangerouslyUseHTMLString:true,
                message: res.message.replace(/[\r\n]/g,"<br />")
            });
            this.$emit("success");
        }
    }
}
</script>
<style>
.import .el-dialog__body {
    padding-top: 8px;
}

.download {
    line-height: 24px;
    margin-bottom: 10px;
}
</style>
  
  
  
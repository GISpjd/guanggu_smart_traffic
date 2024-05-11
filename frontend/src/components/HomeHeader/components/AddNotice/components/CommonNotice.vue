<template>
    <div>
        <span>公告标题：</span>
        <input type="text" placeholder="请输入公告标题" v-model="title" /> <br />
        <span>公告内容：</span> <br />
        <textarea name="" id="" cols="30" rows="10" placeholder="请输入公告内容" v-model="content"></textarea>
    </div>
    <div class="footer">
        <el-button @click="publishCommonNotice" type="success">发布公告</el-button>
    </div>
</template>

<script setup>
import { ref, inject, reactive, onMounted } from 'vue'
import { createNotice } from '@/request/noticeHttp';
import { userModules } from '@/stores/userModulesStore'

const title = ref();
const content = ref();
const { userLoginData } = userModules()
// const commonDialogVisible = inject('commonDialogVisible')
// 父组件用v-model传输该值，这边用defineModel编译宏接收一下，实现双向数据流
const commonDialogVisible = defineModel()

const publishCommonNotice = () => {
    if (!title.value || !content.value) {
        alert('公告标题和内容不能为空！');
        return
    } else {
        let userId = userLoginData.value.id
        createNotice(userId, title.value, content.value)
        title.value = ''
        content.value = ''
        alert('发布成功！')
        commonDialogVisible.value = false
    }
}

</script>
<style scoped lang="scss">
div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

input,
textarea {
    width: 90%;
    border: 1px solid #ccc;
    margin-top: 10px;
    border-radius: 5px;
    padding: 8px 12px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    transition: border-color 0.3s, box-shadow 0.3s;

    &:focus {
        border-color: #0056b3;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }
}

textarea {
    height: 200px; // Specific height for better form control

    font-size: 14px;
    line-height: 1.5;
    resize: vertical; // Allows the user to resize the textarea vertically
}

.footer {
    display: flex;
    justify-content: flex-end;
    width: 90%;
    margin-top: 20px;
}

.el-button {
    background-color: #0084ff;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;

    &:hover {
        background-color: #0056b3;
        transform: translateY(-2px);
    }
}
</style>

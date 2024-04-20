export const useUserManageHttp = (form, formRef) => {
  // console.log(form, formRef)
  formRef.value.validate((valid) => {
    if (valid) {
      postTrafficControlUserHttp(form.value.username, form.value.password, 1).then((response) => {
        // console.log(response)
        const { code } = response.data
        if (code === 0) {
          ElMessage({
            message: '添加交管用户成功',
            type: 'success'
          })
          location.reload()
        }
        if (code === 1) {
          ElMessage.error('用户名已存在')
        }
      })
    }
  })
}

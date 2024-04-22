import { onMounted, reactive, ref } from 'vue'
import { postUserLoginHttp, postOrdinaryUserHttp, putUserHttp } from '../request/userHttp'
import { userRules } from '@/Hooks/userRules'

export const userModules = () => {
    const form = reactive({
        username: '',
        password: ''
    })
    const formRef = ref(null)
    const userLoginData = ref({})
    const userRegisterdata = ref({})

    // 注册正则校验
    const { usernameRule, passwordRule } = userRules()
    const rules = reactive({
        username: usernameRule,
        password: passwordRule,
        confirmPassword: [
            { required: true, message: '请再次输入密码', trigger: 'blur' },
            {
                validator: (rule, value, callback) => {
                    if (value !== form.password) {
                        callback(new Error('两次输入密码不一致'))
                    } else {
                        callback()
                    }
                },
                trigger: 'blur'
            }
        ]
    })

    /**
     * 点击登录按钮之后的逻辑
     * @param {*} formRef 
     * @param {*} form 
     * @param {*} router 
     */
    const userLoginHttp = async (formRef, form, router) => {
        await formRef.validate((valid) => {
            if (valid) {
                postUserLoginHttp(form.username, form.password).then(async (response) => {
                    // console.log(response);
                    const { code } = response
                    let { token } = response.result
                    if (code === 0) {
                        // ElMessage.success('登录成功')
                        localStorage.setItem('token', token)
                        userLoginData.value = response.result.data[0]
                        const { id } = await response.result.data[0]
                        localStorage.setItem('userLoginData', JSON.stringify(userLoginData.value))
                        putUserHttp({ id, user_islogin: 1 })
                        router.push({ path: '/' })
                    }
                    if (code === 1) {
                        // ElMessage.error('账号或者密码错误')
                    }
                })
            }
        })
    }

    const userRegisterHttp = (formRef, form, router) => {
        formRef.validate((valid) => {
            if (valid) {
                postOrdinaryUserHttp(form.username, form.password).then((response) => {
                    const { code } = response.data
                    if (code === 0) {
                        ElMessage({
                            message: '注册成功.',
                            type: 'success'
                        })
                        userRegisterdata.value = { username: form.username, passworad: form.password }
                        router.push(`/login?name=${form.username}`)
                    }
                    if (code === 1) {
                        ElMessage.error('用户名已存在')
                    }
                })
            }
        })
    }

    const userModifyHttp = (formRef, form) => {
        if (form.password === form.confirmPassword) {
            formRef.validate((valid) => {
                if (valid) {
                    putUserHttp(form.username, form.password).then((response) => {
                        const { code } = response.data
                        if (code === 0) {
                            ElMessage({
                                message: '修改密码成功',
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
    }

    onMounted(() => userLoginData.value = JSON.parse(localStorage.getItem('userLoginData')))

    return {
        rules,
        form,
        formRef,
        userLoginData,
        userRegisterdata,
        userLoginHttp,
        userModifyHttp,
        userRegisterHttp
    }
}


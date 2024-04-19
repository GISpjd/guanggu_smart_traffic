import { reactive, ref } from 'vue'
import { postUserLoginHttp, postOrdinaryUserHttp, putUserHttp } from '../request/userHttp'
import { userRules } from '@/Hooks/userRules'

export const userMoudles = () => {
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

    const userLoginHttp = async (formRef, form, router) => {

    }
}

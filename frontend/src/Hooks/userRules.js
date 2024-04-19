export const userRules = () => {
    const usernameRule = [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 20, message: '用户名长度在6到20个字符之间', trigger: 'blur' }
    ]
    const passwordRule = [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 8, max: 20, message: '密码长度在8到20个字符之间', trigger: 'blur' },
        {
            // pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,20}$/,
            message: '密码必须包含大小写字母和数字',
            trigger: 'blur'
        }
    ]

    return { usernameRule, passwordRule }
}
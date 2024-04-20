var express = require('express');
var router = express.Router();
const { getOne, getAll, exec } = require('../db/index.js');

const jwt = require('jsonwebtoken')

const { TOKEN_KEY, TIME } = require('../plugins/config.js');

/**
 * 获取符合用户信息
 * GET /users
 */
router.get('/', async (req, res) => {
    try {
        const { page = 1, size = 10, userName } = req.query
        const offset = (page - 1) * size
        let sql
        let total
        let data
        if (userName) {
            sql = `select * from all_user where user_name like ? limit ?,?`
            data = await getAll(sql, [`%${userName}%`, offset, size])
            sql = `select count(*) as total from all_user where user_name like ?`
            total = await getOne(sql, [`%${userName}%`])
        } else {
            sql = `select * from all_user limit ?,?`
            data = await getAll(sql, [offset, size])
            sql = `select count(*) as total from all_user`
            total = await getOne(sql)
        }

        if (data.length) {
            res.send({
                code: 0,
                message: '获取用户数据成功',
                total,
                data
            })
        } else {
            res.send({
                code: 1,
                message: '数据为空'
            })
        }
    } catch (error) {
        res.status(500).send({
            code: 500,
            message: '服务器错误',
            message: error.message
        })
    }
})

/**
 * 根据id获取对应用户信息
 * GET /user/:id
 */
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const sql = `select * from all_user where id = ?`
        const data = getOne(sql, [id])
        if (data.length) {
            res.send({
                code: 0,
                message: '获取用户信息成功',
                data
            })
        }
    } catch (error) {
        res.status(500).send({
            code: 500,
            message: '服务器错误',
            error: error.message
        })
    }
})


/**
 * 用户登入
 * POST /users/login
 */
router.post('/login', async (req, res, next) => {
    try {
        const { user_name, user_password } = req.body;
        let sql = `select * from all_user where user_name=? and user_password=?`;
        const data = await getOne(sql, [user_name, user_password]);
        if (data) {
            let token = jwt.sign({ user_name, user_password }, TOKEN_KEY, {
                expiresIn: TIME
            })
            res.send({
                code: 0,
                message: '登录成功',
                result: { data, token },
            });
        } else {
            res.send({
                code: 1,
                message: '用户名或密码错误',
            });
        }
    } catch (error) {
        res.status(500).send({
            code: 500,
            message: '服务器错误',
            error: error.message
        })
    }
});


/**
 * 添加用户信息
 * POST /users
 */
router.post('/', async (req, res, next) => {
    const { user_name, user_password, user_role } = req.body;
    if (!user_name || !user_password) {
        res.status(400).send({
            code: 400,
            message: '用户名和密码必须提供'
        })
    }

    try {
        const repeatName = await getOne(`select * from all_user where user_name=?`, [user_name]);

        if (!repeatName) {
            let sql = `insert into all_user(user_name, user_password, user_role) values (?, ?, ?)`;
            await exec(sql, [user_name, user_password, user_role || null]); // 使用 null 作为默认角色值
            res.send({
                code: 0,
                message: '添加用户成功',
            });
        } else {
            res.send({
                code: 1,
                message: '用户名已存在',
            });
        }
    } catch (error) {
        res.status(500).send({
            code: 500,
            message: '服务器错误',
            error: error.message
        })
    }
});


/**
 * 修改用户数据
 * PUT /users/:id
 */
router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { user_name, user_password, user_islogin } = req.body;

    // 构建更新的字段和值
    let updates = [];
    let values = [];
    if (user_name != undefined) {
        updates.push("user_name = ?");
        values.push(user_name);
    }
    if (user_password != undefined) {
        updates.push("user_password = ?");
        values.push(user_password);
    }
    if (user_islogin != undefined) {
        updates.push("user_islogin = ?");
        values.push(user_islogin);
    }

    if (updates.length > 0) {
        let sql = `update all_user set ${updates.join(',')} where id = ?`;
        values.push(id); // 把id加入到值数组的最后
        try {
            await exec(sql, values);
            res.send({
                code: 0,
                message: '更新用户数据成功',
            });
        } catch (error) {
            res.status(500).send({
                code: 500,
                message: '服务器错误',
                error: error.message
            });
        }
    } else {
        res.status(400).send({
            code: 400,
            message: '没有提供要更新的数据',
        });
    }
});



/**
 * 删除用户信息
 * DELETE /users/:id
 */
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        let sql = `delete from all_user where id = ?`;
        await exec(sql, [id]);
        res.send({
            code: 0,
            message: '删除用户数据成功',
        });
    } catch (error) {
        res.status(500).send({
            code: 500,
            message: '服务器错误',
            error: error.message
        })
    }
});

module.exports = router



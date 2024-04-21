var express = require('express')

var router = express.Router()

const { getOne, getAll, exec } = require('../db')


/**
 * 获取(对应状态的)公告
 * GET /notices
 */
router.get('/', async (req, res) => {
    try {
        let { page = 1, size = 10, status } = req.query
        page = Number(page)
        size = Number(size)
        const offset = (page - 1) * size
        let sql
        let data
        let total
        if (status) {
            sql = `select * from event_notice where notice_status = ? order by id limit ?,?`
            data = await getAll(sql, [status, offset, size])
            sql = `select count(*) as total from event_notice where notice_status = ?`
            total = await getOne(sql, [status])

        } else {
            sql = `select * from event_notice`
            data = await getAll(sql)
            sql = `select count(*) as total from event_notice`
            total = await getOne(sql)
        }

        res.send({
            code: 0,
            message: status ? '获取对应状态的公告成功' : '获取所有公告成功',
            total: total,
            data: data
        })
    } catch (error) {
        res.status(500).send({
            code: 500,
            message: '服务器错误',
            error: error.message
        });
    }

})


/**
 * 获取单个公告信息
 * GET /notices/:id
 */
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        let sql = `select * from event_notice where id=?`
        let data = await getOne(sql, [id])
        res.send({
            code: 0,
            message: '获取指定id的公告成功',
            data
        })

    } catch (error) {
        res.status(500).send({
            code: 500,
            message: '服务器错误',
            error: error.message
        });
    }
})

/**
 * 发布公告
 * POST /notices
 */
router.post('/', async (req, res) => {
    try {
        const { user_id, notice_title, notice_content } = req.body
        const publish_time = new Date().toLocaleDateString()
        let sql = `insert into event_notice(user_id, notice_title, notice_content, publish_time) values(?,?,?,?)`
        const data = await exec(sql, [user_id, notice_title, notice_content, publish_time])
        res.send({
            code: 0,
            message: '发布公告成功',
            result: data,
        })
    } catch (error) {
        res.status(500).send({
            code: 500,
            message: '服务器错误',
            error: error.message
        });
    }
})

/**
 * 更新相应公告状态
 * PUT /notices/:id
 */
router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { notice_status } = req.body
    let sql = `update event_notice set notice_status=? where id=?`
    const data = await exec(sql, [notice_status, id])
    res.send({
        code: 0,
        message: '相应公告状态更新成功',
        data
    })
})

/**
 * 删除相应公告
 * DELETE /notices/:id
 */
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        let sql = `delete from event_notice where id=?`
        const data = await exec(sql, [id])
        res.send({
            code: 0,
            message: '相应公告删除成功',
            data
        })
    } catch (error) {
        res.status(500).send({
            code: 500,
            message: '服务器错误',
            error: error.message
        });
    }
})

module.exports = router

const express = require('express');
const router = express.Router();
const { getOne, getAll, exec } = require('../db/index.js');

router.get('/', async (req, res) => {
    try {
        const { page = 1, size = 10, userId, status } = req.query; // 默认值处理
        const offset = (page - 1) * size;
        let sql;
        let data;
        let total;

        if (userId && status) {
            sql = `select * from traffic_event where user_id = ? and event_handle_status like ? limit ?,?`;
            data = await getAll(sql, [userId, `%${status}%`, offset, size])
            sql = `select count(*) as total from traffic_event where user_id = ? and event_handle_status like ?`;
            total = await getOne(sql, [userId, `%${status}%`])
        } else if (userId) {
            sql = `select * from traffic_event where user_id = ? limit ?,?`;
            data = await getAll(sql, [userId, offset, size])
            sql = `select count(*) as total from traffic_event where user_id = ?`;
            total = await getOne(sql, [userId])
        } else if (status) {
            sql = `select * from traffic_event where event_handle_status like ? limit ?,?`;
            data = await getAll(sql, [`%${status}%`, offset, size])
            sql = `select count(*) as total from traffic_event where event_handle_status like ?`
            total = await getOne(sql, [`%${status}%`])
        } else {
            sql = `select * from traffic_event limit ?,?`;
            data = await getAll(sql, [offset, size]);
            sql = `SELECT count(*) as total FROM traffic_event`;
            total = await getOne(sql);
        }

        if (data.length) {
            res.send({
                code: 0,
                message: '获取数据成功',
                total,
                data,
            });
        } else {
            res.send({
                code: 1,
                message: '数据为空',
            });
        }
    } catch (error) {
        res.status(500).send({
            code: 500,
            message: '服务器错误',
            error: error.message
        });
    }
})

// 根据事件id获取单个traffic_event数据
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const sql = `SELECT * FROM traffic_event WHERE id = ?`;
        const data = await getOne(sql, [id]);
        res.send({
            code: 0,
            message: '成功获取事件数据',
            data,
        });
    } catch (error) {
        res.status(500).send({
            code: 500,
            message: '服务器错误',
            error: error.message
        });
    }
})


// 修改traffic_event数据
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { event_handle_status } = req.body;
        const sql = `UPDATE traffic_event SET event_handle_status = ? WHERE id = ?`;
        const result = await exec(sql, [event_handle_status, id]);
        res.send({
            code: 0,
            message: '修改成功',
            result,
        });
    } catch (error) {
        res.status(500).send({
            code: 500,
            message: '服务器错误',
            error: error.message
        });
    }
});

// 新增traffic_event数据
router.post('/', async (req, res) => {
    try {
        const {
            user_id,
            event_type,
            event_describe,
            event_handle_status,
            road_section_id,
            event_driver,
            event_car_number,
            event_date
        } = req.body;
        const sql = `INSERT INTO traffic_event (user_id, event_type, event_describe,event_handle_status, road_section_id, event_driver, event_car_number,event_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const result = await exec(sql, [user_id, event_type, event_describe, event_handle_status, road_section_id, event_driver, event_car_number, event_date]);
        res.send({
            code: 0,
            message: '新增成功',
            result,
        });
    } catch (error) {
        res.status(500).send({
            code: 500,
            message: '服务器错误',
            error: error.message
        });
    }
});

// 删除traffic_event数据
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const sql = `DELETE FROM traffic_event WHERE id = ?`;
        const result = await exec(sql, [id]);
        res.send({
            code: 0,
            message: '删除成功',
            result,
        });
    } catch (error) {
        res.status(500).send({
            code: 500,
            message: '服务器错误',
            error: error.message
        });
    }
});

module.exports = router;

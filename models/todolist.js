const mongoose = require('mongoose');

// 스키마 정의
const todoSchema = new mongoose.Schema({
    todoid: { type: Number, required: true, unique: true},
    content: { type: String, required: true },
},{
    timestamps: true
});

// 모듈 정의 후 호출 가능하게 함.
module.exports = mongoose.model('Todo', todoSchema);
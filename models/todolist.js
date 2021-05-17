const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

// DeprecationWarning 경고문 제거 코드
mongoose.set('useCreateIndex', true)

// 스키마 정의
const todoSchema = new mongoose.Schema({
    todo_id: { type: Number, required: true, unique: true},
    content: { type: String, required: true },
    
}, {
    timestamps: { createdAt: true, updatedAt: false }
});


// 모듈 정의 후 호출 가능하게 함.

autoIncrement.initialize(mongoose.connection);
todoSchema.plugin(autoIncrement.plugin, {
    model: 'Todo',
    field: 'todo_id',
    startAt: 1,
    incrementBy: 1
});

const ToDoModel = mongoose.model('Todo', todoSchema);
module.exports = ToDoModel;
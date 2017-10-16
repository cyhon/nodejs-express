const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Schema = mongoose.Schema;

const RegisterSchema = new Schema({
    uuid: String, // IS中心ID
    userId: String,
    phone: String,
    email: String,  // 密保邮箱
    password: String,
    isBot: {type: Boolean, default: false}, // 应该为枚举类型，表述一定角色特征
    timestamp: {type: Date, default: Date.now}
}, {});



RegisterSchema.index({userId: 1}, {unique: true});

// RegisterSchema.index({phone: 1}, {unique: true});  // phone 不设为唯一索引，以兼容 bot 用户

module.exports = mongoose.model('Register', RegisterSchema);

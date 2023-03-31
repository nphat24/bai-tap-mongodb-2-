const mongoose = require('mongoose');

const SanPhamSchema = new mongoose.Schema({
    ten: {
        type: String,
        required: true
    },
    gia: {
        type: Number,
    },
    soluong: {
        type: Number
    },
    loaisp: {
        type: String
    },
    khuyenmai: {
        type: Number
    }
});

const SanPhamModel = new mongoose.model('sanpham', SanPhamSchema);

module.exports = SanPhamModel;


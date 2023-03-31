
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { engine } = require('express-handlebars')
const Handlebars = require('handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')

let sanphams

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.urlencoded({ extended: true }))

app.engine('hbs', engine({
    extname: '.hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: {
        sum: (a, b) => a + b
    }
}));

app.set('view engine', 'hbs');
app.set("views", "./views");

const uri = 'mongodb+srv://nphat24:O0MSP9NNR7yCaNMk@atlascluster.se6k3tz.mongodb.net/?retryWrites=true&w=majority';

const SanPhamModel = require('./SanPhamModel');

const { request } = require('express')

app.get('/', async (req, res) => {
    await mongoose.connect(uri);

    console.log('Ket noi DB thanh cong!');

    sanphams = await SanPhamModel.find();

    
    res.render('home', {
        sanphams
    })
})

app.post('/', async (req, res) => {

    await mongoose.connect(uri).then(console.log('Ket noi DB thanh cong.'));
    if (req.body._id == null) {
        try {
            SanPhamModel.create(req.body)
            res.redirect('/')
        } catch (error) {
            log.error(error);
        }
    }
    else {
        var rs = await SanPhamModel.updateOne({ _id: req.body._id }, req.body)
        console.log(rs);
        res.redirect('/')
    }
});

app.get('/update/:id', async (req, res) => {

    await mongoose.connect(uri).then(console.log('Ket noi DB thanh cong.'));
    const sanpham = await SanPhamModel.findById(req.params.id);
    res.render('home', {
        sanpham: sanpham.toJSON(),
        sanphams
    })
});

// Delete Item
app.get('/delete/:id', async (req, res) => {

    await mongoose.connect(uri).then(console.log('Ket noi DB thanh cong.'));
    const sanphams = await SanPhamModel.findByIdAndDelete(req.params.id, req.body);
    res.redirect('/');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});


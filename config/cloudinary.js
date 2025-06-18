const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: 'dcitbbpbr',
    api_key: '539478917887896',
    api_secret: 'TABY_CselidPFp1oKPkyyu4qeLE'
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'productos', // Carpeta en Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp']
    }
});

module.exports = {
    cloudinary,
    storage
};
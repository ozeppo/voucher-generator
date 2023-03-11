const Jimp = require("jimp");
const config = require('./config.json');

function imageGenerator(voucherNumber, voucherName){
    let voucherTemplate = 'template.png';
    let voucher_name = voucherName.toUpperCase();
    let voucher_number = config.voucher_nuber_schema
    .replace('%number%', voucherNumber)
    .replace('%voucher_id%', config.voucher_id)
    .replace('%expire_date%', config.expire_date);

    let loadedImage;

    Jimp.read(voucherTemplate)
        .then(img => {
            loadedImage = img;
            return Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
        })
        .then(font => {
            loadedImage.print(font, 53, 385, voucher_name).write('./generated/$name.png'.replace('$name', voucher_name))
        })
        .catch(err => {
            console.error(err);
        });

    Jimp.read(voucherTemplate)
        .then(img => {
            loadedImage = img;
            return Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
        })
        .then(font => {
            loadedImage.print(font, 169, 340, voucher_number).write('./generated/$name.png'.replace('$name', voucher_name))
        })
        .catch(err => {
            console.error(err);
        });

}
module.exports = imageGenerator;
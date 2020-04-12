'use strict';
const escpos = require('escpos');
escpos.USB = require('escpos-usb')

const device  = new escpos.USB();

const printer = new escpos.Printer(device);

exports.label = (req, res) => {
  
  const data = req.body

  try {
    device.open(function() {
      data.data && data.data.map(label => {
        printer
          .font('B')
          .align('LT')
          .style('B')
          .size(1,1)
          .text(label.name)
          .size(2,2)
          .text(label.price_formatted)
          .size(1,1)
          .barcode(label.code, 'EAN13', { width: 2, height: 50 })
          .cut()
      })
      printer.close();
    });

    res.status(200).json({
      "message": "Label berhasil dicetak"
    })

  }
  catch (e) {
    console.error('Error saat print: ', e);
    res.sendStatus( 500 );
  }

}
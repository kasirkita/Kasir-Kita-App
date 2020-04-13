'use strict';
const escpos = require('escpos');

exports.label = (req, res) => {
  
  try {
    escpos.USB = require('escpos-usb')
    
    const device  = new escpos.USB();
    
    const printer = new escpos.Printer(device);
  
    const data = req.body
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
    res.status(500).json({
      "message": "Error saat mencetak"
    })
  }

}
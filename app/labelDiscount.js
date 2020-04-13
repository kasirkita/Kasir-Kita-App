'use strict';
const escpos = require('escpos');

exports.labelDiscount = (req, res) => {
  
  
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
          .size(1,1)
          .style('BIU2')
          .text(label.price)
          .style('B')
          .size(2,2)
          .text(label.discount)
          .size(1,1)
          .text(`*) ${label.tnc}`)
          .text('*) Berlaku hanya satu barang')
          .text(`*) Berlaku sampai ${label.valid_thru_formatted}`)
          if (label.customer_type) {
            if (label.customer_type === 'wholesaler') {
              printer.text('*) Kusus member grosir')
            } else {
              printer.text('*) Kusus member pengecer')
            }
          }
          printer.cut()
      })
      printer.close();
  
    });
  
    res.status(200).json({
      "message": "Label Diskon berhasil dicetak"
    })

  } catch {
    res.status(500).json({
        "message": "Error saat mencetak"
    })
  }

}
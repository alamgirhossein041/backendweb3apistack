import request from 'request-promise';
import * as priceService from '../services/priceService.js'

export async function getSignature(req, res, next) {
  // Input: List of tokens/single token together with date
  // Output: Signature with (Average? only selecting latest price on date) price for each token
  var token = req.body.token
  var date = req.body.date
    
  try {
    // Get Token price at the date requested
    var priceResponse = await priceService.getTokenPriceOn(token, date)
    var price =priceResponse.rows[0].price

    // Sign Data
    var options = {
      'method': 'GET',
      'url': 'http://walletApiServer:5000/api/v1/sign',
      'headers': {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "data": {
          "token": token,
          "date": date,
          "cur_price": price
        }
      })
    };
    var sigResponse = await request(options)
    res.status(200).json(sigResponse)
  }
  catch (err) {
    console.log(err)
    res.status(500).json({err})
  }
}
    
export async function getVerification(req, res, next) {
  // Input: Signature, token, date to be verified
  // Output: Verification status & wallet address
  var signature = req.body.signature
  var token = req.body.token
  var date = req.body.date

      // await request('127.0.0.1:5000/api/v1/verify', function(error, response, body) {

  try {
    // Get Token price at the date requested
    var priceResponse = await priceService.getTokenPriceOn(token, date)
    var price = priceResponse.rows[0].price
    console.log(price)
    // Sign Data
    var options = {
      'method': 'GET',
      'url': 'http://walletApiServer:5000/api/v1/verify',
      'headers': {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "data": {
          "token": token,
          "date": date,
          "cur_price": price
        },
        "signature": signature
      })
    };
    var sigResponse = await request(options)
    res.status(200).json(sigResponse)
  }
  catch (err) {
    console.log(err)
    res.status(500).json({err})
  }

}

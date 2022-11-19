import * as priceService from '../services/priceService.js'

export async function getPrice(req, res, next) {
  // Input: Token Name and optional data period (date_from with date_to)
  // Output: Token price data
  
  if (req.body) {
    if (req.body.date_from) var date_from = req.body.date_from;
    if (req.body.date_to) var date_to = req.body.date_to
  }
  try {
    let priceData = await priceService.getTokenPrice(req.params.tokenId, date_from, date_to)
    res.status(200).json({priceData})
  }
  catch (err) {
    // console.log('APIServer: Error getting Price', err)
    res.status(500).json({err})
  }
}
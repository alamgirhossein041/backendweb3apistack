import * as signService from '../services/signService.js'

export async function getSignature(req, res, next) {
  // Input: Token name, date and corresponding token price
  // Output: Signature 
  try {
    let signature = await signService.sign(req.body.data)
    res.status(200).json({signature})
  }
  catch (err) {
    res.status(500).json({err})
  }
}

export async function getVerification(req, res, next) {
  // Input: Data to be verified
  // Output: Verification Status
  try {
    let status = await signService.verify(req.body.signature, req.body.data)
    res.status(200).send(status)
  }
  catch (err) {
    res.status(500).json({err})
  }
}

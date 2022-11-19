import ethers from 'ethers';

//Random wallet privatekey belonging to 0x108348DE9c7718934d9Ca6C59dd43306c6A868B6
let private_key = 'ea05d8acf9e974113cfab48790c2d467abcdd896bd274a519d5d20db17ab84f4'
let wallet = new ethers.Wallet(private_key);

// EIP 712 _signTypedData
const domain = {
  name: 'Backend Test',
  version: '1',
  chainId: 1,
  verifyingContract: '0x1111111111111111111111111111111111111111'
};

const types = {
  data: [
    { name: 'token', type: 'string' },
    { name: 'date', type: 'string' },
    { name: 'cur_price', type: 'string'}
  ],
};

// const data = {
//   token: 'ETH',
//   date: '2022-11-18',
//   cur_price: '1200'
// };

export async function sign(data) {
  try {
    let signature = wallet._signTypedData(domain, types, data);
    return signature
  }
  catch(err) {
    throw new Error('error');
  }
}

export async function verify(signature, data) {
  try {
    const expectedAddress = '0x108348DE9c7718934d9Ca6C59dd43306c6A868B6'
    let verificationOutput = await ethers.utils.verifyTypedData(domain, types, data, signature)
    if (verificationOutput === expectedAddress) {
      return true
    }
    else {
      return false
    }
  }
  catch(err) {
    throw new Error('error');
  }
}
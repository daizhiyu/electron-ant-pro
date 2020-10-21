import { message } from 'antd'

const axios=require('axios')
const crypto = require("crypto");

axios.defaults.baseURL = 'http://127.0.0.1:8000'
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.default.timeout = 60000;

axios.interceptors.response.use({}, error => {
  if (!error.response) {
    // eslint-disable-next-line no-param-reassign
    error.message = '请检查网络设置'
    return Promise.reject(error)
  }
  switch (error.response.status) {
    case 101:
      break
    case 401:
      error.message = '登录已过期,请重新登录!'
      // 清除用户信息
      // 登录
      setTimeout(() => {

      }, 500)
      break
    case 403:
      error.message = '禁止访问!'
      break
    case 408:
      error.message = '请求超时!'
      break
    case 500:
      error.message = '服务内部异常!'
      break
    case 503:
      error.message = '服务器升级中!'
      break
    case 504:
      error.message = '网关超时!'
      break
    default:
      error.message = '未知错误'
      break
  }
  return Promise.reject(error)
})

export function localEcrypt (orignStr,publicKey){
  const timestamp=new Date().getTime();
  const md5 = (crypto.createHash('md5')).update(`${ timestamp}`).digest('hex');
  const key1 = md5; // 32位随机字符串,可自定义生成
  const iv1 = md5.substr(0,16);// 16位随机字符串,可自定义生成， 与key生成规则无关
  const hw = encrypt(orignStr, key1, iv1);
  // 使用公钥加密:
  const pKey = `-----BEGIN PUBLIC KEY-----\n${  publicKey  }\n-----END PUBLIC KEY-----`;
  const enc_by_pub = crypto.publicEncrypt(pKey, Buffer.from(key1, "utf8"))
    .toString("base64");
  const hash = crypto.createHash("sha256");
  hash.update(enc_by_pub + iv1 + hw);
  const h256 = hash.digest("hex");
  return {hw,enc_by_pub,iv1,h256,timestamp}
}

function encrypt(text, key, iv) {
  try {
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

    let encrypted = cipher.update(text);

    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return encrypted.toString("base64");
  } catch (e) {
    console.log(e);

    return null;
  }
}
function decrypt(text, key, iv) {
  try {
    const encryptedText = Buffer.from(text, "base64");

    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);

    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
  } catch (e) {
    console.log(e);

    return null;
  }
}



export function getHttp(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params })
      .then(response => {
        if (response.data.success === false) {
          message.error(response.data.message)
          reject(response.data.message)
        }
        setTimeout(() => {
          resolve(response.data)
        }, 300)
      })
      .catch(error => {
        alert(error)
        reject(error.message)
      })
  })
}

export function postHttp(url, body, params) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url,
      params,
      data: body
    }).then(response => {
      setTimeout(() => {
        if (response.data.success === false) {
          message.error(response.data.message)
          reject(response.data.message)
        }
        if(response.headers && response.headers.Authorization){
          setAxiosHeader(response.headers.Authorization)
        }
         if(response.data.Head&&response.data.Head.resFlag==='S' ){
             if(response.data.Head.msgInfo) {
               message.info(response.data.Head.msgInfo)
               resolve(response.data.Head.msgInfo)
             }else {
               resolve(response.data.Body)
             }

         }






      }, 300)
    }).catch(error => {
      reject(error.message)
    })
  })
}
function setAxiosHeader(token) {

  axios.interceptors.request.use(
    config => {

      if (token) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = token
      }
      return config
    }, err => {
      return Promise.reject(err)
    })


}

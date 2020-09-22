import { parse } from 'querystring';
import pathRegexp from 'path-to-regexp';
import router from 'umi/router';
import CryptoJS from 'crypto-js'

import { Form } from 'antd'

const SECRETKEY = '52fc2609-3fa3-4812-90c6-bc7f86023299'

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = path => reg.test(path);
export const isAntDesignPro = () => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }

  return window.location.hostname === 'preview.pro.ant.design';
}; // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性

export const isAntDesignProOrDev = () => {
  const { NODE_ENV } = process.env;

  if (NODE_ENV === 'development') {
    return true;
  }

  return isAntDesignPro();
};
export const getPageQuery = () => parse(window.location.href.split('?')[1]);
/**
 * props.route.routes
 * @param router [{}]
 * @param pathname string
 */

export const getAuthorityFromRouter = (router = [], pathname) => {
  const authority = router.find(
    ({ routes, path = '/' }) =>
      (path && pathRegexp(path).exec(pathname)) ||
      (routes && getAuthorityFromRouter(routes, pathname)),
  );
  if (authority) return authority;
  return undefined;
};
export const getRouteAuthority = (path, routeData) => {
  let authorities;
  routeData.forEach(route => {
    // match prefix
    if (pathRegexp(`${route.path}/(.*)`).test(`${path}/`)) {
      if (route.authority) {
        authorities = route.authority;
      } // exact match

      if (route.path === path) {
        authorities = route.authority || authorities;
      } // get children authority recursively

      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  return authorities;
};


export const store = {
  save: (name, value, type = 'localtorage') => {
    if ((type || '').toLocaleLowerCase() === 'localstorage') {
      localStorage.setItem(name, JSON.stringify(value));
    } else if ((type || '').toLocaleLowerCase() === 'sessionstorage') {
      sessionStorage.setItem(name, JSON.stringify(value));
    }
  },
  get: (name, type = 'localStorage') => {
    if ((type || '').toLocaleLowerCase() === 'localstorage') {
      return JSON.parse(localStorage.getItem(name) || '{}');
    } else if ((type || '').toLocaleLowerCase() === 'sessionstorage') {
      return JSON.parse(sessionStorage.getItem(name) || '{}');
    }
  },
};


/**
 * 新的-新开窗口方法
 */
export const openPage = (options = {}) => {
  const {
    id = Math.random()
      .toString(32)
      .slice(2),
    url,
    title = '新标签页',
    data = {},
  } = options;
  if (!url) {
    return;
  }
  console.log(`新开标签页 id=${id} title=${title} url=${url} data=${JSON.stringify(data)} `);
  store.save(id, { url, title, data }, 'sessionstorage');
  const path = `/CustomPage/${id}`;
  router.push(path);
};





/**
 * 防抖函数
 * @param {*} func
 * @param {*} wait
 */
export function debounce(func, wait = 500) {
  let timeout;  // 定时器变量
  return function (event) {
    clearTimeout(timeout); // 每次触发时先清除上一次的定时器,然后重新计时
    event.persist && event.persist() //保留对事件的引用
    timeout = setTimeout(() => {
      func(event)
    }, wait); // 指定 xx ms 后触发真正想进行的操作 handler
  };
}

/**
 * 节流函数
 * @param {*} func
 * @param {*} interval
 */
export function throttle(func, interval = 100) {
  let timeout;
  let startTime = new Date();
  return function (event) {
    event.persist && event.persist()   //保留对事件的引用
    clearTimeout(timeout);
    let curTime = new Date();
    if (curTime - startTime <= interval) {
      //小于规定时间间隔时，用setTimeout在指定时间后再执行
      timeout = setTimeout(() => {
        func(event);
      }, interval)
    } else {
      //重新计时并执行函数
      startTime = curTime;
      func(event)
    }
  }
}

/**
 * 生成指定区间的随机整数
 * @param min
 * @param max
 * @returns {number}
 */
export function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * 加密函数，加密同一个字符串生成的都不相同
 * @param {*} str
 */
export function encrypt(str,key) {
  return CryptoJS.AES.encrypt(JSON.stringify(str), key).toString();
}

/**
 * 解密函数
 * @param {*} str
 */
export function decrypt(str) {
  const bytes = CryptoJS.AES.decrypt(str, SECRETKEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

/**
 * 判断是否是对象
 * @param {*} obj
 */
export function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

/**
 * 创建表单回显的对象
 * @param {*} obj
 */
export function createFormField(obj) {
  let target = {}
  if (isObject(obj)) {
    for (let [key, value] of Object.entries(obj)) {
      target[key] = Form.createFormField({
        value
      })
    }
  }
  return target
}

/**
 * 将img标签转换为【图片】
 * @param {string} str
 */
export function replaceImg(str){
  if(typeof str === 'string'){
    str = str.replace(/<img(.*?)>/g, "[图片]")
  }
  return str
}

/**
 * 图片预加载
 * @param arr
 * @constructor
 */
export function preloadingImages(arr) {
  if(Array.isArray(arr)){
    arr.forEach(item=>{
      const img = new Image()
      img.src = item
    })
  }
}

import React from 'react'

import LoadableComponent from '@/utils/LoadableComponent'
import { preloadingImages } from '@/utils/utils'

import  LoginForm from './LoginForm';
import  Background from '@/components/Background';


import router from 'umi/router';



class Login extends React.Component {

  componentDidMount() {
    // 防止用户通过浏览器的前进后退按钮来进行路由跳转
    // 当用户登陆后再通过浏览器的后退按钮回到登录页时，再点击前进按钮可以直接回到首页

    // preloadingImages(imgs)
  }
  /**
   * 切换登录和注册的面板
   */
  render() {
    return (
      <Background >
        <div className='login_container'>
          <div className='box active'>
            <LoginForm toggleShow={this.toggleShow} />
          </div>
        </div>
      </Background>
    )
  }
}

export default Login

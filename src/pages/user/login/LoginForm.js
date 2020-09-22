import React from 'react'
import styles from './style.less';
import { Form, Input, Row, Col } from 'antd'
import Promptbox from '@/components/PromptBox/index'
// eslint-disable-next-line import/no-duplicates
// import { authenticateSuccess } from '@/utils/session'
// eslint-disable-next-line import/no-duplicates



import router from 'umi/router';
@Form.create()
class LoginForm extends React.Component {
  state = {
    focusItem: -1, // 当前焦点聚焦在哪一项上

  }


  onSubmit = () => {
    router.push('/')
    return;

    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        this.onLogin(values)
      }
    });
  }

  onLogin (values) {

  }

  goLogin(values,secretkey){

    const ciphertext = encrypt(values.password, secretkey);
    const self = this;
   let params={
     password: ciphertext,
     user_id: values.user_id,
     username: values.username
   }
    const setting = {
      url: '/user/adminLogin',
      reqParam: params, // 请求携带的参数
      that: self,
    };
    _fetch(setting)
      .then(data => {
        if (data.Head.resFlag == 'S') {
             authenticateSuccess(data.Body.token)
              localStorage.setItem('userInfo', JSON.stringify(data.Body.userInfo))
             router.push('/discussionAdmin/topicManage/topicList')
        }
      })

  }

  render() {
    const { getFieldDecorator, getFieldError } = this.props.form
    const { focusItem } = this.state
    return (
      <div className="login_container">
        <h3 className="title">管理员登录</h3>
        <Form hideRequiredMark>
          <Form.Item
            help={<Promptbox info={getFieldError('username') && getFieldError('username')[0]} />}
            style={{ marginBottom: 10 }}
            wrapperCol={{ span: 20, pull: focusItem === 0 ? 1 : 0 }}
            labelCol={{ span: 3, pull: focusItem === 0 ? 1 : 0 }}
            label={<span className="iconfont icon-User" style={{ opacity: focusItem === 0 ? 1 : 0.6 }} />}
            colon={false}>
            {getFieldDecorator('username', {
              validateFirst: true,
              rules: [
                { required: true, message: '请输入用户名' },
                { pattern: /^[^\s']+$/, message: '不能输入特殊字符' },
              ],
            })(
              <Input
                className="myInput"
                onFocus={() => this.setState({ focusItem: 0 })}
                onBlur={() => this.setState({ focusItem: -1 })}
                onPressEnter={this.onSubmit}
                placeholder="用户名"
              />,
            )}
          </Form.Item>
          <Form.Item
            help={<Promptbox info={getFieldError('password') && getFieldError('password')[0]} />}
            style={{ marginBottom: 10 }}
            wrapperCol={{ span: 20, pull: focusItem === 1 ? 1 : 0 }}
            labelCol={{ span: 3, pull: focusItem === 1 ? 1 : 0 }}
            label={<span className="iconfont icon-suo1" style={{ opacity: focusItem === 1 ? 1 : 0.6 }} />}
            colon={false}>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码' }],
            })(
              <Input
                className="myInput"
                type="password"
                onFocus={() => this.setState({ focusItem: 1 })}
                onBlur={() => this.setState({ focusItem: -1 })}
                onPressEnter={this.onSubmit}
                placeholder="密码"
              />,
            )}
          </Form.Item>
          {/* <Form.Item */}
          {/*  help={<Promptbox info={getFieldError('captcha') && getFieldError('captcha')[0]} />} */}
          {/*  style={{ marginBottom: 20 }} */}
          {/*  wrapperCol={{ span: 20, pull: focusItem === 2 ? 1 : 0 }} */}
          {/*  labelCol={{ span: 3, pull: focusItem === 2 ? 1 : 0 }} */}
          {/*  label={<span className="iconfont icon-securityCode-b" style={{ opacity: focusItem === 2 ? 1 : 0.6 }} />} */}
          {/*  colon={false}> */}
          {/*  <Row gutter={8}> */}
          {/*    <Col span={15}> */}
          {/*      {getFieldDecorator('captcha', { */}
          {/*        validateFirst: true, */}
          {/*        rules: [ */}
          {/*          { required: true, message: '请输入验证码' }, */}
          {/*          { */}
          {/*            validator: (rule, value, callback) => { */}
          {/*              if (value.length >= 4 && code.toUpperCase() !== value.toUpperCase()) { */}
          {/*                callback('验证码错误') */}
          {/*              } */}
          {/*              callback() */}
          {/*            }, */}
          {/*          }, */}
          {/*        ], */}
          {/*      })( */}
          {/*        <Input */}
          {/*          className="myInput" */}
          {/*          onFocus={() => this.setState({ focusItem: 2 })} */}
          {/*          onBlur={() => this.setState({ focusItem: -1 })} */}
          {/*          onPressEnter={this.onSubmit} */}
          {/*          placeholder="验证码" */}
          {/*        />, */}
          {/*      )} */}
          {/*    </Col> */}
          {/*    <Col span={9}> */}
          {/*      <canvas onClick={this.changeCaptcha} width="80" height="40" ref={el => this.canvas = el} /> */}
          {/*    </Col> */}
          {/*  </Row> */}
          {/* </Form.Item> */}
          <Form.Item>

            <div className="btn_box">
              <div className="loginBtn" onClick={this.onSubmit}>登录</div>
              {/* <div className="registerBtn" onClick={this.goRegister}>注册</div> */}
            </div>
          </Form.Item>
        </Form>

        <div className="footer">欢迎登陆富国基金路演后台管理系统</div>
      </div>
    )
  }
}


export default LoginForm

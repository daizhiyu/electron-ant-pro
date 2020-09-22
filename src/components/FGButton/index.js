import React ,{Fragment}  from 'react';

import { Button, Icon } from 'antd';
import { iconList } from './icon';
export  default  class FGButton extends React.PureComponent{

  constructor(props){
    super(props)
  }
   renderBtn(){
      // title 按钮标题 btnClick 点击事件  btnType 按钮类型
     const {title,isBlock,type, iconName}=this.props;
     let iconHtml='';
     if(iconName) {
       iconHtml= <Icon style={{
         verticalAlign: 'bottom'
       }} component={iconList[iconName]}/>
     };


     if(isBlock){
      return   <div style={{width:'8em'}} >
                  <Button {...this.props} block  >{iconHtml+title}</Button>
               </div>
     }else if(type=="link"){
       return   <Button  {...this.props}  ><span style={{"textDecoration":'underline'}}>{iconHtml}{title}</span></Button>
     }else {
       return  <Button  {...this.props}  >{iconHtml+title}</Button>
     }

   }


  render() {
    const {}=this.props;
    return(
      <Fragment>
        {this.renderBtn()}
      </Fragment>
    )

  }
}
/*
        title： 按钮标题
        btnClick： 点击事件
        type： 按钮颜色 primary 蓝色 default 白底
        size: small 小的按钮 default 默认按钮 large 大的按钮
        isBlock： 宽的按钮封装
       eg:
       <FGButton  title={'我是一个按钮'} size={'small'} /  >
 */
FGButton.defaultProps={
  title:'按钮',
  size:'default',
  type:'primary',
  isBlock:false

};

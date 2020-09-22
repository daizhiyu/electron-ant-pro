// 1:dev 2:SIT 3:uat 4:准生产 5:生产
const envFlag = 2;

//export let homeBg = 'https://ant.fgcfh.com.cn/static/comment/login_bg1.jpg';
//export let homeBg = 'https://m.fullgoal.com.cn/uploads/discussion/login_bg1.jpg'
export let homeBg = 'http://10.10.160.78:8200/uploads/discussion/login_bg1.jpg';

export let serverUrl = 'http://10.10.160.78:8200/fgcommentmgtapi';

if (envFlag == 1) {
  serverUrl = 'http://0.0.0.0:8200/fgcommentmgtapi';
  homeBg = 'http://192.168.40.103:8200/uploads/discussion/login_bg1.jpg';
} else if (envFlag == 2) {
  serverUrl = 'http://192.168.40.103:8200/fgcommentmgtapi';
  homeBg = 'http://192.168.40.103:8200/uploads/discussion/login_bg1.jpg';
} else if (envFlag == 4) {
  //serverUrl = 'https://ant.fgcfh.com.cn/fgCommentApi';
  serverUrl = 'http://10.10.160.82:8200/fgcommentmgtapi';//'https://realtest.fullgoal.com.cn/fgcommentmgtapi';
  //homeBg = 'https://realtest.fullgoal.com.cn/uploads/discussion/login_bg1.jpg'
  homeBg = 'http://10.10.160.82:8200/uploads/discussion/login_bg1.jpg';
}

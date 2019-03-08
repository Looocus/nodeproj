$(document).ready(function() {
  //邮箱正则
  var regRules = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
  //发送验证码倒数
  function timerset () {
    var email = $("#inputEmail").val();
    if(!regRules.test(email)){
      alert('Email格式不正确');
      return {}
    }
    //Ajax获取前端数据
    $.ajax({
      url: '/mailtest',
      type: 'POST',
      dataType: 'json',
      data: {
        email: email
      },
      success: function (data) {
        alert(data['code']) //data需转义
      }
    });
    //console.log(email)
    var timer = 60;
    var timeminus = setInterval(function () {
      minus();
    }, 1000);

    function minus () {
      timer--;
      $("#idCode").attr("value", timer + "s");
      if(timer===0){
        clearInterval(timeminus);
        $("#idCode").attr("value", "ID Code");
        $("#idCode").attr("disabled", false);
      }else{
        $("#idCode").attr("disabled", true);
      }
    };
  };
  $("#idCode").click(function (){
    //60秒倒计时
    timerset();
  });
  //check code
  function checkCode() {
    var nowTimestamp = Date.now();
    var email = $("#inputEmail").val();
    var inputCode = $("#inputCode").val();
    $.ajax({
      url: '/mailtest/checkcode',
      type: 'POST',
      dataType: 'json',
      data: {
        timestamp: nowTimestamp,
        email: email,
        code: inputCode
      },
      success: function(data) {
        document.getElementById('Demo').innerHTML = data['text'];
      }
    })
  }
  $("#codeCheck").click(function (){
    //验证验证码
    checkCode()
  });
});

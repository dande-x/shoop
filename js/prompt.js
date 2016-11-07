/**
 * Created by 97279 on 2016/11/7.
 */

function createPrompt()
{
    var divSp = document.createElement("div");    //弹出对话框
    var newMask = document.createElement("div");  //遮罩层，用来屏蔽灰掉背部界面
    var btnSub = document.createElement("input"); // 弹出对话框中按钮
    var inner;

    // 弹出对话框中要呈现的页面元素布局等html代码
    inner = '<div class="fieldset" style="height:300px  background:#A9A9A9">';
    inner += ' <div class="fs-heading" style=" background:#6a6c75">';
    inner += ' <h2 >请输入用户的邮箱地址。</h2>';
    inner += ' </div>';
    inner += ' <ul class="fs-fieldgroup">';
    inner += ' <li><br/>';
    inner += ' 邮箱地址：<input id="searchInput" type="text"  class="searchinput">    ';
    inner += ' </li>';
    inner += ' <li><br/>';
    inner += ' <button onclick="searchUser()" style="width:70px; height:30px">搜索</button>'+
        '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'+
        '<button onclick="requestAddFriend()" style="width:70px; height:30px">添加</button>'+
        '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'+
        '<button onclick="closeSearch()" style="width:70px; height:30px">关闭</button>';
    inner += '</li>';
    inner += ' </ul>';
    inner += '</div>';

    // 创建弹出层 遮罩层 等
    if ( !document.getElementById("mask") && 1)
    {
        //mask div
        newMask.id = "mask";
        newMask.style.position = "absolute";
        newMask.style.zIndex = "1";
        newMask.style.width = "100%";
        newMask.style.height = Math.max(document.body.scrollHeight,document.documentElement.scrollHeight) + 100 + "px";
        newMask.style.top = "0px";
        newMask.style.left = "0px";
        newMask.style.background = "6a6c75";
        newMask.style.filter = "alpha(opacity=80)";
        newMask.style.opacity = "0.5";
        document.body.appendChild(newMask);
    }

    if ( !document.getElementById("promptID"))
    {
        //new div (prompt)
        divSp.setAttribute("id", "promptID");
        divSp.style.position = "absolute";
        divSp.style.padding = "8px";
        divSp.style.width = "10px";
        divSp.style.height = "10px";
        divSp.style.zIndex = "5000";
        divSp.style.top = parseInt(window.screen.height * 0.21)+document.body.scrollTop+document.documentElement.scrollTop + 30 + "px";
        divSp.style.left = parseInt(document.body.offsetWidth * 0.31)+document.body.scrollLeft+document.documentElement.scrollLeft + "px";
        divSp.style.border = "1px dotted #6a6c75";
        divSp.style.backgroundColor = "#6a6c75";
        divSp.innerHTML = inner;
        document.body.appendChild(divSp);
        openDiv();
    }
    //it can be operated in Android
    if (merfound != 1)
    {
        document.getElementsByName("adsl_username")[0].disabled = "disabled";
        document.getElementsByName("adsl_pwd")[0].disabled = "disabled";
    }

    if ( !document.getElementById("btnSubID"))
    {
        btnSub.setAttribute("id", "btnSubID");
        btnSub.setAttribute("class", "btn-subtle");
        btnSub.type = "button";
        btnSub.style.width = "100px";
        btnSub.style.position = "absolute";
        btnSub.style.top = "80%";
        btnSub.style.left = "40%";
        btnSub.value = "Save ";
        btnSub.onclick = function(){
            setTimeZone();
            setTimeout("restore()", 6000);
            btnSub.setAttribute("class", "delClass");
            document.getElementById("btnSubID").disabled = "disabled";
        };
        document.getElementById("promptID").appendChild(btnSub);
    }
}

// 调整弹出对话框宽度和高度
function openDiv()
{
    var divPrompt = document.getElementById("promptID");

    var viewWidth = parseInt(document.body.offsetWidth * 0.37);
    var viewHeight = parseInt(window.screen.height  * 0.18);

    if (viewWidth < 460 || viewWidth > 500)
    {
        viewWidth = 300;
    }

    if (viewHeight < 180 || viewHeight > 240)
    {
        viewHeight = 190;
    }

    divPrompt.style.width=viewWidth + "px";
    divPrompt.style.height=viewHeight + "px";
}
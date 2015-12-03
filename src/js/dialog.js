/**
 * Create by xiaoT
 * at 2015-09-10
 */
/**
 * 模态对话框
 * version: 0.0.1
 * 使用方式
 * Dialog.confirmYY('确定要删除吗？', okCallBack, cancelCallBack);
 * Dialog.alertYY('确定要删除吗？', okCallBack);
 */
var Dialog = (function(win){
    var body = document.getElementsByTagName('body')[0],
        dialogType = 'alert';
    var callBack = {};
        
    var alert = function(str, okCallBack) {
        dialogType = 'alert';
        callBack.ok = okCallBack;
        creatDom(str);
    }
    var confirm = function(str, okCallBack, cancelCallBack){
        dialogType = 'confirm';
        callBack.ok = okCallBack;
        callBack.cancel = cancelCallBack;
        creatDom(str);
    }

    /**
     * 创建 弹窗 dom结构
     * @param  {string} str 弹窗提示内容
     * @return {undefined} 
     */
    function creatDom(str) {
        var dialogBox = document.createElement('div'),
            dialogMainWrap = document.createElement('div'),
            dialogMain = document.createElement('div'),
            dialogCont = document.createElement('div'),
            dialogAction = document.createElement('div'),
            okBtn = document.createElement('a'),
            cancelBtn = document.createElement('a'),
            dialog = document.querySelectorAll('.dialog');
        // 没有提示内容
        // 控制台打印错误
        // 返回false
        error(str);
        // 删除 已有的 dialog
        // dialog.remove();
        // 确定 取消按钮
        okBtn.innerHTML = '确定';
        cancelBtn.innerHTML = '取消';
        okBtn.className = cancelBtn.className = 'dialog-btn';
        okBtn.href = cancelBtn.href = 'javascript:;';
        okBtn.setAttribute('data-type', 'true');
        cancelBtn.setAttribute('data-type', 'false');
        // 弹窗 提示内容
        dialogCont.className = 'dialog-cont';
        dialogCont.innerHTML = str;

        // 弹窗 操作按钮
        if(dialogType === 'alert') {
            dialogAction.className = 'dialog-action';
            dialogAction.appendChild(okBtn);
        } else if(dialogType === 'confirm') {
            dialogAction.className = 'dialog-action dialog-span2';
            dialogAction.appendChild(okBtn);
            dialogAction.appendChild(cancelBtn);
        }

        dialogMain.className = 'dialog-main';
        dialogMain.appendChild(dialogCont);
        dialogMain.appendChild(dialogAction);


        dialogMainWrap.className = 'dialog-main-wrap';
        dialogMainWrap.appendChild(dialogMain);

        dialogBox.className =  'dialog';
        dialogBox.appendChild(dialogMainWrap);
        // 写入 body 
        body.appendChild(dialogBox);

        addEvent();
    }

    /**
     * 绑定事件
     * 根据点击的按钮 
     * 返回 true or false
     */
    function addEvent() {
        var btn = document.querySelectorAll('.dialog-btn'),
            handleType = 'ontouchstart' in window ? 'touchstart':'click';
        // console.log(handleType)
        for(var i=0,l=btn.length; i<l; i++) {
            
            if (btn[i].addEventListener) {
                btn[i].addEventListener(handleType, handle, false);
            } else if (btn[i].attachEvent)  {
                btn[i].attachEvent('on' + handleType, handle);
            }
        }
    }
    function handle(e) {
        var dialog = document.querySelectorAll('.dialog'),
            e = window.event || e,
            target = e.srcElement || e.target,
            type = target.getAttribute('data-type');
        // 解除绑定 释放内存
        // this.removeEventListener('touchstart', handle, false);
        // 移出 dom
        body.removeChild(dialog[0]);
        // 执行回调
        if(type === 'true' && callBack.ok && typeof callBack.ok === 'function') {
            callBack.ok();
            return true;
        } else if(type === 'false' && callBack.cancel && typeof callBack.cancel === 'function'){
            callBack.cancel();
            return false;
        }
    }
    /**
     * 错误提示
     * @param  {string} str 对话框弹窗内容
     * @return {boolean}   返回false  
     */
    function error(str) {
        if(!str){
            console.error('参数错误');
            return false;
        }
    }

    return {
        'alert': alert,
        'confirm': confirm
    }
})(window)

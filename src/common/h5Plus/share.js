export function shareReady() {
    if(window.plus){
        plus.share.getServices( function(s){
		let shares={};
        for(let i in s){
                let t=s[i];
                shares[t.id]=t;
            }
        },function(e){
            plus.nativeUI.alert("获取分享服务列表失败："+e.message);
        });

        if(plus.os.name=="Android"){
            let main = plus.android.runtimeMainActivity();
            let Intent = plus.android.importClass("android.content.Intent");
        }else{
            plus.nativeUI.alert("此平台暂不支持系统分享功能!");
		    return;
        }

        let intent=new Intent(Intent.ACTION_SEND);
        intent.putExtra(Intent.EXTRA_SUBJECT,"HBuilder");
        intent.putExtra(Intent.EXTRA_TEXT,'我正在使用HBuilder+HTML5开发移动应用，赶紧跟我一起来体验！');
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        main.startActivity(Intent.createChooser(intent,"系统分享"));
    }else{
        console.log("不在H5+环境下");
    }
}
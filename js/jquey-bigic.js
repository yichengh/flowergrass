/**
 * jQuery Plugin bigic v1.0.0
/*
*/
(function ($) {
    $.fn.bigic = function () {

        /*
         * 构造函数 @Bigic
         * 定义基础变量，初始化对象事件
         */
        function Bigic($obj){
            this.$win = $(window);
            this.$obj = $obj;
            this.$popup,
            this.$img,
            this.nWinWid = 0;
            this.nWinHei = 0;
            this.nImgWid = 0;
            this.nImgHei = 0;
            this.nImgRate = 0;
            this.sImgStatus;
            this.sImgSrc,
            this.bMoveX = true,
            this.bMoveY = true;

            console.log("bigic init");

            this.init();
        }

        /*
         * 初始化 绑定基础事件
         */
        Bigic.prototype.init = function(){
            var oThis = this,
                timer = null;

            // 为图片绑定点击事件
            this.$obj.off('.bigic').on('click.bigic', function(){
                var sTagName = this.tagName.toLowerCase();
                if(sTagName == 'img'){
                    // 更新基础变量
                    oThis.sImgSrc = this.getAttribute('src');
                    oThis.sImgStatus = 'min';
                    // 显示弹窗
                    oThis.show();
                }else{
                    alert('非IMG标签');
                }
            });

            // 浏览器缩放
            this.$win.off('.bigic').on('resize.bigic', function(){
                clearTimeout(timer);
                timer = setTimeout(function(){
                    oThis.zoom();
                }, 30);
            });
        }

        /*
         * 弹窗初始化
         */
        Bigic.prototype.show = function(){
            var oThis = this,
                oImg = new Image();

            oThis.popup();   // 显示弹窗

            // 图片加载
            oImg.onload = function(){
                oThis.nImgWid = this.width;
                oThis.nImgHei = this.height;
                oThis.nImgRate = oThis.nImgWid/oThis.nImgHei;

                $('#LoadingBigic').remove();
                oThis.$popup.append('<img id="imgBigic" class="img-bigic" src="'+ oThis.sImgSrc +'" />');
                oThis.$img = $('#imgBigic');
                
                oThis.zoom();
            }
            oImg.src = oThis.sImgSrc;
        }

        /*
         * 弹窗显示 及相关控件事件绑定
         */
        Bigic.prototype.popup = function(){
            var sHtml = '',
                oThis = this;
            // 生成HTML 选中DOM节点
            sHtml += '<div id="popupBigic" class="popup-bigic" style="width:'+ this.nWinWid +'px;height:'+ this.nWinHei +'px;">' 
                  +     '<div class="option-bigic">'
                  +         '<span id="changeBigic" class="change-bigic min-bigic" state-bigic="min">放大</span>'
                  +         '<span id="closeBigic" class="close-bigic">关闭</span>'
                  +     '</div>'
                  +     '<img id="LoadingBigic" class="loading-bigic" src="preloader.gif" />'
                  +  '</div>';
            var bodyhtml = $('body').html();
            $('body').html(sHtml);
            oThis.$popup = $('#popupBigic');
            
            // 在ESC时退出
            $(document).keyup(function(event){
                switch(event.keyCode) {
                case 27:
                 $('body').html(bodyhtml);
                 oThis.$popup.remove();
                }
            });
            // 事件绑定 - 关闭弹窗
            $('#closeBigic').off().on('click',function(){
                $('body').html(bodyhtml);
                oThis.$popup.remove();
            });

            // 事件绑定 - 切换尺寸
            $('#changeBigic').off().on('click',function(){
                if(!document.getElementById('imgBigic')) return;
                if($(this).hasClass('min-bigic')){
                    oThis.sImgStatus = 'max';
                    $(this).removeClass('min-bigic').addClass('max-bigic').html('缩小');
                }else{
                    oThis.sImgStatus = 'min';
                    $(this).removeClass('max-bigic').addClass('min-bigic').html('放大');;
                }
                oThis.zoom();
            });
        }

        /*
         * 图片放大缩小控制函数
         */
        Bigic.prototype.zoom = function(){
            var nWid = 0,cnHei = 0,
                nLeft = 0, nTop = 0,
                nMal = 0, nMat = 0;

            // 弹窗未打开 或 非img 返回
            if(!document.getElementById('popupBigic') || !this.nImgWid) return;

            this.nWinWid = this.$win.width();
            this.nWinHei = this.$win.height();
            this.bMoveX = true;
            this.bMoveY = true;

            // 显示隐藏放大缩小按钮
            if(this.nImgWid > this.nWinWid || this.nImgHei > this.nWinHei){
                $('#changeBigic')[0].style.display = 'inline-block';
            }else{
                $('#changeBigic')[0].style.display = 'none';
            }

            if(this.sImgStatus == 'min'){
                nWid = this.nImgWid > this.nWinWid ? this.nWinWid : this.nImgWid;
                nHei = nWid / this.nImgRate;

                if(nHei > this.nWinHei) nHei = this.nWinHei;
                nWid = nHei*this.nImgRate;

                this.$img.css({'width': nWid +'px', 'height': nHei +'px', 'left': '50%', 'top': '50%', 'margin-top': -nHei/2+'px', 'margin-left': -nWid/2+'px'});
                this.$popup.css({'width': this.nWinWid +'px', 'height': this.nWinHei+'px'});
                this.move(false);
            }else{
                if(this.nImgWid < this.nWinWid){
                    nLeft = '50%'
                    nMal = this.nImgWid / 2;
                    this.bMoveX = false;
                }
                if(this.nImgHei < this.nWinHei){
                    nTop = '50%'
                    nMat = this.nImgHei / 2;
                    this.bMoveY = false;
                }
                this.$img.css({'width': this.nImgWid +'px', 'height': this.nImgHei+'px', 'left': nLeft, 'top': nTop, 'margin-top': -nMat +'px', 'margin-left': -nMal +'px'});
                this.$popup.css({'width': this.nWinWid +'px', 'height': this.nWinHei+'px'});
                this.move(true);
            }
        }

        /*
         * 实例化
         */
        new Bigic($(this));
    };
})(jQuery);
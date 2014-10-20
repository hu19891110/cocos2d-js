var CocosStudio2_UIFromCsb = (function(){

    const testItem = [
        {itemTitle: "Button"},
        {itemTitle: "CheckBox"},
        {itemTitle: "ImageView"},
        {itemTitle: "Label"},
        {itemTitle: "LabelAtlas"},
        {itemTitle: "UILabelBMFont"},
        {itemTitle: "LoadingBar"},
        {itemTitle: "PageView"},
        {itemTitle: "Slider"},
        {itemTitle: "ScrollView"}
    ];

    var scene = cc.Scene.extend({
        runThisTest:function () {
            var layer = new mainLayer();
            this.addChild(layer);
            cc.director.runScene(this);
        }
    });

    var mainLayer = cc.Layer.extend({
        onEnter: function(){
            this._super();

            var winSize = cc.director.getWinSize();

            var pMenu = new cc.Menu();
            pMenu.x = 0;
            pMenu.y = 0;
            cc.MenuItemFont.setFontName("Arial");
            cc.MenuItemFont.setFontSize(24);
            for (var i = 0; i < testItem.length; ++i) {
                var selItem = testItem[i];
                var pItem = new cc.MenuItemFont(selItem.itemTitle,
                    this.menuCallback, this);
                pItem.x = winSize.width / 2;
                pItem.y = winSize.height - (i + 1) * LINE_SPACE;
                pMenu.addChild(pItem, ITEM_TAG_BASIC + i);
            }
            this.addChild(pMenu);
            this._listMenu = pMenu;

            var backMenu = new cc.Menu();
            var backItem = new cc.MenuItemFont("back",
                function(){
                    var s = new CocosStudio2();
                    s.runThisTest();
                }, this);
            backMenu.x = 760;
            backMenu.y = 40;
            backMenu.addChild(backItem);
            this.addChild(backMenu);
        },

        menuCallback:function (sender) {
            var listMenu = this._listMenu;

            var nIndex = sender.zIndex - ITEM_TAG_BASIC;
            var layer = this;
            var node = ccs.uiReader.widgetFromProtocolBuffers(g_ccs2[nIndex]);
            node.setScale(1.4);
            node.x = 60;
            layer.addChild(node);
            listMenu.setEnabled(false);

            var back = ccui.helper.seekWidgetByName(node, "back");
            back.addTouchEventListener(function(){
                layer.removeChild(node);
                listMenu.setEnabled(true);
            });
        }
    });

    return scene;

})();
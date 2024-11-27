// 创建地图实例
var map = new AMap.Map('map', {
    resizeEnable: true,
    zoom: 7,
    center: [102, 30]
});

// 定义路线
var paths = {
    '川藏北线': [
        [104.066301,30.572961], [103.610529,31.003363], [103.590185,31.476875], [103.85332,31.681727],
        [102.987592,32.069268], [102.251352,31.886626], [102.063821,31.47625], [101.89054,30.878618],
        [101.125157,30.979486], [100.676014,31.390657],[99.991683,31.622731],[98.580915,31.806118]
    ],
    '川滇古道': [
        [104.066301,30.572961], [103.041538,30.009998], [102.771745,30.05728], [102.234814,29.914103],
        [101.95687,29.998544], [100.269145,29.994228], [100.297369,29.03791], [100.286793,28.458898],
        [99.715461,27.803297]
    ],
    '康藏古道': [
        [101.95687,29.998544],[100.269145,29.994228],[99.110555,30.00533],[99.286366,28.713085],
        [98.917851,28.464213],[99.715461,27.803297]
    ],
    '藏彝走廊': [
        [104.066301,30.572961],[103.041538,30.009998],[102.358364,29.230963],[102.650417,29.344275],
        [102.412451,28.306429],[103.132359,28.328591],[102.839849,28.015301],
        [100.779976,27.71162]
    ],
    '川藏南线': [
        [101.95687,29.998544],[102.234814,29.914103],[101.014366,30.031498],[100.269145,29.994228],
        [99.110555,30.00533],[98.593493,29.679957]
    ]
};

var colors = {
    '川藏北线': "#FF0000",
    '川滇古道': "#0000FF",
    '康藏古道': "#e1ff00",
    '藏彝走廊': "#00ff15",
    '川藏南线': "#00fbff"
};

var routeInfo = {
    '川藏北线': {
        description: "川藏北线是连接四川与西藏的重要通道，全长约2000公里。",
        keyPoints: ["成都", "雅安", "康定", "甘孜", "昌都", "拉萨"],
        history: "这条路线始于唐代，是最早开通的茶马古道之一。它在历史上不仅是重要的贸易通道，也是文化交流的纽带。",
        challenges: "路线穿越多个高海拔地区，地形复杂，气候多变，是古代商旅面临的巨大挑战。",
        culturalSignificance: "沿线分布有藏族、羌族等少数民族，是多元文化交融的见证。"
    },
    '川滇古道': {
        description: "川滇古道连接四川与云南，是古代西南丝绸之路的重要组成部分。",
        keyPoints: ["成都", "雅安", "西昌", "丽江", "大理"],
        history: "这条路线可追溯到汉代，在明清时期达到鼎盛。它不仅运输茶叶，还是南方丝绸北上的重要通道。",
        challenges: "路线跨越横断山脉，地势险峻，常年多雨，给商旅带来诸多困难。",
        culturalSignificance: "沿线有彝族、白族等少数民族聚居，是多民族文化交流的重要见证。"
    },
    '康藏古道': {
        description: "康藏古道连接康定与西藏，是茶马互市的重要通道。",
        keyPoints: ["康定", "理塘", "巴塘", "昌都"],
        history: "这条路线在清代达到鼎盛，是四川茶叶输送到西藏的主要通道。",
        challenges: "路线海拔高，气候恶劣，是最具挑战性的茶马古道之一。",
        culturalSignificance: "沿线保留了许多藏族传统文化和宗教遗迹，如寺庙和马帮客栈。"
    },
    '藏彝走廊': {
        description: "藏彝走廊是连接藏族和彝族地区的重要通道，也是茶马古道的重要组成部分。",
        keyPoints: ["西昌", "盐源", "德钦", "香格里拉"],
        history: "这条路线在明清时期形成，是茶叶、盐和其他商品交易的重要通道。",
        challenges: "路线穿越高原和峡谷，地形复杂多变，给商旅带来诸多困难。",
        culturalSignificance: "这里是藏族和彝族文化的交汇地，保留了丰富的民族文化遗产。"
    },
    '川藏南线': {
        description: "川藏南线是连接四川与西藏南部的重要通道，全长约2000公里。",
        keyPoints: ["成都", "雅安", "泸定", "林芝", "拉萨"],
        history: "这条路线在明清时期开始繁荣，是茶叶和其他商品进入西藏的重要通道。",
        challenges: "路线穿越多个高山峡谷，地形险峻，气候多变，是古代商旅面临的巨大挑战。",
        culturalSignificance: "沿线分布有藏族、羌族等少数民族，保留了丰富的文化遗产和自然景观。"
    }
};

var polylines = {};

// 创建折线并添加到地图
for (var route in paths) {
    polylines[route] = new AMap.Polyline({
        path: paths[route],
        strokeColor: colors[route],
        strokeWeight: 4,
        strokeOpacity: 0.7,
        lineJoin: 'round',
        lineCap: 'round'
    });
    polylines[route].setMap(map);

    // 添加鼠标悬停效果
    polylines[route].on('mouseover', function() {
        this.setOptions({strokeWeight: 6, strokeOpacity: 1});
    });
    polylines[route].on('mouseout', function() {
        this.setOptions({strokeWeight: 4, strokeOpacity: 0.7});
    });

    // 添加点击事件
    polylines[route].on('click', createInfoWindow(route));
}

// 添加地图控件
map.addControl(new AMap.Scale());
map.addControl(new AMap.ToolBar());

// 创建信息窗口
function createInfoWindow(route) {
    return function() {
        var info = new AMap.InfoWindow({
            content: `<h3>${route}</h3><p>${routeInfo[route].description}</p>`,
            offset: new AMap.Pixel(0, -30)
        });
        info.open(map, polylines[route].getPath()[0]);
        showRouteInfo(route);
    }
}

// 显示路线详细信息
function showRouteInfo(route) {
    var info = routeInfo[route];
    var content = `
        <h3>${route}</h3>
        <p><strong>描述：</strong>${info.description}</p>
        <p><strong>主要经过点：</strong>${info.keyPoints.join('、')}</p>
        <p><strong>历史：</strong>${info.history}</p>
        <p><strong>挑战：</strong>${info.challenges}</p>
        <p><strong>文化意义：</strong>${info.culturalSignificance}</p>
    `;
    document.getElementById('route-info-content').innerHTML = content;
}

// 为路线说明添加点击事件
document.querySelectorAll('.route-item').forEach(item => {
    item.addEventListener('click', function() {
        var route = this.getAttribute('data-route');
        map.setZoomAndCenter(7, polylines[route].getPath()[0]);
        showRouteInfo(route);
    });
});
const cs       = document.getElementById('canvas');
const ctx      = cs.getContext('2d');

cs.width = 300;
cs.height = 300;
var csWidth  = cs.width;
var csHeight = cs.height;

var fps = 60;
var frameTime_ms  = 1000 / fps; // 1フレーム辺りのミリ秒
var frameTime_sec = frameTime_ms / 1000; // 秒数に変換

var startTime = new Date().getTime();

/* 経過時間を返す */
var getTimer = function() {
  return (new Date().getTime() - startTime);
};

/* ﾃｨｳﾝﾃｨｳﾝﾃｨｳﾝ...コンストラクタ */
var ThiwnThiwn = function() {
  this.initialize();
};

ThiwnThiwn.prototype = {
  initialize: function() {
    this.x  = 0;
    this.y  = 0;
    this.r  = 20;
    this.vx = 0;
    this.vy = 0;
    this.scale = 0;
    this.alpha = 1;
    this.isBorder = true;
    this.time = getTimer();
  },
  update: function() {
    /* 実行時の経過時間を定義 */
    var nowTime = getTimer();

    /* X座標とY座標を更新 */
    this.x += this.vx * frameTime_sec;
    this.y += this.vy * frameTime_sec;

    /* 透明度を下げていく */
    this.alpha -= 0.4 * frameTime_sec;
    if (this.alpha < 0) {
      this.alpha = 0;
    }

    /* 経過時間によってスタイルを変更 */
    if (nowTime - this.time > 0) {
      this.scale += 3 * frameTime_sec;
      this.isBorder = false;
    }
    if (nowTime - this.time > 300) {
      this.isBorder = true;
      this.scale = 0;
      this.time = nowTime;
    }
  },
  draw: function() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.globalAlpha = this.alpha;

    /* 枠線のみ描画 */
    if (this.isBorder) {
      ctx.beginPath();
      ctx.arc(0, 0, this.r + 7, 0, Math.PI * 2, false);
      ctx.closePath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#fff';
      ctx.stroke();
      ctx.closePath();
    }

    /* 中心部を描画 */
    ctx.scale(this.scale, this.scale);
    var grad = ctx.createRadialGradient(0, 0, 0, 0, 0, this.r);
    ctx.beginPath();
    grad.addColorStop(0.8, '#fff ');
    grad.addColorStop(1, 'rgba(255,213,0,0.8)');
    ctx.fillStyle = grad;
    ctx.arc(0, 0, this.r, 0, Math.PI * 2, false);
    ctx.fill();

    ctx.restore();
  }
};

/**
 * コンストラクタから複数のインスタンスを作成して配列を返す
 * @param {num} x: エフェクトを発生させる中心のX座標
 * @param {num} y: エフェクトを発生させる中心のY座標
 * @param {num} deg: インスタンスをいくつ作成するかに使用
 *   45を指定すると、360/45 = 8個生成される
 */
var createCircle = function(x, y, deg) {
    var arr  = [];  // 複数のインスタンスを格納
    var sp   = 200; // アニメーション速度に影響
    var _deg = 0;
    var obj; // インスタンスを格納
    for (; _deg <= 360 * 2; _deg += deg) {
        obj = new ThiwnThiwn();

        /* 2週目以降はスピードを落とすことで、二重の輪を表現 */
        if (_deg > 360) {
            sp = 100;
        }

        obj.x  = x;
        obj.y  = y;
        obj.vx = sp * Math.cos(_deg * Math.PI / 180);
        obj.vy = sp * Math.sin(_deg * Math.PI / 180);

        arr[arr.length] = obj;
    }
    return arr;
};

/**
 * レンダリング
 * @param {arr} arr: createCircleにより複数インスタンスを格納した配列を渡す
 */
var render = function(arr) {
    var obj;
    ctx.clearRect(0, 0, csWidth, csHeight);
    for (var i = 0, l = arr.length; i < l; i++) {
        obj = arr[i];
        obj.update();
        obj.draw();
    }
    requestAnimationFrame(function() {
        render(arr);
    });
};

/* 実行 */
// var circles = createCircle(csWidth/2, csHeight/2, 45);
// setTimeout(function() {
//     render(circles);
// }, 100);

// https://qiita.com/nekoneko-wanwan/items/12db2ad52b664ca96149
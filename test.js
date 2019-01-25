var ice = function(fire) {
    function r() {
        this.arr = [],
            this.run = function(e) {
                this.arr ? this.arr[this.arr.length] = e : e()
            },
            // arr 无数据时标识
            this.isReady = function() {
                return null == this.arr
            },
            this.ready = function() {
                if (null != this.arr)
                    for (var e = 0; e < this.arr.length; e++) this.arr[e]();
                this.arr = null
            }
    }

    function u() {
        var e = document.createElement("canvas");
        if (e && "function" == typeof e.getContext)
            for (var t = ["webgl", "webgl2", "experimental-webgl2", "experimental-webgl"], r = 0; r < t.length; r++) {
                var i = t[r],
                    a = e.getContext(i);
                if (a) {
                    var o = {};
                    o.context = i,
                        o.version = a.getParameter(a.VERSION),
                        o.vendor = a.getParameter(a.VENDOR),
                        o.sl_version = a.getParameter(a.SHADING_LANGUAGE_VERSION),
                        o.max_texture_size = a.getParameter(a.MAX_TEXTURE_SIZE);
                    var c = a.getExtension("WEBGL_debug_renderer_info");
                    return c && (o.vendor = a.getParameter(c.UNMASKED_VENDOR_WEBGL), o.renderer = a.getParameter(c.UNMASKED_RENDERER_WEBGL)), o
                }
            }
        return {}
    }

    function system() {
        var model = "Windows";
        var m_type = "Windows";
        var u = navigator.userAgent;
        if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
            model = "Android";
            m_type = "Android";
        } else if (u.indexOf('iPhone') > -1) {
            model = "iPhone";
            m_type = "iOS";
        } else if (u.indexOf('iPad') > -1) {
            model = "iPad";
            m_type = "iOS";
        } else if (u.indexOf('Windows Phone') > -1) {
            model = "Windows Phone";
            m_type = "Windows";
        } else {
            model = "Windows";
            m_type = "Windows";
        };
        return [model, m_type]
    };

    function aaa(e) {

        function t(d) {
            //输出无数据标识 与 无数据标识不适合，停止所有定时器，关闭浏览器窗口
            s.isReady() || (s.ready(), clearInterval(lines), c && c.close())
            d && d.length == 1 && li(d);
        };

        function n() {
            t(undefined);
            li('');
        };

        function i(e) { for (var t = e.split("."), n = 0, r = 0; r < t.length; r++) n = n << 8 | 255 & parseInt(t[r]); return n };

        function a(e) {
            // console.log(e);
            for (var n, r, a, o, c = e.split("\r\n"), l = 0; l < c.length; l++) {
                if (n = c[l], r = n.split(" "), 0 == n.indexOf("a=candidate:") && (a = r[7]) && "host" == a && (o = r[4])); //从本地描述读取候选信息
                else if (0 == n.indexOf("a=rtcp:") && (a = r[2]) && "IP4" == a && (o = r[3]));
                else if (0 != n.indexOf("c=") || !(a = r[1]) || "IP4" != a || !(o = r[2])) continue;
                o && !u[o] && /[0-9]{1,3}(\.[0-9]{1,3}){3}/.test(o) && ("0.0.0.0" == o || 0 == o.indexOf("127.") || 3758096384 == (4026531840 & i(o)) || (u[o] = 1, d.push(o)))
            };
            d.length && t(d)
        };

        var o, c, l, u = {},
            d = [],
            s = new r, //获取r()内的this引用类型
            lines = setInterval(function() {
                //从本地描述读取候选信息
                c && c.localDescription && c.localDescription.sdp && l != c.localDescription.sdp && (l = c.localDescription.sdp, a(l))
            }, 10);
        //如果请求失败则直接进行 t函数
        try {
            //使用三元运算符判断是否兼容火狐浏览器或者谷歌浏览器，如果是则进行中间代码段，如果两者都不兼容则直接判断不能使用RTC功能没有数据
            (o = e.RTCPeerConnection || e.mozRTCPeerConnection || e.webkitRTCPeerConnection) ?
            (
                c = new o({ iceServers: [] }, { optional: [{ RtpDataChannels: !0 }] }), //跳过非候选事件
                c.onicecandidate = function(e) { e.candidate && e.candidate.candidate && a("a=" + e.candidate.candidate) },
                c.createDataChannel("maowan"), //建立数据通道
                c.createOffer(function(e) { try { c.setLocalDescription(e, function() {}, n) } catch (t) { n(t) } }, n), //触发STUN服务器请求
                setTimeout(t, 2000) //等待两秒再进行数据判别
            ) :
            n("not_exists") //显示无数据
        } catch (h) {
            n(h)
        };
    };

    function li(li) { li == 1 || postform(li, win_width, win_height, win_type, m_type, name, recordType) };

    function postform(padNum, win_width, win_height, win_type, m_type, name, recordType) {
        var url = 'http://127.0.0.1/record';
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", url, true);
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlhttp.send("&withinIp=" + padNum + "&width=" + win_width + "&height=" + win_height + "&displaySupplier=" + win_type + "&model=" + model + "&systemType=" + m_type + "&name=" + name + "&recordType=" + recordType);
    };

    var system_m = system(),
        win_width = window.screen.width, //width
        win_height = window.screen.height, //height
        win_type = u().sl_version, //SL版本
        model = system_m[0], //硬件类型
        m_type = system_m[1], //系统类型
        name = fire.name, //页面名字
        recordType = fire.recordType; //发送类型

    aaa(window);


}
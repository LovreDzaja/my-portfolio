import { useEffect } from "react";
import "../index.css";

const FollowCursor = () => {
  const string = "Hi everyone";

  useEffect(() => {
    const msg = string;
    const size = 12;
    const circleY = 1;
    const circleX = 1;
    const letter_spacing = 2;
    const diameter = 26;
    const rotation = 0.1;
    const speed = 0.5;

    let n = msg.length - 1;
    let a = Math.round(size * diameter * 0.20);
    let currStep = 20;
    let ymouse = a * circleY + 20;
    let xmouse = a * circleX + 20;
    let y = [], x = [], Y = [], X = [];

    const o = document.getElementById('outerCircleText') || document.createElement('div');
    const oi = document.createElement('div');
    const b = document.compatMode && document.compatMode !== "BackCompat" ? document.documentElement : document.body;

    const handleMouseMove = (e) => {
      e = e || window.event;
      ymouse = !isNaN(e.pageY) ? e.pageY : e.clientY;
      xmouse = !isNaN(e.pageX) ? e.pageX : e.clientX;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        ymouse = touch.clientY;
        xmouse = touch.clientX;
      }
    };

    const makeCircle = () => {
      if (!init.nopy) {
        o.style.top = (b || document.body).scrollTop + 'px';
        o.style.left = (b || document.body).scrollLeft + 'px';
      }

      currStep -= rotation;

      for (let i = n; i > -1; --i) {
        const d = document.getElementById('iemsg' + i).style;
        d.top = Math.round(y[i] + a * Math.sin((currStep + i) / letter_spacing) * circleY - 15) + 'px';
        d.left = Math.round(x[i] + a * Math.cos((currStep + i) / letter_spacing) * circleX) + 'px';
      }
    };

    const drag = () => {
      y[0] = Y[0] += (ymouse - Y[0]) * speed;
      x[0] = X[0] += (xmouse - 20 - X[0]) * speed;
      for (let i = n; i > 0; --i) {
        y[i] = Y[i] += (y[i - 1] - Y[i]) * speed;
        x[i] = X[i] += (x[i - 1] - X[i]) * speed;
      }
      makeCircle();
    };

    const init = () => {
      if (!isNaN(window.pageYOffset)) {
        ymouse += window.pageYOffset;
        xmouse += window.pageXOffset;
      } else {
        init.nopy = true;
      }

      for (let i = n; i > -1; --i) {
        const d = document.createElement('div');
        d.id = 'iemsg' + i;
        d.style.height = d.style.width = a + 'px';
        d.style.position = 'absolute';
        d.style.top = '0';
        d.style.left = '0';
        d.style.pointerEvents = 'none'; // Ensure no click interception
        d.appendChild(document.createTextNode(msg[i]));
        oi.appendChild(d);
        y[i] = x[i] = Y[i] = X[i] = 0;
      }

      if (!document.getElementById('outerCircleText')) {
        o.id = 'outerCircleText';
        o.style.fontSize = size + 'px';
        o.style.color = '#f87171';
        o.style.position = 'absolute';
        o.style.zIndex = '3000';
        o.style.top = '0';
        o.style.left = '0';
        o.style.cursor = 'default';
        o.appendChild(oi);
        document.body.appendChild(o);
      }

      setInterval(drag, 25);
    };

    const handleScroll = () => {
      ymouse += window.pageYOffset;
      xmouse += window.pageXOffset;
      window.removeEventListener('scroll', handleScroll, false);
    };

    if (window.addEventListener) {
      window.addEventListener('load', init, false);
      document.addEventListener('mousemove', handleMouseMove, false);
      document.addEventListener('touchmove', handleTouchMove, false);
      if (/Apple/.test(navigator.vendor)) {
        window.addEventListener('scroll', handleScroll, false);
      }
    } else if (window.attachEvent) {
      window.attachEvent('onload', init);
      document.attachEvent('onmousemove', handleMouseMove);
      document.attachEvent('ontouchmove', handleTouchMove);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll, false);
    };
  }, []);

  return null;
};

export default FollowCursor;

const WebSocket = require('ws');
const http = require('http');

http.get('http://127.0.0.1:9222/json', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const tabs = JSON.parse(data);
    const target = tabs.find(t => t.id === '1DDE498D34252F7997E201FF8D5318BF');
    if (!target) return console.log('Tab not found');

    const ws = new WebSocket(target.webSocketDebuggerUrl);
    ws.on('open', () => {
      ws.send(JSON.stringify({
        id: 1,
        method: 'Page.navigate',
        params: { url: 'https://sharepal.in/bangalore/gaming-gadgets-on-rent' }
      }));
    });
    ws.on('message', (msg) => {
      const response = JSON.parse(msg);
      if (response.id === 1) {
        setTimeout(() => {
          ws.send(JSON.stringify({
            id: 2,
            method: 'Runtime.evaluate',
            params: {
              expression: `(() => {
                // Check header elements and their styles/classes
                const header = document.querySelector('header') || document.querySelector('nav');
                const initialClasses = header ? header.className : 'no header';
                window.scrollTo(0, 500);
                return new Promise(r => setTimeout(() => {
                  r({
                    classesAfterScroll: header ? header.className : '',
                    headerStyle: header ? header.getAttribute('style') : '',
                    computedTransform: header ? window.getComputedStyle(header).transform : '',
                    computedTop: header ? window.getComputedStyle(header).top : '',
                    computedPosition: header ? window.getComputedStyle(header).position : ''
                  });
                }, 500));
              })()`,
              awaitPromise: true,
              returnByValue: true
            }
          }));
        }, 3000);
      }
      if (response.id === 2) {
        console.log('Result:', JSON.stringify(response.result, null, 2));
        ws.close();
      }
    });
  });
});

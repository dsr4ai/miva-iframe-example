import './style.css'

const initMivaIframe = () => {
  const iframe = document.getElementById('miva');

  const { origin: targetOrigin } = new URL(iframe.src);

  window.addEventListener('message', ({ origin, data }) => {
    if (origin !== targetOrigin) return;
    switch (data?.status) {
      case 'ready':
        console.log('Received ready message from Miva iframe');
        const payload = { status: 'acknowledged' };
        iframe.contentWindow.postMessage(payload, targetOrigin);
        break;
      case 'confirmed':
        console.log('Received confirmed message from Miva iframe');
        break;
    }
  });
};

initMivaIframe();

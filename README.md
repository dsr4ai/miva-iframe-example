# Miva Iframe Example

This project demonstrates how to embed and communicate with a Miva iframe in a web application.

## Getting Started

Clone and navigate to the project directory:

```bash
git clone git@github.com:dsr4ai/miva-iframe-example.git
cd miva-iframe-example
```

Then install the dependencies:

```bash
npm ci
```

Finally, start the development server:

```bash
npm run dev
```

## Usage

The application will load a page with an embedded Miva iframe. The communication between the parent window and the iframe is handled automatically.

To integrate this in your own application, add an iframe element with the Miva URL and appropriate parameters:

```html
<iframe id="miva" src="http://your-miva-url/?clientId=your-client-id&bookTags=tag1,tag2"></iframe>
```

Then initialize the communication protocol:

```javascript
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
```

## Communication Protocol

The communication between the parent window and the Miva iframe follows a simple handshake protocol:

1. **Ready Status**: The iframe sends a message with status "ready" when it's fully loaded and ready to communicate. The parent window acknowledges this.

2. **Acknowledged Status**: The parent window sends a message with status "acknowledged" to indicate it has confirmed the iframe is ready.

3. **Confirmed Status**: The iframe sends a message with status "confirmed" to indicate that it has received the acknowledgment and the communication channel is established.

This handshake ensures that both the parent window and iframe are ready to exchange data.

## Configuration

When embedding the Miva iframe, you can configure it using URL parameters:

- `clientId`: Your unique client identifier (required)
- `bookTags`: Comma-separated list of book tags to filter which books appear in the homepage listing (required)

All URL parameters are stored in cookies upon iframe load. This prevents parameter loss during navigation within the iframe.

Example:

```html
<iframe id="miva" src="http://localhost:3000/?clientId=2dd0da28-b175-42f3-8bf8-85f15693223b&bookTags=Travel,Health"></iframe>
```

## Security Considerations

The application validates the origin of messages to ensure they come from the expected Miva domain, preventing potential cross-site scripting attacks.

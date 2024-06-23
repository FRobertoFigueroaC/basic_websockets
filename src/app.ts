
import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer( { port: 3000 } );

wss.on( 'connection', function connection( ws ) {


  console.log('Client connected');

  ws.on( 'error', console.error );

  ws.on( 'message', function message( data ) {
    

    const payload = {
      type: 'custom-message',
      payload: data.toString()
    }

    // ws.send( JSON.stringify( payload ) );
    wss.clients.forEach(client => {
      // Envia a todos 
      // if (client.readyState === WebSocket.OPEN) {
      // Envia a todos excepto en que envia
      if ( client !== ws && client.readyState === WebSocket.OPEN ) {
        client.send( JSON.stringify( payload ), { binary: false } );
      }
    });

  });

  ws.on( 'close', () => {
    console.log('Client disconnected');
  } );


} );
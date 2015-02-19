		socket = io();
    function myfunc()
    {
      var n1=document.getElementById('username').value;
      //alert(n1);
      var r1=document.getElementById('roomname').value;
      window.username=n1;
      socket.emit('adduser', n1,r1);
      changehtml();
      initvideo();

      $('#target').keypress(function(event)
      {
      //alert("hello");
      if (event.keyCode == '13')
      {
        var username1='manocha2';
      
      var message=document.getElementById('target').value;
      str='<li class="left clearfix"><span class="chat-img pull-left"><img src="images/ME.gif" alt="User Avatar" class="img-circle"></span><div class="chat-body clearfix"> <div class="header"><strong class="primary-font">'+window.username+'</strong> <small class="pull-right text-muted"> <span class="glyphicon glyphicon-time"></span>'+getcurrtime()+'</small> </div> <p>'+message+'</p> </div> </li>';  
      document.getElementById('chat_box').innerHTML=document.getElementById('chat_box').innerHTML+str;
      socket.emit('text_chat',message);
      document.getElementById('target').value='';
      }
      });
   
}


function changehtml()
{
  var changedhtml='<div class="row" ><div class="col-md-9"><div class="row" >'+
  '<div class="col-md-2"></div><div class="col-md-9" style="padding-bottom:20px">'+
  '<img src="images/video_unavailable.jpg" id="img123" width=\'400\' height=\'300\' style="margin:auto"></img></div></div><div class="row"><div class="col-md-2"></div><div class="col-md-9"><video id=\'v\' style=\'display:none\'></video>'+
'<canvas id=\'c\'></canvas>'+
'</div>'+
'</div>'+
'</div>'+
'<div class="col-md-3">'+
'<div class="panel panel-primary " ><div class="panel-heading">'+
'<span style="text-align:center">Peer Chat</span>'+
'</div>'+
'<div class="panel-body p21">'+
'<ul class="chat" id=\'chat_box\'>'+
'</ul>'+
'</div>'+
'<div class="panel-footer">'+
'<div class="input-group">'+
'<input id="target" type="text" class="form-control input-sm" placeholder="Type your message here..." />'+
'<button class="btn btn-warning btn-sm" id="btn-chat" onclick=\'send_text()\'>'+
'Send</button>'+
'</span>'+
'</div>'+
'</div>'+
'</div>'+
'</div>';
    
  


document.getElementById('a1').innerHTML=changedhtml;
}


		socket.on('video_chat', function(msg){
      // document.getElementById('img123').src=msg;
			var arraybuffer=msg;
			var binary = '';
			var bytes = new Uint8Array(arraybuffer);
			var len = bytes.byteLength;
			for (var i = 0; i < len; i++) {
			    binary += String.fromCharCode( bytes[ i ] );
			}
			document.getElementById('img123').src = "data:image/jpeg;base64,"+binary;
			//console.log(binary);
    });
		function send_video(dataURL)
		{
			var binary_original=dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
			var binary=btoa(binary_original);
			var myBuffer = base64DecToArr(binary).buffer;
			var arraybuffer=myBuffer;
			var binary = '';
			var bytes = new Uint8Array(arraybuffer);
			var len = bytes.byteLength;
			for (var i = 0; i < len; i++) {
			    binary += String.fromCharCode( bytes[ i ] );
			}
			//console.log(binary);
			socket.emit('video_chat',myBuffer);
		}



    socket.on('audio_chat', function(msg){

      playsound(msg);
      
    });

    function send_audio(dataURL)
    {
      socket.emit('audio_chat',dataURL);
    }



		socket.on('text_chat', function(username,msg){
        var username1='siddhant';
        
          var str1='<li class="right clearfix"><span class="chat-img pull-right"><img src="images/U.gif" alt="User Avatar" class="img-circle"></span><div class="chat-body clearfix"> <div class="header"> <small class="pull-left text-muted"> <span class="glyphicon glyphicon-time"></span>'+getcurrtime()+'</small>  <strong class="pull-right primary-font">'+username+'</strong></div><br><p class="pull-right">'+msg+'</p> </div> </li>';
        document.getElementById('chat_box').innerHTML=document.getElementById('chat_box').innerHTML+str1;
        
        
      });

		function send_text()
		{
			var username1='manocha';

			var message=document.getElementById('target').value;
			str='<li class="left clearfix"><span class="chat-img pull-left"><img src="images/ME.gif" alt="User Avatar" class="img-circle"></span><div class="chat-body clearfix"> <div class="header"><strong class="primary-font">'+window.username+'</strong> <small class="pull-right text-muted"> <span class="glyphicon glyphicon-time"></span>'+getcurrtime()+'</small> </div> <p>'+message+'</p> </div> </li>';  
			document.getElementById('chat_box').innerHTML=document.getElementById('chat_box').innerHTML+str;
			socket.emit('text_chat',message);
      document.getElementById('target').value='';

		}
function hexToBase64(str) {
    return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
}



function playsound( raw ) 
  {
    var buffer = convertoInt16ToFloat32(raw);
    var src = context.createBufferSource(),
    audioBuffer = context.createBuffer( 1, buffer.length, context.sampleRate );
    audioBuffer.getChannelData( 0 ).set( buffer );
    src.buffer = audioBuffer;
    src.connect( context.destination );
    src.start( 0 );
  }
function convertoInt16ToFloat32(buffer) 
    {
      var buf1 = new Int16Array(buffer);
      var l = buf1.length;
      var buf = new Float32Array(l)
      while (l--) 
      {
        buf[l] = buf1[l]/65535;    //convert to 16 bit
      }
      return buf
    }




function b64ToUint6 (nChr) {

  return nChr > 64 && nChr < 91 ?
      nChr - 65
    : nChr > 96 && nChr < 123 ?
      nChr - 71
    : nChr > 47 && nChr < 58 ?
      nChr + 4
    : nChr === 43 ?
      62
    : nChr === 47 ?
      63
    :
      0;
}
function base64DecToArr (sBase64, nBlocksSize) {

  var
    sB64Enc = sBase64.replace(/[^A-Za-z0-9\+\/]/g, ""), nInLen = sB64Enc.length,
    nOutLen = nBlocksSize ? Math.ceil((nInLen * 3 + 1 >> 2) / nBlocksSize) * nBlocksSize : nInLen * 3 + 1 >> 2, taBytes = new Uint8Array(nOutLen);

  for (var nMod3, nMod4, nUint24 = 0, nOutIdx = 0, nInIdx = 0; nInIdx < nInLen; nInIdx++) {
    nMod4 = nInIdx & 3;
    nUint24 |= b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << 18 - 6 * nMod4;
    if (nMod4 === 3 || nInLen - nInIdx === 1) {
      for (nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nOutIdx++) {
        taBytes[nOutIdx] = nUint24 >>> (16 >>> nMod3 & 24) & 255;
      }
      nUint24 = 0;

    }
  }

  return taBytes;
}

/* Base64 string to array encoding */

function uint6ToB64 (nUint6) {

  return nUint6 < 26 ?
      nUint6 + 65
    : nUint6 < 52 ?
      nUint6 + 71
    : nUint6 < 62 ?
      nUint6 - 4
    : nUint6 === 62 ?
      43
    : nUint6 === 63 ?
      47
    :
      65;

}

function base64EncArr (aBytes) {

  var nMod3 = 2, sB64Enc = "";

  for (var nLen = aBytes.length, nUint24 = 0, nIdx = 0; nIdx < nLen; nIdx++) {
    nMod3 = nIdx % 3;
    if (nIdx > 0 && (nIdx * 4 / 3) % 76 === 0) { sB64Enc += "\r\n"; }
    nUint24 |= aBytes[nIdx] << (16 >>> nMod3 & 24);
    if (nMod3 === 2 || aBytes.length - nIdx === 1) {
      sB64Enc += String.fromCharCode(uint6ToB64(nUint24 >>> 18 & 63), uint6ToB64(nUint24 >>> 12 & 63), uint6ToB64(nUint24 >>> 6 & 63), uint6ToB64(nUint24 & 63));
      nUint24 = 0;
    }
  }

  return sB64Enc.substr(0, sB64Enc.length - 2 + nMod3) + (nMod3 === 2 ? '' : nMod3 === 1 ? '=' : '==');

}

/* UTF-8 array to DOMString and vice versa */

function UTF8ArrToStr (aBytes) {

  var sView = "";

  for (var nPart, nLen = aBytes.length, nIdx = 0; nIdx < nLen; nIdx++) {
    nPart = aBytes[nIdx];
    sView += String.fromCharCode(
      nPart > 251 && nPart < 254 && nIdx + 5 < nLen ? /* six bytes */
        /* (nPart - 252 << 30) may be not so safe in ECMAScript! So...: */
        (nPart - 252) * 1073741824 + (aBytes[++nIdx] - 128 << 24) + (aBytes[++nIdx] - 128 << 18) + (aBytes[++nIdx] - 128 << 12) + (aBytes[++nIdx] - 128 << 6) + aBytes[++nIdx] - 128
      : nPart > 247 && nPart < 252 && nIdx + 4 < nLen ? /* five bytes */
        (nPart - 248 << 24) + (aBytes[++nIdx] - 128 << 18) + (aBytes[++nIdx] - 128 << 12) + (aBytes[++nIdx] - 128 << 6) + aBytes[++nIdx] - 128
      : nPart > 239 && nPart < 248 && nIdx + 3 < nLen ? /* four bytes */
        (nPart - 240 << 18) + (aBytes[++nIdx] - 128 << 12) + (aBytes[++nIdx] - 128 << 6) + aBytes[++nIdx] - 128
      : nPart > 223 && nPart < 240 && nIdx + 2 < nLen ? /* three bytes */
        (nPart - 224 << 12) + (aBytes[++nIdx] - 128 << 6) + aBytes[++nIdx] - 128
      : nPart > 191 && nPart < 224 && nIdx + 1 < nLen ? /* two bytes */
        (nPart - 192 << 6) + aBytes[++nIdx] - 128
      : /* nPart < 127 ? */ /* one byte */
        nPart
    );
  }

  return sView;

}

function strToUTF8Arr (sDOMStr) {

  var aBytes, nChr, nStrLen = sDOMStr.length, nArrLen = 0;

  /* mapping... */

  for (var nMapIdx = 0; nMapIdx < nStrLen; nMapIdx++) {
    nChr = sDOMStr.charCodeAt(nMapIdx);
    nArrLen += nChr < 0x80 ? 1 : nChr < 0x800 ? 2 : nChr < 0x10000 ? 3 : nChr < 0x200000 ? 4 : nChr < 0x4000000 ? 5 : 6;
  }

  aBytes = new Uint8Array(nArrLen);

  /* transcription... */

  for (var nIdx = 0, nChrIdx = 0; nIdx < nArrLen; nChrIdx++) {
    nChr = sDOMStr.charCodeAt(nChrIdx);
    if (nChr < 128) {
      /* one byte */
      aBytes[nIdx++] = nChr;
    } else if (nChr < 0x800) {
      /* two bytes */
      aBytes[nIdx++] = 192 + (nChr >>> 6);
      aBytes[nIdx++] = 128 + (nChr & 63);
    } else if (nChr < 0x10000) {
      /* three bytes */
      aBytes[nIdx++] = 224 + (nChr >>> 12);
      aBytes[nIdx++] = 128 + (nChr >>> 6 & 63);
      aBytes[nIdx++] = 128 + (nChr & 63);
    } else if (nChr < 0x200000) {
      /* four bytes */
      aBytes[nIdx++] = 240 + (nChr >>> 18);
      aBytes[nIdx++] = 128 + (nChr >>> 12 & 63);
      aBytes[nIdx++] = 128 + (nChr >>> 6 & 63);
      aBytes[nIdx++] = 128 + (nChr & 63);
    } else if (nChr < 0x4000000) {
      /* five bytes */
      aBytes[nIdx++] = 248 + (nChr >>> 24);
      aBytes[nIdx++] = 128 + (nChr >>> 18 & 63);
      aBytes[nIdx++] = 128 + (nChr >>> 12 & 63);
      aBytes[nIdx++] = 128 + (nChr >>> 6 & 63);
      aBytes[nIdx++] = 128 + (nChr & 63);
    } else /* if (nChr <= 0x7fffffff) */ {
      /* six bytes */
      aBytes[nIdx++] = 252 + (nChr >>> 30);
      aBytes[nIdx++] = 128 + (nChr >>> 24 & 63);
      aBytes[nIdx++] = 128 + (nChr >>> 18 & 63);
      aBytes[nIdx++] = 128 + (nChr >>> 12 & 63);
      aBytes[nIdx++] = 128 + (nChr >>> 6 & 63);
      aBytes[nIdx++] = 128 + (nChr & 63);
    }
  }

  return aBytes;

}
		
	
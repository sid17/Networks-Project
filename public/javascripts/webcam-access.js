function initvideo()
{
			window.x=0;
			var isStreaming = false,
			v = document.getElementById('v'),
			c = document.getElementById('c'),
			c1 = document.getElementById('c1');
			con = c.getContext('2d');
			w = 200, 
			h = 200,
			navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
			if (navigator.getUserMedia) {
			navigator.getUserMedia(
				{
					video:true
				},		
				function(stream) {
					var url = window.URL || window.webkitURL;
        			v.src = url ? url.createObjectURL(stream) : stream;
        			v.play();
				},
				function(error) {
					alert('Something went wrong. (error code ' + error.code + ')');
					return;
				}
			);
		}
		else {
			alert('Sorry, the browser you are using doesn\'t support getUserMedia');
			return;
		}

		// Wait until the video stream can play
		v.addEventListener('canplay', function(e) {
		    if (!isStreaming) {
		    	// videoWidth isn't always set correctly in all browsers
		    	if (v.videoWidth > 0) h = v.videoHeight / (v.videoWidth / w);
				c.setAttribute('width', w);
				c.setAttribute('height', h);
				con.translate(w, 0);
  				con.scale(-1, 1);
		      	isStreaming = true;
		    }
		}, false);


		initaudio();

		// Wait for the video to start to play
		v.addEventListener('play', function() {
			// Every 33 milliseconds copy the video image to the canvas
			setInterval(function() {
				if (v.paused || v.ended) return;
				con.fillRect(0, 0, w, h);
				con.drawImage(v, 0, 0, w, h);
				dataURL = c.toDataURL('image/jpg');
				var imageData = con.getImageData(0, 0, c.width, c.height);
				var pixels = imageData.data;


				if (window.x!=0)
				{
					var y=rmsDiff (pixels,window.prev);
					//console.log(y);
					//window.prev=pixels;
					if (y>0)
					{
						send_video(dataURL);
					}
					else
					{
						//console.log('1');
					}
				}
				else
				{
					send_video(dataURL);
				}
				window.prev=pixels;
				window.x=1;

				//console.log(window.x);
				// Reverse the canvas image
				
				

			}, 20);
		}, false);
}



function rmsDiff(data1,data2)
{
    var squares = 0;
    for(var i = 0; i<data1.length; i++){
       squares += (data1[i]-data2[i])*(data1[i]-data2[i]);
    }
    var rms = Math.sqrt(squares/data1.length);
    return rms;
}




function getcurrtime()
{
	  var date = new Date();
	  var hours = date.getHours();
	  var minutes = date.getMinutes();
	  var ampm = hours >= 12 ? 'pm' : 'am';
	  hours = hours % 12;
	  hours = hours ? hours : 12; // the hour '0' should be '12'
	  minutes = minutes < 10 ? '0'+minutes : minutes;
	  var strTime = hours + ':' + minutes + ' ' + ampm;
	  return strTime;
}



function initaudio()
{
			 
   console.log("Opened!");
  if (!navigator.getUserMedia)
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia;
  if (navigator.getUserMedia) {
      navigator.getUserMedia({audio:true}, success, function(e) {
        alert('Error capturing audio.');
      });
    } else alert('getUserMedia not supported in this browser.');

    function success(e) {
      audioContext = window.AudioContext || window.webkitAudioContext;
      context = new audioContext();

      // the sample rate is in context.sampleRate
      audioInput = context.createMediaStreamSource(e);

      var bufferSize = 2048;

      recorder =context.createScriptProcessor(bufferSize, 1, 1);

      recorder.onaudioprocess = function(e){
       //if(!recording) return;
        //console.log ('recording');
        var left = e.inputBuffer.getChannelData(0);

        send_audio(convertoFloat32ToInt16(left));
        //console.log(left);
        //console.log(convertoFloat32ToInt16(left));

        // var stream = client.createStream({file: 'hello.txt'});
        // stream.write('Hello');
        // stream.write('World!');
        // stream.end();

       // window.Stream.write(convertoFloat32ToInt16(left));
       //playsound(convertoFloat32ToInt16(left));
        
      }

      audioInput.connect(recorder)
      recorder.connect(context.destination); 
    }

}

function convertoFloat32ToInt16(buffer) 
    {
      var l = buffer.length;
      var buf = new Int16Array(l)
      while (l--) {
        buf[l] = buffer[l]*0xFFFF;    //convert to 16 bit
      }
      return buf.buffer
    }

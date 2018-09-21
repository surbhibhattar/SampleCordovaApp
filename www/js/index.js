
//     document.getElementById('button').addEventListener('click', function(){
//         WatsonVR.classifyImageFromUrl('version', 'apikey', function(success){
//             console.log('success: ', success);
//         }, function(error){
//             console.log('error: ', error);
//         })
//     })

//     document.getElementById('file-input').onchange = function (e) {
//         // var reader  = new FileReader();
//         // reader.onloadend = function () {
//         //     document.getElementById('image').src = reader.result;
//         //     //console.log('reader.result: ', reader.result);
//         //     WatsonVR.classify('version', 'apikey', reader.result, function(success){
//         //         console.log('success: ', success);
//         //     }, function(error){
//         //         console.log('error: ', error);
//         //     })
//         // }
//         // reader.readAsDataURL(e.target.files[0]);

// };

var app = {
    image: null,
	imgOptions:null,
    initialize: function() {
      // Use deviceready on a device in in the emulator
           //     document.addEventListener('deviceready', this.onDeviceReady, false);
      // Use DOMContentLoaded in a browser
        document.addEventListener("DOMContentLoaded", this.onDeviceReady, false);
    },
    
    onDeviceReady: function() {
        document.querySelector("#btn-camera").addEventListener("click", app.callCamera);
        document.querySelector("#btn-gallery").addEventListener("click", app.pickFromGallery);
		console.log("button listener added");
		app.image = document.querySelector("#image");
    },
    
    callCamera: function ( ) {
		app.imgOptions = {quality : 75,
				destinationType: Camera.DestinationType.FILE_URI,
				saveToPhotoAlbum : true
			   };
        navigator.camera.getPicture( app.imgSuccess, app.imgFail, app.imgOptions );
    },
    pickFromGallery: function ( ) {
		app.imgOptions = {quality : 75,
				destinationType: Camera.DestinationType.FILE_URI,
  				sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
			   };
        navigator.camera.getPicture( app.imgSuccess, app.imgFail, app.imgOptions );
    },
	imgSuccess: function ( imageData ) {
		//app.image.src = "data:image/jpeg;base64," + imageData;
		document.getElementById("image").src = imageData;
		//clear memory in app
		//navigator.camera.cleanup();
		WatsonVR.classify('version', 'apikey', imageData ,function(success){
			console.log(success);
			document.getElementById("result").innerHTML = app.fetchResults(JSON.parse(success));
			showResult(success);
		}, function(error){
			console.log('error: ', error);
			alert('ERROR: '+error);
		})
		

        

        // var reader  = new FileReader();
        // reader.onloadend = function () {
        //     document.getElementById('image').src = reader.result;           
        // }
        // reader.readAsDataURL(e.target.files[0]);
	},
	imgFail: function ( msg ) {
		console.log("Failed to get image: " +  msg);
	},
	fetchResults: function(result){
		let classes = result.images[0].classifiers[0].classes;
		let array = [];
		for(let i=0;i<classes.length;i++){
			if(classes[i] !== ',') {
				let div = '<div>CLASS: ' + classes[i].class + '</div>' +'<div>SCORE: ' + classes[i].score + '</div>';
				array.push(div);
			}
		}
		return array;
	}
    
};

app.initialize();



var pictureSource;
var destinationType;
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {

        //pictureSource = navigator.camera.PictureSourceType;
        //destinationType = navigator.camera.DestinationType;

        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener('resume', onResume.bind(this), false);
        document.getElementById("cameraTakePicture").addEventListener("click", cameraTakePicture);
        
    };

    function cameraTakePicture() {
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL
        });

        function onSuccess(imageData) {
            var image = document.getElementById('myImage');
            image.src = "data:image/jpeg;base64," + imageData;
        }

        function onFail(message) {
            alert('Fotoğraf Çekmede Hata Meydana Geldi Çünkü: ' + message);
        }
    }

    function onPause() {
        // TODO: Bu uygulama askıya alındı. Burada uygulama durumunu kaydedin.
    };

    function onResume() {
        // TODO: Bu uygulama yeniden etkinleştirildi. Burada uygulama durumunu geri yükleyin.
    };
} )();
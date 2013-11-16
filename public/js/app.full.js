window.onload = function () {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-15753373-11', 'daturi.me');
    ga('send', 'pageview');
    var up = new Upfile(document.querySelector('.upfile-button')),
        form = document.getElementsByTagName('form')[0],
        drop = false,
        files;

    up.container.addEventListener('dragenter', function (eve) {
        eve.preventDefault();
    }, false);

    up.container.addEventListener('dragover', function (eve) {
        eve.preventDefault();
    }, false);

    up.container.addEventListener('drop', function (eve) {
        eve.stopPropagation();
        eve.preventDefault();
        files = eve.target.files || eve.dataTransfer.files
        up._updateList(files);
        drop = true;
    }, false);

    up.container.addEventListener('dragleave', function (eve) {
        console.log('leave');
    }, false);

    form.addEventListener('submit', function (eve) {
        document.querySelector('#submit').setAttribute('disabled', 'disabled');

        if (drop) {
            eve.stopPropagation();
            eve.preventDefault();
            var formData = new FormData();
            for (var i = 0, file; file = files[i]; ++i) {
                formData.append('images[]', file);
            }

            var req = new XMLHttpRequest();
            req.open('POST', 'http://localhost:8080/');
            req.setRequestHeader('X-Requested-With','XMLHttpRequest');
            req.onreadystatechange = function () {
                var status;

                if (req.readyState === req.DONE) {
                    status = req.status;
                    if ((status >= 200 && status < 300) || status === 304 || status === 0) {
                        form.insertAdjacentHTML('afterend', req.response);
                        form.setAttribute('hidden', 'hidden');
                    }
                }

            };

            req.send(formData);
        }
    });
};
<!DOCTYPE html>
<html>
<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script>
    $(document).ready(function(){
        $("button").click(function(){
            var url = 'http://codenative.epizy.com/get-chapter/?path=/slime-life/96';
            document.getElementsByName('iFrameName')[0].src = url;
        });
    });
</script>
</head>
<body>

<iframe name="iFrameName" id="iFrameName" width="100%" style="border: 1px solid red"></iframe>

<button>Get External Content</button>

</body>
</html>

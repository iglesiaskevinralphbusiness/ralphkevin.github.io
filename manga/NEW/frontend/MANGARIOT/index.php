<?php
    // Start the session
    session_start();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <!--seo-->
    <meta name="description"
        content="Read manga online for free at Mangariot. Thousands of free in high-quality, fast load and updated daily." />
    <meta name="keywords" itemprop="keywords"
        content="manga, manhua, read manga, manga online, read manga online, read manhua online, read manga online free, free manga online, view manga online, manga scans, free manga, read free manga" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="http://mangariot.com" />
    <meta name="twitter:title" content="Read Manga Online - MangaRiot" />
    <meta name="twitter:description"
        content="Read manga online for free at Mangariot.com. Thousands of free in high-quality, fast load and updated daily." />
    <meta name="twitter:image"
        content="https://lh3.googleusercontent.com/-iK1y5xV28gs/WCcslYmPKAI/AAAAAAACQGg/o9pv0oioVlY/s0/5826ca23a4ad3.jpg" />

    <meta property="og:type" content="website" />
    <meta property="og:title" content="Read Manga Online - MangaRiot" />
    <meta property="og:url" content="http://mangariot.com/" />
    <meta property="og:image"
        content="https://lh3.googleusercontent.com/-iK1y5xV28gs/WCcslYmPKAI/AAAAAAACQGg/o9pv0oioVlY/s0/5826ca23a4ad3.jpg" />
    <meta property="og:description"
        content="Read manga online for free at Mangariot.com. Thousands of free in high-quality, fast load and updated daily." />
    <meta property="og:site_name" content="https://mangariot.com/" />
    <!--<meta property="fb:app_id" content="1664224760511779" />-->

    <link rel="icon" href="/assets/images/favicon.png">
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/images/favicon.png" />
    <!--
    manifest.json provides metadata used when your web app is installed on a
    user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->

    <title>Read Manga Online - MangaRiot</title>

    <meta charset="utf-8">
    <meta name="viewport"
        content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

    <link rel="stylesheet" type="text/css" href="/assets/market/slick-master/slick/slick.css">
    <link rel="stylesheet" type="text/css" href="/assets/market/slick-master/slick/slick-theme.css">

    <link rel="stylesheet" type="text/css" href="/assets/market/fontawesome/css/all.css">

    <link href="/assets/css/reset.css" rel="stylesheet" type="text/css">
    <link href="/assets/css/common.css" rel="stylesheet" type="text/css">
    <link href="/assets/css/pages.css" rel="stylesheet" type="text/css">
    <link href="/assets/css/scheme.css" rel="stylesheet" type="text/css">
    <link href="/assets/css/loader.css" rel="stylesheet" type="text/css">
    <link href="/assets/css/responsive.css" rel="stylesheet" type="text/css">
    <link href="/assets/css/theme-dark.css" rel="stylesheet" type="text/css">

    <script type="text/javascript" src="/assets/js/jquery2.js"></script>
    <script type="text/javascript" src="/assets/js/theme.js"></script>
    <script type="text/javascript" src="/assets/js/route.js"></script>
    <script type="text/javascript" src="/assets/js/functions.js"></script>
    <script type="text/javascript" src="/assets/js/account.js"></script>

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-159642285-1"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());

        gtag('config', 'UA-159642285-1');
    </script>

    <!--adsense-->
    <script data-ad-client="ca-pub-3117460525294046" async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>

    <!--google captcha-->
    <script src='https://www.google.com/recaptcha/api.js' async defer></script>

    <!--popup under-->
    <?php
        $time = time();

        if(isset($_SESSION["popunder_total"])){

            $_SESSION["popunder_total"] = $_SESSION["popunder_total"] + 1;


            if($_SESSION["popunder_total"] >= 9){
                //if not on home page
                if($_SERVER['REQUEST_URI'] != '/'){
                    echo "<script type='text/javascript' src='//pl15404921.passtechusa.com/32/d4/71/32d47139db648262a6a07d4431c85820.js'></script>";
                    $_SESSION["popunder_total"] = 0;
                }
            }
        } else {
            $_SESSION["popunder_total"] = 1;
        }
    ?>
    <!--popup under end-->

</head>

<body>
    <div id="root"></div>

    <script src="/assets/market/slick-master/slick/slick.js" type="text/javascript" charset="utf-8"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
        integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
        crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
        integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
        crossorigin="anonymous"></script>
</body>



</html>
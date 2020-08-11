<?php
    /*
    include( "../../header-type.php" );
    include( "../../db-connection.php" );


    $datas = array();

    //select manga
    $sql = "SELECT * FROM manga ORDER BY id DESC LIMIT 2";
    $result_manga = $conn->query($sql);
    while($row_manga = $result_manga->fetch_assoc()) {

        $manga_id = $row_manga["id"];
        array_push($datas, $row_manga["url"]);

        //select chapters
        $sql = "SELECT * FROM chapters WHERE manga_id = '$manga_id'";
        $results_chapter = $conn->query($sql);
        while($row_chapter = $results_chapter->fetch_assoc()) {
            array_push($datas, $row_chapter['url']);
        }
    }
    */

    $datas = [
        "http://mangariot.com/007-series/8",
"http://mangariot.com/Boku-no-Hero-Academia/165/13",
"http://mangariot.com/hare-kon/86",
"http://mangariot.com/shounan-junai-gumi/249",
"http://mangariot.com/flat/8",
"http://mangariot.com/h/9/9",
"http://mangariot.com/is/110",
"http://mangariot.com/h2/319",
"http://mangariot.com/Boku-no-Hero-Academia/167",
"http://mangariot.com/Boku-no-Hero-Academia/246",
"http://mangariot.com/Boku-no-Hero-Academia/121",
"http://mangariot.com/Boku-no-Hero-Academia/111",
"http://mangariot.com/Boku-no-Hero-Academia/237",
"http://mangariot.com/Boku-no-Hero-Academia/162",
"http://mangariot.com/Boku-no-Hero-Academia/249",
"http://mangariot.com/noragami/67.2",
"http://mangariot.com/Boku-no-Hero-Academia/93",
"http://mangariot.com/is/85/all_pages",
"http://mangariot.com/Boku-no-Hero-Academia/84",
"http://mangariot.com/Boku-no-Hero-Academia/98",
"http://mangariot.com/Boku-no-Hero-Academia/53",
"http://mangariot.com/Boku-no-Hero-Academia/62",
"http://mangariot.com/Boku-no-Hero-Academia/37",
"http://mangariot.com/Boku-no-Hero-Academia/43",
"http://mangariot.com/is/49/all_pages",
"http://mangariot.com/h2/193",
"http://mangariot.com/Boku-no-Hero-Academia/88",
"http://mangariot.com/dear/6",
"http://mangariot.com/7-seeds/111",
"http://mangariot.com/12-prince/38",
"http://mangariot.com/s-i-d/142",
"http://mangariot.com/4-cut-hero/6",
"http://mangariot.com/666-satan/34",
"http://mangariot.com/Hinamatsuri-2/40",
"http://mangariot.com/denma/941",
"http://mangariot.com/Boku-no-Hero-Academia/61",
"http://mangariot.com/h2/220",
"http://mangariot.com/star-martial-god-technique/366/7",
"http://mangariot.com/s-i-d/8",
"http://mangariot.com/s-i-d/75",
"http://mangariot.com/s-i-d/95",
"http://mangariot.com/s-i-d/98.5",
"http://mangariot.com/zhi-zun-shen-mo/2/all_pages",
"http://mangariot.com/rebirth-of-the-urban-immortal-cultivator/394/1",
"http://mangariot.com/mairimashita-iruma-kun/139",
"http://mangariot.com/7-seeds/111",
"http://mangariot.com/12-prince/38",
"http://mangariot.com/s-i-d/142",
"http://mangariot.com/4-cut-hero/6",
"http://mangariot.com/666-satan/34",
"http://mangariot.com/Hinamatsuri-2/40",
"http://mangariot.com/denma/941",
"http://mangariot.com/Boku-no-Hero-Academia/61",
"http://mangariot.com/h2/220",
"http://mangariot.com/star-martial-god-technique/366/7",
"http://mangariot.com/s-i-d/8",
"http://mangariot.com/s-i-d/75",
"http://mangariot.com/s-i-d/95",
"http://mangariot.com/s-i-d/98.5",
"http://mangariot.com/zhi-zun-shen-mo/2/all_pages",
"http://mangariot.com/rebirth-of-the-urban-immortal-cultivator/394/1",
"http://mangariot.com/mairimashita-iruma-kun/139",
"http://mangariot.com/against-the-gods/7/all_pages",
"http://mangariot.com/saihate-no-paladin/3/25",
"http://mangariot.com/rebirth-of-the-urban-immortal-cultivator/410",
"http://mangariot.com/a-returners-magic-should-be-special/66",
"http://mangariot.com/saihate-no-paladin/1/all_pages",
"http://mangariot.com/is/12.1",
"http://mangariot.com/giant-killing/26/all_pages",
"http://mangariot.com/giant-killing/4/3",
"http://mangariot.com/yukan-club/19.4",
"http://mangariot.com/home/5",
"http://mangariot.com/again/104",
"http://mangariot.com/giant-killing/3",
"http://mangariot.com/Boruto/21/27",
"http://mangariot.com/Red-Storm-3/73",
"http://mangariot.com/usogui/500",
"http://mangariot.com/Boruto/21/15",
"http://mangariot.com/terror-man/151",
"http://mangariot.com/martial-peak/622/12",
"http://mangariot.com/dosanko-gyaru-is-mega-cute/30",
"http://mangariot.com/Red-Storm-3/347",
"http://mangariot.com/Red-Storm-3/285/7",
"http://mangariot.com/principal/20.5",
"http://mangariot.com/chainsaw-man/4/all_pages",
"http://mangariot.com/heat/18/22",
"http://mangariot.com/nabari-no-ou/6/all_pages",
"http://mangariot.com/009-recyborg/27",
"http://mangariot.com/absolute-witch/38",
"http://mangariot.com/3x3-eyes/505",
"http://mangariot.com/help/2",
"http://mangariot.com/3x3-eyes/127",
"http://mangariot.com/3x3-eyes/480",
"http://mangariot.com/3-am-dangerous-zone/11",
"http://mangariot.com/absolute-witch/40",
"http://mangariot.com/a-falsified-romance/16",
"http://mangariot.com/20th-century-boys/60",
"http://mangariot.com/3x3-eyes/371",
"http://mangariot.com/17-years-old-that-summer-days-miracle/1",
"http://mangariot.com/3x3-eyes/505",
"http://mangariot.com/help/2",
"http://mangariot.com/3x3-eyes/127",
"http://mangariot.com/3x3-eyes/480",
"http://mangariot.com/3-am-dangerous-zone/11",
"http://mangariot.com/absolute-witch/40",
"http://mangariot.com/a-falsified-romance/16",
"http://mangariot.com/20th-century-boys/60",
"http://mangariot.com/3x3-eyes/371",
"http://mangariot.com/17-years-old-that-summer-days-miracle/1",
"http://mangariot.com/tobaku-datenroku-kaiji-kazuyahen/6",
"http://mangariot.com/666-satan/51",
"http://mangariot.com/666-satan/59",
"http://mangariot.com/12-prince/75",
"http://mangariot.com/3x3-eyes/544",
"http://mangariot.com/81-diver/106",
"http://mangariot.com/adventure-of-sinbad-prototype/112",
"http://mangariot.com/3x3-eyes/349",
"http://mangariot.com/a-channel/95",
"http://mangariot.com/666-satan/24",
"http://mangariot.com/adventure-of-sinbad-prototype/159",
"http://mangariot.com/adventure-of-sinbad-prototype/132",
"http://mangariot.com/87-clockers/37",
"http://mangariot.com/12-prince/40",
"http://mangariot.com/666-satan/17",
"http://mangariot.com/12-prince/62",
"http://mangariot.com/81-diver/96",
"http://mangariot.com/666-satan/14",
"http://mangariot.com/666-satan/12",
"http://mangariot.com/7-seeds/135",
"http://mangariot.com/07-ghost/22",
"http://mangariot.com/dansui/4.5",
"http://mangariot.com/81-diver/63",
"http://mangariot.com/12-prince/1",
"http://mangariot.com/7-seeds/103",
"http://mangariot.com/Overlord-2/36",
"http://mangariot.com/3x3-eyes/63",
"http://mangariot.com/ingenuo/65",
"http://mangariot.com/81-diver/97",
"http://mangariot.com/07-ghost/44",
"http://mangariot.com/a-thousand-years-ninetails/124",
"http://mangariot.com/3d-kanojo/46",
"http://mangariot.com/come-spring",
"http://mangariot.com/7-seeds/142",
"http://mangariot.com/3x3-eyes/373",
"http://mangariot.com/3x3-eyes/220",
"http://mangariot.com/090-eko-to-issho/14",
"http://mangariot.com/3x3-eyes/348",
"http://mangariot.com/7-seeds/139",
"http://mangariot.com/6000/20",
"http://mangariot.com/5-centimeters-per-second/7",
"http://mangariot.com/3x3-eyes/473",
"http://mangariot.com/360-degrees-material/23",
"http://mangariot.com/3-gatsu-no-lion/125",
"http://mangariot.com/5-centimeters-per-second/11",
"http://mangariot.com/3x3-eyes/73",
"http://mangariot.com/20th-century-boys/40",
"http://mangariot.com/adventure-of-sinbad-prototype/64",
"http://mangariot.com/34-sai-mushoku-san/7",
"http://mangariot.com/adventure-of-sinbad-prototype/125",
"http://mangariot.com/3x3-eyes/542",
"http://mangariot.com/adventure-of-sinbad-prototype/78",
"http://mangariot.com/adventure-of-sinbad-prototype/104",
"http://mangariot.com/3-gatsu-no-lion/1",
"http://mangariot.com/a-guide-to-proper-dating/7",
"http://mangariot.com/20th-century-boys/210",
"http://mangariot.com/adventure-of-sinbad-prototype/53",
"http://mangariot.com/a-gust-of-wind-blows-at-daybreak/1",
"http://mangariot.com/adventure-of-sinbad-prototype/68",
"http://mangariot.com/adventure-of-sinbad-prototype/120",
"http://mangariot.com/20th-century-boys/15",
"http://mangariot.com/aflame-inferno/25",
"http://mangariot.com/3x3-eyes/276",
"http://mangariot.com/a-falsified-romance/9",
"http://mangariot.com/3x3-eyes/163",
"http://mangariot.com/3x3-eyes/441",
"http://mangariot.com/a-trail-of-blood/6",
"http://mangariot.com/337-byooshi/38",
"http://mangariot.com/adventurier-shinyaku-arsene-lupin-aventurier/3",
"http://mangariot.com/a-falsified-romance/34",
"http://mangariot.com/a-simple-thinking-about-blood-types/13",
"http://mangariot.com/20th-century-boys/91",
"http://mangariot.com/3x3-eyes/231",
"http://mangariot.com/3x3-eyes/387",
"http://mangariot.com/3d-kanojo/8",
"http://mangariot.com/00-mhz/8",
"http://mangariot.com/a-falsified-romance/5",
"http://mangariot.com/34-sai-mushoku-san/6",
"http://mangariot.com/3x3-eyes/358",
"http://mangariot.com/adventure-of-sinbad-prototype/27",
"http://mangariot.com/17-years-old-that-summer-days-miracle/12",
"http://mangariot.com/3x3-eyes/184",
"http://mangariot.com/tobaku-datenroku-kaiji-kazuyahen/39",
"http://mangariot.com/aflame-inferno/42",
"http://mangariot.com/adventure-of-sinbad-prototype/4",
"http://mangariot.com/adventure-of-sinbad-prototype/107",
"http://mangariot.com/3x3-eyes/241",
"http://mangariot.com/tobaku-datenroku-kaiji-kazuyahen/16",
"http://mangariot.com/07-ghost/81",
"http://mangariot.com/20th-century-boys/220",
"http://mangariot.com/absolute-witch/17",
"http://mangariot.com/3x3-eyes/420",
"http://mangariot.com/3x3-eyes/503",
"http://mangariot.com/3x3-eyes/21",
"http://mangariot.com/3x3-eyes/550",
"http://mangariot.com/009-recyborg/33",
"http://mangariot.com/3x3-eyes/501",
"http://mangariot.com/adventure-of-sinbad-prototype/55",
"http://mangariot.com/703x/14",
"http://mangariot.com/3d-kanojo/20",
"http://mangariot.com/a-trail-of-blood/34",
"http://mangariot.com/7-nin-no-shakespeare/10",
"http://mangariot.com/a-trail-of-blood/15",
"http://mangariot.com/3x3-eyes/1",
"http://mangariot.com/20th-century-boys/78",
"http://mangariot.com/7-jikan-me-rhapsody/5",
"http://mangariot.com/aflame-inferno/50",
"http://mangariot.com/a-witchs-printing-office/6",
"http://mangariot.com/3x3-eyes/333",
"http://mangariot.com/adventure-of-sinbad-prototype/106",
"http://mangariot.com/adventure-of-sinbad-prototype/62",
"http://mangariot.com/3d-kanojo/34",
"http://mangariot.com/ah-my-goddess/84",
"http://mangariot.com/adonis-next-door/18",
"http://mangariot.com/3d-kanojo/45",
"http://mangariot.com/3x3-eyes/57",
"http://mangariot.com/adventure-of-sinbad-prototype/39",
"http://mangariot.com/tobaku-datenroku-kaiji-kazuyahen/91",
"http://mangariot.com/5001-nen-yakuza-wars/5",
"http://mangariot.com/34-sai-mushoku-san/34",
"http://mangariot.com/81-diver/36",
"http://mangariot.com/musashi-kun-to-murayama-san-wa-tsukiatte-mita/10",
"http://mangariot.com/20th-century-boys/26",
"http://mangariot.com/009-recyborg/10",
"http://mangariot.com/3-gatsu-no-lion/9",
"http://mangariot.com/3x3-eyes/540",
"http://mangariot.com/aflame-inferno/10",
"http://mangariot.com/337-byooshi/86",
"http://mangariot.com/3x3-eyes/133",
"http://mangariot.com/81-diver/24",
"http://mangariot.com/tobaku-datenroku-kaiji-kazuyahen/82",
"http://mangariot.com/a-guide-to-proper-dating/6",
"http://mangariot.com/3x3-eyes/392",
"http://mangariot.com/17-sai-kiss-to-dilemma/10",
"http://mangariot.com/aflame-inferno/7",
"http://mangariot.com/a-trail-of-blood/32",
"http://mangariot.com/5001-nen-yakuza-wars/2",
"http://mangariot.com/6-no-trigger/19",
"http://mangariot.com/absolute-witch/23",
"http://mangariot.com/3-gatsu-no-lion/124",
"http://mangariot.com/tobaku-datenroku-kaiji-kazuyahen/7",
"http://mangariot.com/20th-century-boys/239",
"http://mangariot.com/adonis-next-door/29",
"http://mangariot.com/accompany-you-to-stray/1",
"http://mangariot.com/337-byooshi/16",
"http://mangariot.com/21st-century-boys/4",
"http://mangariot.com/accord/5",
"http://mangariot.com/17-sai-kiss-to-dilemma/6",
"http://mangariot.com/87-clockers/38",
"http://mangariot.com/5-ji-kara-9-ji-made/11",
"http://mangariot.com/090-eko-to-issho/31",
"http://mangariot.com/a-fairytale-for-the-demon-lord/54",
"http://mangariot.com/17-sai-kiss-to-dilemma/3",
"http://mangariot.com/3x3-eyes/463",
"http://mangariot.com/3x3-eyes/424",
"http://mangariot.com/a-guide-to-proper-dating/16",
"http://mangariot.com/aflame-inferno/36",
"http://mangariot.com/adventure-of-sinbad-prototype/72",
"http://mangariot.com/12-nin-no-yasashii-koroshiya/7",
"http://mangariot.com/3x3-eyes/228",
"http://mangariot.com/3x3-eyes/301",
"http://mangariot.com/3x3-eyes/490",
"http://mangariot.com/090-eko-to-issho/49",
"http://mangariot.com/7-seeds/161",
"http://mangariot.com/21st-century-boys/13",
"http://mangariot.com/3d-kanojo/42",
"http://mangariot.com/tobaku-datenroku-kaiji-kazuyahen/3",
"http://mangariot.com/3d-kanojo/21",
"http://mangariot.com/20th-century-boys/5",
"http://mangariot.com/a-thousand-years-ninetails/114",
"http://mangariot.com/a-no-tachiichi/8",
"http://mangariot.com/3-gatsu-no-lion/93",
"http://mangariot.com/a-trail-of-blood/10",
"http://mangariot.com/again/115",
"http://mangariot.com/3-gatsu-no-lion/10",
"http://mangariot.com/3d-kanojo/23",
"http://mangariot.com/07-ghost/96",
"http://mangariot.com/adventure-of-sinbad-prototype/9",
"http://mangariot.com/3x3-eyes/427",
"http://mangariot.com/3x3-eyes/160",
"http://mangariot.com/a-thousand-years-ninetails/51",
"http://mangariot.com/again/109",
"http://mangariot.com/3x3-eyes/344",
"http://mangariot.com/a-guide-to-proper-dating/23",
"http://mangariot.com/3x3-eyes/195",
"http://mangariot.com/a-trail-of-blood/8",
"http://mangariot.com/adonis-next-door/21",
"http://mangariot.com/3x3-eyes/192",
"http://mangariot.com/20th-century-boys/43",
"http://mangariot.com/009-recyborg/16",
"http://mangariot.com/17-years-old-that-summer-days-miracle/10",
"http://mangariot.com/absolute-witch/16",
"http://mangariot.com/adventure-of-sinbad-prototype/73",
"http://mangariot.com/07-ghost/89",
"http://mangariot.com/3x3-eyes/509",
"http://mangariot.com/3d-kanojo/4",
"http://mangariot.com/20th-century-boys/228",
"http://mangariot.com/3x3-eyes/244",
"http://mangariot.com/3x3-eyes/3",
"http://mangariot.com/again/12",
"http://mangariot.com/3x3-eyes/126",
"http://mangariot.com/absolute-witch/31",
"http://mangariot.com/a-thousand-years-ninetails/60",
"http://mangariot.com/5001-nen-yakuza-wars/1",
"http://mangariot.com/a-trail-of-blood/60",
"http://mangariot.com/3d-kanojo/16",
"http://mangariot.com/aflame-inferno/46",
"http://mangariot.com/a-trail-of-blood/5",
"http://mangariot.com/3x3-eyes/256",
"http://mangariot.com/adventure-of-sinbad-prototype/90",
"http://mangariot.com/3x3-eyes/499",
"http://mangariot.com/3x3-eyes/423",
"http://mangariot.com/adventurier-shinyaku-arsene-lupin-aventurier/1",
"http://mangariot.com/act-age/11",
"http://mangariot.com/50-million-km/8",
"http://mangariot.com/acmagame/28",
"http://mangariot.com/666-satan/19",
"http://mangariot.com/3x3-eyes/43",
"http://mangariot.com/3x3-eyes/159",
"http://mangariot.com/a-trail-of-blood/4",
"http://mangariot.com/5-centimeters-per-second/9",
"http://mangariot.com/3x3-eyes/201",
"http://mangariot.com/adventure-of-sinbad-prototype/81",
"http://mangariot.com/20th-century-boys/127",
"http://mangariot.com/3x3-eyes/158",
"http://mangariot.com/090-eko-to-issho/4",
"http://mangariot.com/a-fairytale-for-the-demon-lord/49",
"http://mangariot.com/adventure-of-sinbad-prototype/52",
"http://mangariot.com/3x3-eyes/568",
"http://mangariot.com/21st-century-boys/5",
"http://mangariot.com/3x3-eyes/24",
"http://mangariot.com/aflame-inferno/38",
"http://mangariot.com/3x3-eyes/537",
"http://mangariot.com/3d-kanojo/12",
"http://mangariot.com/absolute-witch/32",
"http://mangariot.com/tobaku-datenroku-kaiji-kazuyahen/67",
"http://mangariot.com/3-gatsu-no-lion/22",
"http://mangariot.com/3x3-eyes/525",
"http://mangariot.com/3x3-eyes/564",
"http://mangariot.com/abandon-the-old-in-tokyo/4",
"http://mangariot.com/3x3-eyes/556",
"http://mangariot.com/a-trail-of-blood/7",
"http://www.mangariot.com/insos-law/65",
"http://www.mangariot.com/magician/117/31/all_pages",
"http://www.mangariot.com/dreamland/100/all_pages",
"http://www.mangariot.com/Red-Storm-3/200",
"http://www.mangariot.com/one-piece1/386/14/all_pages",
"http://www.mangariot.com/dreamland/100/all_pages",
"http://www.mangariot.com/Red-Storm-3/200",
"http://www.mangariot.com/one-piece1/386/14/all_pages",
"http://www.mangariot.com/magician/518/38/all_pages",
"http://www.mangariot.com/demon-king/40/9/all_pages",
"http://www.mangariot.com/swallowed-star/46/all_pages",
"http://www.mangariot.com/overgeared-2020/31/all_pages",
"http://www.mangariot.com/demon-king/186/34/all_pages",
"http://www.mangariot.com/demon-king/23/19/all_pages",
"http://www.mangariot.com/one-piece1/386/7/all_pages",
"http://www.mangariot.com/demon-king/263/22/all_pages",
"http://www.mangariot.com/demon-king/241/22/all_pages",
"http://www.mangariot.com/the-descent-of-the-demonic-master/56/all_pages",
"http://www.mangariot.com/why-are-you-here-sensei/74/all_pages",
"http://www.mangariot.com/demon-king/236/7/all_pages",
"http://www.mangariot.com/Dalbic-Jogaksa-2/144/44/all_pages",
"http://www.mangariot.com/Dalbic-Jogaksa-2/133/all_pages",
"http://www.mangariot.com/demon-king/67/all_pages",
"http://www.mangariot.com/the-gamer/83/11",
"http://www.mangariot.com/",
"http://www.mangariot.com/why-are-you-here-sensei/52/all_pages",
"http://www.mangariot.com/Dalbic-Jogaksa-2/144/2/all_pages",
"http://www.mangariot.com/gantze/8",
"http://www.mangariot.com/demon-king/226/5/all_pages",
"http://www.mangariot.com/Dalbic-Jogaksa-2/146/all_pages",
"http://www.mangariot.com/Dalbic-Jogaksa-2/143/all_pages",
"http://www.mangariot.com/Dalbic-Jogaksa-2/144/all_pages",
"http://www.mangariot.com/noblesse/21/5/all_pages",
"http://www.mangariot.com/demon-king/218/1/all_pages",
"http://www.mangariot.com/martial-peak/61/all_pages",
"http://www.mangariot.com/demon-king/364",
"http://www.mangariot.com/demon-king/1.5/4/all_pages",
"http://www.mangariot.com/demon-king/41/1/all_pages",
"http://www.mangariot.com/demon-king/41/all_pages",
"http://www.mangariot.com/demon-king/188/35/all_pages",
"http://www.mangariot.com/noblesse/306/16/all_pages",
"http://www.mangariot.com/demon-king/83/32/all_pages",
"http://www.mangariot.com/demon-king/182/6/all_pages",
"http://www.mangariot.com/Red-Storm-3/200/11/all_pages",
"http://www.mangariot.com/hajime-no-ippo/939/all_pages",
"http://www.mangariot.com/demon-king/87/18/all_pages",
"http://www.mangariot.com/demon-king/320/all_pages",
"http://www.mangariot.com/mao/46/9/all_pages",
"http://www.mangariot.com/alma/5/8/all_pages",
"http://www.mangariot.com/alma/2/31/all_pages",
"http://www.mangariot.com/wolf-guy/76/5/all_pages",
"http://www.mangariot.com/Red-Storm-3/280/11/all_pages",
"http://www.mangariot.com/demon-king/278/8/all_pages",
"http://www.mangariot.com/demon-king/149/1/all_pages",
"http://www.mangariot.com/demon-king/150/4/all_pages",
"http://www.mangariot.com/raid/3/6",
"http://www.mangariot.com/demon-king/80/5/all_pages",
"http://www.mangariot.com/demon-king/167/25",
"http://www.mangariot.com/demon-king/159/all_pages",
"http://www.mangariot.com/demon-king/30/5/all_pages",
"http://www.mangariot.com/demon-king/296/22/all_pages",
"http://www.mangariot.com/Red-Storm-3/280/11/all_pages",
"http://www.mangariot.com/demon-king/278/8/all_pages",
"http://www.mangariot.com/demon-king/149/1/all_pages",
"http://www.mangariot.com/demon-king/150/4/all_pages",
"http://www.mangariot.com/raid/3/6",
"http://www.mangariot.com/demon-king/80/5/all_pages",
"http://www.mangariot.com/demon-king/167/25",
"http://www.mangariot.com/demon-king/159/all_pages",
"http://www.mangariot.com/demon-king/30/5/all_pages",
"http://www.mangariot.com/demon-king/296/22/all_pages",
"http://www.mangariot.com/demon-king/347/4/all_pages",
"http://www.mangariot.com/demon-king/229/all_pages",
"http://www.mangariot.com/demon-king/266/7/all_pages",
"http://www.mangariot.com/demon-king/310/3/all_pages",
"http://www.mangariot.com/demon-king/35/19/all_pages",
"http://www.mangariot.com/demon-king/17/4/all_pages",
"http://www.mangariot.com/demon-king/75/2/all_pages",
"http://www.mangariot.com/demon-king/365/16/all_pages",
"http://www.mangariot.com/demon-king/332/16/all_pages",
"http://www.mangariot.com/demon-king/136/20/all_pages",
"http://www.mangariot.com/demon-king/139/6/all_pages",
"http://www.mangariot.com/demon-king/42/all_pages",
"http://www.mangariot.com/demon-king/186/2/all_pages",
"http://www.mangariot.com/one-piece1/906",
"http://www.mangariot.com/demon-king/210/4/all_pages",
"http://www.mangariot.com/Dalbic-Jogaksa-2/137/all_pages",
"http://www.mangariot.com/magician/475",
"http://www.mangariot.com/denma/919/2/all_pages",
"http://www.mangariot.com/demon-king/39/1/all_pages",
"http://www.mangariot.com/shima-shima-yamazaki-sayaka/94/2/all_pages",
"http://www.mangariot.com/demon-king/126/11/all_pages",
"http://www.mangariot.com/Dalbic-Jogaksa-2/8..v2./all_pages",
"http://www.mangariot.com/Dalbic-Jogaksa-2/26/all_pages",
"http://www.mangariot.com/metropolitan-system/301/all_pages",
"http://www.mangariot.com/demon-king/196/36/all_pages",
"http://www.mangariot.com/demon-king/76/all_pages",
"http://www.mangariot.com/demon-king/37/2/all_pages",
"http://www.mangariot.com/demon-king/364/6/all_pages",
"http://www.mangariot.com/Dalbic-Jogaksa-2/1/all_pages",
"http://www.mangariot.com/demon-king/371/all_pages",
"http://www.mangariot.com/minamoto-kun-monogatari/150/all_pages",
"http://www.mangariot.com/Dalbic-Jogaksa-2/85/all_pages",
"http://www.mangariot.com/Dalbic-Jogaksa-2/124/all_pages",
"http://www.mangariot.com/Dalbic-Jogaksa-2/19/all_pages",
"http://www.mangariot.com/yuan-zun/33/all_pages",
"http://www.mangariot.com/demon-king/91/16/all_pages",
"http://www.mangariot.com/noblesse/140/4/all_pages",
"http://www.mangariot.com/silver-gravekeeper/3/all_pages",
"http://www.mangariot.com/Dalbic-Jogaksa-2/87/all_pages",
"http://www.mangariot.com/Dalbic-Jogaksa-2/64/all_pages",
"http://www.mangariot.com/panlong/1",
"http://www.mangariot.com/kakegurui/29",
"http://www.mangariot.com/mao/46",
"http://www.mangariot.com/usogui/185",
"http://www.mangariot.com/noblesse/447",
"http://www.mangariot.com/noblesse/406",
"http://www.mangariot.com/demon-king/1.1/all_pages",
"http://www.mangariot.com/Dalbic-Jogaksa-2/120/all_pages",
"http://www.mangariot.com/demon-king/37/7/all_pages",
"http://www.mangariot.com/the-strongest-god-king/56/2/all_pages",
"http://www.mangariot.com/panlong/90",
"http://www.mangariot.com/one-piece1/1/all_pages",
"http://www.mangariot.com/demon-king/321/27/all_pages",
"http://www.mangariot.com/demon-king/97/4/all_pages",
"http://www.mangariot.com/Dalbic-Jogaksa-2/99/all_pages",
"http://www.mangariot.com/Dalbic-Jogaksa-2/114/all_pages",
"http://www.mangariot.com/Dalbic-Jogaksa-2/101/all_pages",
"http://www.mangariot.com/s-i-d/205",
"http://www.mangariot.com/dreamland/81",
"http://www.mangariot.com/the-hunter/1",
"http://www.mangariot.com/Dalbic-Jogaksa-2/17/all_pages",
"http://www.mangariot.com/Dalbic-Jogaksa-2/27/all_pages",
"http://www.mangariot.com/demon-king/147/all_pages",
"http://www.mangariot.com/Dalbic-Jogaksa-2/22/all_pages",
"http://www.mangariot.com/Dalbic-Jogaksa-2/100/all_pages",
"http://www.mangariot.com/the-god-of-high-school-1/183/all_pages",
"http://www.mangariot.com/demon-king/55/7",
"http://www.mangariot.com/Dalbic-Jogaksa-2/11/all_pages",
"http://www.mangariot.com/Dalbic-Jogaksa-2/32/all_pages",
"http://www.mangariot.com/Dalbic-Jogaksa-2/62/all_pages",
"http://www.mangariot.com/fight-class-3/53/all_pages",
"http://www.mangariot.com/demon-king/172/all_pages",
"http://www.mangariot.com/kakegurui/3",
"http://www.mangariot.com/demon-king/124/all_pages",
"http://www.mangariot.com/ichigeki/24/all_pages",
"http://www.mangariot.com/yuan-zun/50",
"http://www.mangariot.com/demon-king/166",
"http://www.mangariot.com/yuan-zun/20.5",
"http://www.mangariot.com/noblesse/33",
"http://www.mangariot.com/Dalbic-Jogaksa-2/78/all_pages",
"http://www.mangariot.com/Dalbic-Jogaksa-2/127/all_pages",
"http://www.mangariot.com/Dalbic-Jogaksa-2/61/all_pages",
"http://www.mangariot.com/tower-of-god-1/473",
"http://www.mangariot.com/Dalbic-Jogaksa-2/129/all_pages",
"http://www.mangariot.com/Dalbic-Jogaksa-2/107/all_pages",
"http://www.mangariot.com/Dalbic-Jogaksa-2/81/all_pages",
"http://www.mangariot.com/Dalbic-Jogaksa-2/82/all_pages",
"http://www.mangariot.com/silver-gravekeeper/5/all_pages",
"http://www.mangariot.com/noblesse/385",
"http://www.mangariot.com/denma/912/all_pages",
"http://www.mangariot.com/silver-gravekeeper/1/all_pages",
"http://www.mangariot.com/insos-law/38",
"http://www.mangariot.com/blue-lock/14",
"http://www.mangariot.com/tower-of-god-1/208",
"http://www.mangariot.com/demon-king/333/31/all_pages",
"http://www.mangariot.com/denma/936",
"http://www.mangariot.com/demon-king/211",
"http://www.mangariot.com/yuan-zun/54",
"http://www.mangariot.com/we-cant-study/78.5",
"http://www.mangariot.com/demon-king/167/20/all_pages",
"http://www.mangariot.com/wild-ones/11",
"http://www.mangariot.com/demon-king/347",
"http://www.mangariot.com/demon-king/127/all_pages",
"http://www.mangariot.com/ouroboros/14",
"http://www.mangariot.com/the-gamer/38",
"http://www.mangariot.com/demon-king/264/15/all_pages",
"http://www.mangariot.com/yuan-zun/79/all_pages",
"http://www.mangariot.com/Dalbic-Jogaksa-2/9..v2./all_pages",
"http://www.mangariot.com/demon-king/199",
"http://www.mangariot.com/magician/403",
"http://www.mangariot.com/usogui/300",
"http://www.mangariot.com/one-piece1/110",
"http://www.mangariot.com/demon-king/256/1",
"http://www.mangariot.com/demon-king/53",
"http://www.mangariot.com/demon-king/263/9/all_pages",
"http://www.mangariot.com/bless/9",
"http://www.mangariot.com/s-i-d/41",
"http://www.mangariot.com/demon-king/10/26/all_pages",
    ];

    

    //generate file content
    $date = date('Y-m-d');
    $xml_content = '<?xml version="1.0" encoding="UTF-8"?>
    <urlset
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
        <url>
            <loc>http://mangariot.com/</loc>
            <lastmod>'.$date.'</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
        </url>
        <url>
            <loc>http://mangariot.com/top-manga/</loc>
            <lastmod>'.$date.'</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
        </url>
        <url>
            <loc>http://mangariot.com/latest-release/</loc>
            <lastmod>'.$date.'</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
        </url>
        <url>
            <loc>http://mangariot.com/manga-list/</loc>
            <lastmod>'.$date.'</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
        </url>';

    foreach($datas as $data) {
        $xml_content = $xml_content.'<url>
            <loc>'.$data.'</loc>
            <lastmod>'.$date.'</lastmod>
            <changefreq>monthly</changefreq>
            <priority>2.0</priority>
        </url>';
    }

    $xml_content = $xml_content.'</urlset>';


    //create file
    $file = "sitemap.xml";
    $txt = fopen($file, "w") or die("Unable to open file!");
    fwrite($txt, $xml_content);
    fclose($txt);

    header('Content-Description: File Transfer');
    header('Content-Disposition: attachment; filename='.basename($file));
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($file));
    header("Content-Type: text/plain");
    readfile($file);

?>
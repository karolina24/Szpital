<?php
include 'mini_cms.php';
include 'szpital.php';
	//miejsce w którym wpiszemy naszą klasę, stworzymy obiekt, zainicjujemy sesję
$cms = new miniCMS(); 	//tworzymy obiekt na podstawie klasy miniCMS
$szpital = new szpital();
?>
<html>
<head>
    <meta charset='utf-8'>
</head>
<body>
    
    <h1><a href='mini_cms.php'>Super fajny CMS</a></h1> //mini_cms.php to nazwa projektu
<?php echo $cms->wyswietlStrone(); //wywołanie interfejsu zwracającego zawartość strony ?>
<?php echo $szpital->wyswietlStrone(); ?>
<?php echo $szpital->wyswietlStrone2(); ?>
</body>
</html>

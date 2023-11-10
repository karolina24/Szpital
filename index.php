//kod który należy dodać do strony by wyświetić zawartość bazy danych
<?php
include 'szpital.php';
	//miejsce w którym wpiszemy naszą klasę, stworzymy obiekt, zainicjujemy sesję
 	//tworzymy obiekt na podstawie klasy miniCMS
$szpital = new szpital();
?>
<html>
<head>
    <meta charset='utf-8'>
</head>
<body>
<?php echo $szpital->wyswietlStrone(); //wywołanie interfejsu zwracającego zawartość strony ?>
<?php echo $szpital->wyswietlStrone2(); ?>
</body>
</html>

<?php
class szpital{
    private $polaczenie;
    private $komunikat='';
    private function nawiazPolaczenie(){
		$this->polaczenie = new mysqli('localhost','root','','szpital');
        mysqli_set_charset($this->polaczenie,'utf8');
    }
    private function wyswietlTabele(){
        $zapytanie='SELECT * FROM lekarze ORDER BY Id_lekarza';
        $wynik_zapytania=$this->polaczenie->query($zapytanie);
        $tmp = '<h2>Zawartość tabeli lekarze</h2><table>';
		 $tmp .= "<tr><th>Nr</th><th>Nazwisko</th><th>Imię</th><th>Specjalizacja</th><th>Oddział</th></tr>";
		 $i=1;
         while($obiekt=mysqli_fetch_object($wynik_zapytania)){
            $tmp .= "<tr><td>$i</td><td>$obiekt->Imię</td><td>$obiekt->Nazwisko</td><td>$obiekt->Specjalizacja</td><td>$obiekt->Oddział</td></tr>";
             $i++;
        }
        return $tmp .'</table>';
    }
    function wyswietlStrone(){
        $tmp = $this->wyswietlTabele();
        $tmp .= $this->komunikat;
        return $tmp;
    }
	private function wyswietlTabele2(){
        $zapytanie='SELECT * FROM pacjęci ORDER BY Id_pacjęta';
        $wynik_zapytania=$this->polaczenie->query($zapytanie);
        $tmp = '<h2>Zawartość tabeli pacjęci</h2><table>';
		 $tmp .= "<tr><th>Nr</th><th>Nazwisko</th><th>Imię</th><th>Dolegliwość</th></tr>";
		 $i=1;
         while($obiekt=mysqli_fetch_object($wynik_zapytania)){
            $tmp .= "<tr><td>$i</td><td>$obiekt->Imię</td><td>$obiekt->Nazwisko</td><td>$obiekt->Dolegliwość</td></tr>";
             $i++;
        }
        return $tmp .'</table>';
    }
    function wyswietlStrone2(){
        $tmp = $this->wyswietlTabele2();
        $tmp .= $this->komunikat;
        return $tmp;
    }
    function __construct(){
        $this->nawiazPolaczenie();
    }
}
?>

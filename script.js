const JednostkiWagi = ["Kg", "g", "dag", "t", "Funt", ];
const JednostkiPredkosci = ["Km/h", "mph", "m/s"];
const JednostkiDystansu = ["Kilometry", "Mile", "Mile Morskie", "Metry"];
const JednostkiMocy = ["Ps", "Hp", "Kw"];
const JednostkiTemperatury = ["Celcjusz", "Fahrenheit", "Kelwin"];

const ProporcjeWaga = {
    "Kg": 1,
    "g": 0.001,
    "dag": 0.01,
    "t": 1000,
    "Funt": 0.45,
}
const ProporcjePredkosci = {
    "Km/h": 3.6,
    "mph": 2.24,
    "m/s": 1,
}
const ProporcjeDystansu = {
    "Kilometry": 1,
    "Mile": 0.62,
    "Mile Morskie": 0.54,
    "Metry": 1000,
}
const ProporcjeMocy = {
    "Hp" : 1,
    "Ps" : 0.986,
    "Kw" : 0.74
}
function FahrenheitNaCelcius(X){
    var Celcius = (X - 32)*0.5556;
    return Celcius;
}
function CelciusNaFahrenheit(X){
    var Fahrenheit = (X*1.8)+32;
    return Fahrenheit;
}

function Oblicz(){
    var z = document.getElementById("jednostka_z").value;
    var na = document.getElementById("jednostka_na").value;
    var typ = document.getElementById("type").value;
    
    var Liczba = parseInt(document.getElementById("wartosc").value);
    
    if(Number.isNaN(Liczba)){
        alert("Wpisz liczbę!");
        return;
    }
    
    var wynik;
    
    if(z==na){
        alert("Wybierz różne jednostki!");
        return;
    }
    
    if(typ == "temperatura"){
        switch(z){
            case "Celcjusz":{
                switch(na){
                    case "Fahrenheit":
                        wynik = CelciusNaFahrenheit(Liczba);
                        break;
                    case "Kelwin":
                        wynik = Liczba+273.15;
                }
            }
                break;
            case "Fahrenheit":{
                switch(na){
                    case "Celcius":{
                        wynik = FahrenheitNaCelcius(Liczba);
                        break;
                    }
                    case "Kelwin":
                        wynik = FahrenheitNaCelcius(Liczba)+273.15;
                        break;
                }
            }
                break;
            case "Kelwin":{
                switch(na){
                    case "Celcius":{
                        wynik = Liczba-273.15;
                        break;
                    }
                    case "Fahrenheit":{
                        wynik = CelciusNaFahrenheit(Liczba-273.15);
                        break;
                    }
                }
            }
                break;
            
        }
    }
    else{
        switch(typ){
            case "waga":
                wynik = ProporcjeWaga[z]/ProporcjeWaga[na]*Liczba;
                break;
            case "predkosc":
                wynik = ProporcjePredkosci[na]/ProporcjePredkosci[z]*Liczba;
                break;
            case "moc":
                wynik = ProporcjeMocy[na]/ProporcjeMocy[z]*Liczba;
                break;

            case "dystans":
                wynik = ProporcjeDystansu[na]/ProporcjeDystansu[z]*Liczba;
                break;
        }
    }
    
    wynik = +wynik.toFixed(2);
    document.getElementById("wynik").innerHTML = (
        Liczba + z + " na " + na + " Wynosi:" + wynik
    )
    
    
}

function WyczyscListe(Lista) {
   var i, L = Lista.options.length - 1;
   for(i = L; i >= 0; i--) {
      Lista.remove(i);
   }
}

function DodajOpcje(Opcje){
    
    const JednostkaA = document.getElementById("jednostka_z");
    const JednostkaB = document.getElementById("jednostka_na");
    
    WyczyscListe(JednostkaA);
    WyczyscListe(JednostkaB);
    
    for(const value of Opcje){
        JednostkaA.options.add(new Option(value, value));
        JednostkaB.options.add(new Option(value, value));
    }
}

function WybierzRodzaj(){
    var x = document.getElementById("Inputs");
    var input = document.getElementById("type");
    

    if(input.value != ""){
        if(x.style.display === ''){
            x.style.display = "block";
        }
    }
    
    switch(input.value){
        case 'waga':
            DodajOpcje(JednostkiWagi);
            break;
        case 'predkosc':
            DodajOpcje(JednostkiPredkosci);
            break;
        case 'moc':
            DodajOpcje(JednostkiMocy);
            break;
        case 'dystans':
            DodajOpcje(JednostkiDystansu);
            break;
        case 'temperatura':
            DodajOpcje(JednostkiTemperatury);
            break;
    }
}
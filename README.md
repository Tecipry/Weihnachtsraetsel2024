# Weihnachtsraetsel2024

### Final gesucht: 4 Zahlen für ein physisches Zahlenschloss.

Im Adventskalender: insgesamt 24 Zettel mit kleinen Infos
auf website: 4 Rätselboxen, mit je einer Zahl als Ergebnis
-> Zettel colour-coded, jenachdem zu welchem Rätsel sie gehören (grün, orange, blau, gelb)

auf overview Page ist ein Feld, in welches Codes eingetragen werden können. Diese triggern entweder Tipps oder das revealen einer Zahl.

## Rätsel 1 (rot) -> Done

"draw a heart" in einem 7x7 Feld

auf den Kacheln stehen Character

Character in Antwortfeld eintragen -> "Try it" button

2 mögliche Lösungen:

1. Herz gemalt: Weiterleitung zu Dateidownload. Datei ist Passwortgeschützt (drive)
2. Herz invertiert gemalt: Passwort für Datei wird revealed

-> mp3 Datei mit Sprechtext:

location: https://drive.google.com/file/d/1WIyrvrtABBDPlPVqHq3i6eKl4_dOEnX8/view?usp=sharing

Passwort: `TLOVESC`
```txt
Huiii, du hast mich gefunden. Nicht schlecht my love. Hier, ich habe einen Code für dich 293F9
oohhh, da habe ich mich im Zahlensystem vertan. Das wollte ich nicht in HEX sagen. Naja egal, du schaffst das schon. Love you!
```

HEX in dezimal umwandeln ergibt Antwortcode 168953


### Tipps:

-  Karte mit Herz
-  Karte mit invertiertem Herz
-  Erklärung für Umrechnung zwischen hex und dez (Video?) (als Code)
-  Rechner hex zu dezimal (https://bin-dez-hex-umrechner.de/) (als Code)

## Rätsel 2 (grün) -> Done

snake game

on death -> Elemente revealen youtube-Video link id

in Video: (in morse code) (https://www.youtube.com/watch?v=rdERHBj2yQA)
```txt
   You have two unread messages: 
   message one:
      Wir brauchen noch Birnen und Chips. Habe dir die fuenf Euro wieder auf den Tisch gelegt. Sollte reichen.
   message two:
      Der Vortrag ist schon in vier Tagen, da sollten wir uns noch absprechen. Ich bin mit meinem Teil bisher nur auf acht Minuten gekommen.
```

-> Code für grün: 215248

Code ändert Snake game, sodass on death der Lösungscode für gelbe Box revealed wird

### Tipps:

-  Press Space to start the game
-  Länge der gesuchten Zeichenkette (43 char)
-  morseCode aus dem Video aus txt (als Code)
-  morseCode translator (https://morsecodee.com/de) (als Code)
-  Hinweis, dass Zahlen im Text sind (Video zu simplen Verschlüsselungstechniken?) (als Code)

## Rätsel 3 (gelb)

Golf -> 6 level; 
-  jedes Level enthält eine Zahl in Form des Level-layout -> Lösungscode für gelb
-  eine Zahl bei Abschluss des Levels -> gibt Tipp, dass Levelzahl wichtig ist

revealing level 2-6 through Codes
-  Hintergrund: Bild von vielen verschiedenen Dingen, Scrabbles etc (Suchbild)
-  Maus beleuchtet gewissen Radius
-  an bestimmten Stellen stehen auf verschiedenen tabs verschiedene Zahlen -> Code ergibt sich

-  Unterschiede in den Bildern:
   - Papier auf Schreibtisch:
      1. satz des Pythagoras mit Betohnung auf c
      2. Dreieck mit Werten für a & b (5 & 12)
      3. Dreieck mit Werten für a & b (5 & 12)
   
   - Blumen auf Schreibtisch und Wandschrank:
      1. (2x gelb) + (1x rot, 1x blau)
      2. (2x rot) + (2x blau)
      3. (1x blau [4 Blätter], 1x rot [6 Blätter]) + (2x rot, 1x gelb)
   
   -  TicTacToe Scrabble auf Zetteln über Wandschrank + Karte:
      -  alle TicTacToe übereinander gelegt ergeben ein Game, in dem "o" gewinnt
      1. Karte hat x auf Land links
      2. Karte hat o auf Land mittig-oben
      3. Karte hat x+o (draw) auf Land unten-links

   - Zettel auf Pinwand und über Wandschrank:
      - pro Bild je 2 Zettel mit outline einer Landmasse von Karte + 2 random Zahlen dazu
      - für Land mittig-oben auf Karte (welche o auf Bild 2 hat): 37
   
   - Zettel über Wandschrank:
      1. "2:" blaue Scrabble Blume und rote daneben (ges. Anzahl der Blätter des linken Tisch-Topfes in Bild 3 -> **46**)
      2. "1:" rotes Dreieck (Hinweis auf Pythagoras -> ges. ist Wert von c -> sqrt(5² + 12²) = **13**)
      3. "3:" leeres TicTacToe board (TicTacToe games zusammen ergeben Land mit Zahl **37**)

   --> Code für orange: 134637

### Tipps:
-  Das Bild ist größer als das Fenster
-  dupliziere den Tab und sieh was passiert
-  Pythagoras changes
-  TicTacToe Board zusammenführen
-  TicTacToe hängt mit Karte zusammen
-  Blumen zuordnen
-  Blüttenblätter zählen
-  römische Zahlen geben Reihenfolge vor

# random ideen

-  one player Variante für Schiffe versenken
-  drag & drop puzzle
   -  Kombination mit einem "Was hat sich geändert". Zeit zum anschauen, aber im dunkeln. Danach ändert sich was und Licht geht an.
-  Crossword (https://www.xwords-generator.de/en)
-  evtl irgendwas mit windowSize

# Liste der Codes

- Allgemeine Codes
   -  `111111`:

      "Yay, du hast die Website und auch den ersten gültigen Code gefunden. Jeder Code besteht aus 6 Ziffern und kann hier eingelöst werden. Mal schauen was du findest ;D Viel Erfolg <3"

      Tür #1

- Rote Box
   -  `168953`:

      revealt rote Rätselbox

   -  `921009`: 

      gibt drive location
   
   -  `792996`: 

      Hex zu dez Erklärvideo
   
   -  `958577`:

      Hex zu dez rechner

- Grüne Box
   -  `214174`:

      revealt grüne Zahl

   -  `215248`:

      ändert SnakeGame zu unconfined; Snake revealed nun Lösungscode für grün

   -  `924659`:

      space startet game
   
   -  `887420`:

      Länge des yt Links

   -  `416683`:

      morsecode text zu yt video

   -  `476311`:

      website morsecode übersetzen
   
   -  `608651`:

      Hinweis auf 6 Zahlen im text

- Gelbe Box
   -  `381574`:

      revealt gelbe Zahl

   -  `443882`: Level 2
   -  `123061`: Level 3
   -  `771510`: Level 4
   -  `967854`: Level 5
   -  `665839`: Level 6

- Orangene Box
   - `134637`:

      revealt orangene Zahl
   
   -  `113318`:

      Bild ist größer als screen

   -  `912389`:

      tab neuladen oder duplizieren
   
   -  `677929`:

      Mathe auf Tisch
   
   -  `984652`:

      römische Zahlen
   
   -  `494480`:

      TicTacToe übereinander legen

   -  `461479`:

      wink zu Blumen
   
   -  `682614`:

      TicTacToe hängt mit Karte zusammen

   -  `227625`:

      Anzahl Blütenblätter


# left TODO
-  Codes fertigstellen
-  physischen Adventskalender
-  Golflevel 2 bis 6
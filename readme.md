Containervervoer


Het containervervoerbedrijf Berend Bootje wil het plannen en indelen van containers op hun vrachtschepen gaan automatiseren. Dit kost momenteel te veel tijd en tijd is geld. Bij het maken van een goede indeling komt namelijk best wel veel kijken.


Er kunnen niet te veel containers op elkaar worden gestapeld. Bovenop een container kan maar maximaal 120 ton aan gewicht worden geplaatst voordat hij zal bezwijken onder het totaalgewicht. Een volle container weegt maximaal 30 ton. Het gewicht van een container is afhankelijk van zijn inhoud en kan dus afwijken van het gewicht van andere containers. Een lege container weegt altijd 4000 kg.


Een container kan ook waardevolle lading bevatten. In dat geval mag er helemaal niets bovenop de container worden gestapeld en moet de lading via de voor- of achterkant te benaderen zijn, anders kan de inhoud van de container niet verzekerd worden.


Er zijn ook containers die gekoeld vervoerd moeten worden. De vrachtschepen hebben echter alleen aan de voorste zijde aansluitingen voor deze containers. Dat betekent dat alleen containers in de eerste rij gekoeld kunnen worden. Bij het maken van de indeling moet hier dus rekening mee gehouden worden.


Tot slot is de veiligheid van het schip en haar bemanning zeer belangrijk. Elk vrachtschip heeft een maximum gewicht wat het kan vervoeren. Grotere schepen kunnen uiteraard meer vervoeren. Het is echter wel zo dat ten minste 50% van het maximum gewicht moet zijn benut. Als het onder die grens komt zou het schip kunnen kapseizen (een scheepsterm voor omvallen). Daarnaast is er een marge van 20% in de verdeling van het gewicht over de helften van het schip. Indien de totale lading 100 ton is, is het toegestaan als op de linkerhelft 60 ton staat en op de rechterhelft 40 ton.


Samengevat moet de indeling van een vrachtschip aan de volgende eisen voldoen:
•	Het maximum gewicht bovenop een container is 120 ton.
•	Een volle container weegt maximaal 30 ton. Een lege container weegt 4000 kg.
•	Er mag niets bovenop een container met waardevolle lading worden gestapeld; wel mogen deze containers zelf op andere containers geplaatst worden.
•	Een container met waardevolle lading moet altijd via de voor- of achterkant te benaderen zijn. Je mag er vanuit gaan dat ook gestapelde containers te benaderen zijn.
•	Alle containers die gekoeld moeten blijven moeten in de eerste rij worden geplaatst vanwege de stroomvoorziening die aan de voorkant van elk schip zit.
•	Om kapseizen te voorkomen moet ten minste 50% van het maximum gewicht van een schip zijn benut.
•	Het schip moet in evenwicht zijn: het volledige gewicht van de containers voor iedere helft mag niet meer dan 20% van de totale lading verschillen.
•	De afmeting van een schip moet instelbaar zijn in de applicatie, waarbij de hoogte en breedte in containers aangegeven kan worden.
Opdracht
Het kan makkelijk zijn om een klassendiagram voor bovenstaand probleem te maken. Maak aan de hand van jouw ontwerp een programma dat indelingen kan maken voor containers. Houd rekening met alle eisen die zijn gesteld aan de containers, schepen en de indeling. Een andere tip is het maken van unit-tests die controleren dat geen van bovengenoemde eisen is overtreden. Het moet mogelijk zijn om aan te geven hoeveel containers van iedere soort vervoerd dienen te worden. Om het resultaat inzichtelijk te maken is het ook aan te raden om een duidelijke visualisatie te maken zodat per laag ingezien kan worden welke container zich waar bevindt.

====== IMPLEMENTED =======
Een volle container weegt maximaal 30 ton. Een lege container weegt 4000 kg.

Om kapseizen te voorkomen moet ten minste 50% van het maximum gewicht van een schip zijn benut.

De afmeting van een schip moet instelbaar zijn in de applicatie, waarbij de hoogte en breedte in containers aangegeven kan worden.

Alle containers die gekoeld moeten blijven moeten in de eerste rij worden geplaatst vanwege de stroomvoorziening die aan de voorkant van elk schip zit.

Het maximum gewicht bovenop een container is 120 ton.

Om kapseizen te voorkomen moet ten minste 50% van het maximum gewicht van een schip zijn benut.

TODO: Een container met waardevolle lading moet altijd via de voor- of achterkant te benaderen zijn. Je mag er vanuit gaan dat ook gestapelde containers te benaderen zijn.

TODO: Het schip moet in evenwicht zijn: het volledige gewicht van de containers voor iedere helft mag niet meer dan 20% van de totale lading verschillen.

======================

How to run / debug / test
> yarn

Goto VSCode debugger.
Open Javascript debugger window
> yarn debug:watch

or 
> yarn debug:watch

and attach debugger to running process

> yarn test


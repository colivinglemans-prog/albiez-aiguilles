# Auto Actions Beds24 — textes de référence

**Ce fichier est la seule sauvegarde des Auto Actions.** L'API Beds24 v2 ne les expose pas :
sa spécification (`apiV2.yaml`, 26 endpoints, relevée le 2026-08-30) ne contient aucune route
de lecture ou d'écriture des automatismes. Les quatre mentions d'« auto action » qu'on y trouve
sont trompeuses — `allowAutoAction` est un interrupteur par réservation, et `20: auto action`
un simple type de ligne de facture.

Conséquence : toute modification faite dans l'interface Beds24 doit être **recopiée ici**,
sinon la rédaction n'existe plus qu'à un seul endroit, sans historique.

⚠️ **Ne jamais écrire ici un code d'accès, un code de boîte à clés ou un mot de passe Wi-Fi.**
Le repo est public. Les messages qui en contiennent (guide d'arrivée, code de serrure) doivent
rester hors de ce fichier.

## Variables et pièges

| Variable | Rend | Piège |
|----------|------|-------|
| `[PROPERTYPHONE]` | `33620921005` | **Sans le `+`** : Beds24 stocke l'indicatif dans un champ séparé et le concatène. D'où `+[PROPERTYPHONE]` pour l'affichage, et `wa.me/[PROPERTYPHONE]` pour le lien, qui veut le numéro nu. À revérifier au premier envoi de test : si Beds24 ajoutait le `+` de lui-même, on obtiendrait `++33…`. |
| `[ROOMNAME]` | le nom complet du logement | Identique à `[PROPERTYNAME]` — Albiez n'a qu'une room. « Chambre : [ROOMNAME] » donnait donc « Chambre : Appart au Chalet du Hameau des Aiguilles ». Ne pas l'utiliser. |
| `[PROPERTYNAME]` | `Appart au Chalet du Hameau des Aiguilles` | Renommé le 2026-08-31. L'ancien nom portait un point médian et un tiret orphelin. **Ce nom s'affiche aussi avant la réservation**, sur la page de paiement : il doit dire « appart » et non « chalet », sinon un logement de 33 m² promet une maison entière. |
| `[NUMCHILD]` | `0` quand il n'y a pas d'enfant | « 0 enfant(s) » se lit mal. Masqué par un conditionnel, les modèles Beds24 en acceptant : voir la ligne « Voyageurs » du message. |

## La séquence des trois messages

| Quand | Message | Contenu | Ce qu'il ne porte **pas** |
|-------|---------|---------|---------------------------|
| À la réservation | Confirmation (617008) | Récapitulatif, kit linge, répartition des couchages, **guide d'activités** | Ni heure d'arrivée, ni code |
| J-7 | Avant-arrivée | **Guide d'arrivée**, heure d'arrivée demandée, tailles de linge pour qui n'a pas le kit | **Pas le code** |
| Jour J | Code d'accès | Le code de la boîte à clés | — |

**Le code arrive le jour même parce qu'il est fixe.** La boîte à clés d'Albiez n'a pas de code
tournant : chaque voyageur qui le reçoit le conserve indéfiniment. L'envoyer au dernier moment
ne l'empêche pas de s'accumuler, mais réduit la fenêtre pendant laquelle un séjour annulé ou
reporté circule avec un code valide.

💡 **Corollaire à envisager : changer le code à chaque changement de saison.** Quatre dates
existent déjà dans `lib/seasons.ts` (`HIVERS`), et le code ne vit qu'à un seul endroit — l'Auto
Action du jour J. Le faire tourner deux fois par an borne le nombre de porteurs à une saison
de voyageurs, au lieu de tous depuis l'ouverture.

**Le guide d'arrivée en ligne peut circuler à J-7 sans risque**, et c'est déjà prévu par le
site : `lib/arrival.ts` porte en commentaire « Aucun code d'accès ne figure ici ni sur la
page », et la page affiche « Le code de la boîte à clés vous est envoyé par message avant votre
arrivée : il ne figure pas sur cette page ». La page décrit donc où est la boîte et comment
elle s'ouvre, mais pas avec quoi.

⚠️ Cette page est en `noindex` mais **son URL est devinable** (`/fr/guide-arrivee`) : elle est
discrète, pas secrète. C'est acceptable précisément parce que le code n'y est pas — et c'est
une raison de plus pour qu'il n'y arrive jamais.

## Le conditionnel existe dans les modèles

Découvert le 2026-08-31, et pas dans l'API — dans le wiki Beds24. Les modèles acceptent :

```
[IF>:valeur:seuil:texte si vrai|texte si faux]
```

Avec aussi `[IF=:`, `[IFIN:`, `[IFLIKE:`, `[IF>=:`, `[IF<:`, `[IF<=:`, `[IFBETWEEN:`.

⚠️ **Deux contraintes d'écriture, déduites de la syntaxe elle-même** — le `:` sépare les
champs et le `|` sépare les deux branches, donc **aucun des deux ne doit apparaître dans le
texte d'une branche**. C'est pour ça que les phrases conditionnelles du kit linge n'ont pas de
deux-points, là où le reste du message en emploie librement. Un « votre kit est réservé : … »
casserait vraisemblablement le découpage. À confirmer au test, mais ça ne coûte rien de
l'éviter.

Par prudence, **une branche tient sur une seule ligne**. Rien ne dit que le parseur accepte un
saut de ligne au milieu, et le texte partagé peut vivre en dehors du conditionnel.

C'est ce qui permet deux choses que le modèle d'origine ne savait pas faire : dire au voyageur
s'il a pris le kit linge, et masquer « 0 enfant(s) » quand il n'y en a pas. **Y penser avant
de dupliquer un message pour gérer un cas particulier** — c'est ainsi que les deux modèles
Airbnb ski / hors-ski avaient fini par exister, puis par converger.

## Faits que les messages doivent respecter

Ces valeurs viennent de `lib/property.ts` et des dictionnaires : **les messages et le site
doivent dire la même chose**, sinon le voyageur découvre la contradiction à l'arrivée.

| Fait | Valeur | Source |
|------|--------|--------|
| Arrivée | **à partir de 16h**, autonome donc flexible dans les faits | `checkInStart` Beds24, décidé le 2026-08-31 |
| Départ | avant 10h | `checkOutEnd` Beds24 |
| Ménage de fin de séjour | **inclus**, hors cuisine et vaisselle | `practical.cleaning` (fr.ts) |
| Couettes et oreillers | fournis | `linen.inventory` |
| Draps et serviettes | **en option, 15 €/personne** | `PROPERTY.linen.pricePerPerson` |
| Capacité | 4 à 6 personnes | `PROPERTY.capacity` |

⚠️ Le modèle d'origine annonçait « Draps fournis / Serviettes fournies ». C'était **faux** et
c'était le litige le plus probable de toute la chaîne : un voyageur arrivant sans draps en
s'attendant à en trouver.

## Saisonnalité

Il n'y a **qu'une version**, pas deux. Les deux modèles Airbnb d'origine (ski / hors-ski) ne
différaient que par une phrase sur la réservation des skis, et ils avaient déjà convergé :
les deux textes étaient devenus identiques, la bascule manuelle semestrielle n'ayant pas été
faite. La phrase est donc conditionnée dans le texte lui-même — « En hiver, … » — ce qu'un
lecteur d'août saute d'un coup d'œil.

L'été ne porte aucune incitation à réserver : à Albiez, ce n'est pas nécessaire.

---

# Auto Action 617008 — Confirmation de réservation

*Trigger : Auto · Send Message : Booking API/Email Smart · Reply To : alexandre.delan@gmail.com*

## Français — **version de référence**

C'est la seule version validée. Les quatre traductions qui suivent sont des **brouillons
antérieurs**, à resynchroniser sur celle-ci avant tout usage.

**Sujet**

```
Votre séjour à Albiez est confirmé — [FIRSTNIGHTSHORT]
```

**Message**

```
Bonjour [GUESTSFIRSTNAMES],

Merci beaucoup pour votre réservation et pour votre confiance.

Votre séjour est confirmé :

  Arrivée   : [FIRSTNIGHTSHORT] à partir de 16h00
  Départ    : [LEAVINGDAYSHORT] avant 10h00
  Durée     : [NUMNIGHT] nuit(s)
  Voyageurs : [NUMADULT] adulte(s)[IF>:[NUMCHILD]:0:, [NUMCHILD] enfant(s)|]

CE QUI EST INCLUS
  - Ménage de fin de séjour, hors cuisine et vaisselle qui restent à votre charge
  - Couettes et oreillers

VOTRE KIT LINGE
[IF>:[INVOICEUPSELLQTY2]:0:C'est noté, votre kit linge est réservé. Draps, taies et une serviette de bain par personne vous attendent dans l'appartement. Les lits ne sont pas faits à votre arrivée — le linge est mis à disposition, à vous de l'installer.|Vous n'avez pas pris le kit linge. Prévoyez vos draps, vos taies et vos serviettes de bain — ou dites-le nous et nous l'ajoutons, 15 € par personne.]

  Le logement compte 1 lit double de 160 × 190 et 4 lits simples de 80 × 190.
  Les couettes et les oreillers sont sur place dans tous les cas.

[IF>:[INVOICEUPSELLQTY2]:0:  Une chose à nous dire dès maintenant — la répartition des couchages que vous souhaitez, pour que nous sortions les bonnes tailles de draps. Par exemple « 1 double + 2 simples ».|]

EN HIVER
  Pensez à réserver vos skis et vos cours à l'ESF sans tarder : les créneaux
  partent vite pendant les vacances scolaires.

NOTRE GUIDE
  Les activités et les lieux à ne pas manquer autour du chalet :
  https://www.albiez-aiguilles.fr/fr/guide

VOTRE ARRIVÉE
  L'arrivée est 100 % autonome : vous arrivez à l'heure qui vous convient.
  Vous recevrez votre code d'accès et un mini-guide avant votre départ.

  Adresse : Chemin du Châtel, 73530 Albiez-Montrond
  Plan    : https://maps.app.goo.gl/mQnt1JRWTJ92JePW9
  Site    : https://www.albiez-aiguilles.fr/fr/

Une question ? Répondez à ce message, ou écrivez-nous sur WhatsApp :
+[PROPERTYPHONE] — https://wa.me/[PROPERTYPHONE]

À très bientôt,
Isabelle et Alexandre

VOTRE RÉSERVATION EN DÉTAIL
[INVOICE:PRI_QTY_CUA€]

--
Référence [REFERENCENUMBER] · [GUESTFULLNAME] · [FIRSTNIGHT] -> [LEAVINGDAY]
```

### Le bloc kit linge, et pourquoi il est construit ainsi

Le kit linge est l'**upsell n° 2** dans la configuration Beds24 : d'où `[INVOICEUPSELLQTY2]`.
Ce numéro dépend de l'ordre des upsells dans l'interface et **l'API ne l'expose pas** — si
l'ordre change, la condition se met à parler du mauvais article sans rien signaler.

La construction est volontairement redondante, en deux temps :

1. **La phrase conditionnelle** dit quoi faire. C'est la partie utile, et la partie qui peut
   se tromper.
2. **Le tableau `[INVOICE:PRI_QTY_CUA€]`** liste ce qui a réellement été facturé. Aucune
   logique, donc aucune erreur possible.

Si le conditionnel se trompe, le tableau dit encore la vérité : l'erreur reste survivable.
Un message qui affirmerait seulement « votre kit est réservé » sans rien pour le recouper
serait, lui, indéfendable à l'arrivée.

⚠️ **À tester avant mise en service**, avec deux réservations de test — une avec l'option, une
sans. La documentation Beds24 ne dit pas ce que rend `[INVOICEUPSELLQTY2]` quand l'option n'est
pas prise : si c'est une chaîne vide plutôt que `0`, rien ne garantit que `[IF>:` la traite
comme zéro, et les deux branches pourraient s'inverser.

### Ce qui est partagé, et ce qui ne peut pas l'être

Deux phrases seulement valent dans les deux cas, et elles sont donc hors du conditionnel :

- **L'inventaire des lits** (1 double 160 × 190, 4 simples 80 × 190) — il sert à décrire la
  répartition souhaitée si le kit est pris, et à acheter les bonnes tailles sinon.
- **« Les couettes et les oreillers sont sur place dans tous les cas »** — sans elle, un
  voyageur sans kit peut croire qu'il doit apporter un duvet.

En revanche **« Les lits ne sont pas faits à votre arrivée, le linge est mis à disposition »
n'appartient qu'à la branche avec kit** : sans kit, il n'y a aucun linge mis à disposition, et
la phrase devient incompréhensible. Elle a donc été déplacée dans la branche.

⚠️ Au passage, la formulation s'écarte d'un caractère de celle du site (`linen.notMadeNote`,
qui emploie un deux-points) : le `:` étant le séparateur de champs du conditionnel, il est
remplacé par un tiret cadratin. C'est le seul écart, et il est syntaxique, pas rédactionnel.

### Ce que la confirmation demande, et ce qu'elle ne demande pas

**Elle ne demande pas l'heure d'arrivée.** Un voyageur qui réserve six mois à l'avance n'en a
aucune idée, et une question sans réponse possible n'obtient rien tout en donnant l'impression
d'avoir été traitée. Cette demande appartient au **message d'avant-arrivée (J-7)**, où elle est
répondable.

**Elle demande la répartition des couchages**, mais seulement si le kit linge est pris. C'est
le bon moment : le voyageur vient de choisir l'option, il a la composition du groupe en tête.
Deux personnes peuvent être un couple ou non — un lit double, ou un double et un simple — et
les draps n'étant pas installés mais mis à disposition, la taille compte.

La branche « sans kit » est **vide** (`…|]`) : rien à demander, donc rien à afficher.

À vérifier au test : une branche vide laisse probablement une ligne blanche là où le
conditionnel se trouvait. Sans conséquence, le paragraphe suivant en ayant déjà une, mais si
deux lignes blanches apparaissent c'est de là qu'elles viennent.

## English — *brouillon, à resynchroniser sur le français*

**Subject**

```
Your stay in Albiez is confirmed — [FIRSTNIGHTSHORT]
```

**Message**

```
Hello [GUESTSFIRSTNAMES],

Thank you very much for your booking and for your trust.

Your stay is confirmed:

  Check-in  : [FIRSTNIGHTSHORT] from 4:00 pm
  Check-out : [LEAVINGDAYSHORT] before 10:00 am
  Length    : [NUMNIGHT] night(s)
  Guests    : [NUMADULT] adult(s), [NUMCHILD] child(ren)

INCLUDED
  - End-of-stay cleaning, excluding kitchen and dishes which are left to you
  - Duvets and pillows

OPTIONAL
  - Linen kit (bed sheets + bath towel): 15 EUR per person.
    Let us know soon if you would like it, so we can set it aside.
    Without the kit, please bring your own sheets and towels.

IN WINTER
  Book your ski rental and ESF lessons early: slots fill up fast during the
  French school holidays.

OUR GUIDE
  Activities and places worth seeing around the chalet:
  https://www.albiez-aiguilles.fr/en/guide

YOUR ARRIVAL
  Check-in is fully self-service: arrive whenever suits you.
  Please let us know your approximate arrival time so everything is ready.
  You will receive your access code and a short guide before you set off.

  Address : Chemin du Châtel, 73530 Albiez-Montrond, France
  Map     : https://maps.app.goo.gl/mQnt1JRWTJ92JePW9
  Website : https://www.albiez-aiguilles.fr/en/

Any questions? Just reply to this message, or write to us on WhatsApp:
+[PROPERTYPHONE] — https://wa.me/[PROPERTYPHONE]

See you very soon,
Isabelle and Alexandre

--
Reference [REFERENCENUMBER] · [GUESTFULLNAME] · [FIRSTNIGHT] -> [LEAVINGDAY]
```

## Deutsch — *brouillon, à resynchroniser sur le français*

**Betreff**

```
Ihr Aufenthalt in Albiez ist bestätigt — [FIRSTNIGHTSHORT]
```

**Nachricht**

```
Guten Tag [GUESTSFIRSTNAMES],

vielen Dank für Ihre Buchung und für Ihr Vertrauen.

Ihr Aufenthalt ist bestätigt:

  Anreise : [FIRSTNIGHTSHORT] ab 16:00 Uhr
  Abreise : [LEAVINGDAYSHORT] vor 10:00 Uhr
  Dauer   : [NUMNIGHT] Nacht/Nächte
  Gäste   : [NUMADULT] Erwachsene, [NUMCHILD] Kind(er)

INKLUSIVE
  - Endreinigung, ohne Küche und Geschirr, die Ihnen überlassen bleiben
  - Bettdecken und Kopfkissen

OPTIONAL
  - Wäschepaket (Bettwäsche + Badetuch): 15 EUR pro Person.
    Sagen Sie uns rechtzeitig Bescheid, damit wir es reservieren.
    Ohne Paket bringen Sie bitte Bettwäsche und Handtücher selbst mit.

IM WINTER
  Buchen Sie Skiverleih und ESF-Kurse frühzeitig: in den französischen
  Schulferien sind die Plätze schnell vergeben.

UNSER GUIDE
  Aktivitäten und sehenswerte Orte rund um das Chalet:
  https://www.albiez-aiguilles.fr/de/guide

IHRE ANKUNFT
  Die Anreise erfolgt vollständig selbstständig: Sie kommen, wann es Ihnen passt.
  Bitte teilen Sie uns Ihre ungefähre Ankunftszeit mit, damit alles bereit ist.
  Ihren Zugangscode und einen kurzen Leitfaden erhalten Sie vor der Abreise.

  Adresse : Chemin du Châtel, 73530 Albiez-Montrond, Frankreich
  Karte   : https://maps.app.goo.gl/mQnt1JRWTJ92JePW9
  Website : https://www.albiez-aiguilles.fr/de/

Fragen? Antworten Sie einfach auf diese Nachricht oder schreiben Sie uns
auf WhatsApp: +[PROPERTYPHONE] — https://wa.me/[PROPERTYPHONE]

Bis bald,
Isabelle und Alexandre

--
Referenz [REFERENCENUMBER] · [GUESTFULLNAME] · [FIRSTNIGHT] -> [LEAVINGDAY]
```

## Español — *brouillon, à resynchroniser sur le français*

**Asunto**

```
Su estancia en Albiez está confirmada — [FIRSTNIGHTSHORT]
```

**Mensaje**

```
Hola [GUESTSFIRSTNAMES]:

Muchas gracias por su reserva y por su confianza.

Su estancia está confirmada:

  Llegada  : [FIRSTNIGHTSHORT] a partir de las 16:00
  Salida   : [LEAVINGDAYSHORT] antes de las 10:00
  Duración : [NUMNIGHT] noche(s)
  Viajeros : [NUMADULT] adulto(s), [NUMCHILD] niño(s)

INCLUIDO
  - Limpieza final de la estancia, excepto cocina y vajilla, que quedan a su cargo
  - Edredones y almohadas

OPCIONAL
  - Kit de ropa de cama (sábanas + toalla de baño): 15 EUR por persona.
    Avísenos pronto si lo desea, para que podamos reservarlo.
    Sin el kit, traiga sus sábanas y sus toallas.

EN INVIERNO
  Reserve pronto el alquiler de esquís y las clases de la ESF: las plazas se
  agotan rápido durante las vacaciones escolares francesas.

NUESTRA GUÍA
  Actividades y lugares imprescindibles alrededor del chalet:
  https://www.albiez-aiguilles.fr/es/guide

SU LLEGADA
  La entrada es totalmente autónoma: llegue a la hora que le convenga.
  Indíquenos su hora aproximada de llegada para que todo esté listo.
  Recibirá su código de acceso y una pequeña guía antes de su salida.

  Dirección : Chemin du Châtel, 73530 Albiez-Montrond, Francia
  Mapa      : https://maps.app.goo.gl/mQnt1JRWTJ92JePW9
  Web       : https://www.albiez-aiguilles.fr/es/

¿Alguna pregunta? Responda a este mensaje o escríbanos por WhatsApp:
+[PROPERTYPHONE] — https://wa.me/[PROPERTYPHONE]

Hasta muy pronto,
Isabelle y Alexandre

--
Referencia [REFERENCENUMBER] · [GUESTFULLNAME] · [FIRSTNIGHT] -> [LEAVINGDAY]
```

## Italiano — *brouillon, à resynchroniser sur le français*

**Oggetto**

```
Il vostro soggiorno ad Albiez è confermato — [FIRSTNIGHTSHORT]
```

**Messaggio**

```
Buongiorno [GUESTSFIRSTNAMES],

grazie mille per la vostra prenotazione e per la vostra fiducia.

Il vostro soggiorno è confermato:

  Arrivo   : [FIRSTNIGHTSHORT] dalle 16:00
  Partenza : [LEAVINGDAYSHORT] entro le 10:00
  Durata   : [NUMNIGHT] notte/notti
  Ospiti   : [NUMADULT] adulto/i, [NUMCHILD] bambino/i

INCLUSO
  - Pulizia finale, escluse cucina e stoviglie che restano a vostro carico
  - Piumini e cuscini

OPZIONALE
  - Kit biancheria (lenzuola + telo da bagno): 15 EUR a persona.
    Segnalatecelo presto se lo desiderate, così lo mettiamo da parte.
    Senza il kit, portate lenzuola e asciugamani.

IN INVERNO
  Prenotate presto il noleggio sci e i corsi ESF: i posti si esauriscono in
  fretta durante le vacanze scolastiche francesi.

LA NOSTRA GUIDA
  Attività e luoghi da non perdere intorno allo chalet:
  https://www.albiez-aiguilles.fr/it/guide

IL VOSTRO ARRIVO
  Il check-in è totalmente autonomo: arrivate all'ora che preferite.
  Segnalateci l'ora approssimativa di arrivo, così troverete tutto pronto.
  Riceverete il codice di accesso e una breve guida prima della partenza.

  Indirizzo : Chemin du Châtel, 73530 Albiez-Montrond, Francia
  Mappa     : https://maps.app.goo.gl/mQnt1JRWTJ92JePW9
  Sito      : https://www.albiez-aiguilles.fr/it/

Domande? Rispondete a questo messaggio o scriveteci su WhatsApp:
+[PROPERTYPHONE] — https://wa.me/[PROPERTYPHONE]

A presto,
Isabelle e Alexandre

--
Riferimento [REFERENCENUMBER] · [GUESTFULLNAME] · [FIRSTNIGHT] -> [LEAVINGDAY]
```

---

## Ce qui a été retiré du modèle d'origine, et pourquoi

| Retiré | Raison |
|--------|--------|
| « Draps fournis / Serviettes fournies » | **Faux.** Elles sont en option à 15 €/personne. |
| « Pas de petit déjeuner (cuisine à votre disposition) » | Personne n'attend un petit déjeuner dans un appartement avec cuisine. L'annoncer crée un doute là où il n'y en avait pas. |
| « Chambre : [ROOMNAME] » | Rend le nom complet du logement, et « chambre » est faux pour un appartement entier. |
| Le pavé « Récapitulatif de réservation » | Répétait les dates déjà données plus haut. Réduit à une ligne de pied. |
| « Cordialement, [PROPERTYNAME] » | Une signature de personnes vaut mieux qu'une signature d'annonce, et le message est déjà signé « Isabelle et Alexandre ». |
| L'absence d'accents dans le corps | Le sujet en portait déjà (« réservation »), et l'adresse contient « Châtel ». Beds24 envoie en UTF-8 : la prudence était héritée d'un temps révolu. |

## À faire encore

- [ ] Renseigner le téléphone avec le `+` **ou** vérifier au premier envoi que `+[PROPERTYPHONE]`
      ne produit pas `++33…`.
- [ ] Vérifier si le nom de propriété Beds24 est **poussé vers Airbnb et Booking**. Si oui, le
      renommage réécrit les titres d'annonces — or l'ancien nom avait été choisi pour coller à eux.
- [ ] Aligner l'heure d'arrivée annoncée sur le site : ni `lib/property.ts` ni les dictionnaires
      ne mentionnent 16h aujourd'hui. Le message le dit, le site se tait.
- [ ] **Tester le conditionnel du kit linge** avec deux réservations de test, une avec
      l'option et une sans. C'est le seul point du message qui peut mentir.
- [ ] Resynchroniser les quatre traductions sur le français figé, une fois le test passé.
- [ ] **Message J-7 — avant-arrivée.** Lien vers le guide d'arrivée, demande de l'heure
      d'arrivée, rappel des tailles de linge pour qui n'a pas pris le kit. À rédiger.
- [ ] **Message jour J — code d'accès.** ⚠️ **Son texte ne sera pas versionné ici** : il porte
      le code de la boîte à clés, et le repo est public. Seule sa structure peut l'être.
- [ ] Message de départ, et demande d'avis.
- [ ] Décider si le code de la boîte à clés tourne à chaque saison (voir « La séquence des
      trois messages »).

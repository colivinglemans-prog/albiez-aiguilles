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
| `[APISOURCE]` | le **numéro** de canal Beds24 — mesuré le 2026-09-23 : direct `0`, Booking.com `19`, Airbnb `46` | C'est ce qui rend le message des canaux possible : `[IF>` compare des nombres, et le filtre d'une Auto Action ne sait pas distinguer Airbnb de Booking.com. ✅ **Vérifié le 2026-09-25 sur les deux canaux** — `19` sur la réservation 92207584 et `46` sur la 92390158, et non `Booking.com` / `Airbnb`. `[IF>` les compare numériquement, et le seuil `30` range chacune du bon côté. `[APISOURCETEXT]` et `[REFERRER]` rendent tous deux `Booking.com` en toutes lettres, et restent le repli si un jour `[APISOURCE]` change de nature. |

## Le nom des langues, et surtout celle que Beds24 choisit

**Ce fichier nomme les langues dans leur langue, l'interface Beds24 les nomme en anglais.**
L'écart a été repéré le 2026-09-25 sur l'allemand — « Deutsch » ici, « German » là-bas. Les
titres de section portent donc désormais le **code ISO**, qui ne se prête à aucune confusion et
qui est aussi ce que l'API rend dans le champ `lang` d'une réservation.

| Code | Ici | Côté Beds24 |
|---|---|---|
| `fr` | Français | French |
| `en` | English | English |
| `de` | Deutsch | **German** — observé |
| `es` | Español | Spanish |
| `it` | Italiano | Italian |

⚠️ Seul l'allemand a été vérifié dans l'interface. Les quatre autres sont déduits, et se
vérifient d'un coup d'œil à la prochaine ouverture de l'éditeur de modèles.

### La langue de la réservation n'est pas toujours l'une des cinq

Relevé le 2026-09-25 sur les quatre réservations vivantes du compte :

| Réservation | Canal | `lang` |
|---|---|---|
| 92791396 | Booking.com | `fr` |
| 92207584 | Booking.com | *(vide)* |
| 93517472 | Booking.com | *(vide)* |
| 92390158 | Airbnb | **`ru`** |

**Trois sur quatre ne tombent sur aucun des cinq modèles.** Le voyageur Airbnb de janvier 2027
est russe, et deux Booking.com n'annoncent aucune langue. Beds24 se rabat forcément sur un
modèle par défaut, mais **lequel n'est pas documenté ici et n'a jamais été vérifié**.

C'est un angle mort plus coûteux que l'étiquette des langues : cinq traductions soigneusement
alignées ne servent à rien si la majorité des réservations passe à côté. À trancher avant de
mettre l'action canaux en service — et l'anglais est sans doute un meilleur défaut que le
français pour un voyageur dont on ne sait rien.

## La séquence des trois messages

| Quand | Message | Contenu | Ce qu'il ne porte **pas** |
|-------|---------|---------|---------------------------|
| À la réservation | Confirmation — **deux actions jumelles**, 617008 pour le direct et l'action « canaux » pour Booking.com et Airbnb | Récapitulatif, kit linge, répartition des couchages, **guide d'activités** | Ni heure d'arrivée, ni code |
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
| Draps et serviettes | **en option, 15 €/personne** — en direct et sur Airbnb | `PROPERTY.linen.pricePerPerson` |
| Capacité | 4 à 6 personnes | `PROPERTY.capacity` |

⚠️ Le modèle d'origine annonçait « Draps fournis / Serviettes fournies ». C'était **faux** et
c'était le litige le plus probable de toute la chaîne : un voyageur arrivant sans draps en
s'attendant à en trouver.

### Le linge n'obéit pas à la même règle selon le canal

C'est **une politique, pas une incohérence** — `CLAUDE.md:171-189` et `lib/property.ts:133-144`
le disent déjà et interdisent de l'« harmoniser ». Le message doit donc en dire trois choses
différentes :

| Canal | Linge | Ménage | Ce que le message doit dire |
|-------|-------|--------|------------------------------|
| **Direct** | optionnel, 15 €/pers., choisi dans le tunnel Beds24 | 60 € | pris ou pas pris — c'est le rôle de `[INVOICEUPSELLQTY2]` |
| **Booking.com** | **obligatoire**, déjà facturé 20 € serviettes + 20 € draps | 40 € | inclus, rien à prévoir |
| **Airbnb** | optionnel, mais **impossible à choisir avant** de réserver | fondu dans la nuitée | pas inclus, proposable après coup |

Vérifié le 2026-09-23 sur les vraies lignes de facture de l'API : une réservation Booking.com
porte bien `frais de ménage` 40 €, `supplément serviettes` 20 € et `frais de linge de lit` 20 €,
là où une réservation Airbnb n'a qu'une seule ligne de séjour.

⚠️ **Sur Airbnb, le kit se règle par le centre de résolution Airbnb**, jamais par un lien de
paiement externe : la plateforme décourage les paiements hors de chez elle, et le message qui
porterait le lien passerait dans son propre fil.

## Saisonnalité

Il n'y a **qu'une version**, pas deux. Les deux modèles Airbnb d'origine (ski / hors-ski) ne
différaient que par une phrase sur la réservation des skis, et ils avaient déjà convergé :
les deux textes étaient devenus identiques, la bascule manuelle semestrielle n'ayant pas été
faite. La phrase est donc conditionnée dans le texte lui-même — « En hiver, … » — ce qu'un
lecteur d'août saute d'un coup d'œil.

L'été ne porte aucune incitation à réserver : à Albiez, ce n'est pas nécessaire.

---

# Auto Action 617008 — Confirmation de réservation (réservations directes)

*Trigger : Auto · Send Message : Booking API/Email Smart · Reply To : alexandre.delan@gmail.com*
*Booking Source : **Direct** — voir l'action jumelle « canaux » plus bas.*

## Français — **version de référence** — code `fr`

Les quatre traductions qui suivent en sont dérivées et alignées sur elle (2026-08-31).
**Toute modification se fait ici d'abord**, puis se répercute sur les quatre autres — sinon
elles divergent, et c'est exactement ce qui est arrivé aux deux modèles Airbnb ski / hors-ski.

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

✅ **Le doute sur la branche « sans option » est levé** (2026-09-25, réservation 92207584). On
craignait que `[INVOICEUPSELLQTY2]` rende une chaîne vide plutôt que `0` quand l'option n'est
pas prise, auquel cas rien ne garantissait que `[IF>:` la traite comme zéro — les deux branches
auraient pu s'inverser, et un voyageur sans kit aurait lu « votre kit linge est réservé ». La
sonde rend `0`, et le conditionnel tombe bien sur `PAS DE KIT`.

⚠️ **La branche « avec option » reste à vérifier** : il faut pour cela une réservation directe
ayant réellement pris le kit, et il n'en existe aucune de vivante au compte à ce jour. C'est
la moitié la moins dangereuse — elle se trompe en promettant du linge qu'on apportera de toute
façon — mais elle n'est pas prouvée.

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

## English — code `en`

**Subject**

```
Your stay in Albiez is confirmed — [FIRSTNIGHTSHORT]
```

**Message**

```
Hello [GUESTSFIRSTNAMES],

Thank you very much for your booking and for your trust.

Your stay is confirmed:

  Check-in : [FIRSTNIGHTSHORT] from 4:00 pm
  Check-out: [LEAVINGDAYSHORT] before 10:00 am
  Length   : [NUMNIGHT] night(s)
  Guests   : [NUMADULT] adult(s)[IF>:[NUMCHILD]:0:, [NUMCHILD] child(ren)|]

WHAT IS INCLUDED
  - End-of-stay cleaning, excluding the kitchen and washing-up which are left to you
  - Duvets and pillows

YOUR LINEN KIT
[IF>:[INVOICEUPSELLQTY2]:0:Noted, your linen kit is reserved. Sheets, pillowcases and one bath towel per person will be waiting in the apartment. The beds are not made up when you arrive — the linen is provided and you put it on yourself.|You have not taken the linen kit. Please bring your own sheets, pillowcases and bath towels — or let us know and we will add it, 15 € per person.]

  The apartment has 1 double bed of 160 × 190 cm and 4 single beds of 80 × 190 cm.
  Duvets and pillows are there in every case.

[IF>:[INVOICEUPSELLQTY2]:0:  One thing to tell us now — how you would like the beds arranged, so we can set out the right sheet sizes. For example "1 double + 2 singles".|]

IN WINTER
  Book your ski rental and your ESF lessons early: slots fill up fast during the
  French school holidays.

OUR GUIDE
  The activities and the places not to miss around the chalet:
  https://www.albiez-aiguilles.fr/en/guide

YOUR ARRIVAL
  Check-in is fully self-service: you arrive whenever suits you.
  You will receive your access code and a short guide before you set off.

  Address: Chemin du Châtel, 73530 Albiez-Montrond, France
  Map    : https://maps.app.goo.gl/mQnt1JRWTJ92JePW9
  Website: https://www.albiez-aiguilles.fr/en/

Any questions? Reply to this message, or write to us on WhatsApp:
+[PROPERTYPHONE] — https://wa.me/[PROPERTYPHONE]

See you very soon,
Isabelle and Alexandre

YOUR BOOKING IN DETAIL
[INVOICE:PRI_QTY_CUA€]

--
Reference [REFERENCENUMBER] · [GUESTFULLNAME] · [FIRSTNIGHT] -> [LEAVINGDAY]
```

## Deutsch — code `de`, « German » dans l'interface Beds24

**Betreff**

```
Ihr Aufenthalt in Albiez ist bestätigt — [FIRSTNIGHTSHORT]
```

**Nachricht**

```
Guten Tag [GUESTSFIRSTNAMES],

vielen Dank für Ihre Buchung und für Ihr Vertrauen.

Ihr Aufenthalt ist bestätigt:

  Anreise: [FIRSTNIGHTSHORT] ab 16:00 Uhr
  Abreise: [LEAVINGDAYSHORT] vor 10:00 Uhr
  Dauer  : [NUMNIGHT] Nacht/Nächte
  Gäste  : [NUMADULT] Erwachsene[IF>:[NUMCHILD]:0:, [NUMCHILD] Kind(er)|]

WAS ENTHALTEN IST
  - Endreinigung, ausgenommen Küche und Geschirr, die Ihnen obliegen
  - Bettdecken und Kopfkissen

IHR WÄSCHEPAKET
[IF>:[INVOICEUPSELLQTY2]:0:Notiert, Ihr Wäschepaket ist reserviert. Bettwäsche, Kissenbezüge und ein Badetuch pro Person warten in der Wohnung. Die Betten sind bei Ihrer Ankunft nicht bezogen — die Wäsche wird bereitgestellt, das Beziehen übernehmen Sie.|Sie haben das Wäschepaket nicht gebucht. Bringen Sie bitte Ihre eigene Bettwäsche, Kissenbezüge und Badetücher mit — oder sagen Sie uns Bescheid und wir fügen es hinzu, 15 € pro Person.]

  Die Wohnung hat 1 Doppelbett von 160 × 190 cm und 4 Einzelbetten von 80 × 190 cm.
  Bettdecken und Kopfkissen sind in jedem Fall vorhanden.

[IF>:[INVOICEUPSELLQTY2]:0:  Eine Sache noch — sagen Sie uns bitte, wie Sie die Betten aufteilen möchten, damit wir die passenden Bettwäschegrößen bereitlegen. Zum Beispiel „1 Doppelbett + 2 Einzelbetten".|]

IM WINTER
  Buchen Sie Skiverleih und ESF-Kurse frühzeitig: in den französischen Schulferien
  sind die Plätze schnell vergeben.

UNSER GUIDE
  Aktivitäten und sehenswerte Orte rund um das Chalet:
  https://www.albiez-aiguilles.fr/de/guide

IHRE ANKUNFT
  Die Anreise erfolgt vollständig selbstständig: Sie kommen, wann es Ihnen passt.
  Ihren Zugangscode und einen kurzen Leitfaden erhalten Sie vor der Abreise.

  Adresse: Chemin du Châtel, 73530 Albiez-Montrond, Frankreich
  Karte  : https://maps.app.goo.gl/mQnt1JRWTJ92JePW9
  Website: https://www.albiez-aiguilles.fr/de/

Fragen? Antworten Sie auf diese Nachricht oder schreiben Sie uns auf WhatsApp:
+[PROPERTYPHONE] — https://wa.me/[PROPERTYPHONE]

Bis bald,
Isabelle und Alexandre

IHRE BUCHUNG IM DETAIL
[INVOICE:PRI_QTY_CUA€]

--
Referenz [REFERENCENUMBER] · [GUESTFULLNAME] · [FIRSTNIGHT] -> [LEAVINGDAY]
```

## Español — code `es`

**Asunto**

```
Su estancia en Albiez está confirmada — [FIRSTNIGHTSHORT]
```

**Mensaje**

```
Hola [GUESTSFIRSTNAMES]:

Muchas gracias por su reserva y por su confianza.

Su estancia está confirmada:

  Llegada : [FIRSTNIGHTSHORT] a partir de las 16:00
  Salida  : [LEAVINGDAYSHORT] antes de las 10:00
  Duración: [NUMNIGHT] noche(s)
  Viajeros: [NUMADULT] adulto(s)[IF>:[NUMCHILD]:0:, [NUMCHILD] niño(s)|]

LO QUE ESTÁ INCLUIDO
  - Limpieza final, excepto la cocina y la vajilla, que quedan a su cargo
  - Edredones y almohadas

SU KIT DE ROPA DE CAMA
[IF>:[INVOICEUPSELLQTY2]:0:Anotado, su kit de ropa de cama está reservado. Sábanas, fundas de almohada y una toalla de baño por persona le esperan en el apartamento. Las camas no están hechas a su llegada — la ropa se pone a su disposición y usted la coloca.|No ha contratado el kit de ropa de cama. Traiga sus sábanas, fundas y toallas de baño — o díganoslo y lo añadimos, 15 € por persona.]

  El apartamento tiene 1 cama doble de 160 × 190 cm y 4 camas individuales de 80 × 190 cm.
  Los edredones y las almohadas están allí en todos los casos.

[IF>:[INVOICEUPSELLQTY2]:0:  Una cosa que puede decirnos ya — cómo desea repartir las camas, para que preparemos las medidas de sábanas adecuadas. Por ejemplo «1 doble + 2 individuales».|]

EN INVIERNO
  Reserve pronto el alquiler de esquís y las clases de la ESF: las plazas se agotan
  rápido durante las vacaciones escolares francesas.

NUESTRA GUÍA
  Las actividades y los lugares imprescindibles alrededor del chalet:
  https://www.albiez-aiguilles.fr/es/guide

SU LLEGADA
  La entrada es totalmente autónoma: llegue a la hora que le convenga.
  Recibirá su código de acceso y una pequeña guía antes de su salida.

  Dirección: Chemin du Châtel, 73530 Albiez-Montrond, Francia
  Mapa     : https://maps.app.goo.gl/mQnt1JRWTJ92JePW9
  Web      : https://www.albiez-aiguilles.fr/es/

¿Alguna pregunta? Responda a este mensaje o escríbanos por WhatsApp:
+[PROPERTYPHONE] — https://wa.me/[PROPERTYPHONE]

Hasta muy pronto,
Isabelle y Alexandre

SU RESERVA EN DETALLE
[INVOICE:PRI_QTY_CUA€]

--
Referencia [REFERENCENUMBER] · [GUESTFULLNAME] · [FIRSTNIGHT] -> [LEAVINGDAY]
```

## Italiano — code `it`

**Oggetto**

```
Il vostro soggiorno ad Albiez è confermato — [FIRSTNIGHTSHORT]
```

**Messaggio**

```
Buongiorno [GUESTSFIRSTNAMES],

grazie mille per la vostra prenotazione e per la vostra fiducia.

Il vostro soggiorno è confermato:

  Arrivo  : [FIRSTNIGHTSHORT] dalle 16:00
  Partenza: [LEAVINGDAYSHORT] entro le 10:00
  Durata  : [NUMNIGHT] notte/notti
  Ospiti  : [NUMADULT] adulto/i[IF>:[NUMCHILD]:0:, [NUMCHILD] bambino/i|]

CHE COSA È COMPRESO
  - Pulizia finale, escluse cucina e stoviglie che restano a vostro carico
  - Piumini e cuscini

IL VOSTRO KIT BIANCHERIA
[IF>:[INVOICEUPSELLQTY2]:0:Annotato, il vostro kit biancheria è prenotato. Lenzuola, federe e un telo da bagno a persona vi attendono nell'appartamento. I letti non sono rifatti al vostro arrivo — la biancheria è messa a disposizione, sarete voi a sistemarla.|Non avete preso il kit biancheria. Portate le vostre lenzuola, federe e teli da bagno — oppure segnalatecelo e lo aggiungiamo, 15 € a persona.]

  L'appartamento ha 1 letto matrimoniale da 160 × 190 cm e 4 letti singoli da 80 × 190 cm.
  Piumini e cuscini sono presenti in ogni caso.

[IF>:[INVOICEUPSELLQTY2]:0:  Una cosa da dirci già ora — come desiderate suddividere i letti, così prepariamo le misure di lenzuola giuste. Per esempio «1 matrimoniale + 2 singoli».|]

IN INVERNO
  Prenotate presto il noleggio sci e i corsi ESF: i posti si esauriscono in fretta
  durante le vacanze scolastiche francesi.

LA NOSTRA GUIDA
  Le attività e i luoghi da non perdere intorno allo chalet:
  https://www.albiez-aiguilles.fr/it/guide

IL VOSTRO ARRIVO
  Il check-in è totalmente autonomo: arrivate all'ora che preferite.
  Riceverete il codice di accesso e una breve guida prima della partenza.

  Indirizzo: Chemin du Châtel, 73530 Albiez-Montrond, Francia
  Mappa    : https://maps.app.goo.gl/mQnt1JRWTJ92JePW9
  Sito     : https://www.albiez-aiguilles.fr/it/

Domande? Rispondete a questo messaggio o scriveteci su WhatsApp:
+[PROPERTYPHONE] — https://wa.me/[PROPERTYPHONE]

A presto,
Isabelle e Alexandre

LA VOSTRA PRENOTAZIONE IN DETTAGLIO
[INVOICE:PRI_QTY_CUA€]

--
Riferimento [REFERENCENUMBER] · [GUESTFULLNAME] · [FIRSTNIGHT] -> [LEAVINGDAY]
```

## Ce qui a été retiré du modèle d'origine, et pourquoi

| Retiré | Raison |
|--------|--------|
| « Draps fournis / Serviettes fournies » | **Faux.** Elles sont en option à 15 €/personne. |
| « Pas de petit déjeuner (cuisine à votre disposition) » | Personne n'attend un petit déjeuner dans un appartement avec cuisine. L'annoncer crée un doute là où il n'y en avait pas. |
| « Chambre : [ROOMNAME] » | Rend le nom complet du logement, et « chambre » est faux pour un appartement entier. |
| Le pavé « Récapitulatif de réservation » | Répétait les dates déjà données plus haut. Réduit à une ligne de pied. |
| « Cordialement, [PROPERTYNAME] » | Une signature de personnes vaut mieux qu'une signature d'annonce, et le message est déjà signé « Isabelle et Alexandre ». |
| L'absence d'accents dans le corps | Le sujet en portait déjà (« réservation »), et l'adresse contient « Châtel ». Beds24 envoie en UTF-8 : la prudence était héritée d'un temps révolu. |

---

# Auto Action « canaux » — Confirmation de réservation (Booking.com et Airbnb)

*Trigger : Auto · Send Message : Booking API/Email Smart · **Booking Source : Channel Manager***
*Numéro d'action : à renseigner à la création.*

**Le corps est celui de 617008, mot pour mot, sauf le bloc `VOTRE KIT LINGE`.** Rien d'autre ne
change — ni les dates, ni les inclusions, ni l'hiver, ni le guide, ni l'adresse, ni le pied de
page. Seules les cinq versions du bloc ci-dessous remplacent celles de l'action directe.

⚠️ **Ne pas recopier les cinq messages entiers dans une seconde section de ce fichier.** C'est
exactement comme ça que les deux modèles Airbnb ski / hors-ski ont divergé jusqu'à devenir
identiques sans que personne s'en aperçoive. Un seul corps de référence, une seule différence
isolée.

### Où sont les corps complets à coller dans Beds24

**Ils ne sont pas dans ce fichier, et ne doivent pas y être.** Ils s'assemblent à la demande :

```bash
node scripts/corps-action-canaux.mjs        # les cinq langues
node scripts/corps-action-canaux.mjs fr     # une seule
```

Le script reprend le corps de 617008, y remplace le bloc kit linge par la variante ci-dessous,
et écrit le tout dans `docs/_generated/action-canaux.txt` — dossier **gitignoré**, parce qu'un
texte dérivé qu'on versionne redevient une seconde source de vérité.

Il refuse de produire un message qui contiendrait encore un conditionnel d'upsell, ou qui ne
trierait pas sur `[APISOURCE]` exactement deux fois. Une modification de 617008 se répercute
donc sur l'action canaux d'un simple relancement.

⚠️ **En contrepartie, une retouche faite directement dans l'action canaux côté Beds24 ne
remonte nulle part** — le script la réécrirait au prochain passage. Comme pour 617008, toute
modification se fait ici d'abord.

## Pourquoi un conditionnel et pas deux actions de plus

Le filtre d'une Auto Action ne connaît que `Direct`, `Channel Manager` et `All` : **il ne sait
pas séparer Airbnb de Booking.com**. C'est donc au texte de le faire, et `[APISOURCE]` le permet
puisqu'il rend un nombre — `19` pour Booking.com, `46` pour Airbnb.

Le seuil est `30`, au milieu. J'emploie `[IF>` et non `[IF=`, pourtant plus direct : `[IF>` est
le seul opérateur déjà éprouvé en production ici, il sert pour `[NUMCHILD]` et pour
`[INVOICEUPSELLQTY2]`. Ajouter un canal *et* un opérateur non testé au même endroit ferait deux
suspects pour une seule panne.

⚠️ **Le seuil range tout canal autre qu'Airbnb dans la branche Booking.com.** Le jour où Expedia
ou Vrbo est branché, son numéro décidera seul de ce que lit le voyageur, en lui promettant du
linge inclus qu'il n'a pas payé. C'est le même piège silencieux que le `2` de
`[INVOICEUPSELLQTY2]` — à revoir avant d'ouvrir un troisième canal, pas après.

## Comment tester `[APISOURCE]` sans écrire à un voyageur

`[APISOURCE]` est la seule hypothèse non vérifiée de cette action. Les trois valeurs
(`0` / `19` / `46`) viennent du champ `apiSourceId` de l'API `/bookings`, **pas** de la variable
de modèle — rien ne garantit que les deux se ressemblent. Si la variable rendait un texte, le
`[IF>` numérique ne brancherait jamais et **tout le monde lirait la branche Booking.com**, y
compris les voyageurs Airbnb à qui on promettrait du linge inclus qu'ils n'ont pas payé.

On ne peut pas fabriquer une fausse réservation de canal pour tester : une réservation créée à
la main est toujours `Direct`, donc `apiSourceId = 0`. Le test doit donc porter sur de **vraies
réservations Airbnb et Booking.com** — d'où l'envoi interne, qui est la seule protection.

### La marche à suivre

1. Créer une Auto Action jetable, nommée sans ambiguïté : `ZZ TEST APISOURCE — a supprimer`.
2. **Send Message = `Internal Only`**, et renseigner son adresse dans `Internal Email Address`.
   ⚠️ **C'est le point critique.** Laissée sur `Booking API/Email Smart`, l'action écrit dans
   le fil Airbnb d'un voyageur qui arrive en janvier 2027.
3. `Booking Source = All`, et un déclencheur qui ne partira pas tout seul — une date lointaine
   suffit, on se servira du bouton manuel.
4. Corps du message, qui ne contient que des sondes :

```
APISOURCE brut   = [APISOURCE]
APISOURCETEXT    = [APISOURCETEXT]
REFERRER         = [REFERRER]
seuil 30         = [IF>:[APISOURCE]:30:AIRBNB|AUTRE]
seuil 10         = [IF>:[APISOURCE]:10:CANAL|DIRECT]
upsell 2 (linge) = [INVOICEUPSELLQTY2]
test upsell      = [IF>:[INVOICEUPSELLQTY2]:0:KIT PRIS|PAS DE KIT]
```

5. Ouvrir la réservation **92207584** (Booking.com, séjour terminé le 2026-09-04) → onglet
   `Mail & Actions` → bouton `Send Now` ou `Do Now` sur la ligne de test.
6. Recommencer sur **92390158** (Airbnb, janvier 2027) — la seule réservation Airbnb existante.
7. **Supprimer l'action de test.** Une action `Internal Only` oubliée ne fait pas de dégât
   visible, ce qui est précisément pourquoi on l'oublie.

### Comment lire le résultat

| Ce que rend `[APISOURCE]` | Verdict | Suite |
|---|---|---|
| `19` sur Booking.com et `46` sur Airbnb | ✅ la variable est numérique | le conditionnel tient, rien à changer |
| `Booking.com` / `Airbnb` en toutes lettres | ❌ `[IF>` ne branchera jamais | basculer sur `[IFLIKE:[APISOURCETEXT]:Airbnb:…\|…]`, et le retester pareil |
| vide | ❌ la variable n'existe pas sous ce nom | se rabattre sur `[APISOURCETEXT]` ou `[REFERRER]`, que la même sonde a déjà mesurés |

Les lignes `seuil 30` et `seuil 10` donnent la réponse directement, sans avoir à interpréter :
sur Booking.com on doit lire `AUTRE` puis `CANAL`, sur Airbnb `AIRBNB` puis `CANAL`.

### Résultat mesuré — 2026-09-25, les deux canaux

| Sonde | 92207584 · Booking.com | 92390158 · Airbnb |
|---|---|---|
| `APISOURCE brut` | `19` | `46` |
| `APISOURCETEXT` | `Booking.com` | `Airbnb` |
| `REFERRER` | `Booking.com` | `Airbnb` |
| **`seuil 30`** | **`AUTRE`** | **`AIRBNB`** |
| `seuil 10` | `CANAL` | `CANAL` |
| `upsell 2 (linge)` | `0` | `0` |
| `test upsell` | `PAS DE KIT` | `PAS DE KIT` |

✅ **Le dispositif est prouvé de bout en bout.** La variable est **numérique** — `19` et `46`,
pas `Booking.com` et `Airbnb` — et `[IF>` la compare bien comme un nombre. Les valeurs sortent
identiques à celles du champ `apiSourceId` de l'API `/bookings`, ce qui n'était pas acquis.
Surtout, **les deux branches du seuil `30` tombent chacune du bon côté** — y compris celle qui
porte l'offre du centre de résolution, donc celle qui parle d'argent.

Les valeurs peuvent désormais servir de référence : si un jour un voyageur lit le mauvais
paragraphe, rejouer cette sonde sur sa réservation répond en un envoi.

La sonde mesure aussi `[INVOICEUPSELLQTY2]` au passage, ce qui règle d'un même envoi le point
resté ouvert depuis le 2026-08-31 — on saura enfin ce que rend la variable quand l'option n'est
pas prise, et donc si les deux branches du kit linge sont dans le bon sens.

## Le bloc, dans les cinq langues

### Français — `fr`

```
VOTRE KIT LINGE
[IF>:[APISOURCE]:30:Le kit linge n'est pas inclus dans votre réservation Airbnb. Prévoyez vos draps, vos taies et vos serviettes de bain — ou répondez à ce message et nous vous l'ajoutons, 15 € par personne, par le centre de résolution Airbnb.|Votre kit linge est inclus dans votre réservation. Draps, taies et une serviette de bain par personne vous attendent dans l'appartement. Les lits ne sont pas faits à votre arrivée — le linge est mis à disposition, à vous de l'installer.]

  Le logement compte 1 lit double de 160 × 190 et 4 lits simples de 80 × 190.
  Les couettes et les oreillers sont sur place dans tous les cas.

[IF>:[APISOURCE]:30:|  Une chose à nous dire dès maintenant — la répartition des couchages que vous souhaitez, pour que nous sortions les bonnes tailles de draps. Par exemple « 1 double + 2 simples ».]
```

### English — `en`

```
YOUR LINEN KIT
[IF>:[APISOURCE]:30:The linen kit is not included in your Airbnb booking. Please bring your own sheets, pillowcases and bath towels — or reply to this message and we will add it, 15 € per person, through the Airbnb resolution centre.|Your linen kit is included in your booking. Sheets, pillowcases and one bath towel per person will be waiting in the apartment. The beds are not made up when you arrive — the linen is provided and you put it on yourself.]

  The apartment has 1 double bed 160 × 190 and 4 single beds 80 × 190.
  Duvets and pillows are on site in every case.

[IF>:[APISOURCE]:30:|  One thing to tell us now — how you would like the beds arranged, so we can set out the right sheet sizes. For example "1 double + 2 singles".]
```

### Deutsch — `de`, « German » côté Beds24

```
IHR WÄSCHEPAKET
[IF>:[APISOURCE]:30:Das Wäschepaket ist in Ihrer Airbnb-Buchung nicht enthalten. Bringen Sie bitte Ihre eigene Bettwäsche, Kissenbezüge und Badetücher mit — oder antworten Sie auf diese Nachricht und wir fügen es hinzu, 15 € pro Person, über das Airbnb-Konfliktlösungscenter.|Ihr Wäschepaket ist in Ihrer Buchung enthalten. Bettwäsche, Kissenbezüge und ein Badetuch pro Person warten in der Wohnung. Die Betten sind bei Ihrer Ankunft nicht bezogen — die Wäsche wird bereitgestellt, das Beziehen übernehmen Sie.]

  Die Wohnung hat 1 Doppelbett 160 × 190 und 4 Einzelbetten 80 × 190.
  Decken und Kissen sind in jedem Fall vor Ort.

[IF>:[APISOURCE]:30:|  Eine Sache noch — sagen Sie uns bitte, wie Sie die Betten aufteilen möchten, damit wir die passenden Bettwäschegrößen bereitlegen. Zum Beispiel „1 Doppelbett + 2 Einzelbetten".]
```

### Español — `es`

```
SU KIT DE ROPA DE CAMA
[IF>:[APISOURCE]:30:El kit de ropa de cama no está incluido en su reserva de Airbnb. Traiga sus sábanas, fundas y toallas de baño — o responda a este mensaje y lo añadimos, 15 € por persona, a través del centro de resoluciones de Airbnb.|Su kit de ropa de cama está incluido en su reserva. Sábanas, fundas de almohada y una toalla de baño por persona le esperan en el apartamento. Las camas no están hechas a su llegada — la ropa se pone a su disposición y usted la coloca.]

  El alojamiento tiene 1 cama doble de 160 × 190 y 4 camas individuales de 80 × 190.
  Los edredones y las almohadas están en el apartamento en todos los casos.

[IF>:[APISOURCE]:30:|  Una cosa que puede decirnos ya — cómo desea repartir las camas, para que preparemos las medidas de sábanas adecuadas. Por ejemplo «1 doble + 2 individuales».]
```

### Italiano — `it`

```
IL VOSTRO KIT BIANCHERIA
[IF>:[APISOURCE]:30:Il kit biancheria non è incluso nella vostra prenotazione Airbnb. Portate le vostre lenzuola, federe e teli da bagno — oppure rispondete a questo messaggio e lo aggiungiamo, 15 € a persona, tramite il centro risoluzioni di Airbnb.|Il vostro kit biancheria è incluso nella prenotazione. Lenzuola, federe e un telo da bagno a persona vi attendono nell'appartamento. I letti non sono rifatti al vostro arrivo — la biancheria è messa a disposizione, sarete voi a sistemarla.]

  L'alloggio dispone di 1 letto matrimoniale 160 × 190 e 4 letti singoli 80 × 190.
  Piumoni e cuscini sono sul posto in ogni caso.

[IF>:[APISOURCE]:30:|  Una cosa da dirci già ora — come desiderate suddividere i letti, così prepariamo le misure di lenzuola giuste. Per esempio «1 matrimoniale + 2 singoli».]
```

## Ce qui change par rapport à l'action directe, et pourquoi

**La branche Booking.com n'offre rien** : le linge y est obligatoire et déjà payé — 20 € de
serviettes et 20 € de draps sur la facture. Reproposer l'option à 15 € y serait une erreur
visible, le voyageur ayant le détail sous les yeux dans le tableau `[INVOICE:PRI_QTY_CUA€]` du
même message.

**La branche Airbnb ne demande pas la répartition des couchages** (sa seconde branche est vide) :
tant que le kit n'est pas commandé, il n'y a pas de draps à préparer, donc rien à répartir. La
question appartient au message d'avant-arrivée, ou au moment où le voyageur accepte l'option.

**Le centre de résolution est nommé explicitement** dans la branche Airbnb. C'est le canal prévu
par Airbnb pour un supplément, et le seul qui n'expose pas le compte à une sanction.

## À vérifier AVANT de créer cette action

Ouvrir 617008 et lire son filtre `Booking Source`.

- Si c'est **`Direct`** : rien à faire, créer l'action canaux et c'est tout.
- Si c'est **`All`** : les voyageurs Booking.com reçoivent **déjà** « Vous n'avez pas pris le kit
  linge — prévoyez vos draps, 15 € par personne », alors qu'ils ont payé 40 € de linge
  obligatoire. C'est une erreur visible par le client, à corriger avant tout le reste — et elle
  expliquerait mieux « le message ne part que pour le direct » que l'hypothèse de l'e-mail
  masqué.

## À faire encore

- [ ] Renseigner le téléphone avec le `+` **ou** vérifier au premier envoi que `+[PROPERTYPHONE]`
      ne produit pas `++33…`.
- [ ] Vérifier si le nom de propriété Beds24 est **poussé vers Airbnb et Booking**. Si oui, le
      renommage réécrit les titres d'annonces — or l'ancien nom avait été choisi pour coller à eux.
- [ ] Aligner l'heure d'arrivée annoncée sur le site : ni `lib/property.ts` ni les dictionnaires
      ne mentionnent 16h aujourd'hui. Le message le dit, le site se tait.
- [x] ~~**Tester le conditionnel du kit linge**, branche « sans option »~~ — fait le
      2026-09-25 sur 92207584. `[INVOICEUPSELLQTY2]` rend `0` et le conditionnel tombe bien
      sur la branche « pas de kit ».
- [ ] **Tester la branche « avec option » du kit linge.** Elle exige une réservation directe
      ayant pris le kit, et il n'en existe aucune de vivante au compte. À faire à la
      prochaine.
- [x] ~~**Lire le filtre `Booking Source` de 617008**~~ — vérifié le 2026-09-25, il est bien sur
      `Direct`. Aucun voyageur de canal n'a reçu le texte du direct.
- [x] ~~**Prouver que `[APISOURCE]` rend un nombre**~~ — fait le 2026-09-25 sur 92207584 —
      `19`, et les deux seuils branchent correctement. Voir la sonde plus haut.
- [x] ~~**Confirmer le rendu côté Airbnb**~~ — fait le 2026-09-25 sur 92390158 — `46`, `AIRBNB`,
      `CANAL`. Les deux branches du seuil `30` sont désormais prouvées.
- [ ] **Supprimer l'Auto Action `ZZ TEST APISOURCE`.** Elle est en envoi interne, donc muette —
      c'est exactement pourquoi on l'oublie.
- [ ] **Vérifier ce que la messagerie Booking.com laisse passer.** Elle filtre les liens
      externes, or le message en porte trois — guide, plan Maps, site — plus WhatsApp. Un
      voyageur avec e-mail réel reçoit l'e-mail et garde les liens ; un e-mail masqué bascule
      sur l'API du canal, où ils peuvent sauter. Si c'est le cas, reformuler pour que la perte
      d'un lien ne rende pas la phrase incompréhensible.
- [ ] **Relire le rendu Airbnb** : le message doit renvoyer au centre de résolution, jamais à un
      lien de paiement externe.
- [ ] **Revoir le seuil `30` avant d'ouvrir un troisième canal.** Expedia ou Vrbo tomberait dans
      la branche Booking.com et promettrait du linge inclus non payé.
- [ ] **Trancher le modèle par défaut.** Trois des quatre réservations vivantes portent un
      `lang` hors des cinq langues — `ru` pour l'Airbnb de janvier 2027, vide pour deux
      Booking.com. Vérifier sur quel modèle Beds24 se rabat, et préférer l'anglais au français
      pour un voyageur dont on ne sait rien. C'est plus urgent que les traductions elles-mêmes.
- [ ] **Confirmer les quatre autres étiquettes de langue dans l'interface Beds24.** « German »
      est observé ; French, English, Spanish et Italian sont déduits.
- [ ] Faire relire les quatre traductions par un locuteur du marché avant la haute saison.
      Elles sont écrites depuis le français : le corps tient la route, mais une tournure
      correcte et non idiomatique ne se voit pas de l'intérieur.
- [ ] **Message J-7 — avant-arrivée.** Lien vers le guide d'arrivée, demande de l'heure
      d'arrivée, rappel des tailles de linge pour qui n'a pas pris le kit. À rédiger.
- [ ] **Message jour J — code d'accès.** ⚠️ **Son texte ne sera pas versionné ici** : il porte
      le code de la boîte à clés, et le repo est public. Seule sa structure peut l'être.
- [ ] Message de départ, et demande d'avis.
- [ ] Décider si le code de la boîte à clés tourne à chaque saison (voir « La séquence des
      trois messages »).

# Albiez — site vitrine

Site vitrine de l'appartement de montagne d'Albiez-Montrond (Savoie).
Projet **distinct** de `coliving-barbusse` : autre bien, autre entité juridique (SCI),
autre domaine, autre déploiement Vercel.

## Stack

Next.js 16.1.6 (App Router, Turbopack) · TypeScript · Tailwind CSS v4 · npm

```bash
npm run dev     # développement
npm run build   # build de production
npm run lint    # ESLint
```

## Domaine

`albiez-aiguilles.fr`, acheté le 2026-08-07.

Le site se sert de la forme **`www.`** — c'est la valeur de `SITE_URL` (`lib/property.ts`),
donc celle qui figure dans les canonical, les hreflang, le sitemap et l'Open Graph.
L'apex doit **rediriger vers `www`**, jamais l'inverse : servir les deux revient à publier
deux fois le même site.

Une seule ligne à changer si le domaine bouge un jour — `SITE_URL` — et tout suit.

Registrar **OVH** (serveurs de noms `dns106.ovh.net` / `ns106.ovh.net`). Les deux domaines
sont rattachés au projet Vercel, avec la redirection apex → www en 308 configurée côté
Vercel. Enregistrements DNS en place dans la zone OVH depuis le 2026-08-07 :

| Type | Sous-domaine | Cible |
|------|--------------|-------|
| `A` | `@` | `76.76.21.21` |
| `CNAME` | `www` | `cname.vercel-dns.com.` |
| `TXT` | `@` | `google-site-verification=rcZ_QCptLeTa0v9kL5IlYEyeN4m5ngjx1_469tXuhaY` |

**Chez OVH, la racine s'écrit `@`, et le champ Sous-domaine est obligatoire.** L'interface le
dit (« Utilisez @ pour la racine du domaine ») là où la documentation OVH en anglais écrit
« leave blank » : un champ vide garde le bouton de validation grisé. Deux heures perdues le
2026-08-31 à chercher un contournement pour une réponse écrite dans l'aide du champ.

Le `TXT` de vérification **cohabite** avec le `SPF` sur l'apex — c'est une entrée à *ajouter*,
jamais une valeur à remplacer. Écraser le `SPF` (`v=spf1 include:mx.ovh.com -all`, en rejet
strict) ferait rejeter tous les mails sortants du domaine. Le jeton n'est pas un secret : il
est public dans la zone DNS par nature.

`www` est en **CNAME** et non en `A` : Vercel sert ce nom depuis plusieurs adresses et les
fait évoluer (il renvoie aujourd'hui `76.76.21.142` et `66.33.60.66`, pas le `76.76.21.21`
de l'apex). Un `A` en dur sur `www` deviendrait un point de panne silencieux le jour où ces
adresses changent. L'apex n'a pas le choix — la norme DNS interdit un `CNAME` sur un nom qui
porte déjà `SOA`, `NS` et `MX`.

La mise en service a demandé de supprimer les vestiges du parking OVH : l'`A` de l'apex
pointait sur `213.186.33.5`, et deux `TXT` au format interne des redirections OVH traînaient
(`1|www.albiez-aiguilles.fr` sur l'apex, `3|welcome` sur `www`). Ce dernier bloquait la
création du `CNAME`, un `CNAME` ne pouvant coexister avec aucun autre enregistrement sur le
même nom. Les `MX` et le `SPF` d'OVH Mail sont à laisser intacts.

## Déploiement

Projet Vercel **`albiez-aiguilles`** (équipe `colivinglemans-progs-projects`), déployé
depuis la CLI comme Barbusse :

```bash
npx vercel deploy --prod --scope colivinglemans-progs-projects
```

⚠️ **Le `--scope` n'est pas décoratif.** Sans lui, `npx vercel --prod` répond
`{"status":"error","reason":"deploy_failed","message":"Not authorized"}` (constaté le
2026-09-01) alors que `vercel whoami`, `vercel teams ls` et `vercel project ls` passent tous
les trois : la lecture trouve l'équipe, l'écriture non. Le message ne dit rien de la portée,
d'où la fausse piste d'un token expiré.

⚠️ **Le preset de framework doit rester `nextjs`** sur le projet. Il était vide au départ,
parce que le projet a été créé par `vercel project add` et non par le flux interactif de la
CLI, qui est le seul à faire la détection. Sans lui, le build réussit, le déploiement passe
en `READY`… et **toutes les routes renvoient 404** : Vercel ne câble ni les fonctions ni le
routage Next.js. Symptôme trompeur, à connaître.

`ssoProtection` est **désactivé** : les URLs `*.vercel.app` sont publiques, ce qui permet de
tester depuis un téléphone sans se connecter à Vercel. À remettre sur
`all_except_custom_domains` une fois le domaine en service, pour éviter que Google indexe le
site deux fois (les canonical pointent déjà tous vers le domaine, le risque est faible mais
inutile).

## Beds24

Propriété **346417** (`BEDS24_PROPERTY_ID`), hébergée dans un **sub account** Beds24 dédié à
la SCI, distinct de celui de Barbusse. Un sub account est une frontière d'API : vérifié le
2026-08-07, le token de Barbusse ne retourne que sa propre propriété `303771` et répond
`401` sur `346417`. Il faut donc **un token propre à Albiez**, généré depuis le sub account
lui-même — celui de Barbusse ne sert à rien ici, quels que soient ses scopes.

| Script | Rôle |
|--------|------|
| `scripts/beds24-setup.mjs <INVITE_CODE>` | Échange un invite code contre un `refreshToken` (à faire une fois). L'invite code se génère **connecté au sub account Albiez** : *Settings → Apps & Integrations → API*, valable quelques minutes. |
| `scripts/beds24-test.mjs [propertyId]` | Test de connexion : liste les propriétés du compte, vérifie que `346417` en fait partie, puis affiche disponibilités et réservations à 90 jours. |
| `scripts/sync-reviews.mjs [--dry-run]` | Récupère les avis Airbnb via `GET /channels/airbnb/reviews` et ajoute les nouveaux à `data/reviews.json`. Voir *Avis*. |

Les scripts lisent `.env.local` (`process.loadEnvFile`) : `BEDS24_REFRESH_TOKEN` ou, à
défaut, `BEDS24_API_TOKEN`. Le **refresh token est la bonne forme** : un token longue durée
ne porte que des scopes de lecture, et celui de Barbusse a fini par être refusé en local
(`401 Token not valid`) alors que la valeur stockée sur Vercel, elle, fonctionne toujours —
un token qui traîne dans un `.env.local` dérive de celui qui est réellement en service.

La connexion est **en service depuis le 2026-08-28** : `BEDS24_REFRESH_TOKEN` est dans
`.env.local` et `scripts/beds24-test.mjs` passe. Le compte ne contient que la propriété
`346417`, avec **une seule room, `715147`** — c'est cet ID qu'attendra le calendrier, à
sortir en variable d'environnement au même titre que le property ID. L'endpoint
`/properties` renvoie `room types : aucune` alors que les disponibilités de `715147`
remontent bien : la liste des propriétés n'inclut pas les rooms par défaut, ne pas en
conclure que la propriété est vide.

⚠️ **Rien n'est encore sur Vercel** : le projet n'a aucune variable d'environnement en
production (`npx vercel env ls production`, vérifié le 2026-08-28). Ni le property ID ni le
refresh token. Sans conséquence aujourd'hui — le site n'appelle pas encore Beds24 — mais à
poser avant de brancher le calendrier.

Le property ID **n'est jamais écrit en dur** : il vient de `BEDS24_PROPERTY_ID`, pour que le
site puisse être redéployé pour un autre bien sans toucher au code.

### Rotation du samedi (hiver)

Pendant l'hiver, on ne loue qu'en semaine complète du samedi au samedi. La règle est posée
**uniquement dans Beds24**, à la main, par l'override quotidien `noCheckInOrCheckOut` du
CALENDAR sur tous les jours qui ne sont pas un samedi. De là elle part sur les trois canaux :
Booking.com (*closed to arrival / closed to departure*), Airbnb (CTA/CTD, envoyés quel que
soit le sync type) et le moteur de réservation direct.

⚠️ **Rien dans ce dépôt ne doit décrire quels jours sont fermés.** Ni une liste, ni un calcul
à partir des vacances scolaires, ni un test sur le jour de la semaine : Beds24 fait foi, et
une seconde définition divergerait dès la première exception — une semaine rouverte en
janvier, un samedi fermé pour travaux. Un script a existé une demi-journée qui calculait ces
dates depuis les vacances scolaires du socle et les écrivait par l'API : **supprimé le
2026-09-01**, le jour même où les dates réellement posées s'en sont écartées. Ne pas le
réintroduire.

**Pourquoi le calendrier et non les cases « Check-in / Check-out Allowed » d'un Fixed Price**,
qui font la même chose sur le papier : les prix d'Albiez viennent de Beyond Pricing, qui écrit
`price1` et `minStay` au calendrier. Un Fixed Price « vacances scolaires » ferait deux sources
de prix sur les mêmes dates. Par ailleurs le marquage des jours barrés sur la page de
réservation Beds24 (CSS `.datenci` / `.datenco`) ne fonctionne **que** pour des règles posées
au calendrier. Beyond ne touche jamais à `override` : les deux écritures cohabitent.

Où c'est : **CALENDAR → ligne Override → clic sur la case du premier jour**, puis la valeur et
une date de fin. Si la ligne n'apparaît pas, elle est masquée dans les réglages de lignes du
calendrier. La propagation aux canaux se fait « au prochain changement de prix ou de
disponibilité, ou au maximum sous 24 h » — pousser un *Update* dans CHANNEL MANAGER pour la
voir tout de suite. Doc :
[Dynamic Multi Calendar](https://wiki.beds24.com/index.php/Dynamic_Multi_Calendar#Override),
[aide du champ](https://wiki.beds24.com/index.php/Setting/calendar2override).

**État posé pour l'hiver 2026-27** (relevé le 2026-09-01, à titre de constat — Beds24 reste la
référence) : 20-25/12, 27/12-01/01, puis 17/01 → 12/03 en continu, samedis exceptés. Les
rotations libres tombent donc les 19/12, 26/12, 02/01, puis chaque samedi du 23/01 au 13/03.
La semaine du 02/01 n'est pas protégée : elle est déjà occupée par une réservation 05→11/01
hors rotation.

**Le site reflète ces règles, il ne les déduit pas** : `contraintes()` lit `includeOverride`
dans le même appel que le séjour minimum et renvoie `sansArrivee` / `sansDepart`, que
`/api/disponibilites` sert au calendrier de la vitrine. Aucun test sur le jour de la semaine
côté site.

Sans ça, le tunnel s'arrêtait sans expliquer pourquoi : la sélection passait, puis la page
Beds24 répondait « Pas de check-in 24 févr. » avec un prix nul. Le moteur de réservation, lui,
a toujours appliqué la règle — c'est vérifiable sans navigateur avec
`node scripts/devis-beds24.mjs 2027-02-24 2027-03-03`, qui renvoie ce `warn`.

## Frais fixes par canal

Deux emballages pour deux publics, et ce **n'est pas une incohérence à corriger**.

| | Ménage | Linge | Total fixe |
|---|---|---|---|
| **Direct / Airbnb** | 60 € | **optionnel**, 15 €/personne | 60 € + option |
| **Booking** | 40 € | **obligatoire**, 20 € serviettes + 20 € draps | 80 € |

Le raisonnement : les séjours Booking sont plus courts — **3,1 nuits de moyenne contre 4,8
tous canaux confondus** — et ce public est moins enclin à apporter son linge. D'où un forfait
tout compris, quitte à baisser la ligne ménage pour que le total reste tenable.

En direct et sur Airbnb, le séjour est plus long et le voyageur de montagne apporte souvent
ses draps : le linge y reste une option à 15 €/personne.

⚠️ Le mot « inclus » sur le site et dans les messages signifie **rien à payer en plus** de ce
qui a été réglé — pas « sans ligne au décompte ». Le ménage apparaît en ligne séparée chez
Booking et en direct, et il est fondu dans le prix à la nuit chez Airbnb. Dans les trois cas
il est déjà payé, et c'est la seule chose que le voyageur ait besoin de savoir.

## Historique des canaux (statistiques antérieures)

Le lien Airbnb → Beds24 **ne rétro-importe pas l'historique** : il synchronise les séjours en
cours et à venir au moment du branchement, rien d'autre. Vérifié le 2026-08-28, le compte
Beds24 ne contient aucune réservation, toutes dates confondues. L'antériorité vient donc d'un
**export CSV** de l'espace hôte Airbnb (« historique des transactions »), converti par
`scripts/import-airbnb-history.mjs` en `data/historique-airbnb.json`.

Le choix de l'archive plutôt que d'un backfill dans Beds24 est délibéré : le token a bien
les scopes `write:bookings`, mais **Beyond Pricing lit ce même compte**. Y injecter des
séjours reconstitués fausserait ses analytics de revenu.

⚠️ **Les fichiers de sortie sont gitignorés, et doivent le rester** : ce repo est **public**
et l'archive contient le chiffre d'affaires de la SCI ligne par ligne. Le script, lui, est
versionné — il ne contient aucune donnée. Personne ne se souvient de la raison pour laquelle
le repo a été rendu public ; il n'y a aucune contrainte technique qui l'impose, Vercel
déployant aussi bien un repo privé. Le passage en privé reste donc une option à tout moment.

**La production lit l'archive depuis une variable d'environnement** (décision du 2026-08-28,
usage strictement interne, pas d'optimisation recherchée). Le script écrit à côté du JSON une
forme compacte prête à coller :

```
node scripts/import-airbnb-history.mjs <export.csv>
# -> data/historique-airbnb.json       (lisible, pour inspection)
# -> data/historique-airbnb.env.txt    (HISTORIQUE_AIRBNB=... sur une ligne)
npx vercel env add HISTORIQUE_AIRBNB production   # coller la valeur
```

Point à surveiller le jour où le dashboard se branchera : **16,5 Ko pour Airbnb seul**. Avec
Booking, Abritel et le direct, l'ensemble approchera le budget total de variables
d'environnement d'un déploiement Vercel — à vérifier à ce moment-là, avec le repo privé ou un
stockage externe comme repli.

**L'archive ne couvre qu'Airbnb.** Il y a aussi du Booking, de l'Abritel et des réservations
directes : tant qu'ils n'y sont pas, ces chiffres ne décrivent pas l'activité et **aucune
statistique ne doit être présentée comme telle**. Chaque canal aura son propre export et son
propre importeur (`data/historique-<canal>.json`, champ `canal` déjà présent dans chaque
entrée) ; le dashboard les fusionnera. À partir de maintenant, le direct et les canaux
connectés passent par Beds24, donc l'archive ne concerne que l'antérieur.

Trois pièges du format Airbnb, tous traités par le script :

| Piège | Détail |
|-------|--------|
| **Ordre inverse** | L'export est chronologique inverse : pour cinq séjours sur sept, la ligne « Versement de résolution » **précède** la « Réservation » du même code. Fusionner dans l'entrée existante, jamais l'écraser. |
| **Deux conventions décimales** | `Revenus bruts` utilise le point (`329.10`), `Frais de service` la virgule (`"61,21"`), dans le même fichier. |
| **Lignes `Payout`** | Ce sont des virements bancaires, pas du revenu : les compter revient à doubler le chiffre d'affaires. Elles servent uniquement de **contrôle de réconciliation** — la somme des nets doit retomber exactement sur le total versé, sinon le script sort en erreur. |

**Le changement de modèle de commission Airbnb rend les revenus bruts non comparables d'une
année sur l'autre.** Jusqu'au 2024-03-09, les frais de service sont à **3,6 %** (modèle
partagé : le voyageur paie sa propre commission, invisible dans l'export). À partir du
2024-03-22, ils passent à **18 %** (modèle *host-only* : tout est refacturé à l'hôte, donc
le brut inclut désormais ce que payait le voyageur). Sur les statistiques, **c'est le net
qui fait une série comparable**, pas le brut.

Enfin, **2023 n'est pas une année** : l'export commence au 2023-12-25 et ne contient qu'un
séjour. À ne pas afficher comme un exercice complet à côté de 2024 et 2025.

### Booking.com

Relevés « statements » exportés par année depuis l'extranet, convertis par
`scripts/import-booking-history.mjs` en `data/historique-booking.json`. **38 séjours de
novembre 2023 à août 2026** au 2026-08-28.

Le format diffère d'Airbnb sur quatre points qui comptent :

| Point | Détail |
|-------|--------|
| **Dates en anglais** | « Jan 26, 2026 ». Le script refuse un export dans une autre langue plutôt que de deviner. |
| **Pas de colonne « nuits »** | Calculées entre `Check-in` et `Checkout`. |
| **Plusieurs lignes par réservation** | Un ajustement de commission après coup ajoute une ligne au même numéro (vu une fois : `5755448864`). Il faut **cumuler**, jamais remplacer. |
| **Ni ménage ni taxe de séjour** | Booking n'isole aucun des deux dans ce relevé. Les champs restent **nuls**, ce qui ne veut pas dire zéro : la taxe de séjour d'Albiez n'est pas collectée par ce canal, contrairement à Airbnb. |

La commission est stable autour de **17 %** sur toute la période, frais de paiement compris —
donc comparable d'une année sur l'autre, contrairement au brut Airbnb.

⚠️ **Dédoublonnage obligatoire avec Beds24.** Depuis le branchement du 2026-08-28, Booking
alimente Beds24 en direct : deux séjours à venir y sont déjà (`6869539179` du 21 au 25 octobre,
`5880924522` du 2 au 4 septembre). Un séjour non terminé présent dans les deux sources se
compterait deux fois — le script marque ces entrées `aussiDansBeds24: true`, et le dashboard
doit dédoublonner sur le numéro de réservation. Les relevés fournis s'arrêtant au 2026-08-28,
aucun des deux n'y figure pour l'instant.

### Abritel

**Trois séjours en tout** (février 2024, mai 2025, février 2026), et le canal est **arrêté en
août 2026**. Abritel ne propose aucun export machine exploitable : l'espace propriétaire donne
un tableau à l'écran, sans colonne de dates d'arrivée ni de départ — seulement une « Date », un
nombre de nuits, un brut, des déductions et un paiement.

L'archive `data/historique-abritel.json` est donc **saisie à la main**, au même format que les
deux autres. Il n'y a délibérément **pas de script d'import** : trois lignes ne justifient pas
un parseur, et surtout un script versionné dans un repo public ne peut pas contenir ces
montants.

La colonne « Date » de l'espace propriétaire est **la date d'arrivée** — déduit, pas supposé :
voir le contrôle croisé ci-dessous. Les déductions représentent **9,6 à 9,8 %** du brut sur les
trois séjours, soit près de moitié moins que la commission Booking.

### Direct (Stripe)

Compte Stripe **propre à la SCI**, distinct de celui de Barbusse — pas de question
d'attribution. Export « Détail de l'évolution du solde selon l'activité » du Dashboard
(section *Évolution du solde selon l'activité* → **Télécharger** → **Détaillé**), converti par
`scripts/import-direct-history.mjs`. Une seule plage couvrant toute la période suffit : le
découpage mensuel se fait à l'import.

⚠️ **Ce compte n'est pas « le canal direct ».** Il porte deux natures de recettes, et les
confondre fait compter des nuits deux fois :

| `nature` | Ce que c'est | Nuits |
|----------|--------------|-------|
| `direct` | Vraie réservation directe. | À compter. |
| `supplement` | Kit drap/serviette facturé à part à un voyageur venu d'Airbnb ou de Booking — pratique confirmée par l'utilisateur, longtemps systématique côté Airbnb. Recette réelle et absente des relevés du canal. | **Aucune** : le séjour est déjà compté dans le canal d'origine. |
| `a_verifier` | Des nuits facturées à un nom déjà vu sur un autre canal. Prolongation du séjour OTA, ou second séjour en direct du même voyageur ? Indécidable sans la mémoire de l'utilisateur. | À trancher. |

Le tri se fait en rapprochant `customer_name` des noms de voyageurs des autres exports, passés
en argument (`--airbnb`, `--booking`, `--abritel`). Les noms ne servent qu'au rapprochement en
mémoire : **rien n'est écrit en sortie**. Quatre encaissements restent en `a_verifier`
(2024-03-29, 2024-06-03, 2024-08-01, 2025-11-22).

Deux pièges de plus :

- **La catégorie `fee`** de l'export n'est pas un frais par transaction mais l'abonnement
  Stripe Invoicing (−16,37 € sur trois ans). C'est un coût du canal, jamais une recette : elle
  est exclue du brut et sortie à part dans `fraisAbonnementInvoicing`.
- **La date est celle de l'encaissement, pas du séjour.** Les dates de séjour ne viennent que
  du libellé du produit quand il en porte (« Séjour du 30 avril au 16 mai 2026 »). L'année
  manque parfois : elle est déduite de l'année d'encaissement et l'entrée est marquée
  `anneeDeduite`.

**Les frais Stripe ressortent à 1,92 %** du brut. C'est de très loin le canal le moins cher :
Abritel 9,7 %, Booking 17 %, Airbnb 18 %.

### La location longue de 2026 n'était dans aucun autre canal

Quatre factures à un même client italien, du **20 avril au 14 juin 2026**, **3 135 € brut** pour
**~55 nuits** en continu, facturées par quinzaines. Rien de tout cela n'apparaît dans Airbnb,
Booking ou Abritel : **toute statistique bâtie sans Stripe rate ce bloc**, et avec lui la
moitié du printemps 2026.

Le contrôle croisé le valide de façon nette : le bloc s'emboîte exactement entre un séjour
Booking qui finit le 20 avril et un autre qui commence le 15 juin.

Une seule anomalie, interne aux libellés : « du 16 mai au 30 mai » puis « du 29 mai au 14 juin »
se chevauchent d'un jour. La somme des nuits facturées fait 56 pour un bloc réel de 55 —
**coquille dans une des deux factures**, à trancher avant de figer le compte de nuits.

### Contrôle croisé entre canaux

Un séjour ne peut pas chevaucher un autre dans un logement unique : c'est le contrôle le plus
efficace sur la cohérence de plusieurs archives. Passé sur les **101 séjours des quatre canaux**,
il ne remonte **aucun chevauchement**. Ça confirme au passage que les relevés Booking décrivent
bien Albiez — leur export ne contient aucune colonne de logement.

C'est aussi ce contrôle qui a **établi** que la « Date » d'Abritel est la date d'arrivée. Lu
comme tel, `HA-GL20F9` (21→28 février 2026) s'insère exactement entre un séjour Airbnb qui finit
le 21 et un autre qui commence le 28 : trois séjours bout à bout, sans un jour de trou ni de
recouvrement. `HA-BN8XHJ` enchaîne de la même façon derrière un Airbnb qui finit le 4 février
2024. Aucune autre lecture de cette colonne ne produirait cet emboîtement.

C'est ce contrôle qui a révélé une entrée fantôme côté Airbnb : `HMY3AKKDE2`, un paiement de
résolution de 30 € sans ligne « Réservation », dont les dates de repli (13→21 juillet 2026)
chevauchaient deux autres séjours. Une **annulation** dont seuls des frais ont été encaissés :
les dates ont été relouées. Le montant est conservé, les nuits ne sont plus comptées — sans
quoi 2026 affichait 8 nuits vendues qui n'existent pas.

## Beds24 — trois tokens, et le piège de l'invite code

Un jeton par **chemin**, pas par verbe. Rotation complète le 2026-09-11 : l'ancien jeton
unique portait dix scopes, dont `write:bookings-personal`, `write:bookings-financial` et
`read:channels` que rien n'utilisait.

| Variable | `deviceName` | Scopes | Sert à |
|---|---|---|---|
| `BEDS24_PUBLIC_REFRESH_TOKEN` | `albiez-public-2026-09` | `read:inventory`, `read:properties` | `/api/disponibilites`, vitrine |
| `BEDS24_READ_REFRESH_TOKEN` | `albiez-lecture-2026-09` | + `read:bookings`, `read:bookings-financial` | dashboard |
| `BEDS24_REFRESH_TOKEN` | `albiez-ecriture-2026-09` | `read:bookings`, `write:bookings` | consignes de ménage |

Les trois sont des **refresh tokens**, aucun long life. Vérifié contre l'API, pas supposé : le
jeton public reçoit `401` sur `/bookings`, celui d'écriture ne voit ni `price`, ni
`commission`, ni `invoiceItems`.

**Aucun `read:bookings-personal`** — ce site ne lit aucun nom ni contact. C'est ce qui le
distingue de Barbusse, qui en a besoin pour ses factures. Le `Booking` du socle a bien des
champs pour ça, tous **optionnels** et précisément pour cette raison : ils restent vides ici,
et aucun calcul du socle ne doit en dépendre.

Les deux scopes d'inventaire sur le jeton de lecture ne sont pas un oubli : ils font vivre le
repli du chemin public. **Ce repli va vers la lecture, jamais vers l'écriture** — le point
d'entrée le plus exposé du site ne doit à aucun moment, même dégradé, tenir un jeton capable
d'écrire.

### Le transport vient du socle

`lib/beds24.ts` ne fait plus d'HTTP : l'échange des jetons, le cache d'access tokens, les
replis, l'écriture de note et la réexpansion des tranches de calendrier vivent dans
`createBeds24Client` (`@sejour/socle/lib/beds24-client`). Ne restent ici que les **noms des
variables d'environnement**, la traduction vers `Sejour`, et `contraintes()`, le seul calcul
qui n'appartienne encore qu'à ce bien — `surcollecteTaxe()` est parti au socle au Lot 4.

Les replis sont **deux champs distincts et non un drapeau**. `whenMissing` dit quoi faire
quand la variable n'est pas définie — une configuration incomplète, connue d'avance ;
`whenRefused` dit quoi faire quand le jeton est refusé. La voie de lecture a le premier
(repli sur l'écriture en développement local) mais **pas le second** : reprendre un 401 avec
le jeton d'écriture rendrait les séjours sans leurs montants, et le dashboard afficherait des
zéros au lieu d'une erreur.

Les tranches `[from, to]` de Beds24 se réexpansent par `expandSpans`, en **UTC**. Les quatre
copies qu'avaient les deux sites n'étaient pas d'accord entre elles : deux d'entre elles
faisaient `new Date(jour + "T00:00:00")` puis `toISOString()`, ce qui décale d'un jour vers le
passé pendant les huit mois d'heure d'été. Ce site ne l'avait pas, Barbusse si.

### Le cron de veille des événements

`/api/cron/events-watch`, en-tête `Authorization: Bearer $CRON_SECRET`, planifié
**hebdomadairement sur cron-job.org** (le lundi matin). Il rappelle d'aller vérifier les dates
d'événements qui ne sont pas encore officielles — six des sept entrées de `lib/events.ts` sont
des projections calées sur l'édition précédente, à reprendre auprès des organisateurs et de
l'office de tourisme quand les programmes sortent, au printemps.

Les règles sont dans `@sejour/socle/lib/events-watch` ; ce site n'en tient que les seuils,
`EVENTS_WATCH` à côté du catalogue : une projection à moins de **90 jours** est signalée (à
120, Le Charoc sonnerait dès février, avant que les programmes existent) ; le catalogue de
l'année en préparation doit compter au moins **5 entrées** — l'année suivante dès le
**1er septembre**, l'été passé et les éditions écoulées retirées, l'année en cours avant, donc
toute l'année ; de **mars à mai**, la fenêtre rappelle qui appeler.

**Sans état** : la même alerte revient chaque lundi tant que le catalogue n'est pas mis à jour,
et s'éteint seule ensuite. Pas de coupe-circuit — la façon d'arrêter une alerte est de faire ce
qu'elle demande. `?dry=1` rend les alertes sans rien envoyer, et `&today=YYYY-MM-DD` permet
alors de les lire à une autre date — la veille se tait des mois d'affilée, c'est le seul moyen
de la voir parler avant l'heure.

Envoi par **ntfy** (`NTFY_TOPIC`, URL complète du topic — le nom du topic est le secret),
priorité basse, titre « Veille événements — Albiez ». Un `NTFY_TOPIC` absent vaut un **500**
et non un envoi ignoré : une veille qui se tait ressemble exactement à une veille qui n'a rien
à dire, et c'est la notification d'échec de cron-job.org qui prévient.

### Le cron keepalive

`/api/cron/beds24-keepalive`, en-tête `Authorization: Bearer $CRON_SECRET`, planifié
**hebdomadairement sur cron-job.org**. Il force l'échange des trois refresh tokens hors cache.

Beds24 invalide un refresh token inutilisé depuis 30 jours, et aucun des trois ne s'entretient
seul : l'écriture ne sert qu'aux consignes de ménage, le dashboard n'est ouvert que par
intermittence, le trafic de la vitrine est encore faible. Le site a perdu ses disponibilités le
2026-09-11 pendant une rotation — symptôme : un calendrier qui affiche « aucune disponibilité »
sans que rien d'autre ne paraisse cassé.

Deux des trois morts seraient **silencieuses** : le repli prendrait le relais et le tunnel
continuerait de fonctionner en ayant reperdu la séparation des privilèges. Pas d'alerte e-mail
ici — ce site n'a pas de service d'envoi, la route renvoie 500 et c'est la notification d'échec
de cron-job.org qui prévient.

⚠️ **Un invite code n'est pas un refresh token**, et la confusion coûte cher — elle a brûlé
trois codes le 2026-08-31. Présenté à `/authentication/token` avec l'en-tête `refreshToken:`,
Beds24 accepte un invite code **une seule fois** et renvoie un access token parfaitement
valide, scopes corrects et tout. Le vrai refresh token est créé silencieusement au passage,
et **sa valeur n'est jamais affichée** — elle est perdue. Le deuxième appel répond alors
`401 Token not valid`, et on conclut à tort que le token a été révoqué.

Seul **`/authentication/setup` avec l'en-tête `code:`** retourne le refresh token en clair.
C'est ce que fait `scripts/beds24-setup.mjs <INVITE_CODE> [deviceName]`, et c'est la seule
façon de le capturer.

Symptôme qui doit mettre la puce à l'oreille : la valeur qu'on manipule ne correspond pas au
préfixe affiché dans la liste des Refresh Tokens de Beds24.

**L'expiration glisse.** Un refresh token dure 30 jours, mais l'échéance est repoussée à
chaque usage — le token d'écriture, créé le 28/08 à 15:50, expirait le 30/09 à 19:58, l'heure
de son dernier appel. Un token que le site interroge en continu ne s'éteint donc jamais. C'est
ce qui l'emporte sur le long life token, dont les 90 jours sont fermes et imposeraient un
renouvellement manuel, potentiellement en pleine saison.

**Repli en cas de révocation** : sur 401, les lectures publiques refont l'appel avec le token
d'écriture, en journalisant quoi régénérer. On perd la séparation des privilèges le temps de
réagir, ce qui vaut mieux qu'un tunnel de réservation éteint sans prévenir.

## Réservation directe (vitrine)

> **Lot 5 — le calendrier public vient du socle.** Le composant est monté dans
> `@sejour/socle/components/ReservationCalendar` : il était à 80 % identique à celui du Mans,
> et l'en-tête de ce fichier le disait déjà — « porté de celui du Mans ». Huit états de case,
> table de styles, sélection arrivée/départ, séjour minimum, refetch au retour d'onglet,
> modale Beds24 : tout est là-bas. `components/public/CalendrierReservation.tsx` ne garde que
> l'identifiant Beds24, la capacité, la route `/api/disponibilites` et **la bande de saison de
> ski** (`dayOverlayClass` + `overlayLegend`, qui reçoit la fenêtre affichée pour étiqueter le
> bon hiver). La **rotation du samedi** n'est pas un paramètre : `sansArrivee` / `sansDepart`
> arrivent dans la réponse de l'API, et un site qui n'en envoie pas ne voit rien changer. Le
> moteur de sélection est en plus **sorti du composant** vers `@sejour/socle/lib/stay-selection`
> — il se teste désormais sans navigateur, sur une vraie réponse Beds24.

`components/public/BookingSection.tsx` rend `CalendrierReservation`, qui interroge Beds24 en
direct et ouvre son tunnel de paiement dans une modale. Le site **ne fait que choisir des
dates** : prix, remise directe et encaissement vivent sur la page Beds24. Aucun tarif n'est
écrit dans le code — la tarification bouge tous les jours sous Beyond Pricing, un prix recopié
serait faux le lendemain.

L'enjeu est la marge : **1,92 % de frais Stripe en direct contre 17 % chez Booking et 18 %
chez Airbnb**. Le bouton Airbnb reste sur la page mais en style secondaire — le laisser en
« primary » à côté du calendrier mettrait en concurrence visuelle un canal à 18 % avec un
canal à 2 %.

### Les séjours minimums viennent de Beyond Pricing

⚠️ Le `minStay` de la room vaut `1` et **ne veut rien dire**. La vraie contrainte est poussée
date par date au calendrier : relevé le 2026-08-29, **2 nuits en général et 6 nuits sur les
fêtes de fin d'année**. `sejourMinimum()` la lit via `includeMinStay`, et le calendrier la
respecte — sans quoi il laisserait composer des séjours que le tunnel refuserait ensuite.

### Un token de lecture seule pour le public

`BEDS24_PUBLIC_TOKEN` — long life token **read-only** (`read:inventory`, `read:properties`),
créé dans *Beds24 → Settings → Account → API*. `BEDS24_REFRESH_TOKEN` porte `write:bookings` :
le faire servir une route ouverte à tous donnerait à du trafic anonyme un jeton capable
d'écrire dans les réservations.

Tant que la variable n'existe pas, le code retombe sur le token d'écriture **et le signale
dans les logs**, pour que le développement local ne soit pas bloqué. La production doit
l'avoir.

### `/api/disponibilites` — publique

Hors du `matcher` du proxy, qui ne couvre que `/` et `/dashboard/:path*`. Elle ne renvoie que
des **dates, des booléens et des durées minimales** : aucun montant, aucun nom, aucune
référence de réservation. Plage plafonnée à 400 jours, garde-fou sur une route ouverte.

### Ce qui reste à faire côté Beds24

⚠️ **Le sélecteur de langue de la booking page propose English, Español, Français, Italiano,
Nederlands.** L'allemand y manque, le néerlandais y est pour rien — le site n'a pas de version
néerlandaise. `lang=de` retombe donc en anglais, et un visiteur allemand traverse cinq pages
dans sa langue avant d'atterrir sur un tunnel en anglais.

Correctif : *Settings → Properties → Booking Page → Languages*, **remplacer Nederlands par
Deutsch**. La page de Barbusse le fait déjà — ce n'est pas une limite de la plateforme.
Vérification : `lang=de` doit rendre « Nächte » et non « Nights ».

**Ne pas déployer avant ce correctif.**

### Fermetures volontaires

Noël, le Jour de l'An et les vacances de février sont fermés — potentiellement gardés pour un
usage personnel. Le calendrier les affiche donc barrés, ce qui est correct. Les rouvrir dans
Beds24 suffit à les faire réapparaître, sans toucher au code.

## Tarification du tunnel direct — ce que la page affiche vraiment

Vérifié le 2026-08-31, en comparant un devis direct à son équivalent Airbnb (7 nuits,
12→19 décembre 2026). Trois choses se sont révélées, dont une fuite de recette.

**Deux outils pour ne plus tester à l'aveugle.** La page mémorise ses réponses dans
`sessionStorage` sous une clé qui contient les dates *et* les voyageurs (`storeroomprice()`).
Le cache meurt avec l'onglet, donc **aucun voyageur n'est concerné** — mais il frappe celui
qui teste, puisque tester consiste à reposer la même question après avoir changé un réglage.
Les en-têtes HTTP sont propres (`no-store` sur `booking2.php` et `getroomprice.php`).

- `node scripts/devis-beds24.mjs <arrivée> <départ>` — le total réel de la page 1 pour six
  occupations, sans navigateur. Il interroge `api/ajax/getroomprice.php`, l'endpoint qu'appelle
  le JS de `booking2.php`.
- `node scripts/verifie-selecteur-enfants.mjs` — vérifie que la page rend un sélecteur
  d'enfants. Le devis ne suffit pas : l'endpoint honore `nc=2` même quand la page ne sait pas
  le saisir.

### `maxChildren` doit rester renseigné, sinon le tunnel ne facture pas les enfants

**Corrigé le 2026-08-31** — `maxChildren: 5` sur la chambre 715147, `maxPeople: 6` inchangé.
Consigné parce que le symptôme est silencieux et que le réglage est facile à perdre.

Tant que `maxChildren` valait `null`, la page de réservation ne rendait qu'un seul sélecteur,
« Personnes » (`id="inputnumadult"`), et **jetait le `numchild`** que `CalendrierReservation.tsx`
lui passe pourtant : son JS lit `$("#inputnumchild").val()` sur un élément qui n'existait pas.
Une famille de 4 adultes + 2 enfants était devisée au tarif 4 personnes — **68,68 € perdus**
sur 7 nuits de novembre (374,95 € au lieu de 443,63 €). Les autres canaux n'étaient pas
touchés : Airbnb facture bien son supplément.

Rien à faire côté code : `numchild` était déjà envoyé, c'est Beds24 qui l'ignorait. Et surtout
**ne pas** « contourner » en envoyant `numadult = adultes + enfants` depuis le site — le prix
serait identique (`extraPerson` et `extraChild` valent tous deux 5), mais Beds24 enregistrerait
6 adultes et on perdrait le nombre de mineurs, l'information même qui sert à corriger la taxe
de séjour et à déclarer à la 3CMA. Le dashboard lit `numAdult`/`numChild`.

`maxPeople` reste le plafond global : 3 adultes + 4 enfants sont refusés (« Capacité maximale
dépassée »), il n'y a donc pas de risque à ouvrir large sur `maxChildren`.

⚠️ `maxAdult` laissé à `null` fait apparaître **`0` dans le sélecteur adultes**, et un devis à
0 adulte + 4 enfants est accepté. Le prix reste juste, mais une réservation pourrait
s'enregistrer sans adulte, et la taxe de séjour serait prélevée sur un séjour dont tous les
occupants sont exonérés. Renseigner **Max Adults = 6** referme ça.

### La taxe de séjour n'exonère pas les mineurs

L'article 5 du barème 3CMA : sans classement, le tarif est **5 % du coût par personne et par
nuitée**, hors taxes, et les mineurs sont exonérés de plein droit. Le forfait de 2,20 € par
adulte qui traînait initialement était faux sur la méthode *et* absent du barème.

L'item est désormais `{type: "obligatoryPercentTax", amount: 5.5, per: "adult", period:
"daily"}` — 5 % plus 10 % de part départementale. La base est juste : hébergement **remisé**,
**hors ménage**. Mais **`per: "adult"` reste sans effet** : `4 adultes + 1 enfant` donne
exactement `5 adultes`, et `4 adultes + 2 enfants` exactement `6 adultes`, au centime.

**Confirmé par le support Beds24 le 2026-09-01** (ticket ouvert la veille) : les items en
pourcentage se calculent *par réservation ou par chambre uniquement*, `per: "adult"` n'est
honoré que par les items à montant fixe, et **aucune configuration ne permet d'exonérer les
mineurs d'une taxe en pourcentage**. Ce n'est donc pas un réglage à trouver : la correction
manuelle est une **routine permanente**, pas une mesure d'attente. Le support a transmis une
demande d'évolution, l'exonération étant une obligation légale française.

L'argument qui a fait passer le ticket de « demande de fonctionnalité » à « défaut » : le
même champ `per: "adult"` fonctionne avec le type forfaitaire — l'ancien réglage
`obligatoryTax` à 2,20 € facturait 61,60 € sur 7 nuits pour 4 adultes + 2 enfants, soit
`2,20 × 4 adultes × 7`, les mineurs bien ignorés.

**La surcollecte ne concerne que le canal direct.** Vérifié sur les réservations vivantes :
`tax` vaut `0` sur les séjours Airbnb et Booking, dont les factures ne portent aucune ligne de
taxe de séjour. Airbnb la collecte et la reverse lui-même, correctement (méthode
proportionnelle, mineurs exonérés). Pour Booking, elle n'apparaît nulle part — à clarifier.

La routine : corriger à la main la ligne de taxe sur les réservations **directes** avec
mineurs, et **reverser à la 3CMA l'intégralité du collecté**. Surcollecter et tout reverser est une irrégularité mineure ;
garder la différence serait autre chose. Surtout, ne pas abaisser le taux pour compenser en
moyenne — ce serait sous-déclarer sur tous les séjours d'adultes. Formule de l'écart :
`5,5 % × hébergement remisé × (enfants ÷ occupants)`.

### Deux réglages d'affichage, souvent confondus

Le total de la page 1 et les prix de la grille de dates sont pilotés séparément :

| Réglage | Ce qu'il gouverne | Valeur |
|---|---|---|
| `Total Price Style` | le **total** | `Total including obligatory` |
| `Style of Date Prices` | les prix **par nuit** de la grille | `Per Room`, tarifs bruts |

La grille continuera donc d'afficher les tarifs bruts — c'est normal, Airbnb fait pareil, et
c'est ce qui explique le 409 € qu'on croyait figé alors que le total annonçait déjà 461,29 €.
`scripts/devis-beds24.mjs` affiche les deux côte à côte pour cette raison.

## Dashboard privé (`/dashboard`)

Espace interne, **hors de `[locale]`** : en français seulement, jamais indexé. Deux pages —
statistiques et calendrier — protégées par un mot de passe unique et un JWT en cookie.
La mécanique vit désormais dans `@sejour/socle/lib/auth` (voir sa CLAUDE.md, section
« Lot 1 ») ; `lib/auth.ts` n'en garde que la configuration : les rôles, le repli et les
préfixes de mots de passe.

### La navigation vient du socle

`components/dashboard/DashboardNav.tsx` ne contient plus que **des données** : le nom du bien,
la liste des écrans et le lien de retour à la vitrine. La structure — liens filtrés par rôle,
tiroir mobile translaté hors écran, blocage du défilement du corps, déconnexion — vit dans
`@sejour/socle/components/DashboardNav`. Les deux sites en avaient chacun 213 lignes, de même
structure ligne pour ligne depuis que celui d'ici a convergé.

Le lien « Retour au site » porte son propre `adminOnly` : il reste **visible au rôle restreint
ici**, la personne du ménage y trouvant l'adresse et l'accès au logement, là où Barbusse le
réserve à l'administrateur.

### Deux layouts racines

`app/(site)/[locale]/layout.tsx` et `app/(dashboard)/layout.tsx` écrivent chacun leur
`<html lang>`. Next n'accepte plusieurs layouts racines que si **chacun vit dans un groupe de
routes** — c'est la raison du déplacement de `app/[locale]` vers `app/(site)/[locale]`. Les
parenthèses n'apparaissent pas dans les URLs, `/fr` et `/dashboard` sont inchangés.

### `Booking` du socle, et non `Beds24Booking`

Le type canonique est **`Booking` (`@sejour/socle/lib/booking`)** depuis le Lot 2 : les deux
sources s'y ramènent, l'archive comme le live. C'est le modèle d'ici qui est monté au socle —
Barbusse faisait l'inverse et donnait à son archive la forme `Beds24Booking` ; impossible ici,
nos séjours archivés n'ayant ni `id` numérique, ni `propertyId`, ni nom de voyageur. Les
inventer pour satisfaire un type serait fabriquer des données. Barbusse a migré.

`Sejour` (`lib/dashboard-types.ts`) n'est plus qu'un `Booking` **plus quatre champs** que ce
bien est seul à porter : `surcollecteTaxe`, `fraisMenage`, `taxeSejourCollecteeParLeCanal`,
`anneeDeduite`.

Les noms de champs sont ceux du socle — anglais technique : `arrival`, `departure`, `nights`,
`gross`, `net`, `commission`, `channel`, `bookedAt`, `guests`, `id`, `source`. Le `source`
vaut `"live"` ou `"archive"` (l'ancien `"beds24"` a disparu). Les champs d'identité du
voyageur (`firstName`, `email`, `phone`, `country`…) existent sur `Booking` mais **restent
vides ici** : ce site ne porte pas le scope `read:bookings-personal`, et rien ne doit pousser
à le réclamer pour les remplir.

Le **fichier** d'archive, lui, garde ses clés françaises (`arrivee`, `depart`, `brut`,
`canal`…) : c'est un export figé, le renommer obligerait à régénérer l'archive et à repousser
`HISTORIQUE_ALBIEZ` sur Vercel pour un gain nul. `lib/archive.ts` traduit au chargement — la
même frontière que celle qui sépare `Beds24Booking` de `Booking`, décrite par le type
`SejourArchive`.

### La série de référence est le net, pas le brut

Les frais de service Airbnb passent de 3,6 % à 18 % entre le 9 et le 22 mars 2024. Le brut
change donc de définition au milieu de l'historique : une courbe de brut sur quatre ans
affiche une croissance qui n'existe pas. Le brut et les commissions restent visibles dans les
cartes, mais **ne servent jamais à comparer les années**.

La commission des séjours vivants vient du champ `commission` de `/bookings`, que l'API
renseigne bel et bien — 94,86 € sur 510 € chez Airbnb, 61,95 € sur 336,70 € chez Booking,
soit 18,4 à 18,6 %. Elle valait `0` jusqu'au 2026-09-01, sur la foi d'un commentaire affirmant
`invoiceItems` inexploitables : le net des réservations vivantes était donc surestimé
d'environ 18 %. `commissions` dans les statistiques se déduit de `brut − net` et s'est
corrigé tout seul.

Reliquat assumé : en direct, `commission` vaut 0 et les 1,92 % de Stripe n'y figurent pas. On
ne les modélise pas — ils sont connus exactement dans Stripe, et une constante dans le code
deviendrait fausse au premier changement de tarif.

### La surcollecte de taxe de séjour est calculée, pas à recalculer

**Le calcul vient du socle depuis le Lot 4** : `ecartDeCollecte`
(`@sejour/socle/lib/taxe-sejour`). Ce n'était pas un doublon du moteur de taxe de séjour de
l'autre site — c'était une règle que ce moteur n'avait pas, l'exonération des mineurs au
titre de l'article L.2333-31 du CGCT. Les deux ont fusionné dans le même module, et aucune
n'a disparu : `computeTaxeSejour` répond à *combien est dû* depuis un barème communal,
`ecartDeCollecte` à *combien a été collecté en trop* depuis la ligne de facture. La seconde
ne demande **aucune configuration**, ce qui est la raison pour laquelle ce site peut
l'utiliser sans être branché sur le reste du réglementaire — il n'a ni facture, ni
déclaration de taxe, ni module fiscal, et sa SCI est à l'IS avec une comptabilité chez Indy.

`Sejour.surcollecteTaxe` porte `{ collectee, due, ecart }` dès qu'un séjour comporte des
mineurs **et** qu'une ligne de taxe figure sur sa facture. Le calcul est un simple ratio :
les mineurs étant exonérés et le barème assis sur le coût *par personne*, le dû vaut le
collecté rapporté à la part des adultes. Vérifié : 24,50 € pour 4 adultes + 2 enfants donne
16,33 € dus et 8,17 € de trop — les mêmes chiffres que ceux dérivés du barème 3CMA par un
chemin indépendant, et les mêmes avant et après le passage au socle.

L'écart s'affiche dans la fiche d'un séjour, sur le calendrier du dashboard : c'est l'endroit
où l'on ouvre une réservation pour agir dessus. Jamais pour le rôle `viewer`.

Deux points de fragilité, assumés :

- **La ligne de taxe se reconnaît au libellé** (`/taxe de s[eé]jour/i`) et non au `subType` :
  Beds24 range la taxe parmi les extras, au même `subType: 11` que le ménage et le linge, seul
  l'hébergement ayant un code propre (`8`). Renommer l'upsell item 3 dans Beds24 fait
  disparaître la correction de l'affichage — un silence, pas un faux montant.
- **Le chemin complet attend une première réservation directe avec mineurs.** Aucune n'existe
  encore : les séjours Airbnb et Booking ne portent pas de ligne de taxe, donc le champ vaut
  `null` partout aujourd'hui, ce qui est le bon comportement mais ne teste que la branche
  négative.

### Les calculs viennent du socle (`@sejour/socle/lib/stats`)

`lib/stats.ts` n'existe plus ici : il est monté tel quel dans le socle au Lot 3, renommé en
anglais technique. Il avait été écrit portable dès l'origine et le disait — « cette fonction
ne connaît ni Albiez, ni Beds24 : elle prend des séjours et rend des lignes » ; ce qui le
retenait n'était pas sa forme mais son entrée, et le `Booking` canonique du Lot 2 l'a levée.

| Ancien nom (ici) | Nouveau nom (socle) |
|---|---|
| `ventiler` | `spreadRevenue` |
| `nuitsDuSejour` | `stayNights` |
| `mouvements` | `revenueMovements` |
| `construireGraphe` | `buildRevenueChart` |
| `canauxParAnnee` | `channelsByYear` |
| `comparerAnnees` | `compareYears` |
| `nuitsOccupees` | `occupiedNights` |
| `repartitionCanaux` | `channelBreakdown` |
| `ajouterJours` | `addDays` (`lib/dates`, déjà là) |
| `joursEntre` | `daysBetween` (`lib/dates`, ajouté) |
| `aujourdhui` | `todayParis` (`lib/time`, déjà là) |
| `ModeRevenu` `"reparti" \| "arrivee" \| "depart" \| "reservation"` | `RevenueMode` `"averagedPerNight" \| "byCheckIn" \| "byCheckOut" \| "byBookingDate"` |

Les trois derniers helpers **existaient déjà dans le socle sous un autre nom** : `ajouterJours`
et `addDays` rendent le même jour sur les 16 434 couples testés de 2023 à 2028, changements
d'heure compris — l'un compose en UTC, l'autre en heure locale, et pour une chaîne
« YYYY-MM-DD » les deux se rejoignent toujours.

**Les valeurs des libellés affichés n'ont pas bougé** : le sélecteur dit toujours « Réparti par
nuit », seule la valeur envoyée à l'API change. Les champs des types de sortie, eux, passent en
anglais (`cumulADate` → `toDate`, `parAnnee` → `byYear`, `canal` → `channel`…) : la charge utile
de `/api/dashboard/stats` change donc de **noms de clés**, jamais de **valeurs** — vérifié sur
les seize combinaisons période × mode.

Ce qui **reste ici** : `StatsDashboard`, dont les champs gardent leur français parce que c'est
la charge utile de ce site et rien d'autre ; `RecetteSansNuits`, qui étend le `RevenueExtra` du
socle avec ce que ce bien est seul à porter ; et la traduction des recettes du fichier
d'archive (`canal` → `channel`), au même endroit et pour la même raison que celle des séjours.

### Deux jeux de données dans `/api/dashboard/stats`

| Jeu | Sert à | Filtré par la période ? |
|-----|--------|--------------------------|
| `sejours` | Cartes d'indicateurs, tableaux de séjours | **Oui** |
| `comparables` | Revenus mensuels, comparaison annuelle, répartition par canal | **Non, jamais** |

Filtrer les blocs de comparaison par la période les viderait de leur sens : comparer les
années suppose de les avoir toutes, y compris quand on regarde « l'année en cours ».

La **première année est écartée quand elle est tronquée** — 2023 ne compte que cinq semaines,
sa barre ne dirait que « l'activité n'avait pas commencé » en écrasant l'échelle. La règle se
maintient seule : on garde à partir de la première année dont le premier séjour tombe en
janvier.

Les **années à venir** portent le drapeau `aVenir` et **jamais de pourcentage**. Une seule
réservation prise dix-huit mois à l'avance affichait « −96,6 % » sur 2027 : un carnet qui
s'ouvre confronté à une année complète. Leur montant reste affiché, mais libellé « à date »
— même convention que l'année en cours dans la répartition par canal.

### Recettes sans nuits

`archive.recettes` porte du revenu réel **sans nuits** : kits drap/serviette facturés à part,
frais encaissés sur une annulation, séjours directs facturés sans dates au libellé. Elles
comptent dans le revenu et **jamais dans l'occupation**.

Les oublier des blocs de comparaison faisait disparaître le canal Direct de 2024 et 2025 alors
qu'il y avait bien encaissé, et les totaux annuels ne retombaient pas sur les indicateurs.

⚠️ **Un supplément est rattaché au canal qui a apporté le client**, pas à Stripe. Un kit
facturé à un voyageur venu d'Airbnb est du revenu Airbnb ; le compter en direct gonflerait une
part que le direct n'a pas générée. Le champ `paiementVia` garde la trace de l'encaissement.
La réconciliation de `build-archive.mjs` porte donc sur le **total**, pas par canal.

### Chargement de l'archive

`HISTORIQUE_ALBIEZ` d'abord, repli sur `data/archive-albiez.json`, sinon rien **et le
dashboard le dit** : une archive absente ressemble sinon à une année creuse. Lecture à
l'exécution et non par `import` statique — le fichier est gitignoré, un import statique ferait
échouer le build sur Vercel.

Dédoublonnage live / archive sur la **référence de réservation** (`apiReference` côté Beds24),
le live gagnant. Aucune date de coupure en dur.

Le mécanisme — filtrer comme le fait l'API, dédoublonner en laissant gagner le live — vient de
`createArchive` (`@sejour/socle/lib/archive`). Ne restent ici que les trois choses qui sont
propres à ce bien : **d'où le fichier se charge** (la cascade ci-dessus, que Barbusse n'a pas
besoin d'avoir puisque son dépôt est privé), **quelle clé dédoublonne** (`ref` et non `id`) et
**comment ses lignes se traduisent**. Les recettes sans nuits sont une seconde archive sur le
même fichier, avec `date` pour borne.

### Calendrier (`/dashboard/calendrier`)

Rendu repris du calendrier du Mans : barres continues par-dessus la grille, réparties en
lignes à l'intérieur de chaque semaine. Le fond des cases porte la saison de la station (bleu
domaine ouvert, ambre saison du lac), une rangée de barres porte les vacances scolaires par
zone et les semaines de fêtes, une autre les séjours.

**Les filets de colonnes sont une couche hors flux, pas des bordures de cases.** Une case ne
couvre que la ligne des numéros : un `border-r` posé dessus s'arrête avant les barres, et on
ne peut plus aligner la fin d'un séjour sur son jour. Les filets vivent donc dans un
`absolute inset-0 grid grid-cols-7` qui traverse toute la hauteur de la semaine. Ils ne
peuvent pas être des éléments de grille étendus sur `grid-row: 1 / -1` : le placement
automatique refuse les cellules déjà occupées et repousserait les sept cases en deuxième
ligne. Placés *avant* les barres dans le DOM, ils passent au-dessus des fonds de saison et
en dessous des séjours, donc ne coupent aucune pilule. Hiérarchie des traits :
`slate-300` pour l'en-tête des jours, `slate-200` pour la grille.

**Trois couches de barres depuis le Lot 5**, du plus large au plus précis en descendant :
vacances scolaires et fêtes, puis **les événements du secteur**, puis les séjours. Les
événements sont placés en granularité `full-day` — une course occupe ses journées entières,
là où un séjour libère le logement le matin de son départ, et une fête d'un seul jour se
réduirait à rien si on lui retirait une demi-case de chaque côté. Leur couleur est l'ambre
`#d97706` : ni l'indigo des vacances, ni le rose des fêtes, ni aucune couleur de canal — et
surtout pas le vert `#0E9F6E` du Direct, dont un teal aurait été voisin. Le catalogue est
importé (`EVENTS`) et non reçu en prop, contrairement aux périodes et aux saisons : il est
statique, il ne vient pas de l'API.

**Le moteur de placement vient du socle** (`@sejour/socle/lib/calendar-lanes`) : `placeSegments`,
`Segment`, `laneCount`, `roundedEnds`, `periodTooltip` et `PERIOD_PALETTE`. La fonction
s'appelait `placer<T>` ici et était écrite **deux fois en ligne** chez Barbusse, avec les mêmes
noms de variables ; son paramètre délicat, `demiCellules`, est devenu une granularité nommée
(`"half-day"` / `"full-day"`) — une donnée plutôt qu'un booléen.

**L'enveloppe, elle, ne monte pas.** Les fonds de saison de la station, la popup avec net,
commission et surcollecte de taxe, le bloc de partage voyageur n'ont pas d'équivalent en face,
où l'enveloppe porte des barres d'événements de circuit et des rayures « non confirmé ». Deux
composants honnêtes valent mieux qu'un composant à slots que personne ne relit.

**Une période n'est pas un séjour, et ne se dessine pas comme lui.** Les séjours sont des
pilules pleines à texte blanc ; les vacances et les fêtes sont un **libellé coloré souligné
d'un filet de 3 px**, sans aplat (`PALETTE_PERIODE` dans `Calendrier.tsx`). Les deux familles
partageaient auparavant la même grammaire — pilule saturée, texte blanc, hauteurs voisines —
et jusqu'aux teintes : le `#e11d48` des fêtes était à un cheveu de l'Airbnb `#FF385C`, le
`#6366f1` des vacances de l'Abritel `#1668E3`. Trois différences cumulées (pas d'aplat, texte
coloré, filet fin) valent mieux qu'un simple écart de teinte : la lecture tient aussi en
niveaux de gris et pour un daltonien.

Le filet remplace l'arrondi comme signal de continuation : il **se retire de 3 px du côté où
la période s'arrête vraiment** et file jusqu'au bord de la semaine quand elle continue.
`arrondis()` ne sert donc plus qu'aux séjours. Ce retrait est aussi ce qui sépare deux
périodes qui s'enchaînent dans la même semaine — sans lui, deux filets bord à bord n'en
feraient qu'un.

**Les demi-cellules sont le point délicat.** Une barre qui se termine le jour J n'occupe que
la moitié gauche de sa case, une barre qui commence le jour J que la moitié droite. Deux
séjours qui s'enchaînent le même jour partagent donc une ligne au lieu de s'empiler — ce qui
est le cas courant en pleine saison.

**Une seule bande de vacances à la fois.** Peindre une barre par ligne de données donnait
quatre barres empilées la semaine de Noël — « Noël », « Noël A », « Noël B », « Noël C » —
pour une seule information : tout le monde est en vacances. `bandesPeriodes` (`@sejour/socle/lib/periodes`)
parcourt donc le mois jour par jour, fusionne les zones d'une même période dans le libellé, et
ne coupe que là où la composition change. C'est justement ce découpage qui porte l'information,
puisque le nombre de zones en vacances mesure la pression sur la demande :

```
déc. 2025   20→26 NOËL A+B+C          27→31 JOUR DE L'AN A+B+C
févr. 2027  06→12 HIVER C   13→19 HIVER A+C   20→21 HIVER A+B+C   22→28 HIVER A+B
```

**Le week-end de bascule ne produit pas de bande.** Les vacances nationales durent seize jours
du samedi au dimanche et les zones démarrent de sept en sept : deux zones qui se relaient se
chevauchent donc *toujours* exactement deux jours, le dernier week-end de l'une étant le
premier de l'autre. Ce chevauchement ne dit pas que trois zones partent ensemble, il dit que
l'une rentre quand l'autre part — et il fabriquait une bande de deux jours coincée entre les
deux vraies (« PRINTEMPS A+B+C » les 17-18 avril 2027, entre « A+C » et « A+B »).
`fusionnerBascules` la donne à la bande suivante, qui démarre au samedi de bascule ; avec les
demi-cellules, « A+C » s'arrête à la moitié du samedi et « A+B » repart de l'autre moitié.
Sur 2025-2028 cela retire cinq bandes, toutes samedi→dimanche.

Le test est **étroit à dessein** : au plus deux jours, deux voisines contiguës de même type, et
une composition sur-ensemble *strict* des deux. Un « ASCENSION A+B+C » ou un « ÉTÉ A+B+C »
d'un seul jour — le ministère ne publie que leur date de début, d'où `finNonPubliee` — n'a pas
de voisine contiguë et n'est pas un sur-ensemble : il survit, comme il le doit. Les périodes de
la bande absorbée restent dans `sources` : le libellé simplifie, l'infobulle continue de dire
toute la vérité, zone sortante comprise.

**Les bandes se relaient en demi-journées, comme les séjours.** Une composition prend effet à
la moitié de son premier jour et cesse à la moitié du jour où elle change — d'où `demiCellules`
à `true` pour les périodes aussi, et une fin portée au **lendemain** du dernier jour de la
composition. Les 3 px de retrait du filet s'ajoutent à la demi-cellule : sans eux les deux
filets se toucheraient pile au milieu du samedi et n'en feraient qu'un, ce que l'arrondi des
pilules évite pour les séjours. `bandesPeriodes` balaie donc **la veille** de la fenêtre, seul
moyen de distinguer une bande qui commence vraiment le 1er du mois d'une bande qui continue
depuis le mois précédent (`debutReel`) — un test sur les seules dates des périodes sources rate
le cas où la composition change parce qu'une zone *sort*. Pas d'équivalent pour la fin : le
jour de transition sort de la fenêtre exactement quand la bande touche son bord droit.

La semaine du Jour de l'An tombe en plein dans les vacances de Noël : elle en hérite les zones
— ce sont bien elles qui sont en congés — et garde sa couleur de fête (rose contre l'indigo des
vacances, tous deux en filet). Le libellé compact ne dit pas de quelles périodes il est fait, donc le détail (nom
complet, zone, dates réelles, une ligne par période) se lit dans l'infobulle au survol.

### Deux rôles : `admin` et `viewer`

**`menage` s'appelle `viewer` depuis le 2026-09-11.** Le rôle ne se réduit plus au ménage —
c'est un accès en lecture, et Barbusse lui fait aussi piloter le chauffage. Le renommage rend
le socle commun aux deux sites.

| | `admin` | `viewer` |
|---|---|---|
| Statistiques | oui | **403 — vérifié deux fois** (proxy + route) |
| Montants et canaux | oui | **absents de la réponse d'API**, pas seulement de l'écran |
| Consignes de ménage | écriture | **lecture** |

Les mots de passe : `DASHBOARD_PASSWORD` pour l'admin, et **toute** variable commençant par
`DASHBOARD_PASSWORD_MENAGE` — ou `DASHBOARD_PASSWORD_VIEWER` — pour le rôle restreint, ce qui
permet d'en donner un par personne (`DASHBOARD_PASSWORD_MENAGE_Sylvie`) et d'en révoquer un
sans changer celui des autres.

⚠️ **Les deux préfixes sont acceptés, et les variables Vercel n'ont pas été renommées.**
Leur valeur de production est un `Secret` illisible après coup : un renommage raté couperait
l'accès de la personne du ménage sans moyen de le rétablir. Le code est passé à `viewer` sans
attendre ; la bascule des noms pourra se faire à froid, les deux formes marchant en même temps.

⚠️ Le filtrage est fait **côté serveur** : le proxy bloque les pages, et
`/api/dashboard/calendrier` remet les montants à zéro avant d'envoyer. Masquer côté client
laisserait les chiffres dans le navigateur.

Trois détails de la projection `viewer`, chacun pour une raison précise :

- **`ref` est synthétique** (`sejour-<arrival>-<departure>-<i>`). Sur une réservation vivante,
  `ref` vaut `apiReference` : le code de confirmation du canal. Un `HM…` dit « Airbnb » à qui
  sait lire, alors que la projection force `channel: "Direct"` — la liste blanche masquait le
  canal et la référence le dénonçait. Il ne sert que de clé React.
- **`satisfies Sejour`** sur le littéral : la forme réduite n'était contrainte par rien, un
  champ ajouté à `Sejour` demain ne serait pas signalé.
- **`beds24Erreur` est générique** (« Beds24 momentanément injoignable »). Le message d'origine
  porte le chemin interne appelé et 200 caractères de la réponse Beds24 ; il reste dans les
  logs serveur, comme le fait déjà `/api/disponibilites`.

**`/api/dashboard/stats` se défend elle-même.** Elle n'avait aucun contrôle de rôle et sa seule
protection était `proxy.ts` — or ce même matcher a manqué `/api/dashboard/:path*` jusqu'au
2026-08-31, et cette route a répondu 200 à n'importe qui pendant tout ce temps. Le payload le
plus précieux du dashboard ne doit pas dépendre d'un seul point. Vérifié en retirant l'entrée
du matcher : 403 en `viewer`, 401 en anonyme.

### Nombre de voyageurs

Relevé depuis Beds24 (`numAdult + numChild`) et affiché dans les tableaux, sur les barres du
calendrier et dans la fiche d'un séjour. Il sert aussi au ménage : c'est le nombre de lits à
faire.

⚠️ **Vide sur tout l'antérieur, et c'est normal** : aucun export de canal ne porte le nombre
de voyageurs — ni Airbnb, ni Booking, ni Abritel. Seules les réservations passées par Beds24
depuis le 2026-08-28 en ont un. La colonne se remplit donc d'elle-même. `null` et non `0`
quand l'information manque : zéro voyageur serait un chiffre, l'absence d'information n'en est
pas un.

C'est cette colonne qui permettra un jour de trancher la **tarification par occupation** (5ᵉ
et 6ᵉ personne) sur des données réelles. Aujourd'hui elle est réglée au raisonnement, faute de
savoir à quelle fréquence le logement se remplit à 5 ou 6.

### Consignes de ménage

Stockées dans le champ `notes` de Beds24 — **et non `comments`**, qui porte la remarque du
voyageur et s'imprime sur les documents qui lui sont envoyés. Écriture par
`POST /api/dashboard/notes`, admin uniquement, via le scope `write:bookings` du refresh token.

Une consigne ne se devine pas : elle vit dans le popup, qu'il faut penser à ouvrir. La barre
du séjour porte donc un 📝, la légende explique ce que ce 📝 veut dire, et le sous-titre de la
page annonce que les séjours peuvent en porter une — kit draps et serviettes, heure d'arrivée…
Sans ces trois rappels, la personne du ménage n'a aucune raison de cliquer sur un séjour.

Seules les réservations **vivantes** sont annotables : un séjour archivé n'existe plus dans
Beds24. L'interface le dit au lieu d'afficher un champ qui échouerait.

Deux pièges de l'API, tous deux traités :
- Beds24 répond parfois **200 avec `success: false`** dans le tableau de retour. Sans lire le
  corps, l'interface affiche « enregistré » alors que rien ne l'a été.
- La lecture des réservations est mise en cache 60 s. Le calendrier passe donc en
  `cache: "no-store"` : sans ça, une consigne enregistrée restait invisible une minute, et la
  personne du ménage qui rafraîchissait voyait l'ancienne version.

### Le bandeau de navigation

`components/dashboard/DashboardNav.tsx` — un bandeau pleine largeur, hors du conteneur des
pages, avec le titre du site à gauche (cliquable vers `/dashboard`), les liens, et la
déconnexion à droite. Sous `md`, tout passe dans un tiroir latéral : le dashboard se consulte
au téléphone, souvent en mode application, et quatre liens alignés y débordaient.

Le tiroir **reste dans le DOM**, seulement translaté hors écran. Monté au clic, il n'aurait
pas d'état de départ à animer et apparaîtrait d'un coup. Il se referme au `onClick` de chaque
lien et **non par un effet sur `pathname`** : la fermeture est la conséquence directe du clic,
et la faire depuis un `useEffect` déclenche un rendu en cascade que le lint refuse.

Deux liens sortent du dashboard. **« Guide voyageur »** (`/fr/guide-arrivee`, nouvel onglet,
admin seulement) : c'est l'administrateur qui l'envoie aux voyageurs, et il doit pouvoir le
relire sans perdre le calendrier. **« Retour au site »** (`/`) n'a **pas** de condition de
rôle, contrairement à Barbusse : la vitrine est publique, et la personne du ménage y trouve
l'adresse et l'accès du logement.

### Vue admin / vue viewer

Un bouton sur le calendrier, visible du seul administrateur, bascule l'affichage dans celui
de la personne du ménage — pour vérifier ce qu'on lui montre, et surtout ce qu'on ne lui
montre pas, avant de lui laisser une consigne.

⚠️ **C'est un basculement d'affichage, jamais un contrôle de sécurité, et il ne faut pas s'en
servir comme tel.** Le cloisonnement réel est serveur : le rôle est porté par le JWT, le
proxy refuse les pages interdites, et `/api/dashboard/calendrier` projette sa réponse sur une
forme réduite pour le rôle `viewer` — les montants et le canal n'atteignent jamais le
navigateur. En « vue viewer », l'administrateur a bel et bien reçu les montants : les masquer
à l'écran ne les retire pas de la réponse déjà chargée.

### Partage voyageur

`components/dashboard/PartageVoyageur.tsx`, dans la fiche d'un séjour, **admin uniquement**.
Ce qu'on envoie avant une arrivée tient en deux choses — le lien du guide d'arrivée et le
code de la boîte à clés — et les deux se copient depuis l'écran où l'on regarde déjà le
séjour, plutôt qu'en rouvrant le site pour recomposer l'URL et en cherchant le code dans un
ancien message. Trois lignes : le lien du guide, le message complet prêt à coller, le code.

**Les cinq langues sont proposées à égalité, sans présélection.** Barbusse met en avant la
langue probable d'après le pays du voyageur ; impossible ici, et c'est voulu — les jetons
Beds24 d'Albiez ne portent pas `read:bookings-personal`, donc ni pays, ni prénom, ni e-mail
n'entrent dans le site (les champs d'identité de `Booking` restent vides ici). Le message
n'est donc pas
nominatif, et ajouter le scope pour personnaliser une formule de politesse échangerait une
donnée de voyageur contre trois mots.

Les textes vivent dans `lib/partage-voyageur.ts`, `Record<Locale, …>` : élargir `Locale` rend
rouge la table, comme partout ailleurs. Ils **vouvoient dans les cinq langues**, comme
`guide.codeNote` des dictionnaires — un message tutoyant introduirait la page qu'il annonce
sur un autre ton. Le col du Mollard garde son nom français partout : c'est ce qui est écrit
sur les panneaux que le voyageur va chercher des yeux.

Le presse-papier peut être refusé (contexte non sécurisé, mode application) : le texte est
alors affiché sélectionné pour une copie à la main, plutôt que d'échouer en silence.

#### Le code de la boîte à clés

**Un code unique et statique** : Albiez a une boîte à clés mécanique, pas une serrure
connectée. Il n'y a donc rien à demander par réservation, et `/api/dashboard/code-acces` ne
prend aucun identifiant de séjour — contrairement à Barbusse, dont le PIN Nuki est propre à
chaque séjour et n'existe qu'à J-6. Le bloc s'affiche par conséquent aussi sur un séjour
archivé, où il ne sert à rien : l'y masquer demanderait un test qui laisserait croire qu'il
existe un code par réservation.

⚠️ **Le dépôt est public : la valeur ne doit apparaître nulle part dans le code**, ni dans un
commentaire, ni dans un test, ni dans un log — les journaux de production se lisent depuis
plus d'endroits que la réponse d'une route. Elle vit dans `ALBIEZ_CODE_BOITE_A_CLES` et n'est
servie que par une route **admin uniquement** (`guard.denyNonAdmin`, comme l'écriture des
consignes) : vérifié à l'exécution, 401 en anonyme, **403 en `viewer`**, 200 pour
l'administrateur. Variable absente ⇒ `code: null`, l'interface le dit et les liens du guide
continuent de servir.

C'est la même règle que la page `/{locale}/guide-arrivee`, qui n'écrit jamais le code : elle
annonce qu'il est envoyé par message. Ce bloc est l'outil qui envoie ce message.

### Le graphe est écrit portable

`components/dashboard/RevenueChart.tsx` ne connaît ni Albiez, ni Beds24, ni les canaux : il ne
lit que `RevenueChartData`, qui vient désormais du socle. **Barbusse doit le reprendre** quand
il aura assez d'années à comparer — il n'aura qu'à produire la même forme. Les barres sont côte
à côte parce qu'elles n'ont **pas de `stackId`** ; en ajouter un les empilerait.

Son habillage — grille pointillée sans verticales, ticks sans ligne ni axe, infobulle arrondie
à 12 px, légende à pastilles rondes — vient de `@sejour/socle/lib/chart-theme` (`CHART_GRID`,
`CHART_AXIS`, `CHART_TOOLTIP_STYLE`, `CHART_LEGEND`, `chartEuro`). Il était recopié dans chaque
graphe des deux sites, et divergeait déjà d'une rampe de gris : ce sont les valeurs d'ici qui
ont été retenues.

**La forme d'un graphe, elle, reste un choix par site.** Le camembert a été abandonné ici — il
ne répondait qu'à « quelle est ma dépendance aujourd'hui », la vraie question étant « comment
évolue-t-elle » — et Barbusse le garde. Le socle fournit les briques, pas la composition.

## Saisons de la station

`lib/seasons.ts` porte les dates d'ouverture du domaine (`HIVERS`, une entrée par hiver) et la
saison estivale (`SUMMER_MONTHS`, règle stable). Elles servent aux bandeaux du calendrier et
aux accroches des pages de saison.

Les quatre hivers depuis 2023-2024 y sont, aux dates réelles de la station. **Ajouter une
ligne dès qu'elle publie une nouvelle saison** — une saison manquante laisse le mois sans
teinte, ce qui se lit comme « hors saison » sur le calendrier.

Les accroches (`SeasonContent.tagline`) sont des **fonctions des dates**, formatées par `Intl`
dans la langue de la page. Elles étaient auparavant recopiées en toutes lettres dans les cinq
dictionnaires, à côté d'un `WINTER_OPENING` que personne ne lisait : changer une date
demandait six modifications, et rien ne signalait un oubli.

`t.seasons.skiPeriod(du, au)` porte la même règle pour les deux endroits où la période
s'affiche — l'encart des distances (`DistanceStrip`, hiver seulement : l'été n'a pas
d'ouverture négociée, seulement une règle de mois) et la légende du calendrier de réservation.
Les dictionnaires reçoivent des dates **déjà formatées** par `formatPeriode()`, extraite de
`periodeSaison()` qui ne connaissait que la prochaine ouverture — le calendrier doit étiqueter
la bande **visible**, sinon naviguer vers un autre hiver affiche les dates du mauvais.

Sur le calendrier public, les jours de saison sont teintés en `bg-sky-200`, et le teintage
parcourt tout `HIVERS` : un hiver publié mais absent du teintage se lirait comme « hors
saison ». Trois décisions qui ont demandé un aller-retour :

- **La teinte vit sur un conteneur, pas sur le bouton.** Les fonds d'état (`bg-primary` de la
  sélection, `bg-gray-100` de l'indisponibilité) l'écraseraient. En sous-couche elle cède la
  place à ce qui prime. Effet de bord assumé : au survol d'un jour libre, le
  `hover:bg-light-bg` du bouton la masque le temps du survol.
- **Un bleu fixe et non `--season-accent`**, qui bascule au vert en été : le calendrier vit sur
  l'accueil, dont l'accent suit la saison du moment, et une bande verte pour la saison de ski
  serait absurde.
- **`sky-50` puis `sky-100` étaient invisibles** — `#f0f9ff` est à 4 % du blanc. La règle était
  pourtant bien émise par Tailwind, vérifié dans la feuille servie : le premier réflexe est de
  soupçonner une classe non générée, ce n'était pas ça.

## Variables d'environnement

| Variable | Rôle |
|----------|------|
| `BEDS24_PUBLIC_REFRESH_TOKEN` | Chemin public. Voir la section Beds24. |
| `BEDS24_READ_REFRESH_TOKEN` | Lectures du dashboard. Voir la section Beds24. |
| `BEDS24_REFRESH_TOKEN` | Écriture des consignes de ménage. Voir la section Beds24. |
| `BEDS24_PROPERTY_ID` | Propriété `346417`, jamais en dur. |
| `CRON_SECRET` | Porte des deux crons (keepalive, veille des événements). Leur seule protection : les routes ne sont pas couvertes par le matcher de `proxy.ts`. |
| `NTFY_TOPIC` | URL complète du topic ntfy de la veille des événements (`https://ntfy.sh/<topic>`). Le nom du topic **est** le secret. Absent, le cron de veille rend 500 plutôt que de se taire. |
| `HISTORIQUE_ALBIEZ` | Archive des quatre canaux, forme compacte produite par `build-archive.mjs`. |
| `DASHBOARD_PASSWORD` | Mot de passe administrateur. |
| `DASHBOARD_PASSWORD_MENAGE_*` | Un mot de passe par personne, rôle `viewer`. Le suffixe est libre et n'est là que pour savoir à qui appartient la ligne. `DASHBOARD_PASSWORD_VIEWER_*` est accepté aussi : le code a changé de nom, pas les variables. |
| `DASHBOARD_SECRET` | Secret de signature du JWT (HS256). |
| `ALBIEZ_CODE_BOITE_A_CLES` | Code de la boîte à clés, servi au seul administrateur par `/api/dashboard/code-acces`. **Jamais dans le code** : le dépôt est public. |

**Posées dans les trois environnements** depuis le 2026-09-11 : les quatre jetons Beds24,
`CRON_SECRET` et `ALBIEZ_CODE_BOITE_A_CLES` (relevé sur `vercel env ls`, pas supposé). Restent
**production seulement** `HISTORIQUE_ALBIEZ`, les deux mots de passe et `DASHBOARD_SECRET` :
ce sont des `Secret` chez Vercel, dont la valeur ne se relit pas — les reporter en preview
demanderait de les ressaisir à la main.

⚠️ **Conséquence : une preview ne permet pas de valider un écran qui dépend du dashboard.**
`DASHBOARD_SECRET` et les mots de passe manquant, la connexion y échoue. Les disponibilités
publiques, elles, fonctionnent en preview depuis le 2026-09-11.

⚠️ **`vercel env add --force` ne remplace pas toujours une variable `Secret` existante**, et
échoue en silence si l'on masque sa sortie. Pour une rotation, faire `vercel env rm` puis
`vercel env add`, et **relire les âges** avec `vercel env ls` — sachant que l'âge affiché est
la date de création, pas de mise à jour. La vérification qui tranche est le keepalive, qui
échange réellement chaque jeton et dit lequel a échoué.

⚠️ `HISTORIQUE_ALBIEZ` pèse **26,8 Ko à lui seul**. Vercel plafonne le total des variables
d'un déploiement à 64 Ko : il reste de la marge, mais **la regénérer après chaque nouvel
import** la fait grossir. Le jour où le plafond approche, le repli est un stockage externe ou
le passage du repo en privé — pas une archive tronquée.

**L'archive n'est pas synchronisée toute seule.** Elle est figée au moment où la variable a
été posée. Après un nouvel export de canal, il faut relancer `build-archive.mjs`, remplacer la
variable et redéployer, sinon la production reste sur l'ancienne photo.

## Les cinq langues

Le site est servi en **français, anglais, allemand, espagnol et italien**. La langue est
un segment d'URL, jamais un état client : il n'y a pas de `setLocale`, on change de langue
en changeant d'URL, ce qui garde une URL unique et indexable par langue.

Tout part de `lib/i18n/locales.ts` — un module **sans aucun import**, parce qu'il est
chargé par le proxy (runtime edge), par les composants serveur et par les composants
client :

| Export | Rôle |
|--------|------|
| `Locale`, `LOCALES` | Le type et la liste, dans l'ordre du sélecteur, des `hreflang` et du sitemap |
| `DEFAULT_LOCALE` | Français — le `x-default`, le dictionnaire de repli, la destination de `/` quand rien ne correspond |
| `LOCALE_META` | Par langue : `short` (pastille), `native` (nom dans sa propre langue), `bcp47` (`Intl`), `og` (`og:locale`) |
| `isLocale`, `localeFromAcceptLanguage` | Le garde de route et la négociation d'`Accept-Language` |

`LOCALE_META` existe pour une raison précise : la correspondance langue → code BCP-47
était auparavant dupliquée dans quatre fichiers et écrite trois fois en
`locale === "fr" ? … : …`. Ces ternaires rendaient silencieusement de l'anglais dès
qu'une troisième langue apparaissait. **Aucun code ne doit à nouveau tester une langue
littéralement** : tout ce qui dépend de la langue sans être une traduction passe par
cette table.

Ajouter une sixième langue : une valeur dans `Locale`, une entrée dans `LOCALE_META`, et
la compilation liste elle-même tout ce qui reste à écrire (voir « Ce qui casse à la
compilation » plus bas).

### Structure des URLs

| URL | Contenu |
|-----|---------|
| `/` | Redirection 307 vers la langue du visiteur (`proxy.ts`, non indexée) |
| `/{locale}` | Accueil — présentation du logement, valable toute l'année |
| `/fr/ski`, `/en/ski`, `/de/ski`, `/es/esqui`, `/it/sci` | Page saison hiver |
| `/fr/ete`, `/en/summer`, `/de/sommer`, `/es/verano`, `/it/estate` | Page saison été |
| `/{locale}/guide` | Index du guide (blog éditorial) |
| `/{locale}/guide/<slug>` | Article du guide — 17 slugs, communs aux cinq langues |
| `/{locale}/mentions-legales` | Mentions légales (`noindex`) |
| `/{locale}/guide-arrivee` | Guide d'arrivée — **page cachée** (voir plus bas) |

Le build génère **105 pages indexables** (5 × [accueil + 2 saisons + index + 17 articles])
plus 10 pages en `noindex`.

Les slugs de saison sont **localisés** : le mot de l'URL pèse dans le référencement et les
requêtes sont dans la langue du visiteur. La correspondance vit dans `SEASON_SLUGS`
(`lib/seasons.ts`) ; les clés y restent `hiver`/`ete` dans toutes les langues, ce sont des
clés de données et non du texte affiché. Les slugs sont **sans accent** (`esqui`, pas
`esquí`) : un slug accentué se percent-encode dans les canonical, les hreflang et le
sitemap. Un slug de la mauvaise langue rend un 404 (`/de/summer` → 404), ce qui évite le
contenu dupliqué.

`guide`, les slugs d'articles, `mentions-legales` et `guide-arrivee` sont en revanche
**identiques dans les cinq langues** : maintenir une table de correspondance pour du
contenu sans équivalent « naturel » d'une langue à l'autre ne rapporterait rien.

### Négociation de la langue et `<html lang>`

`proxy.ts` à la racine (nom de Next 16, `middleware.ts` étant déprécié) configure
`createDashboardProxy` du socle. Pour la langue, il ne traite que `/` :
il lit `Accept-Language`, trie les tags par poids `q=`, retient le premier que le site
parle **sur la langue de base** (`de-AT` → `/de`) et retombe sur `DEFAULT_LOCALE`. Le reste
du site étant déjà préfixé et rendu statiquement, le faire passer par le proxy coûterait
une invocation par requête pour rien — d'où `matcher: "/"`.

Conséquence importante : `app/` **ne contient plus de page à la racine**, seulement
`[locale]/`, `robots.ts` et `sitemap.ts` (les metadata routes n'ont pas besoin de layout).
`app/[locale]/layout.tsx` est donc le **layout racine** et rend `<html lang={locale}>`
directement, en gardant le rendu statique. C'est ce qui a permis de supprimer le
`lang="fr"` figé qu'un `useEffect` d'`I18nProvider` rattrapait après l'hydratation :
acceptable à deux langues, faux pour Google et les lecteurs d'écran sur trois langues de
plus.

### Ce qui casse à la compilation, et ce qui ne casse pas

Le contrat d'exhaustivité est ce qui rend l'ajout d'une langue tenable. `Dictionary`
(`lib/i18n/types.ts`) est une **interface écrite à la main**, et non un `typeof fr` : le
compilateur signale chaque clé manquante. Les tables sont typées `Record<Locale, …>`, donc
élargir `Locale` rend rouge tout ce qui doit être complété — `SEASON_SLUGS`,
`dictionaries`, les 17 entrées de `BLOG_POSTS`, la table `CONTENT` des articles.
`npx tsc --noEmit` sert de liste de tâches ; l'objectif est zéro erreur.

Quatre maps du dictionnaire étaient typées `Record<string, …>`, où une clé manquante ne
cassait rien et rendait `undefined` à l'écran. Elles sont désormais exhaustives sur les
clés réelles, et c'est délibéré :

| Champ du dictionnaire | Clés imposées par |
|---|---|
| `SeasonContent.distanceLabels` | `WinterDistanceKey` / `SummerDistanceKey` (`lib/property.ts`) |
| `guide.steps` | `ArrivalStepKey` (`lib/arrival.ts`) |
| `guide.panelMarkers` | `PanelMarkerKey` |
| `guide.emergencyLabels` | `EmergencyKey` |
| `spaces.list` | `SpaceKey` (`lib/spaces.ts`) — déjà exhaustif avant |

`SeasonContent` est **paramétré** par ses clés de distance, les deux saisons n'en portant
pas les mêmes : la page ski doit nommer les cinq points du front de neige, la page été ses
trois lieux distincts. `DistanceStrip` relit donc les libellés à plat
(`Record<string, string>`) — `season` y est une variable, et c'est la seule façon
d'indexer les deux saisons avec la même expression sans dupliquer le rendu.

### Le sélecteur de langue

`components/LocaleSwitcher.tsx`, un **menu déroulant** — à cinq langues, quatre pastilles
alignées mangeaient la barre desktop et débordaient sur mobile à côté du bouton de menu.
Un déroulant tient la même place quel que soit le nombre de langues. Les langues sont
nommées **dans leur propre langue** (« Deutsch », pas « Allemand ») : un visiteur qui
cherche sa langue n'a pas à savoir lire celle de la page.

La liste est **toujours dans le HTML** et seulement masquée par `hidden`, jamais démontée.
Rendue au clic seulement, elle privait chaque page de tout lien vers les autres langues, et
un robot ne clique pas. `display:none` retire aussi les liens du parcours au clavier quand
le menu est fermé, donc pas de piège à tabulation.

`translatePath()` y vit désormais (elle était dans `Header`) : elle échange le préfixe de
langue **et** convertit le slug de saison via `SEASON_SLUGS`. Sans cette conversion,
`/it/estate` vers l'allemand mènerait à `/de/estate`, un 404.

### Ce qui reste en français, volontairement

Les avis de `data/reviews.json` gardent leur langue d'origine — c'est ce qui les rend
crédibles. Les valeurs juridiques de `lib/legal.ts` (`legalForm`, `apeLabel`) sont des
mentions légales françaises ; seuls leurs libellés se traduisent. `x-default` pointe sur
le français.

### Typographie des nombres

Les chiffres viennent de `property.ts` et sont formatés par `Intl` avec
`LOCALE_META[locale].bcp47`. Attention : **l'espagnol et l'italien n'insèrent le séparateur
de milliers qu'à partir de cinq chiffres** (`minimumGroupingDigits=2` en CLDR, conforme à
la règle de la RAE). `1500` s'écrit donc « 1 500 » en français, « 1,500 » en anglais,
« 1.500 » en allemand et **« 1500 »** en espagnol et en italien. La prose des dictionnaires
et des articles suit cette règle, sans quoi le texte contredirait les chiffres calculés à
deux lignes d'écart.

## Les trois pages ont la même colonne vertébrale

L'accueil, `/ski` et `/ete` sont bâties sur le même squelette. Seul le bloc situé entre le
hero et la galerie change :

| | Accueil | `/ski` et `/ete` |
|---|---|---|
| Bloc variable | `SeasonCards` — « Deux saisons, deux séjours » | `SeasonBlock` — bascule de saison, distances, plan des pistes, bandeau, points forts, activités |
| Tout ce qui suit | `CommonSections` | `CommonSections`, à l'identique |

`CommonSections` (`components/public/CommonSections.tsx`) rend la galerie, l'appartement,
le kit linge, les distinctions, les avis, les infos pratiques, la situation, l'hôte,
HomeExchange et la réservation — et résout lui-même ses photos. Sa prop `season` est
**optionnelle** : absente = accueil (galerie ordonnée sur `currentSeason()`, avis non
filtrés) ; fournie = page de saison (galerie et filtre d'avis accordés à la page).

Ces sections vivaient auparavant sur la seule page d'accueil, en hub-and-spoke. Le
problème : on arrive sur `/fr/ski` depuis Google ou depuis un lien Airbnb, pas par
l'accueil, et on n'y apprenait ni le nombre de couchages, ni le kit linge, ni les 50
marches. Le contenu partagé se paie en duplication SEO — c'est assumé, et compensé par
des `<title>`, descriptions et H1 distincts, des canonical propres à chaque page, un haut
de page unique, et le **JSON-LD du logement déclaré sur la seule page d'accueil** (une
seule entité pour un seul logement — ne pas le dupliquer sur les pages de saison ; voir
« Avis » pour son double type).

Corollaire : les ancres de navigation visent la **page courante**. `anchorBase(pathname,
locale)` (`lib/anchors.ts`) rend `/fr/ski#appartement` depuis `/fr/ski`, et retombe sur
`/fr#appartement` depuis une page qui ne porte pas ces sections (guide, mentions légales).
Utilisé par le `Header` **et** par les deux boutons du `Hero` — sans quoi un clic sur
« L'appartement » éjecterait le visiteur de la saison qu'il consultait.

## Le mécanisme de saison

La saison n'est pas un état client mais une **donnée de route**. Trois pièces :

1. `currentSeason()` dans `lib/seasons.ts` — quelle saison mettre en avant sur
   l'accueil. Bascule très en avance sur la saison réelle (**août → avril = ski**)
   parce qu'on vend un séjour plusieurs mois avant qu'il ait lieu : dès août l'été
   est joué et ce sont les réservations de ski qui se décident.
   `FEATURED_SEASON_OVERRIDE` force la saison quand la réalité commerciale ne suit
   pas le calendrier (saison complète en avance, ouverture décalée).
2. L'attribut `data-season` posé sur le conteneur de page.
3. Trois variables CSS (`--site-accent*`) redéfinies par `[data-season]` dans
   `app/globals.css`. Toutes les utilitaires `*-accent` du sous-arbre suivent — c'est
   `@sejour/socle/ui/theme.css` qui les mappe, en `@theme inline` pour que la valeur
   reste un `var()` et non une couleur figée à la compilation.

Conséquence : changer la couleur d'une saison = éditer un bloc CSS, pas les composants.
Le header et le footer restent en bleu alpin (`primary`), volontairement hors saison.

## Contenu

| Fichier | Rôle |
|---------|------|
| `lib/property.ts` | **Faits** : adresse, altitude, surface, couchages, distances, accès, contact. Identiques dans toutes les langues, corrigés à un seul endroit. |
| `lib/i18n/dictionaries/{fr,en}.ts` | **Textes** : tout ce qui se traduit, y compris les métadonnées SEO par page. |
| `lib/seasons.ts` | Saisons, slugs, dates d'ouverture du domaine. |
| `lib/seo.ts` | `alternates` (canonical + hreflang) et données structurées schema.org. |
| `lib/legal.ts` | Identité de l'éditeur — **SCI JUARISAL**, distincte de l'entreprise individuelle de Barbusse. |
| `data/reviews.json` | Avis Airbnb + note de synthèse. |
| `data/guidebook-airbnb.md` | **Matière première du guide** — le guidebook Airbnb de l'hôte, aspiré et converti. Pas lu par le code. |

## Distances

L'hiver, tout est réuni au **front de neige à 250 m** : départ des pistes, commerces,
ESF et club Piou-Piou. C'est modélisé par une entrée unique avec un champ `includes`
(`DISTANCES.hiver`) plutôt que quatre entrées à 250 m, qui laisseraient croire à quatre
lieux distincts. L'été, les trois distances sont réellement différentes.

Le **plan des pistes** est collé au bandeau de distances : il montre ce que le chiffre
affirme. Il est **agrandissable** (`ZoomableFigure`), en deux paliers — ajusté à l'écran,
puis taille réelle dans un cadre qui défile. Dans sa colonne, un plan de 1920 px de large
rend les noms de pistes illisibles, et le premier palier n'y suffit pas sur un téléphone.
Composant distinct de la visionneuse de `PhotoGallery`, qui parcourt une série avec
compteur et flèches là où il n'y a ici qu'une image à regarder de près.

## La section « activités » des pages de saison

Cinq encarts l'hiver, quatre l'été, appariés à leurs photos par position (voir « Photos »).

L'hiver, le **premier prend toute la largeur** — c'est le domaine skiable, ce que vient
chercher le visiteur — avec sa photo à gauche et, sous le texte, les chiffres de la
station en pastilles. Ce qui déclenche cette mise en vedette est la présence de
`resortFacts` dans le dictionnaire de la saison : l'été, aucune activité ne l'emporte sur
les autres, les quatre restent à égalité.

Le compte n'est pas arbitraire : l'encart en vedette occupe une ligne entière, et les
suivants remplissent une grille à deux colonnes. Un nombre impair d'encarts derrière
la vedette laisse une case vide en bas de grille — d'où cinq activités l'hiver (1 + 4) et
quatre l'été (2 × 2).

Les chiffres viennent de `RESORT` (`property.ts`) et n'apparaissent **qu'une fois** sur la
page, dans ces pastilles. Le dictionnaire ne porte que les mots (`pistes`, `remontées`,
`enneigeurs`) ; les milliers sont formatés selon la langue (« 1 500 » / « 1,500 »).
Auparavant *40 km / 13 remontées / 1 500-2 060 m* était écrit trois fois — intro, points
forts, activités — et les encarts qui répétaient un chiffre déjà donné n'avaient plus rien
à dire.

Le titre de la section est `activitiesTitle`, et non `heading` : ce dernier est déjà le H1
du hero, quelques centaines de pixels plus haut.

Le lien d'un encart est soit un **prestataire** (URL dans `PROPERTY.links`, nouvel onglet),
soit un **article du guide** (`internal: true`, `<Link>` préchargé, href préfixé par la
langue comme dans le corps des articles). Les liens vers le guide sont ce qui permet à un
encart de rester court sans être creux.

La section se ferme sur un **renvoi au guide** (`activitiesMore` : `text` + `label`, lien
construit vers `/{locale}/guide` par le composant). Il existe parce que la liste s'arrête
volontairement à quatre ou cinq encarts : sans lui, la grille se terminait sur rien alors
que 17 articles détaillent les mêmes activités. Les activités citées dans le texte doivent
correspondre à des articles qui existent réellement dans `BLOG_POSTS`.

## Distinctions

Côté Airbnb, deux distinctions différentes affichées côte à côte par
`AirbnbDistinctions` : **Superhôte** récompense l'hôte, **Coup de cœur voyageurs**
récompense le logement. Elles restent deux cartes séparées — fondues en un seul
bandeau, la seconde passerait pour une reformulation de la première. Textes dans
`superhost` et `guestFavourite` des dictionnaires i18n.

`AWARDS` dans `lib/property.ts` — Traveller Review Awards Booking.com : 8,8/10 en 2026,
9,1/10 en 2025, décernés à « Appart - Chalet du Hameau des Aiguilles » (le nom de
l'annonce Booking diffère de celui du site).

Les certificats officiels sont de grands aplats bleus avec le texte incrusté. Le
composant `Awards` les **reconstruit** aux couleurs du site plutôt que de les afficher
tels quels : le texte devient traduisible et lisible par un lecteur d'écran, et net à
toute taille — le visuel 2025 fourni ne fait que 305 px de côté. Les fichiers d'origine
restent dans `public/images/awards/` pour un usage hors site.

Le kit de communication complet de Booking (stories Instagram, PDF, GIF de signature)
est dans `booking-2026-awards/` à la racine, **hors versionnement** : il n'a pas sa
place dans un dépôt web.

## HomeExchange

Présenté dans le bloc « Et hors saison ? » de l'accueil, là où la question se pose pour
le visiteur qui envisage avril ou octobre. Deux liens dans `PROPERTY.links` : la page du
logement et le lien de parrainage (`alexandre-07e4b`, 250 GuestPoints pour chaque
partie). La contrepartie du parrainage est **annoncée sous le bouton** — un lien de
parrainage qui ne dit pas son nom se retourne contre celui qui le pose.

Logo officiel dans `public/brand/homeexchange.svg`, servi en `unoptimized` : c'est un
SVG statique, l'optimiseur d'images de Next n'a rien à y gagner et le laisser passer
demanderait d'activer `dangerouslyAllowSVG`.

## Avis

`data/reviews.json` contient la note de synthèse (4,96 / 49 avis, Coup de cœur voyageurs)
et les 49 avis relevés le 2026-08-06. La note de synthèse alimente le `aggregateRating`
schema.org de la page d'accueil.

Ce `aggregateRating` impose le **double type** `["Apartment", "LodgingBusiness"]` sur le
bloc JSON-LD (`lib/seo.ts`). Google n'accepte la note que sur une liste fermée de types,
dont `LocalBusiness` — dont `LodgingBusiness` hérite ; `Apartment` n'en fait pas partie.
Avec `Apartment` seul, la Search Console rejetait l'élément entier (« type d'objet non
valide pour le champ `<parent_node>` », 2026-09-03) et il ne pouvait plus prétendre à
aucun résultat enrichi. Les deux vont donc de pair : retirer `LodgingBusiness` oblige à
retirer `aggregateRating`.

À savoir tout de même : Google ignore les avis *auto-hébergés* d'une entreprise sur
elle-même pour l'affichage des étoiles. Le balisage est désormais valide, mais les
étoiles ne sont pas garanties pour autant — la valeur du bloc est d'abord d'être lisible
par les autres moteurs et agrégateurs.

Chaque avis porte une **`period`** — `hiver` (déc-mars), `ete` (juil-août) ou
`hors-saison` — à ne pas confondre avec `Season`, qui ne connaît que deux valeurs parce
qu'il n'existe que deux pages de saison. Un séjour hors saison décrit une expérience
différente (remontées fermées, commerces au ralenti) et mérite d'être identifié plutôt
que rangé d'office dans l'une des deux saisons.

Le filtre à quatre entrées (Tous / Saison ski / Saison été / Hors saison), avec ses
compteurs, est affiché sur **toutes** les pages. La prop `season` de `<Reviews>` ne
filtre pas : elle fixe seulement la sélection de départ — `hiver` sur `/ski`, `ete` sur
`/ete`, `all` sur l'accueil. Le visiteur reste libre de consulter les autres périodes.

**Pour rafraîchir : la commande `/avis`** (`.claude/commands/avis.md`), qui enchaîne la
synchro, la relecture des avis nouveaux, le contrôle du diff et le déploiement. Le script seul
s'appelle `npm run sync-reviews` (`-- --dry-run` pour ne rien écrire).

Beds24 relaie l'API `listing_reviews` d'Airbnb sur `GET /channels/airbnb/reviews?roomId=…`
— endpoint marqué « Beta », scope `read:channels`, que le token d'écriture porte déjà. On y
trouve tout ce que le fichier affiche : note globale, texte public, les six notes de
catégorie, la réponse de l'hôte, et le code de réservation. **Sauf le prénom du voyageur**,
qu'Airbnb ne donne que sous forme de `reviewer_id` opaque. Le script le récupère en joignant
`reservation_confirmation_code` à la réservation Beds24 — ce qui ne marche que pour les
séjours passés par Beds24, donc à partir d'août 2026. Avant cela, il laisse `name` vide et
le signale : c'est le seul champ à compléter à la main.

Le script **ajoute, il ne réécrit pas**. Un avis déjà présent est laissé intact — ses fautes
de frappe ont été corrigées, sa date et sa période vérifiées, et l'API renvoie le texte brut.
Un avis qu'Airbnb ne renvoie plus est signalé mais jamais supprimé. Seul `summary` est
recalculé : il est entièrement dérivable, à la virgule près (vérifié sur les 49 avis
d'origine), sauf `guestFavourite` qui n'est pas dans la réponse et reste manuel.

L'appariement entre le fichier et l'API se fait par **similarité de texte** (trigrammes de
Jaccard) et non par identifiant : le fichier est antérieur à cette intégration et ne porte
pas les `id` Airbnb. Sur les 49 avis d'origine, l'appariement est complet et le pire score
vaut 0,86, pour un seuil à 0,35 — le seuil est bas exprès, un faux positif ferait rater un
avis nouveau en silence là où un faux négatif se voit dans le rapport.

Le flux SociableKit de Barbusse n'est **pas** utilisable ici — il est au niveau du compte
Airbnb et mélange les annonces sans champ permettant de les distinguer.

Règle : un chiffre ou une distance ne doit **jamais** être écrit dans un dictionnaire.
Il vit dans `property.ts` et le dictionnaire ne fournit que son libellé.

## Le guide (blog)

`/{locale}/guide` — 21 articles dans les cinq langues sur Albiez-Montrond et ses environs :
randonnées balisées, domaine skiable, loueurs, ESF, commerces, fromagerie coopérative, lac,
col du Mollard, refuge, activités d'été, plus les **articles d'événement** (Celti'Cimes, la
Marmotte, les grands cols) et une excursion à Turin. Soit 105 pages d'article.

| Fichier | Rôle |
|---------|------|
| `lib/blog/posts.ts` | `BLOG_POSTS` — slug, date, photo, saison, et les métadonnées par langue (titre, description, excerpt, keywords). Plus `relatedPosts()` et `splitImagePath()`. |
| `lib/blog/content/{fr,en,de,es,it}/<slug>.tsx` | Le corps de l'article, en JSX presque nu. Les `<Link>` internes sont préfixés en dur par la langue du fichier — y compris les liens de saison, qui prennent le slug localisé (`/de/sommer`, `/es/verano`, `/it/estate`). |
| `app/[locale]/guide/page.tsx` | Index — résout les photos côté serveur et passe les cartes au filtre. |
| `components/public/GuideFilter.tsx` | Filtre de saison + grille de cartes (composant **client**). |
| `app/[locale]/guide/[slug]/page.tsx` | Article + JSON-LD + encart d'événement + encart de réservation + « À lire aussi ». |
| `lib/events.ts` | `EVENTS` — **le catalogue seul** : le type et les fonctions sont montés dans `@sejour/socle/lib/events` au Lot 5. |
| `@sejour/socle/components/EventBanner` | L'encart « prochaine édition » en tête d'un article d'événement. Monté au socle au Lot 5 ; `components/public/EventBanner.tsx` n'existe plus. |
| `lib/blog/ArticleImage.tsx` | Photo au fil d'un article (`<ArticleImage src="dossier/fichier.jpg" alt caption />`). Même traitement que les couvertures : dimensions relevées au build, aucun recadrage, figure absente si le fichier manque. |
| `.prose-article` (`@sejour/socle/ui/theme.css`) | Toute la typographie du corps d'article, plus la classe `.facts` des encadrés pratiques. Les couleurs viennent des `--site-prose-*` posés dans `app/globals.css`. |

**Le slug est commun aux cinq langues**, contrairement aux slugs de saison : un article
n'existe qu'à une seule adresse par langue, et les cinq se déclarent mutuellement en
`hreflang`. Cela évite de maintenir une table de correspondance pour du contenu qui n'a pas
d'équivalent « naturel » dans les autres langues.

Les composants d'article sont **importés paresseusement** dans `CONTENT` (`[slug]/page.tsx`) :
cent cinq imports en tête de fichier pour n'en rendre qu'un seul alourdiraient
chaque page. Les chemins doivent rester des **littéraux** — une expression
`content/${locale}/${slug}` ferait perdre au bundler son analyse statique, et c'est la
raison de la longueur de cette table. Un fichier créé sans son entrée dans `CONTENT` donne
un 404 silencieux (`CONTENT[slug]?.[locale]` → `notFound()`).

Les **liens vers les prestataires** (ESF, location de ski Sport 2000, accompagnateur en
montagne) vivent dans `PROPERTY.links`, jamais en dur dans un article : un partenaire qui
change d'URL se corrige à un seul endroit, et les cinq langues suivent.

La photo de couverture est désignée par `dossier/fichier.jpg` sous `public/images/` et
chargée par `getPhoto()` : ses dimensions réelles sont relevées au build, donc **aucune
couverture n'est recadrée** — la vignette prend le format de l'image, comme le reste du site.
Un préfixe `_` est accepté (`getPhoto` le charge, contrairement à `listPhotos`).

Le champ `season` d'un article pose `data-season` sur la carte et sur la page : l'accent
suit la saison, sans code conditionnel. `null` = valable toute l'année.

**Le filtre de l'index** reprend la logique de celui des avis : trois entrées avec
compteurs — *Toute l'année* (par défaut, tout est affiché), *Hiver*, *Été*. Un article
`season: null` reste visible **sous chaque filtre** : « faire ses courses » ou « la
boulangerie » servent autant en février qu'en août, et les exclure d'une saison donnerait
une liste techniquement juste et pratiquement inutilisable. D'où des compteurs qui ne
s'additionnent pas (21 / 12 / 16) — un encart l'explique dès qu'une saison est
sélectionnée.

Le filtre étant client, l'index résout les photos côté serveur et passe des cartes déjà
mesurées. Les **21 cartes sont dans le HTML initial** (le filtre part sur « tout »), donc
le filtrage ne coûte rien au référencement.

**Ajouter un article** : une entrée dans `BLOG_POSTS` (cinq blocs de métadonnées), cinq
fichiers dans `content/{fr,en,de,es,it}/`, une entrée de cinq lignes dans `CONTENT`. Le
sitemap et l'index suivent tout seuls. Avancer **article par article, les cinq langues d'un
coup** : les articles sont indépendants, et une entrée de `CONTENT` oubliée ne se voit pas.
S'il couvre un événement daté, ajouter aussi son entrée dans `EVENTS` et le champ `event` ;
si sa photo est empruntée, remplir `imageCredit`. Voir les deux sections ci-dessous.

### Les articles d'événement

Un article peut porter `event: "<clé>"`, qui pointe vers une entrée de `EVENTS`
(`lib/events.ts`). Il gagne alors deux choses : l'encart **« prochaine édition »** en tête
de page, et le nœud **`Event`** des données structurées.

```ts
export interface LocalEvent {
  key: string;        // la clé de jointure, jamais affichée
  name: string;       // le nom de l'organisateur, non traduit
  start: string;      // YYYY-MM-DD, inclus
  end: string;        // inclus ; égal à start pour un événement d'un jour
  commune: string;    // pour le JSON-LD et l'encart
  confirmed: boolean; // les dates sont-elles officielles ?
  url?: string;
}
```

**`confirmed` est la pièce maîtresse, et c'est un fait, pas un drapeau.** À `false`, les
dates du catalogue sont une projection calée sur le jour de semaine de l'édition
précédente : l'encart n'affiche alors que le mois (« Dates non encore publiées — juillet
2027 »), et **le JSON-LD `Event` n'est pas émis du tout**. On ne déclare pas une date
supposée à Google, qui l'afficherait comme un fait dans un résultat enrichi.

**La fraîcheur vient du catalogue, pas d'une horloge.** `EventBanner` est un composant
serveur, et aucune page de ce site ne déclare `revalidate` : les 105 pages du guide sont
générées une fois par déploiement. Une édition passée se **retire à la main** de `EVENTS`,
exactement comme `WINTER_OPENING` se met à jour chaque année. Le filtrage par date de
`nextEdition()` n'est qu'un filet, qui fait disparaître l'encart au déploiement suivant si
le ménage a été oublié. L'alternative — calculer la date chez le visiteur — sortirait
l'encart du HTML initial sur une page dont l'événement est le sujet.

**Le module a été extrait au Lot 5**, comme il était écrit pour l'être : le type
`LocalEvent` et les fonctions (`nextEdition`, `stayWindow`, `findEventByKey`,
`findEventOnDay`, `findEventForStay`, `eventJsonLd`) vivent dans `@sejour/socle/lib/events`,
et **seul le catalogue reste ici**. Les trois divergences d'Albiez ont été retenues telles
quelles, et Barbusse a migré : `key` comme clé de jointure plutôt que le nom, `confirmed`
plutôt qu'un « (à confirmer) » collé dans le nom, `commune` (optionnelle dans le socle).

`eventJsonLd` a quitté `lib/seo.ts` en même temps, et il rend désormais **`null`** quand
l'événement n'est pas confirmé : le test n'est plus à la charge de l'appelant, qui insérait
avant un `{event?.confirmed && …}` qu'il pouvait oublier. La page d'article ne fait plus que
poser le nœud quand on lui en rend un.

⚠️ Les dates non confirmées sont à reprendre auprès des organisateurs et de l'office de
tourisme d'Albiez (04 79 59 30 48) dès que les programmes sortent, au printemps.

### Crédit photo

`BlogPostMeta.imageCredit` rend une légende sous la couverture, avec deux liens : la page
source et le texte de la licence. Il est **obligatoire dès que l'image est sous licence à
attribution** (CC BY, CC BY-SA) — sans lui, l'usage est une violation de licence, pas une
négligence de mise en page.

Il est absent de la quasi-totalité des articles, et c'est normal : la règle reste nos
propres photos. Il ne sert que quand nous n'avons rien de nous à montrer — aujourd'hui la
piazza San Carlo à Turin et la croix du col de la Croix de Fer, toutes deux CC BY-SA 4.0
depuis Wikimedia Commons. Jamais de visuel de presse d'organisateur.

`react/no-unescaped-entities` est **désactivé sur `lib/blog/content/**`** (voir
`eslint.config.mjs`) : la règle vise les `>` et `}` tapés par accident, et sur de la prose
française, espagnole ou italienne elle ne signale que des apostrophes et des guillemets
légitimes.

## Guide d'arrivée (page cachée)

`/{locale}/guide-arrivee` — l'itinéraire en photos, du col du Mollard à la boîte à clés.
Destiné aux voyageurs qui ont réservé ; son adresse leur est communiquée avec la réservation.

« Caché » veut dire trois choses, toutes nécessaires : `robots: { index: false, follow: false }`,
absence du sitemap, absence du header et du footer. La page n'est **pas** listée dans
`robots.txt` — un `Disallow` publierait justement l'adresse qu'on veut garder discrète.
Rien n'empêche qui que ce soit d'y accéder : il n'y a **aucun secret sur la page**, le code
de la boîte à clés est transmis par message et ne doit jamais y être écrit.

Conçue pour être lue sur un téléphone, à l'arrêt au bord de la route : une seule colonne,
photos pleine largeur au format d'origine, cibles tactiles d'au moins 48 px, et les numéros
d'urgence composables d'un doigt (ligne entière cliquable).

| Fichier | Rôle |
|---------|------|
| `lib/arrival.ts` | Étapes (clé + nom de fichier photo), repères du tableau électrique, numéros d'urgence. |
| `lib/i18n/dictionaries/{fr,en,es,it,de}.ts` | Bloc `guide` — tous les textes. |
| `public/images/guide-arrivee/` | Photos numérotées `01-` à `09-`. |

Les étapes sont appariées à leur photo **par nom de fichier**, pas par position : une photo
d'itinéraire doit montrer exactement l'endroit décrit, et insérer une étape ne doit pas
décaler silencieusement toutes les suivantes. Le numéro affiché, lui, est la position dans
`ARRIVAL_STEPS`.

Les couleurs de `PANEL_MARKERS` reprennent les cadres dessinés sur la photo du tableau
électrique : en changer une impose de refaire l'annotation de l'image.

Trois valeurs de la page viennent de `property.ts` et non des dictionnaires — le nombre de
marches (`access.steps`), le numéro de la porte (`unit`), qui est aussi celui du casier
à skis, et la distance du Sherpa (l'entrée `shops` de `DISTANCES`), reprise par la section
café. Les dictionnaires ne portent que les mots : `stairsNote`, `unitNote` et
`coffeeSupplies` sont des fonctions qui reçoivent le chiffre, ce qui laisse aussi chaque
langue tourner sa phrase autour.

Le manuel de la maison couvre le tableau électrique, l'interrupteur caché des radiateurs,
**le tiroir de la table où sont les couverts** — la question la plus posée du séjour — et
**le café** : Nespresso à capsules, cafetière filtre et moka italienne, avec quelques
capsules fournies pour l'arrivée et le renvoi vers l'article des commerces pour la suite.
Ce renvoi est un lien **sous** le paragraphe, pas dans la phrase : découper une phrase
autour d'un lien ne survit pas à cinq langues. C'est la même convention que le renvoi au
guide sous les activités (`activitiesMore`).

## Photos

Déposer les fichiers dans `public/images/` — les galeries se construisent seules
(`lib/photos.ts`, lecture du dossier au build).

### Saison × espace

Une photo de galerie porte **deux** coordonnées : la saison (dossier parent) et l'espace
(sous-dossier) — `hiver/balcon/`, `commun/chambre/`. Les deux axes se composent au lieu
de se disputer un seul dossier, ce qui permet au balcon d'avoir ses photos d'été *et*
d'hiver regroupées sous un seul titre dans la galerie.

| Fichier | Rôle |
|---------|------|
| `lib/spaces.ts` | `SPACES` — les espaces **dans l'ordre de la visite**, sans dépendance (importé aussi par le typage i18n). |
| `lib/photos.ts` | `listSpaces(dir)` lit les sous-dossiers ; `gallerySpaces(season)` fusionne les trois dossiers espace par espace. |
| `lib/gallery.ts` | Rapproche les photos (système de fichiers) des titres et équipements (dictionnaires). Côté serveur : la galerie reçoit des groupes déjà traduits. |
| `spaces.list` (dictionnaires) | Titre et équipements de chaque espace, exhaustif sur `SPACES` — un espace sans libellé ne compile pas. |

L'ordre des espaces est celui de la visite, pas l'ordre alphabétique : il est donc écrit
dans `SPACES` et non déduit du système de fichiers. Créer un espace demande le dossier,
sa clé et ses libellés FR/EN.

Le critère de répartition entre `hiver/`, `ete/` et `commun/` n'est pas intérieur/extérieur
mais **est-ce que la saison se voit sur la photo**. Dans chaque espace, l'ordre reste
`[saison en cours, commun, autre saison]` : les photos de `commun/` n'ont jamais besoin
d'être dupliquées.

### La galerie a deux états

Repliée, elle montre **une vignette par espace** avec son nom et son nombre de photos :
on voit ce que contient le logement, balcon et extérieur compris, là où « les 8 premières
photos » les laissait hors champ. Dépliée, c'est la visite complète, chaque espace suivi
de ses équipements. La visionneuse, elle, parcourt les photos à plat dans l'ordre de la
visite — ouvrir « Balcon » puis continuer à la flèche déroule la suite.

Le **hero est découplé de cet ordre** : il est désigné par `espace/nom-de-fichier` dans
`HERO_PHOTOS` (`lib/property.ts`), avec repli sur la première photo de la visite. Changer
la tête de galerie n'impose donc pas de changer le hero, et réciproquement. Même forme
pour `SLEEPING_PHOTOS`, `LINEN_PHOTOS` et `BABY_KIT_PHOTO`.

`activites-hiver/` et `activites-ete/` illustrent les encarts « activités » des pages de
saison, appariés **par position** avec la liste `seasons.<saison>.activities` du
dictionnaire. Changer l'ordre des activités impose de renuméroter les fichiers, et il
faut **autant de photos numérotées que d'activités** : une activité sans photo devient un
bloc de texte au milieu d'une grille d'images. La quatrième photo d'hiver
(`04-soiree-albiez-c-show-…`) est une copie de la couverture de l'article correspondant —
`public/images/blog/` sert les articles, `activites-*/` sert les pages de saison, et les
deux dossiers restent indépendants.

Un fichier préfixé par `_` reste dans le dossier mais n'est pas publié : c'est le moyen
d'écarter une photo sans la supprimer. `getPhoto(dir, fileName)` permet malgré tout de
charger un fichier précis — c'est ainsi que les mosaïques des cartes de saison
(`_mosaique-hiver.jpg`, `_mosaique-ete.jpg`) sont utilisées sans polluer les galeries.

Voir `public/images/README.md`.

### Aucune photo n'est recadrée

`listPhotos()` relève les dimensions de chaque fichier au build (lecture de l'en-tête
via `image-size`) et expose `width`, `height` et `ratio`. Les composants s'en servent
pour que **le conteneur prenne le format de l'image**, jamais l'inverse :

- **Encarts d'activités** — `style={{ aspectRatio: photo.ratio }}`. La moitié de ces
  photos sont en 1:1 ; un cadre 16:9 leur coupait 44 % de la hauteur.
- **Galeries** — disposition en colonnes (`columns-2/3/4` + `break-inside-avoid`), chaque
  vignette en `h-auto w-full`. Les portraits et les carrés cohabitent sans recadrage.
- **Cartes de saison** — cadre carré imposé, mais `object-contain` : ce sont des
  mosaïques, un recadrage couperait dans les vignettes qui les composent.
- **Hero** — la photo prend son propre format, plafonné à `70vh` pour qu'il reste
  quelque chose de visible sous la bannière. `object-cover` ne recadre donc que sur
  les écrans très larges.

Ajouter une photo d'un format inhabituel ne demande donc aucun ajustement.

### Le hero ne pose pas de texte sur la photo

Le titre vit dans une carte blanche opaque qui chevauche le bas de l'image. La première
version assombrissait toute la photo pour faire passer du texte blanc par-dessus : la
photo devenait terne alors que c'est elle qui vend le logement. La carte règle les deux
problèmes — la photo garde ses couleurs, le texte a son propre fond et reste lisible
quelle que soit l'image placée derrière.

Conséquence pratique : **aucune contrainte de luminosité ou de zone calme** sur les
photos de couverture. Une photo très claire ou très chargée convient.

## À faire

- [ ] **`ssoProtection`** — à remettre sur `all_except_custom_domains` maintenant que le
      domaine est en service (voir la section « Déploiement »).
- [x] **Google Search Console** — propriété de type **Domaine** validée le 2026-08-31 par
      enregistrement `TXT` à la racine (voir « Domaine »). Elle couvre l'apex, le `www` et
      tous les sous-domaines d'un coup, ce qu'une propriété « préfixe d'URL » n'aurait pas
      fait. **Ne pas ajouter de balise `google-site-verification`** dans le layout : la
      validation par DNS la rend inutile, contrairement à Barbusse qui en porte deux. Reste à
      soumettre `sitemap.xml` dans Indexation → Sitemaps (105 URLs, HTTP 200 vérifié).
- [ ] **Guide** — 17 articles en ligne dans les cinq langues. Restent à vérifier avant la
      haute saison : les horaires des commerces et du centre équestre, et l'horaire exact de
      l'Albiez C'Show, qui changent chaque année — **et dans les cinq langues à la fois**.
      Dix articles ont une couverture dédiée dans `public/images/blog/` ; les sept autres
      empruntent encore au dossier `activites-*` (randonnées, ESF, domaine skiable, famille,
      lac, Aiguilles d'Arves, équitation). Chaque article a bien une couverture distincte —
      à remplacer au fil de l'eau par des visuels propres.
- [ ] **Relecture native DE / ES / IT** — les traductions sont écrites depuis le français.
      Le corps des articles et l'interface tiennent la route ; ce sont les `seo.title`,
      `seo.description` et `keywords` qui méritent l'œil d'un locuteur du marché avant la
      haute saison. C'est là que se joue le retour, et c'est là qu'une traduction correcte
      mais non idiomatique ne se voit pas.
- [ ] **Poids du bundle client** — `lib/i18n/context.tsx` importe statiquement **tous** les
      dictionnaires : chaque visiteur télécharge les cinq. On ne peut pas simplement passer
      `getDictionary(locale)` en prop depuis le serveur, le dictionnaire contenant
      24 fonctions de formatage, et une fonction ne traverse pas la frontière RSC. Le
      correctif propre (sortir les formateurs dans un module par langue, ne passer que les
      chaînes) touche une trentaine d'appels : à mesurer sur un rapport de bundle avant de
      s'y engager.
- [ ] **Carte Leaflet** — la section situation utilise pour l'instant un lien Google Maps.
- [ ] **Tarif du ménage** — 60 € est enregistré dans `PROPERTY.services.cleaningFee` mais
      n'est affiché nulle part. Ce n'est plus une attente : le tunnel Beds24 facture ce montant
      et son total de première page l'inclut désormais (« Total including obligatory »). À
      trancher — l'annoncer sur la vitrine renseigne le visiteur, mais affiche un frais avant
      qu'il ait vu un prix.

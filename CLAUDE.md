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
| `scripts/rotation-samedi.mjs [--appliquer\|--annuler]` | Pose au calendrier Beds24 l'interdiction d'arriver et de partir un autre jour que le samedi pendant les vacances scolaires d'hiver. Simulation par défaut. Voir *Rotation du samedi*. |

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

### Rotation du samedi (vacances scolaires d'hiver)

Pendant les vacances d'hiver, on ne loue qu'en semaine complète du samedi au samedi. La règle
est posée **une seule fois, au calendrier Beds24**, par l'override quotidien
`noCheckInOrCheckOut` sur tous les jours qui ne sont pas un samedi — et de là elle part sur
les trois canaux : Booking.com (*closed to arrival / closed to departure*), Airbnb (CTA/CTD,
envoyés quel que soit le sync type) et le moteur de réservation direct.

**Pourquoi pas les cases « Check-in / Check-out Allowed » d'un Fixed Price**, qui font la même
chose sur le papier : les prix d'Albiez viennent de Beyond Pricing, qui écrit `price1` et
`minStay` au calendrier. Un Fixed Price « vacances scolaires » ferait deux sources de prix sur
les mêmes dates. Par ailleurs l'API v2 n'expose pas les tarifs mais expose bien l'override, et
le marquage des jours barrés sur la page de réservation (CSS `.datenci` / `.datenco`) ne
fonctionne **que** pour des règles posées au calendrier. Beyond ne touche jamais à `override` :
les deux écritures cohabitent.

Les périodes viennent de `data/vacances-scolaires.json` (toutes zones fusionnées), coupées à la
fenêtre `WINTER_OPENING` de `lib/seasons.ts` — hors saison de ski, la rotation du samedi ferme
des courts séjours sans rien protéger. La restriction **déborde d'une semaine** : elle court
jusqu'au vendredi qui précède la rotation suivant le dernier samedi du bloc, pour que la
dernière semaine vendue en vacances soit protégée jusqu'à son terme. Sans ce débordement, un
voyageur arrive le dimanche d'après et occupe la semaine en travers, rendant le dernier samedi
invendable.

**Posé dans Beds24 le 2026-09-01, à la main**, pour l'hiver 2026-27 : 20-25/12, 27/12-01/01,
puis 07/02 → 12/03. Rotations libres les 19/12, 26/12, 02/01, 06/02, 13/02, 20/02, 27/02,
06/03 et 13/03. La semaine du 02/01 n'a pas reçu le débordement (03-08/01) : elle est déjà
occupée par une réservation 05→11/01 hors rotation, il n'y a plus rien à y protéger. C'est le
seul écart entre le calendrier réel et ce que propose le script.

⚠️ Écrire demande le scope **`write:inventory`**, absent du `BEDS24_REFRESH_TOKEN` actuel
(vérifié le 2026-09-01). Le script le contrôle avant d'écrire et s'arrête proprement ; il faut
sinon régénérer un token avec ce scope.

**Le calendrier du site reflète ces règles**, il ne les déduit pas : `contraintes()` lit
`includeOverride` dans le même appel que le séjour minimum et renvoie `sansArrivee` /
`sansDepart`, que `/api/disponibilites` sert au composant. Aucun test sur le jour de la
semaine côté site — la règle vit dans Beds24, et deux définitions divergeraient à la première
exception.

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

## Beds24 — deux tokens, et le piège de l'invite code

| Variable | Nature | Scopes | Sert à |
|---|---|---|---|
| `BEDS24_REFRESH_TOKEN` | refresh token | lecture + `write:bookings` | Dashboard, consignes de ménage |
| `BEDS24_PUBLIC_REFRESH_TOKEN` | refresh token | `read:inventory`, `read:properties` | **Uniquement** `/api/disponibilites` |

`deviceName` respectifs : `albiez-aiguilles-site` et `albiez-site-public`. Ils apparaissent
dans *Beds24 → Settings → Apps & Integrations → API → Refresh Tokens*.

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
statistiques et calendrier — protégées par un mot de passe unique et un JWT en cookie
(`lib/auth.ts`, repris de Barbusse).

### Deux layouts racines

`app/(site)/[locale]/layout.tsx` et `app/(dashboard)/layout.tsx` écrivent chacun leur
`<html lang>`. Next n'accepte plusieurs layouts racines que si **chacun vit dans un groupe de
routes** — c'est la raison du déplacement de `app/[locale]` vers `app/(site)/[locale]`. Les
parenthèses n'apparaissent pas dans les URLs, `/fr` et `/dashboard` sont inchangés.

### `Sejour`, et non `Beds24Booking`

Le type canonique est `Sejour` (`lib/dashboard-types.ts`) : **les deux sources s'y ramènent**,
l'archive comme le live. Barbusse fait l'inverse et donne à son archive la forme
`Beds24Booking` ; impossible ici, nos séjours archivés n'ayant ni `id` numérique, ni
`propertyId`, ni nom de voyageur. Les inventer pour satisfaire un type serait fabriquer des
données.

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

`Sejour.surcollecteTaxe` porte `{ collectee, due, ecart }` dès qu'un séjour comporte des
mineurs **et** qu'une ligne de taxe figure sur sa facture. Le calcul est un simple ratio :
les mineurs étant exonérés et le barème assis sur le coût *par personne*, le dû vaut le
collecté rapporté à la part des adultes. Vérifié : 24,50 € pour 4 adultes + 2 enfants donne
16,33 € dus et 8,17 € de trop — les mêmes chiffres que ceux dérivés du barème 3CMA par un
chemin indépendant.

L'écart s'affiche dans la fiche d'un séjour, sur le calendrier du dashboard : c'est l'endroit
où l'on ouvre une réservation pour agir dessus. Jamais pour le rôle `menage`.

Deux points de fragilité, assumés :

- **La ligne de taxe se reconnaît au libellé** (`/taxe de s[eé]jour/i`) et non au `subType` :
  Beds24 range la taxe parmi les extras, au même `subType: 11` que le ménage et le linge, seul
  l'hébergement ayant un code propre (`8`). Renommer l'upsell item 3 dans Beds24 fait
  disparaître la correction de l'affichage — un silence, pas un faux montant.
- **Le chemin complet attend une première réservation directe avec mineurs.** Aucune n'existe
  encore : les séjours Airbnb et Booking ne portent pas de ligne de taxe, donc le champ vaut
  `null` partout aujourd'hui, ce qui est le bon comportement mais ne teste que la branche
  négative.

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

### Calendrier (`/dashboard/calendrier`)

Rendu repris du calendrier du Mans : barres continues par-dessus la grille, réparties en
lignes à l'intérieur de chaque semaine. Le fond des cases porte la saison de la station (bleu
domaine ouvert, ambre saison du lac), une rangée de barres porte les vacances scolaires par
zone et les semaines de fêtes, une autre les séjours.

**Les demi-cellules sont le point délicat.** Une barre qui se termine le jour J n'occupe que
la moitié gauche de sa case, une barre qui commence le jour J que la moitié droite. Deux
séjours qui s'enchaînent le même jour partagent donc une ligne au lieu de s'empiler — ce qui
est le cas courant en pleine saison.

### Deux rôles : `admin` et `menage`

| | `admin` | `menage` |
|---|---|---|
| Statistiques | oui | **redirigé vers le calendrier** |
| Montants et canaux | oui | **absents de la réponse d'API**, pas seulement de l'écran |
| Consignes de ménage | écriture | **lecture** |
| Jours de départ | — | marqués `MÉNAGE` dans la case |

Les mots de passe : `DASHBOARD_PASSWORD` pour l'admin, et **toute** variable commençant par
`DASHBOARD_PASSWORD_MENAGE` pour le ménage — ce qui permet d'en donner un par personne
(`DASHBOARD_PASSWORD_MENAGE_Sylvie`) et d'en révoquer un sans changer celui des autres.

⚠️ Le filtrage est fait **côté serveur** : le proxy bloque les pages, et
`/api/dashboard/calendrier` remet les montants à zéro avant d'envoyer. Masquer côté client
laisserait les chiffres dans le navigateur.

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

Seules les réservations **vivantes** sont annotables : un séjour archivé n'existe plus dans
Beds24. L'interface le dit au lieu d'afficher un champ qui échouerait.

Deux pièges de l'API, tous deux traités :
- Beds24 répond parfois **200 avec `success: false`** dans le tableau de retour. Sans lire le
  corps, l'interface affiche « enregistré » alors que rien ne l'a été.
- La lecture des réservations est mise en cache 60 s. Le calendrier passe donc en
  `cache: "no-store"` : sans ça, une consigne enregistrée restait invisible une minute, et la
  personne du ménage qui rafraîchissait voyait l'ancienne version.

### Le graphe est écrit portable

`components/dashboard/RevenueChart.tsx` ne connaît ni Albiez, ni Beds24, ni les canaux : il ne
lit que `RevenueChartData`. **Barbusse doit le reprendre** quand il aura assez d'années à
comparer — il n'aura qu'à produire la même forme. Les barres sont côte à côte parce qu'elles
n'ont **pas de `stackId`** ; en ajouter un les empilerait.

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
| `BEDS24_REFRESH_TOKEN` | Échangé contre un access token de 24 h. Voir la section Beds24. |
| `BEDS24_PROPERTY_ID` | Propriété `346417`, jamais en dur. |
| `HISTORIQUE_ALBIEZ` | Archive des quatre canaux, forme compacte produite par `build-archive.mjs`. |
| `DASHBOARD_PASSWORD` | Mot de passe administrateur. |
| `DASHBOARD_PASSWORD_MENAGE_*` | Un mot de passe par personne du ménage. Le suffixe est libre et n'est là que pour savoir à qui appartient la ligne. |
| `DASHBOARD_SECRET` | Secret de signature du JWT (HS256). |

**Les cinq sont posées en production** depuis le 2026-08-29, et vérifiées de bout en bout :
mot de passe refusé puis accepté, archive chargée depuis la variable, Beds24 joignable depuis
Vercel, chiffres identiques au local.

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

`proxy.ts` à la racine (nom de Next 16, `middleware.ts` étant déprécié) ne traite que `/` :
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
de page unique, et le **JSON-LD `Apartment` déclaré sur la seule page d'accueil** (une
seule entité pour un seul logement — ne pas le dupliquer sur les pages de saison).

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
3. Trois variables CSS (`--season-accent*`) redéfinies par `[data-season]` dans
   `app/globals.css`. Toutes les utilitaires `*-accent` du sous-arbre suivent.

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
schema.org, qui pilote les étoiles dans les résultats Google.

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

`/{locale}/guide` — 17 articles dans les cinq langues sur Albiez-Montrond : randonnées
balisées, domaine skiable, loueurs, ESF, commerces, fromagerie coopérative, lac, col du
Mollard, refuge, activités d'été. Soit 85 pages d'article.

| Fichier | Rôle |
|---------|------|
| `lib/blog/posts.ts` | `BLOG_POSTS` — slug, date, photo, saison, et les métadonnées par langue (titre, description, excerpt, keywords). Plus `relatedPosts()` et `splitImagePath()`. |
| `lib/blog/content/{fr,en,de,es,it}/<slug>.tsx` | Le corps de l'article, en JSX presque nu. Les `<Link>` internes sont préfixés en dur par la langue du fichier — y compris les liens de saison, qui prennent le slug localisé (`/de/sommer`, `/es/verano`, `/it/estate`). |
| `app/[locale]/guide/page.tsx` | Index — résout les photos côté serveur et passe les cartes au filtre. |
| `components/public/GuideFilter.tsx` | Filtre de saison + grille de cartes (composant **client**). |
| `app/[locale]/guide/[slug]/page.tsx` | Article + JSON-LD + encart de réservation + « À lire aussi ». |
| `lib/blog/ArticleImage.tsx` | Photo au fil d'un article (`<ArticleImage src="dossier/fichier.jpg" alt caption />`). Même traitement que les couvertures : dimensions relevées au build, aucun recadrage, figure absente si le fichier manque. |
| `.prose-article` (`app/globals.css`) | Toute la typographie du corps d'article, plus la classe `.facts` des encadrés pratiques. |

**Le slug est commun aux cinq langues**, contrairement aux slugs de saison : un article
n'existe qu'à une seule adresse par langue, et les cinq se déclarent mutuellement en
`hreflang`. Cela évite de maintenir une table de correspondance pour du contenu qui n'a pas
d'équivalent « naturel » dans les autres langues.

Les composants d'article sont **importés paresseusement** dans `CONTENT` (`[slug]/page.tsx`) :
quatre-vingt-cinq imports en tête de fichier pour n'en rendre qu'un seul alourdiraient
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
s'additionnent pas (17 / 11 / 12) — un encart l'explique dès qu'une saison est
sélectionnée.

Le filtre étant client, l'index résout les photos côté serveur et passe des cartes déjà
mesurées. Les **17 cartes sont dans le HTML initial** (le filtre part sur « tout »), donc
le filtrage ne coûte rien au référencement.

**Ajouter un article** : une entrée dans `BLOG_POSTS` (cinq blocs de métadonnées), cinq
fichiers dans `content/{fr,en,de,es,it}/`, une entrée de cinq lignes dans `CONTENT`. Le
sitemap et l'index suivent tout seuls. Avancer **article par article, les cinq langues d'un
coup** : les articles sont indépendants, et une entrée de `CONTENT` oubliée ne se voit pas.

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
| `lib/i18n/dictionaries/{fr,en}.ts` | Bloc `guide` — tous les textes. |
| `public/images/guide-arrivee/` | Photos numérotées `01-` à `09-`. |

Les étapes sont appariées à leur photo **par nom de fichier**, pas par position : une photo
d'itinéraire doit montrer exactement l'endroit décrit, et insérer une étape ne doit pas
décaler silencieusement toutes les suivantes. Le numéro affiché, lui, est la position dans
`ARRIVAL_STEPS`.

Les couleurs de `PANEL_MARKERS` reprennent les cadres dessinés sur la photo du tableau
électrique : en changer une impose de refaire l'annotation de l'image.

Deux valeurs de la page viennent de `property.ts` et non des dictionnaires — le nombre de
marches (`access.steps`) et le numéro de la porte (`unit`), qui est aussi celui du casier
à skis.

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

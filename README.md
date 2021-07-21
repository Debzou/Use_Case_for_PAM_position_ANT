# Objectif 1 : Création d'une pipeline de donnée

## Comment ?

Création d'un stream en ce basant sur tweepy via l'api tweeter.

## Limiter le flux 

Le flux reçu contient un grand nombre de données (tweet). C'est pourquoi je me suis concentré uniquement sur les tweets de plus de 1000 retweets afin d'éviter les tweets non approprié.

Par contre la localisation est récupérer sur tout les tweets (approprié ou non) dans le but de faire une tweeter map et ainsi pouvoir faire des analyses en profondeur.

Ensuite je stocke les tweets pertinants et la localisation dans une base de donnée NoSql (type MongoDB)

# Objectif 2 : Création de l'API

L'API permet de communiquer a la base de données

```python
@app.route("/hastage/<GRANULARITY>",methods=['GET'])
  
@app.route("/location",methods=['POST','GET'])

@app.route("/hastage",methods=['POST'])
```
# Objectif 3 : Le fontend

Création d'un dashboard qui permet de visualiser tout les tweets sur une carte. 
Mais aussi de faire un nuage de mot sur les tweets les plus pertinant ( en fonction du mois , heure et minute )

# Architecture global 

![archi](architecture.png)
# Notice 





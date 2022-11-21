# Musicols (Name in Progress)
Cis5500 Final Project - Group 5

Authors: Tasos Panagopoulos, Aviel Resnick, Nathan Sobotka, Joshua Valluru

## Table of contents
* [Motivation](#motivation)
* [Project Description](#description)
* [Dataset Overview](#datasets)
* [Structure](#structure)

## Motivation
Motivated by our common use of Spotify and interest in music, we decided to create a website that allows a user to interact with music data on Spotify. We aim to visualize trends in music across time, geography, and genres, and provide a platform for learning about your favorite artists.

## Description
Users will be able to pass parameters such as location, genre, artist, etc. and find out information about popularity metrics, similar songs, or the general mood of the song choice. In addition to learning and visualizing trends in music, we will use the data to generate new music suggestions for the user, based on their liked artists, songs, and genres. This solves the problem of music recommendation, and also answers questions relating music preferences to geographic conditions, and popularity of songs across regions and time.

## Datasets
The database spans three datasets obtained from Kaggle:
* "Spotify 1.2M+ Songs" by RODOLFO FIGUEROA
* "Spotify Charts" by DHRUVIL DAVE
* "Music artists popularity" by PIOTR 
	
## Structure
The current directory layout is as follows:
* Queries.txt: Implementations and Descriptions of planned database queries
* Cleaning.py: Pre-processing functions
* Website
  * Client: Stores the javascript for the core website implementaion, pages, etc. 
  * Docs: Documentation about the structure of the database.
  * Server: Stores backend code, e.g. server.js, route.js, and server configuration files.



library(tidyverse)
library(tidyjson)

#-------------------------
tmdb_raw <- read_lines(paste(
  "http://files.tmdb.org/p/exports/tv_series_ids_",
  format(Sys.time() - 60 * 60 * 24, "%m_%d_%Y"), # Get *yesterday's* tmdb file export. (Daily releases happen each day at 8am UTC)
  ".json.gz",
  sep = ""
))
tmdb <- tmdb_raw %>%
  spread_all() %>% # Parses all the JSON
  mutate(original_name = tolower(original_name)) # Lowercase names. Avoids dupes + speeds up sql queries

tmdb_deduped <- tmdb %>%
  group_by(original_name) %>%
  arrange(-popularity, id) %>% # Sort by popularity (then id)
  slice(1) # Take the top result

tmdb_clean <- tmdb_deduped %>% select(id, original_name, popularity)
#-----------------------


#-----------------------
imdb_ratings <- read_tsv("https://datasets.imdbws.com/title.ratings.tsv.gz")
imdb_episode_details <- read_tsv("https://datasets.imdbws.com/title.episode.tsv.gz", na = "\\N")

imdb_e <- imdb_episode_details %>%
  drop_na(seasonNumber, episodeNumber) %>%
  left_join(imdb_ratings, by = "tconst") %>%
  rename(episode_id = tconst, show_id = parentTconst, season = seasonNumber, episode = episodeNumber, average_rating = averageRating, num_votes = numVotes)

imdb_e_trimmed <- imdb_e %>%
  group_by(show_id) %>%
  filter(n() <= 2000) %>% # No shows with more than 2000 episodes
  filter(all(episode <= 2000)) %>% # No shows with episode numbers above 2000
  filter(mean(num_votes, na.rm = TRUE) >= 10) %>% # Take only shows whose *rated* episodes have a mean vote count >= 10
  arrange(season, episode) %>%
  mutate(absolute_episode = row_number())

imdb_e_clean <- imdb_e_trimmed
#-----------------------


#-----------------------
imdb_s <- imdb_ratings %>%
  semi_join(imdb_e_clean, by = c("tconst" = "show_id")) %>%
  rename(show_id = tconst, average_rating = averageRating, num_votes = numVotes)
imdb_s_clean <- imdb_s
#-----------------------


#-----------------------
library(DBI)
library(RPostgres)
# Connect to the default postgres database
con <- dbConnect(RPostgres::Postgres(), dbname = "test_db", host = "localhost", port = "5432", user = "postgres", password = "example")

#---
con %>% dbWriteTable("imdb_episodes", imdb_e_clean, overwrite = T, field.types = c(
  episode_id = "CHAR(10) primary key",
  show_id = "CHAR(10) NOT NULL",
  season = "SMALLINT NOT NULL",
  episode = "SMALLINT NOT NULL",
  absolute_episode = "SMALLINT NOT NULL",
  average_rating = "NUMERIC(3,1)",
  num_votes = "INTEGER"
))
con %>% dbExecute("CREATE INDEX IF NOT EXISTS imdb_episodes_show_id ON imdb_episodes (show_id)")

#---
con %>% dbWriteTable("imdb_shows", imdb_s, overwrite = T, field.types = c(
  show_id = "CHAR(10) primary key",
  average_rating = "NUMERIC(3,1)",
  num_votes = "INTEGER"
))
con %>% dbExecute("CREATE INDEX IF NOT EXISTS imdb_shows_show_id ON imdb_shows (show_id)")

#---
con %>% dbWriteTable("tmdb", tmdb_clean, overwrite = T, field.types = c(
  id = "CHAR(7) primary key",
  original_name = "VARCHAR(127)",
  popularity = "numeric(9,3)"
))
con %>% dbExecute("CREATE INDEX IF NOT EXISTS tmdb_og_name ON tmdb (original_name)")


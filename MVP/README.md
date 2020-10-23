# Minimum Viable Product

MVP of a coverage guided fuzzer for testing client-side javascript running in headless chromium.

### Install & Run

- Install Python (3.8 recommended, 3.7 should be fine)

~~~
python3 -m venv venv
. ./venv/bin/activate
pip install -r requirements.txt
in the gitroot/MVP folder in new tab: python3 -m http.server
./main.py
~~~

Corpus should contain items, after maybe 1 minutes the letter 'B' should be in the corpus

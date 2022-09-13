import sys
import en_core_web_sm
import json
from bs4 import BeautifulSoup

import codecs

nlp = en_core_web_sm.load()

def get_named_entities(text):
    entities = {}
    doc = nlp(text)
    for entity in doc.ents:
        if entity.label_ in entities:
            entities[entity.label_].append(entity.text)
        else:
            entities[entity.label_] = [entity.text]
    return entities

def remove_tags(html):
    # parse html content
    soup = BeautifulSoup(html, "html.parser")
    for data in soup(['style', 'script']):
        # Remove tags
        data.decompose()
    # return data by retrieving the tag content
    return ' '.join(soup.stripped_strings)


webpage_path =  sys.argv[1] 
source_document = codecs.open(webpage_path, 'r').read()
bare_document = remove_tags(source_document)
named_entities = get_named_entities(bare_document)
json_object = json.dumps(named_entities, indent=4) 


with open('tmp/named-entities.json', "w") as outfile:
    outfile.write(json_object)

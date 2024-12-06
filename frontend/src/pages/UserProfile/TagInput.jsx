import React, { useState } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

function GenreTagsInput({ genres }) {
  const [tags, setTags] = useState([]);
  const [suggestions, setSuggestions] = useState(genres.map(genre => ({ id: genre, text: genre })));

  const handleDelete = i => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = tag => {
    setTags([...tags, tag]);
  };

  return (
    <ReactTags tags={tags}
               suggestions={suggestions}
               handleDelete={handleDelete}
               handleAddition={handleAddition}
               delimiters={delimiters}
               autocomplete />
  );
}

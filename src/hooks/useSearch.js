import { useState, useMemo } from 'react';

function useSearch(items) {
  const [query, setQuery] = useState('');
  const [subject, setSubject] = useState('');

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesQuery =
        !query ||
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.author.toLowerCase().includes(query.toLowerCase());
      const matchesSubject = !subject || item.subject === subject;
      return matchesQuery && matchesSubject;
    });
  }, [items, query, subject]);

  const subjects = useMemo(
    () => [...new Set(items.map((i) => i.subject))],
    [items],
  );

  return { filtered, query, setQuery, subject, setSubject, subjects };
}

export default useSearch;

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './SearchResults.module.css';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResults = ({ posters = [] }) => {
  const [searchQuery, setSearchQuery] = useState(useQuery().get('query') || '');
  const [dateFilter, setDateFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [topicFilter, setTopicFilter] = useState('');

  // Mock fallback data if no posters passed in
  const samplePosters = posters.length ? posters : [
    { title: 'Youth Violence and Social Media', summary: 'Exploring the correlation...', date: '2025', category: 'poster', topic: 'criminology', link: '#' },
    { title: 'Forensic Trends in 2024', summary: 'A dive into emerging tech...', date: '2024', category: 'article', topic: 'forensics', link: '#' }
  ];

  const filteredPosters = samplePosters.filter((poster) => {
    const matchesQuery = searchQuery
      ? poster.title.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesDate = dateFilter ? poster.date === dateFilter : true;
    const matchesCategory = categoryFilter ? poster.category === categoryFilter : true;
    const matchesTopic = topicFilter ? poster.topic === topicFilter : true;

    return matchesQuery && matchesDate && matchesCategory && matchesTopic;
  });

  return (
    <div className={styles.gallery}>
      <div className={styles.filtersContainer}>
        <input 
          type="text" 
          placeholder="Search publications..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          className={styles.searchInput} 
        />
        <select onChange={(e) => setDateFilter(e.target.value)} value={dateFilter}>
          <option value="">All Dates</option>
          {/* Other date options */}
        </select>
        <select onChange={(e) => setCategoryFilter(e.target.value)} value={categoryFilter}>
          <option value="">All Categories</option>
          {/* Other category options */}
        </select>
        <select onChange={(e) => setTopicFilter(e.target.value)} value={topicFilter}>
          <option value="">All Topics</option>
          {/* Other topic options */}
        </select>
      </div>

      <div className={styles.grid}>
        {filteredPosters.map((poster, index) => (
          <div key={index} className={styles.card}>
            <h3 className={styles.cardTitle}>{poster.title}</h3>
            <p className={styles.cardSummary}>{poster.summary}</p>
            <a href={poster.link} className={styles.viewLink} target="_blank" rel="noopener noreferrer">
              View Publication
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;

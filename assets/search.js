'use strict';

const dictionary = []; // Define a global variable for spell-check suggestions

// Define high-priority terms for Decentraland
const HIGH_PRIORITY_TERMS = new Set([
  'wearables', 'emotes', 'scene', 'crypto', 'mana', 'build', '3d',
  'explore', 'name', 'land', 'world', 'wallet', 'address', 'event',
  'places', 'notifications'
]);

{{ $searchDataFile := printf "%s.search-data.json" .Language.Lang }}
{{ $searchData := resources.Get "search-data.json" | resources.ExecuteAsTemplate $searchDataFile . | resources.Minify | resources.Fingerprint }}

(function () {
  const searchDataURL = '{{ $searchData.RelPermalink }}';
  const input = document.querySelector('#book-search-input input');
  const searchOverlay = document.querySelector('#search-overlay')
  const resultsContainer = document.querySelector('#book-search-hits');
  const results = document.querySelector('#book-search-results ul');
  const LIMIT_RESULTS = Infinity
  const MIN_INPUT_SIZE = 2 // SDK ✅
  const documents = new Map()

  if (!input) {
    return
  }

  // Helper function to clean search input
  function cleanSearchInput(text) {
    // First split by spaces to handle each word separately
    return text.split(' ')
      .map(word => {
        // Check if the word matches a coordinate pattern
        if (/^-?\d+,-?\d+$/.test(word)) {
          return word; // Keep coordinates as is
        }
        // For non-coordinate words, remove punctuation
        return word.replace(/[?!.;:'"()\[\]{}]/g, '');
      })
      .join(' ')
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim();
  }

  // Listeners
  input.addEventListener('focus', init);
  input.addEventListener('keyup', search);
  document.addEventListener('keypress', focusSearchFieldOnKeyPress);
  searchOverlay.addEventListener('click', () => {
    hideSearchBox()
  })


  /**
   * @param {Event} event
   */
  function focusSearchFieldOnKeyPress(event) {
    if (event.target.value !== undefined) {
      return;
    }

    if (input === document.activeElement) {
      return;
    }

    const characterPressed = String.fromCharCode(event.charCode);
    if (!isHotkey(characterPressed)) {
      return;
    }

    input.focus();
    event.preventDefault();
  }

  /**
   * @param {String} character
   * @returns {Boolean}
   */
  function isHotkey(character) {
    const dataHotkeys = input.getAttribute('data-hotkeys') || '';
    return dataHotkeys.indexOf(character) >= 0;
  }

  function init() {
    input.removeEventListener('focus', init); // init once
    input.required = true;
    fetch(searchDataURL)
      .then(pages => pages.json())
      .then(pages => {
        window.lunrIdx = lunr(function() {
          this.ref('id')
          this.field('title', { boost: 10 })
          this.field('content')
          this.field('href')
          this.metadataWhitelist = ['position']
          for (const page of pages) {
            documents.set(page.id, page)
            this.add(page);
          }
        })
      })
      .then(() => input.required = false)
      .then(search);
  }

  function search() {
    const value = cleanSearchInput(input.value);
    if (input.required) { return; }
    while (results.firstChild) { results.removeChild(results.firstChild); }
    if (!value || value.length <= MIN_INPUT_SIZE) { hideSearchBox(); return; }

    // Split search terms and filter out very short terms for complex searches
    const terms = value.split(' ');
    const commonShortWords = new Set(['a', 'an', 'the', 'is', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by']);
    const filteredTerms = terms.filter(term => {
      // Keep common short words
      if (commonShortWords.has(term.toLowerCase())) return true;
      // If it's a single term search, use the original MIN_INPUT_SIZE
      if (terms.length === 1) return term.length > MIN_INPUT_SIZE;
      // For complex searches, require at least 3 characters
      return term.length > 2;
    });

    // If all terms were filtered out, show no results
    if (!filteredTerms.length) {
      showSearchBox();
      resultCard(`Not Found`, `Please use at least ${MIN_INPUT_SIZE} characters for single word searches, or 3 characters for complex searches`);
      return;
    }
    
    // Try different search strategies and combine results
    function getAllHits(terms, fuzzy) {
      const allHits = new Map(); // Use Map to avoid duplicates
      
      // Strategy 0: Exact title match (highest priority)
      // This ensures we find documents with exact title matches
      const titleQuery = terms.map(term => `+title:${term}`).join(' ');
      try {
        const titleHits = window.lunrIdx.search(titleQuery);
        titleHits.forEach(hit => {
          allHits.set(hit.ref, { 
            ...hit, 
            score: hit.score * 4.0,
            matchType: 'title'
          });
        });
      } catch (e) {
        console.log('Title search error:', e);
      }

      // Strategy 1: All words match (high priority) - Modified to be more flexible
      // First try with all words required
      const allWordsQuery = terms.map(term => `+${term}`).join(' ');
      try {
        const allWordsHits = window.lunrIdx.search(allWordsQuery);
        allWordsHits.forEach(hit => {
          if (!allHits.has(hit.ref)) {
            allHits.set(hit.ref, { 
              ...hit, 
              score: hit.score * 3.0,
              matchType: 'allWords'
            });
          }
        });
      } catch (e) {
        console.log('All words search error:', e);
      }

      // Then try with at least one significant word (more than 3 chars) required
      const significantTerms = terms.filter(term => term.length > 3);
      if (significantTerms.length > 0) {
        const significantQuery = significantTerms.map(term => `+${term}`).join(' ');
        try {
          const significantHits = window.lunrIdx.search(significantQuery);
          significantHits.forEach(hit => {
            if (!allHits.has(hit.ref)) {
              allHits.set(hit.ref, { 
                ...hit, 
                score: hit.score * 2.5, // Slightly lower score than all words
                matchType: 'significantWords'
              });
            }
          });
        } catch (e) {
          console.log('Significant words search error:', e);
        }
      }

      // Strategy 2: Word boundary match (high priority)
      // This ensures we match whole words
      const boundaryQuery = terms.map(term => `+${term}\\b`).join(' ');
      try {
        const boundaryHits = window.lunrIdx.search(boundaryQuery);
        boundaryHits.forEach(hit => {
          if (!allHits.has(hit.ref)) {
            allHits.set(hit.ref, { 
              ...hit, 
              score: hit.score * 2.0,
              matchType: 'boundary'
            });
          }
        });
      } catch (e) {
        console.log('Boundary search error:', e);
      }

      // Strategy 3: Prefix match (medium priority)
      // This helps with partial word matches
      const prefixQuery = terms.map(term => `+${term}*`).join(' ');
      try {
        const prefixHits = window.lunrIdx.search(prefixQuery);
        prefixHits.forEach(hit => {
          if (!allHits.has(hit.ref)) {
            allHits.set(hit.ref, { 
              ...hit, 
              score: hit.score * 1.5,
              matchType: 'prefix'
            });
          }
        });
      } catch (e) {
        console.log('Prefix search error:', e);
      }

      // Strategy 4: Fuzzy match (lowest priority)
      // This helps with typos and variations
      if (fuzzy) {
        const fuzzyQuery = terms.map(term => `+${term}~1`).join(' ');
        try {
          const fuzzyHits = window.lunrIdx.search(fuzzyQuery);
          fuzzyHits.forEach(hit => {
            if (!allHits.has(hit.ref)) {
              allHits.set(hit.ref, { 
                ...hit, 
                score: hit.score * 0.8,
                matchType: 'fuzzy'
              });
            }
          });
        } catch (e) {
          console.log('Fuzzy search error:', e);
        }
      }

      // Strategy 5: Independent significant term search
      // This helps find documents that contain important terms like "wearable" even if they don't match other terms
      const longTerms = terms.filter(term => term.length > 3);
      for (const term of longTerms) {
        try {
          const termHits = window.lunrIdx.search(term);
          termHits.forEach(hit => {
            if (!allHits.has(hit.ref)) {
              // Boost score for high-priority terms
              const baseScore = hit.score * 2.0;
              const isHighPriority = HIGH_PRIORITY_TERMS.has(term.toLowerCase());
              const finalScore = isHighPriority ? baseScore * 1.5 : baseScore;
              
              allHits.set(hit.ref, { 
                ...hit, 
                score: finalScore,
                matchType: 'significantTerm'
              });
            }
          });
        } catch (e) {
          // Ignore errors for individual term searches
        }
      }

      // Also boost scores for high-priority terms in other strategies
      for (const [ref, hit] of allHits.entries()) {
        const document = documents.get(Number(hit.ref));
        if (!document) continue;

        // Check if any high-priority term appears in the document
        const content = (document.title + ' ' + document.content).toLowerCase();
        for (const term of HIGH_PRIORITY_TERMS) {
          if (content.includes(term)) {
            // Boost the score if a high-priority term is found
            hit.score *= 1.2;
            break; // Only boost once per document
          }
        }
      }

      // Convert Map to Array and sort by score and match type
      return Array.from(allHits.values())
        .sort((a, b) => {
          // First sort by score
          if (b.score !== a.score) {
            return b.score - a.score;
          }
          // If scores are equal, prioritize by match type
          const matchTypePriority = {
            'title': 5,    // Added title as highest priority
            'allWords': 4,
            'significantTerm': 3.5, // Added new match type
            'boundary': 3,
            'prefix': 2,
            'fuzzy': 1
          };
          return matchTypePriority[b.matchType] - matchTypePriority[a.matchType];
        })
        .slice(0, LIMIT_RESULTS);
    }

    // Try exact and prefix matches first
    let searchHits = getAllHits(filteredTerms, false);
    
    // If no results, try with fuzzy search
    if (!searchHits.length) {
      searchHits = getAllHits(filteredTerms, true);
    }

    const currentPathname = window.location.pathname;
    const filterSDK6 = isSdk6(currentPathname) ? searchHits : searchHits.filter($ => { 
      const document = documents.get(Number($.ref)); 
      if (!document || isSdk6(document.href)) return false; 
      return true; 
    });

    showSearchBox();
    if (!filterSDK6.length) {
      const suggestions = getSuggestionsForMisspelling(filteredTerms[0], dictionary);
      if (suggestions.length) { 
        resultCard('Did you mean?', suggestions.map(s => `<span class="search-suggestion">${s}</span>`).join(', ')); 
      } else { 
        resultCard(`Not Found`, `Sorry, we couldn't find any matches. Try searching for a different keyword`); 
      }
      return;
    }

    filterSDK6.forEach((hit) => { 
      const document = documents.get(Number(hit.ref)); 
      if (!document) return; 
      if ((isSdk6(currentPathname) && isSdk7(document.href)) || (isSdk7(currentPathname) && isSdk6(document.href))) return; 
      const highlightedContent = highlightContent(document.content, hit); 
      resultCard(document.title, highlightedContent, document.href); 
    });
  }

  function isSdk6(href) {
    return href && href.includes('creator/development-guide') && !href.includes('sdk7')
  }

  function isSdk7(href) {
    return href && href.includes('creator/development-guide/sdk7')
  }

  function resultCard(title, content, href) {
    const li = element('<li><a href><p></p><span></span></a></li>');
    if (href) li.querySelector('a').href = href;
    const sdk6 = isSdk6(href) && ' [SDK 6]'
    const sdk7 = isSdk7(href) && ' [SDK 7]'
    const sdkContext = sdk6 || sdk7 || ''
    li.querySelector('span').innerHTML = content
    li.querySelector('p').innerHTML = `<span style="font-size: 18px; font-weight: 700;">${title}</span>${sdkContext}`
    results.appendChild(li);
  }

  function highlightContent(content, hit) {
    const amountLetters = 60
    const { metadata } = hit.matchData
    const searchTerm = input.value.trim().toLowerCase();
    
    // Find the best match position
    let bestMatchStart = 0;
    let bestMatchLength = 0;
    let bestMatchScore = -1;
    
    // Helper to score a match
    function scoreMatch(text, start, length) {
      const matchedText = text.slice(start, start + length).toLowerCase();
      // Exact match gets highest score
      if (matchedText === searchTerm) return 100;
      // High priority term match gets high score
      if (HIGH_PRIORITY_TERMS.has(matchedText)) return 90;
      // Word boundary match gets high score
      if (matchedText.endsWith(searchTerm) || matchedText.startsWith(searchTerm)) return 80;
      // Contains the term gets medium score
      if (matchedText.includes(searchTerm)) return 50;
      // Partial match gets low score
      if (searchTerm.includes(matchedText) || matchedText.includes(searchTerm.slice(0, -1))) return 20;
      return 0;
    }

    // Look through all matches to find the best one
    for (const key of Object.keys(metadata)) {
      const positions = metadata[key]?.content?.position;
      if (!positions) continue;
      
      for (const position of positions) {
        const [start, length] = position;
        const score = scoreMatch(content, start, length);
        if (score > bestMatchScore) {
          bestMatchScore = score;
          bestMatchStart = start;
          bestMatchLength = length;
        }
      }
    }

    // Use the best match position for the preview
    const from = Math.max(0, content.length - bestMatchStart <= amountLetters
      ? bestMatchStart - amountLetters * 2
      : bestMatchStart - amountLetters);
    const to = bestMatchStart + bestMatchLength + amountLetters;
    
    let value = content.slice(from, to);
    if (from !== 0) {
      value = `...${value}`;
    }

    // First, remove any existing strong tags to prevent nesting
    value = value.replace(/<\/?strong>/g, '');
    
    // Create a map of positions to highlight
    const highlights = new Map();
    
    // Add the exact search term matches
    const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    let match;
    const searchRegex = new RegExp(escapedSearchTerm, 'gi');
    while ((match = searchRegex.exec(value)) !== null) {
      highlights.set(match.index, match.index + match[0].length);
    }
    
    // Add other matches from search results
    for (const key of Object.keys(metadata)) {
      if (key.toLowerCase() !== searchTerm) {
        const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const keyRegex = new RegExp(escapedKey, 'gi');
        while ((match = keyRegex.exec(value)) !== null) {
          // Only add if this range isn't already covered by a highlight
          let shouldAdd = true;
          for (const [start, end] of highlights.entries()) {
            if (match.index >= start && match.index + match[0].length <= end) {
              shouldAdd = false;
              break;
            }
          }
          if (shouldAdd) {
            highlights.set(match.index, match.index + match[0].length);
          }
        }
      }
    }
    
    // Sort highlights by position (descending to avoid position shifts)
    const sortedHighlights = Array.from(highlights.entries())
      .sort((a, b) => b[0] - a[0]);
    
    // Apply highlights
    for (const [start, end] of sortedHighlights) {
      value = value.slice(0, start) + 
              '<strong>' + value.slice(start, end) + '</strong>' + 
              value.slice(end);
    }

    return value + '...'
  }

  // HELPERS
  /**
   * @param {String} content
   * @returns {Node}
   */
  function element(content) {
    const div = document.createElement('div');
    div.innerHTML = content;
    return div.firstChild;
  }

    function hide(element) {
    element.classList.add('hidden')
  }

  function show(element) {
    element.classList.remove('hidden')
  }

  function showSearchBox() {
    if (!resultsContainer.classList.contains('hidden')) {
      return
    }
    resultsContainer.scrollTop = 0
    show(searchOverlay)
    show(resultsContainer)
  }

  function hideSearchBox() {
    hide(searchOverlay)
    hide(resultsContainer)
  }

  // search-enhancements.js
// Utilities to improve search: spell-check, flexible search, and autocomplete

// --- Basic spell-check using a small dictionary extracted from the index ---
function getSuggestionsForMisspelling(term, dictionary) {
  // Returns words from the dictionary with Levenshtein distance <= 2
  function levenshtein(a, b) {
    const matrix = Array.from({ length: b.length + 1 }, (_, i) => [i]);
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        matrix[i][j] = b[i - 1] === a[j - 1]
          ? matrix[i - 1][j - 1]
          : Math.min(
              matrix[i - 1][j - 1] + 1,
              matrix[i][j - 1] + 1,
              matrix[i - 1][j] + 1
            );
      }
    }
    return matrix[b.length][a.length];
  }
  return dictionary.filter(word => levenshtein(term, word) <= 2);
}

// --- Flexible search: ignores word order ---
function buildFlexibleQuery(terms, fuzzy = false) {
  // Returns a lunr query that searches for all words, regardless of order
  return terms
    .filter(Boolean)
    .map(term => (fuzzy ? `+${term}~1` : `+${term}`))
    .join(' ');
}

// --- Autocomplete ---
function getAutocompleteSuggestions(input, dictionary, minLength = 3, maxResults = 5) {
  if (input.length < minLength) return [];
  const lower = input.toLowerCase();
  return dictionary.filter(word => word.toLowerCase().startsWith(lower)).slice(0, maxResults);
} 
})();

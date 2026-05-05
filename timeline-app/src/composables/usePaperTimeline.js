import { computed, unref } from 'vue';

// papers: array ref or raw
// selectedType: ref/string
// selectedModality: ref/string
// searchTerm: ref/string
// sortOrder: ref/string (options: 'year-desc' (default), 'year-asc', 'title-asc', 'title-desc')
export function usePaperTimeline(papers, selectedType, selectedModality, searchTerm, sortOrder) {
  const filteredPapers = computed(() => {
    const source = unref(papers) ?? [];
    const typeValue = unref(selectedType);
    const modalityValue = unref(selectedModality);
    const q = (unref(searchTerm) || '').toLowerCase().trim();

    return source.filter((paper) => {
      const typeMatch = !typeValue || typeValue === 'All' || paper.type === typeValue;
      const modalityMatch = !modalityValue || modalityValue === 'All' || paper.modality === modalityValue;
      if (!typeMatch || !modalityMatch) return false;

      if (!q) return true;

      const hay = [paper.title, paper.acronym, (paper.tags || []).join(' '), paper.venue || '']
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  });

  const groupedByYear = computed(() => {
    const groups = filteredPapers.value.reduce((accumulator, paper) => {
      const yearKey = String(paper.year);
      if (!accumulator[yearKey]) accumulator[yearKey] = [];
      accumulator[yearKey].push(paper);
      return accumulator;
    }, {});

    const order = unref(sortOrder) || 'year-desc';

    // sort entries (years)
    let entries = Object.entries(groups);
    entries.sort(([a], [b]) => {
      const na = Number(a);
      const nb = Number(b);
      return order === 'year-asc' ? na - nb : nb - na; // default year-desc
    });

    // sort within each year by title if requested
    const titleAsc = order === 'title-asc';
    const titleDesc = order === 'title-desc';

    if (titleAsc || titleDesc) {
      entries = entries.map(([year, arr]) => {
        const sorted = arr.slice().sort((x, y) => {
          const a = (x.title || '').toLowerCase();
          const b = (y.title || '').toLowerCase();
          if (a < b) return titleAsc ? -1 : 1;
          if (a > b) return titleAsc ? 1 : -1;
          return 0;
        });
        return [year, sorted];
      });
    }

    return Object.fromEntries(entries);
  });

  return {
    filteredPapers,
    groupedByYear,
  };
}
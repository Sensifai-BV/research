---
id: "automatic-speaker-characterization-gender-age-language-accent"
title: "Automatic Speaker Characterization: Automatic Identification of Gender, Age, Language and Accent from Speech Signals"
year: 2014
month: "May"
venue: "Ph.D. Dissertation, KU Leuven"
isPublished: true
publishedBadge: "KU Leuven Ph.D. Thesis"
areaId: "audio-speech"
areaName: "Audio & Speech Intelligence"
areaBadge: "Audio AI"
tags: ["Speaker Characterization", "Speech Signals", "Gender Recognition", "Age Identification", "Language & Accent"]
citations: 24
featured: true
scholarUrl: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tYazD-8AAAAJ&citation_for_view=tYazD-8AAAAJ:-FonjvnnhkoC"
journalUrl: "https://www.kuleuven.be"
sourceFile: "content/publications/automatic-speaker-characterization-gender-age-language-accent.md"
authors:
  - id: "0009-0002-9777-8881"
    name: "Mohamad Hasan Bahari"
    affiliation: "KU Leuven / Sensifai Labs"
    isLead: true
    orcid: "https://orcid.org/0009-0002-9777-8881"
latexMathSample: |
  ### GMM-UBM Acoustic Supervector & i-Vector Extraction

  Given an acoustic speech frame sequence \( \mathbf{X} = \{ \mathbf{x}_1, \dots, \mathbf{x}_T \} \), the speaker-dependent GMM supervector \( \mathbf{M} \) is adapted from the Universal Background Model (UBM):

  $$ \mathbf{M} = \mathbf{m} + \mathbf{T} \mathbf{w} $$

  where \( \mathbf{m} \) is the UBM mean supervector, \( \mathbf{T} \) represents the low-rank total variability matrix, and \( \mathbf{w} \sim \mathcal{N}(\mathbf{0}, \mathbf{I}) \) is the low-dimensional i-vector capturing gender, age, language, and accent traits.
bibtex: |
  @phdthesis{bahari2014automatic,
    title={Automatic Speaker Characterization: Automatic Identification of Gender, Age, Language and Accent from Speech Signals},
    author={Bahari, Mohamad Hasan},
    year={2014},
    school={KU Leuven, Faculty of Engineering Science},
    address={Leuven, Belgium}
  }
---

### Abstract

Automatic speaker characterization aims to extract demographic and biological traits—such as gender, age group, primary language, and regional accent—directly from unconstrained acoustic speech signals. This Ph.D. dissertation presented at KU Leuven (Belgium) introduces novel acoustic feature representations, GMM weight adaptation techniques, and joint i-vector + NFA frameworks that significantly boost classification accuracy and robustness against acoustic noise and channel variability.

---

### Key Contributions & Research Highlights

1. **Multi-Trait Speaker Modeling**:
   - Developed joint acoustic classifiers for simultaneous determination of gender, age bracket, native language, and dialect from short speech utterances.

2. **GMM Weight Adaptation & Supervector Decomposition**:
   - Introduced subspace decomposition of GMM mixture weight vectors to enhance pattern discrimination in high-dimensional acoustic feature spaces.

3. **i-Vector & Factor Analysis Integration**:
   - Combined total variability space (i-vector) representations with Non-linear Factor Analysis (NFA) to reduce error rates under mismatched acoustic recording conditions.

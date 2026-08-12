---
id: "non-negative-factor-analysis-gmm-weight-adaptation"
title: "Non-negative Factor Analysis of Gaussian Mixture Model Weight Adaptation for Language and Dialect Recognition"
year: 2014
month: "July"
venue: "IEEE/ACM Transactions on Audio, Speech, and Language Processing (Vol. 22, No. 7, pp. 1117-1129)"
isPublished: true
publishedBadge: "IEEE/ACM TASLP 2014"
areaId: "audio-speech"
areaName: "Audio & Speech Intelligence"
areaBadge: "Audio AI"
tags: ["Non-negative Factor Analysis", "Gaussian Mixture Models", "Language Recognition", "Dialect Recognition", "i-vectors", "Weight Adaptation"]
citations: 50
featured: true
pdfUrl: "/pdfs/non-negative-factor-analysis-gmm-weight-adaptation.pdf"
scholarUrl: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tYazD-8AAAAJ&citation_for_view=tYazD-8AAAAJ:hMsQuOkrut0C"
journalUrl: "https://ieeexplore.ieee.org/document/6810831"
sourceFile: "content/publications/non-negative-factor-analysis-gmm-weight-adaptation.md"
authors:
  - id: "0009-0002-9777-8881"
    name: "Mohamad Hasan Bahari"
    affiliation: "KU Leuven / Sensifai Labs"
    isLead: true
    orcid: "https://orcid.org/0009-0002-9777-8881"
  - id: "najim-dehak"
    name: "Najim Dehak"
    affiliation: "Johns Hopkins University"
    isLead: false
    is_external: true
  - id: "hugo-van-hamme"
    name: "Hugo Van hamme"
    affiliation: "KU Leuven"
    isLead: false
    is_external: true
  - id: "lukas-burget"
    name: "Lukáš Burget"
    affiliation: "Brno University of Technology"
    isLead: false
    is_external: true
  - id: "ahmed-ali"
    name: "Ahmed Ali"
    affiliation: "Qatar Computing Research Institute"
    isLead: false
    is_external: true
  - id: "jim-glass"
    name: "Jim Glass"
    affiliation: "MIT CSAIL"
    isLead: false
    is_external: true
bibtex: |
  @article{bahari2014nonnegative,
    title={Non-negative Factor Analysis of Gaussian Mixture Model Weight Adaptation for Language and Dialect Recognition},
    author={Bahari, Mohamad Hasan and Dehak, Najim and Van hamme, Hugo and Burget, Luk{\'a}{\v{s}} and Ali, Ahmed and Glass, Jim},
    journal={IEEE/ACM Transactions on Audio, Speech, and Language Processing},
    volume={22},
    number={7},
    pages={1117--1129},
    year={2014},
    publisher={IEEE}
  }
---

Recent studies show that Gaussian mixture model (GMM) weights carry less, yet complimentary, information to GMM means for language and dialect recognition. However, state-of-the-art language recognition systems usually do not use this information. In this research, a non-negative factor analysis (NFA) approach is developed for GMM weight decomposition and adaptation. This modeling, which is conceptually simple and computationally inexpensive, suggests a new low-dimensional utterance representation method using a factor analysis similar to that of the i-vector framework. The obtained subspace vectors are then applied in conjunction with i-vectors to the language/dialect recognition problem. The suggested approach is evaluated on the NIST 2011 and RATS language recognition evaluation (LRE) corpora and on the QCRI Arabic dialect recognition evaluation (DRE) corpus. The assessment results show that fusing i-vectors with the proposed NFA subspace vectors leads to improvements over the standard i-vector system, particularly for short utterances.

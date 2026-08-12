---
id: "speaker-age-estimation-hmm-weight-supervectors"
title: "Speaker age estimation using Hidden Markov Model weight supervectors"
year: 2012
month: "July"
venue: "2012 11th International Conference on Information Science, Signal Processing and their Applications (ISSPA), pp. 517-521"
isPublished: true
publishedBadge: "IEEE ISSPA 2012"
areaId: "audio-speech"
areaName: "Audio & Speech Intelligence"
areaBadge: "Audio AI"
tags: ["Speaker Age Estimation", "Speech Signals", "Hidden Markov Model", "Supervectors", "WSNMF", "LS-SVR"]
citations: 40
featured: true
pdfUrl: "/pdfs/speaker-age-estimation-hmm-weight-supervectors.pdf"
scholarUrl: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tYazD-8AAAAJ&citation_for_view=tYazD-8AAAAJ:EkHepimYqZsC"
journalUrl: "https://ieeexplore.ieee.org/document/6310609"
sourceFile: "content/publications/speaker-age-estimation-hmm-weight-supervectors.md"
authors:
  - id: "0009-0002-9777-8881"
    name: "Mohamad Hasan Bahari"
    affiliation: "KU Leuven / Sensifai Labs"
    isLead: true
    orcid: "https://orcid.org/0009-0002-9777-8881"
  - id: "hugo-van-hamme"
    name: "Hugo Van hamme"
    affiliation: "KU Leuven"
    isLead: false
    is_external: true
bibtex: |
  @inproceedings{bahari2012speaker,
    title={Speaker age estimation using Hidden Markov Model weight supervectors},
    author={Bahari, Mohamad Hasan and Van hamme, Hugo},
    booktitle={2012 11th International Conference on Information Science, Signal Processing and their Applications (ISSPA)},
    pages={517--521},
    year={2012},
    organization={IEEE}
  }
---

This paper proposes a new approach for speaker age estimation. In this method, speakers are modeled by their corresponding Hidden Markov Model (HMM) weight supervectors. Then, Weighted Supervised Non-Negative Matrix Factorization (WSNMF) is applied to reduce the dimension of the input space. Finally, a Least Squares Support Vector Regressor (LS-SVR) is employed to estimate the age of speakers using the obtained low-dimensional vectors. Evaluation results on a corpus of read and spontaneous speech in Dutch confirms the effectiveness of the proposed scheme.

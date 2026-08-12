---
id: "speaker-age-estimation-using-ivectors"
title: "Speaker age estimation using i-vectors"
year: 2014
month: "September"
venue: "Engineering Applications of Artificial Intelligence (Vol. 34, pp. 99-108)"
isPublished: true
publishedBadge: "EAAI 2014"
areaId: "audio-speech"
areaName: "Audio & Speech Intelligence"
areaBadge: "Audio AI"
tags: ["Speaker Characterization", "Speaker Age Estimation", "i-vectors", "WCCN", "LSSVR", "Speech Processing"]
citations: 103
featured: true
pdfUrl: "/pdfs/speaker-age-estimation-using-ivectors.pdf"
scholarUrl: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tYazD-8AAAAJ&citation_for_view=tYazD-8AAAAJ:fFSKOagxvKUC"
journalUrl: "https://doi.org/10.1016/j.engappai.2014.05.003"
sourceFile: "content/publications/speaker-age-estimation-using-ivectors.md"
authors:
  - id: "0009-0002-9777-8881"
    name: "Mohamad Hasan Bahari"
    affiliation: "KU Leuven / Sensifai Labs"
    isLead: true
    orcid: "https://orcid.org/0009-0002-9777-8881"
  - id: "mitchell-mclaren"
    name: "Mitchell McLaren"
    affiliation: "SRI International"
    isLead: false
    is_external: true
  - id: "hugo-van-hamme"
    name: "Hugo Van hamme"
    affiliation: "KU Leuven"
    isLead: false
    is_external: true
  - id: "david-van-leeuwen"
    name: "David A. van Leeuwen"
    affiliation: "Radboud University / TNO"
    isLead: false
    is_external: true
bibtex: |
  @article{bahari2014speaker,
    title={Speaker age estimation using i-vectors},
    author={Bahari, Mohamad Hasan and McLaren, Mitchell and Van hamme, Hugo and van Leeuwen, David A},
    journal={Engineering Applications of Artificial Intelligence},
    volume={34},
    pages={99--108},
    year={2014},
    publisher={Elsevier}
  }
---

In this paper, a new approach for age estimation from speech signals based on i-vectors is proposed. In this method, each utterance is modeled by its corresponding i-vector. Then, a Within-Class Covariance Normalization technique is used for session variability compensation. Finally, a least squares support vector regression (LSSVR) is applied to estimate the age of speakers. The proposed method is trained and tested on telephone conversations of the National Institute for Standard and Technology (NIST) 2010 and 2008 speaker recognition evaluation databases. Evaluation results show that the proposed method yields significantly lower mean absolute error and higher Pearson correlation coefficient between chronological speaker age and estimated speaker age compared to different conventional schemes.

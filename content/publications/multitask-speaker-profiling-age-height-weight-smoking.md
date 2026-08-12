---
id: "multitask-speaker-profiling-age-height-weight-smoking"
title: "Multitask speaker profiling for estimating age, height, weight and smoking habits from spontaneous telephone speech signals"
year: 2014
month: "October"
venue: "2014 4th International Conference on Computer and Knowledge Engineering (ICCKE), pp. 7-12"
isPublished: true
publishedBadge: "IEEE ICCKE 2014"
areaId: "audio-speech"
areaName: "Audio & Speech Intelligence"
areaBadge: "Audio AI"
tags: ["Speaker Profiling", "Multitask Learning", "Speech Processing", "i-vectors", "LSSVR"]
citations: 36
featured: true
scholarUrl: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tYazD-8AAAAJ&citation_for_view=tYazD-8AAAAJ:lmc2jWPfTJgC"
journalUrl: "https://ieeexplore.ieee.org/document/6993339"
sourceFile: "content/publications/multitask-speaker-profiling-age-height-weight-smoking.md"
authors:
  - id: "amir-hossein-poorjam"
    name: "Amir Hossein Poorjam"
    affiliation: "KU Leuven"
    isLead: true
    is_external: true
  - id: "0009-0002-9777-8881"
    name: "Mohamad Hasan Bahari"
    affiliation: "KU Leuven / Sensifai Labs"
    isLead: false
    orcid: "https://orcid.org/0009-0002-9777-8881"
bibtex: |
  @inproceedings{poorjam2014multitask,
    title={Multitask speaker profiling for estimating age, height, weight and smoking habits from spontaneous telephone speech signals},
    author={Poorjam, Amir Hossein and Bahari, Mohamad Hasan},
    booktitle={2014 4th International Conference on Computer and Knowledge Engineering (ICCKE)},
    pages={7--12},
    year={2014},
    organization={IEEE}
  }
---

This paper proposes a novel approach for automatic estimation of four important traits of speakers, namely age, height, weight and smoking habit, from speech signals. In this method, each utterance is modeled using the i-vector framework which is based on the factor analysis on Gaussian Mixture Model (GMM) mean supervectors, and the Non-negative Factor Analysis (NFA) framework which is based on a constrained factor analysis on GMM weights. Then, Artificial Neural Networks (ANNs) and Least Squares Support Vector Regression (LSSVR) are employed to estimate age, height and weight of speakers from given utterances, and ANNs and logistic regression (LR) are utilized to perform smoking habit detection. Since GMM weights provide complementary information to GMM means, a score-level fusion of the i-vector-based and the NFA-based recognizers is considered for age and smoking habit estimation.

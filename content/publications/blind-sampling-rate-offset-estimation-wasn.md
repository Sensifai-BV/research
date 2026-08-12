---
id: "blind-sampling-rate-offset-estimation-wasn"
title: "Blind sampling rate offset estimation for wireless acoustic sensor networks through weighted least-squares coherence drift estimation"
year: 2017
month: "January"
venue: "IEEE/ACM Transactions on Audio, Speech, and Language Processing (Vol. 25, No. 3, pp. 674-686)"
isPublished: true
publishedBadge: "IEEE/ACM TASLP 2017"
areaId: "audio-speech"
areaName: "Audio & Speech Intelligence"
areaBadge: "Audio AI"
tags: ["Wireless Acoustic Sensor Networks", "Sampling Rate Offset", "Coherence Drift", "Speech Enhancement", "Signal Processing"]
citations: 47
featured: true
pdfUrl: "/pdfs/blind-sampling-rate-offset-estimation-wasn.pdf"
scholarUrl: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tYazD-8AAAAJ&citation_for_view=tYazD-8AAAAJ:9pM33mqn1YgC"
journalUrl: "https://ieeexplore.ieee.org/document/7807303"
sourceFile: "content/publications/blind-sampling-rate-offset-estimation-wasn.md"
authors:
  - id: "0009-0002-9777-8881"
    name: "Mohamad Hasan Bahari"
    affiliation: "KU Leuven / Sensifai Labs"
    isLead: true
    orcid: "https://orcid.org/0009-0002-9777-8881"
  - id: "alexander-bertrand"
    name: "Alexander Bertrand"
    affiliation: "KU Leuven"
    isLead: false
    is_external: true
  - id: "marc-moonen"
    name: "Marc Moonen"
    affiliation: "KU Leuven"
    isLead: false
    is_external: true
bibtex: |
  @article{bahari2017blind,
    title={Blind sampling rate offset estimation for wireless acoustic sensor networks through weighted least-squares coherence drift estimation},
    author={Bahari, Mohamad Hasan and Bertrand, Alexander and Moonen, Marc},
    journal={IEEE/ACM Transactions on Audio, Speech, and Language Processing},
    volume={25},
    number={3},
    pages={674--686},
    year={2017},
    publisher={IEEE}
  }
---

Microphone arrays allow to exploit the spatial coherence between simultaneously recorded microphone signals, e.g., to perform speech enhancement, i.e., to extract a speech signal and reduce background noise. However, in systems where the microphones are not sampled in a synchronous fashion, as it is often the case in wireless acoustic sensor networks, a sampling rate offset (SRO) exists between signals recorded in different nodes, which severely affects the speech enhancement performance. To avoid this performance reduction, the SRO should be estimated and compensated for. In this paper, we propose a new approach to blind SRO estimation for an asynchronous wireless acoustic sensor network, which exploits the phase drift of the coherence between the asynchronous microphones signals. We utilize the fact that the SRO causes a linearly increasing time delay between two signals and hence a phase drift in the frequency domain. Simulation results and real-data evaluations demonstrate the robustness and precision of the proposed weighted least-squares coherence drift estimation technique.

---
id: "unsupervised-diffusion-lms-wireless-sensor-networks"
title: "Unsupervised diffusion-based LMS for node-specific parameter estimation over wireless sensor networks"
year: 2016
month: "March"
venue: "2016 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), pp. 4159-4163"
isPublished: true
publishedBadge: "IEEE ICASSP 2016"
areaId: "edge-systems"
areaName: "Efficient AI & Edge Computing"
areaBadge: "Edge AI"
tags: ["Wireless Sensor Networks", "Diffusion LMS", "Parameter Estimation", "Distributed Filtering", "Signal Processing"]
citations: 33
featured: true
pdfUrl: "/pdfs/unsupervised-diffusion-lms-wireless-sensor-networks.pdf"
scholarUrl: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tYazD-8AAAAJ&citation_for_view=tYazD-8AAAAJ:foquWX3nUaYC"
journalUrl: "https://arxiv.org/abs/1510.00984"
sourceFile: "content/publications/unsupervised-diffusion-lms-wireless-sensor-networks.md"
authors:
  - id: "jorge-plata-chaves"
    name: "Jorge Plata-Chaves"
    affiliation: "KU Leuven"
    isLead: true
    is_external: true
  - id: "0009-0002-9777-8881"
    name: "Mohamad Hasan Bahari"
    affiliation: "KU Leuven / Sensifai Labs"
    isLead: false
    orcid: "https://orcid.org/0009-0002-9777-8881"
  - id: "marc-moonen"
    name: "Marc Moonen"
    affiliation: "KU Leuven"
    isLead: false
    is_external: true
  - id: "alexander-bertrand"
    name: "Alexander Bertrand"
    affiliation: "KU Leuven"
    isLead: false
    is_external: true
bibtex: |
  @inproceedings{plata2016unsupervised,
    title={Unsupervised diffusion-based LMS for node-specific parameter estimation over wireless sensor networks},
    author={Plata-Chaves, Jorge and Bahari, Mohamad Hasan and Moonen, Marc and Bertrand, Alexander},
    booktitle={2016 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP)},
    pages={4159--4163},
    year={2016},
    organization={IEEE}
  }
---

We study a distributed node-specific parameter estimation problem where each node in a wireless sensor network is interested in the simultaneous estimation of different vectors of parameters that can be of local interest, of common interest to a subset of nodes, or of global interest to the whole network. We assume a setting where the nodes do not know which other nodes share the same estimation interests. First, we conduct a theoretical analysis on the asymptotic bias that results in case the nodes blindly process all the local estimates of all their neighbors to solve their own node-specific parameter estimation problem. Next, we propose an unsupervised diffusion-based LMS algorithm that allows each node to obtain unbiased estimates of its node-specific vector of parameters by continuously identifying which of the neighboring local estimates correspond to each of its own estimation tasks. Finally, simulation results demonstrate the superiority and effective performance of the proposed unsupervised diffusion LMS scheme.

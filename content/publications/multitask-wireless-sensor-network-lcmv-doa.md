---
id: "multitask-wireless-sensor-network-lcmv-doa"
title: "Multi-Task Wireless Sensor Network for Joint Distributed Node-Specific Signal Enhancement, LCMV Beamforming and DOA Estimation"
year: 2017
month: "April"
venue: "IEEE Journal of Selected Topics in Signal Processing (Vol. 11, No. 3, pp. 518-533)"
isPublished: true
publishedBadge: "IEEE JSTSP 2017"
areaId: "audio-speech"
areaName: "Audio & Speech Intelligence"
areaBadge: "Audio AI"
tags: ["Wireless Sensor Networks", "Distributed Signal Processing", "LCMV Beamforming", "DOA Estimation", "Wiener Filtering"]
citations: 55
featured: true
pdfUrl: "/pdfs/multitask-wireless-sensor-network-lcmv-doa.pdf"
scholarUrl: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=tYazD-8AAAAJ&citation_for_view=tYazD-8AAAAJ:8d8msizDQcsC"
journalUrl: "https://ieeexplore.ieee.org/document/7867824"
sourceFile: "content/publications/multitask-wireless-sensor-network-lcmv-doa.md"
authors:
  - id: "amin-hassani"
    name: "Amin Hassani"
    affiliation: "KU Leuven"
    isLead: true
    is_external: true
  - id: "jorge-plata-chaves"
    name: "Jorge Plata-Chaves"
    affiliation: "KU Leuven"
    isLead: false
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
  @article{Hassani2017MultiTask,
    title={Multi-Task Wireless Sensor Network for Joint Distributed Node-Specific Signal Enhancement, LCMV Beamforming and DOA Estimation},
    author={Hassani, Amin and Plata-Chaves, Jorge and Bahari, Mohamad Hasan and Moonen, Marc and Bertrand, Alexander},
    journal={IEEE Journal of Selected Topics in Signal Processing},
    volume={11},
    number={3},
    pages={518--533},
    year={2017},
    publisher={IEEE}
  }
---

We consider a multi-task wireless sensor network (WSN) where some of the nodes aim at applying a multi-channel Wiener filter to denoise their local sensor signals, whereas others aim at implementing a linearly constrained minimum variance beamformer to extract node-specific desired signals and cancel interfering signals, and again others aim at estimating the node-specific direction-of-arrival of a set of desired sources. For this multi-task WSN, by relying on distributed signal estimation techniques that incorporate a low-rank approximation of the desired signals correlation matrix, we design a distributed algorithm under which the nodes cooperate with reduced communication resources even though they are solving different signal processing tasks and do not know the tasks of the other nodes. Convergence and optimality results show that the proposed algorithm lets all the nodes achieve the network-wide optimal performance under mild condition on the network topology and task allocation.

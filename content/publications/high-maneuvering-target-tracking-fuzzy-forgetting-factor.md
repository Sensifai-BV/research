---
id: "high-maneuvering-target-tracking-fuzzy-forgetting-factor"
title: "High maneuvering target tracking using an input estimation technique associated with fuzzy forgetting factor"
year: 2009
month: "October"
venue: "Scientific Research and Essay"
isPublished: true
publishedBadge: "Scientific Research & Essay"
areaId: "ai-ml"
areaName: "Artificial Intelligence & ML"
areaBadge: "AI / ML"
tags: ["Target Tracking", "Fuzzy Logic", "Input Estimation", "Signal Processing"]
citations: 24
featured: true
doi: "10.5897/SRE.2009.936"
pdfUrl: "https://academicjournals.org/journal/SRE/article-full-text-pdf/BBB6BB216821.pdf"
scholarUrl: "https://scholar.google.com/citations?view_op=view_citation&user=tYazD-8AAAAJ"
journalUrl: "http://www.academicjournals.org/SRE"
sourceFile: "content/publications/high-maneuvering-target-tracking-fuzzy-forgetting-factor.md"
authors:
  - id: "0009-0002-9777-8881"
    name: "Mohamad Hasan Bahari"
    affiliation: "Sensifai Labs"
    isLead: true
    orcid: "https://orcid.org/0009-0002-9777-8881"
  - id: "naser-pariz"
    name: "Naser Pariz"
    affiliation: "Ferdowsi University of Mashhad"
    isLead: false
    is_external: true
latexMathSample: |
  ### Fuzzy Forgetting Factor Formulation

  The modified input estimation update equation with dynamic fuzzy forgetting factor \( \lambda_k \):

  $$ \hat{\mathbf{u}}_k = \arg\min_{\mathbf{u}} \sum_{i=1}^k \lambda_k^{k-i} \| \mathbf{y}_i - \mathbf{H}_i \mathbf{x}_i(\mathbf{u}) \|_R^2 $$
bibtex: |
  @article{bahari2009high,
    title={High maneuvering target tracking using an input estimation technique associated with fuzzy forgetting factor},
    author={Bahari, Mohamad Hasan and Pariz, Naser},
    journal={Scientific Research and Essay},
    volume={4},
    number={10},
    pages={936--945},
    year={2009}
  }
---

In this paper, a new fuzzy forgetting factor (FFF) is developed in order to aid a modified input estimation (MIE) technique and enhance its performance in tracking high maneuvering targets. The MIE has been introduced recently and succeeds in presenting reasonably accurate target trajectory, velocity and acceleration estimation in low and mild maneuvering situations. However, after some iteration its steps become small. Due to small steps, the accuracy of target tracking may be seriously degraded in the presence of high maneuvers.

In this study we present an intelligent self-tuning approach based on a fuzzy forgetting factor in order to enjoy satisfactory tracking performance in low, Medium and high maneuvering target cases. Simulations visualize the efficiency of the proposed method and emphasize on its accuracy in tracking high maneuvering targets. Furthermore, simulation results illustrate that proposed method is not sensitive to the sampling time.

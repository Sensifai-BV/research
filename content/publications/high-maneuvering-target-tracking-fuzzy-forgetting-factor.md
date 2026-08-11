---
id: "high-maneuvering-target-tracking-fuzzy-forgetting-factor"
title: "High maneuvering target tracking using an input estimation technique associated with fuzzy forgetting factor"
year: 2009
month: "October"
venue: "Scientific Research and Essay (Vol. 4, No. 10, pp. 936-945)"
isPublished: true
publishedBadge: "Scientific Research & Essay"
areaId: "ai-ml"
areaName: "Artificial Intelligence & ML"
areaBadge: "AI / ML"
tags: ["High Maneuver Target Tracking", "Modified Input Estimation (MIE)", "Fuzzy Logic", "Self-Tuning", "Forgetting Factor"]
citations: 24
featured: true
doi: "10.5897/SRE.2009.936"
issn: "1992-2248"
pdfUrl: "https://academicjournals.org/journal/SRE/article-full-text-pdf/BBB6BB216821.pdf"
scholarUrl: "https://scholar.google.com/citations?view_op=view_citation&user=tYazD-8AAAAJ"
journalUrl: "http://www.academicjournals.org/sre"
sourceFile: "content/publications/high-maneuvering-target-tracking-fuzzy-forgetting-factor.md"
authors:
  - id: "0009-0002-9777-8881"
    name: "Mohamad Hasan Bahari"
    affiliation: "Ferdowsi University of Mashhad / Sensifai Labs"
    isLead: true
    orcid: "https://orcid.org/0009-0002-9777-8881"
  - id: "naser-pariz"
    name: "Naser Pariz"
    affiliation: "Ferdowsi University of Mashhad"
    isLead: false
    is_external: true
latexMathSample: |
  ### State Estimation & Fuzzy Covariance Resetting

  The state-space model augmented with target acceleration vector \( \mathbf{u}(n) = [u_x(n), u_y(n)]^T \):

  $$ \mathbf{x}(n+1) = \mathbf{F}(n)\mathbf{x}(n) + \mathbf{C}(n)\mathbf{u}(n) + \mathbf{G}(n)\mathbf{w}(n) $$

  Fuzzy self-tuning error covariance matrix update equation:

  $$ \mathbf{P}_{\text{Aug}}^{\text{New}}(n+1|n+1) = \frac{1}{\lambda(n+1)} \times \mathbf{P}_{\text{Aug}}(n+1|n+1) $$

  where the Gaussian membership grade \( g_i^j(x_i) \) for the \( i \)-th input of the \( j \)-th rule is formulated as:

  $$ g_i^j(x_i) = \exp\left[ -\frac{1}{2}\left( \frac{x_i - c_i^j}{\sigma_i^j} \right)^2 \right] $$
bibtex: |
  @article{bahari2009high,
    title={High maneuvering target tracking using an input estimation technique associated with fuzzy forgetting factor},
    author={Bahari, Mohamad Hasan and Pariz, Naser},
    journal={Scientific Research and Essay},
    volume={4},
    number={10},
    pages={936--945},
    year={2009},
    issn={1992-2248}
  }
---

### Abstract

In this paper, a new fuzzy forgetting factor (FFF) is developed in order to aid a modified input estimation (MIE) technique and enhance its performance in tracking high maneuvering targets. The MIE has been introduced recently and succeeds in presenting reasonably accurate target trajectory, velocity and acceleration estimation in low and mild maneuvering situations. However, after some iteration its steps become small. Due to small steps, the accuracy of target tracking may be seriously degraded in the presence of high maneuvers. In this study we present an intelligent self-tuning approach based on a fuzzy forgetting factor in order to enjoy satisfactory tracking performance in low, Medium and high maneuvering target cases. Simulations visualize the efficiency of the proposed method and emphasize on its accuracy in tracking high maneuvering targets. Furthermore, simulation results illustrate that proposed method is not sensitive to the sampling time.

---

### Key Contributions & Technical Overview

1. **Modified Input Estimation (MIE) Limitations**:
   - In traditional MIE systems, the acceleration is modeled as an additive input in the state space equations.
   - After several iterations, the Kalman gain and error covariance matrix step sizes shrink, leading to response delays when a target performs high-acceleration maneuvers.

2. **Fuzzy Self-Tuning Mechanism**:
   - Computes target acceleration magnitude \( \|\mathbf{u}(n)\|_2 = \sqrt{u_x(n)^2 + u_y(n)^2} \) and trace norm \( \text{Trace}[\mathbf{P}_{\text{Aug}}(n+1|n+1)] \).
   - Intelligently calculates an optimal variable forgetting factor \( \lambda(n+1) \) using Gaussian fuzzy rules to reset covariance without manual parameter tuning (\( \delta \)).

3. **Performance & Robustness**:
   - Demonstrates up to 55% improvement in acceleration estimation RMSE under high maneuvers.
   - Maintains high estimation accuracy across varying sampling intervals \( T = 0.1\,\text{s} \text{ to } 10\,\text{s} \).

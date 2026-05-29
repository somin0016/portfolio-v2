---
title: 'Ontology of Collective Intelligence'
description: 'Large-scale Collaborative Knowledge Platform'
year: 2025
index: 0
skills:
  - Next.js
  - TypeScript
  - Firebase
  - Firestore
  - Yjs
  - D3.js
  - LLMs
links:
  - name: Website
    url: https://ontology.mit.edu
  - name: GitHub
    url: https://github.com/MIT-Center-for-Collective-Intelligence/1Ontology
---

## Description

***Ontology of Collective Intelligence*** is a large-scale knowledge platform developed as part of my work at [SMART M3S](https://m3s.mit.edu/). It enables researchers and collaborators to create, organize, and explore structured knowledge related to work activities, processes, actors, and human-AI collaboration.

The platform supports collaborative editing, graph and hierarchy visualizations, semantic search, and AI-assisted workflows for managing a knowledge base containing hundreds of thousands of interconnected entities.

### Motivation

One aspect of software engineering that I enjoy is working on systems that continue to evolve as they grow. As the ontology expanded, challenges emerged around performance, scalability, collaboration, and data organization. This project gave me the opportunity to work on these problems while contributing to research in human-AI collaboration.

### Features

- real-time collaborative editing with conflict-safe synchronization
- graph and hierarchy visualizations for exploring large knowledge structures
- AI-assisted content generation and workflow support
- scalable architecture supporting hundreds of thousands of entities
- semantic search and knowledge discovery tools
- collaborative workflows for researchers and domain experts

---

## Technical Challenges

### Large Ontology Structures

As the ontology grew to hundreds of thousands of entities, loading the entire structure into the browser became impractical. To address this, I redesigned data access patterns to fetch only relevant portions of the ontology on demand.

### Firestore Document Limits

Firestore's document size limitations required restructuring how tree and graph data were stored. I introduced data partitioning strategies that allowed large hierarchies to be represented efficiently while preserving query performance.

### Real-Time Collaboration

Supporting collaborative editing required integrating Yjs while ensuring changes remained synchronized and persisted correctly across multiple users.

---

## Development Log

### Year

- 2026 *(ongoing development)*
- 2025
- 2024 *(initial development)*
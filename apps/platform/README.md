# Molecular Targets Platform

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/0a8da56c74084498b6eb9a64ca02eb3a)](https://www.codacy.com/gh/CBIIT/mtp-ui/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=CBIIT/mtp-ui&amp;utm_campaign=Badge_Grade)


The Molecular Targets Platform is a National Cancer Institute (NCI) instance of the [Open Targets Platform](https://www.targetvalidation.org) with a focus on pediatric cancer data. This tool allows users to browse and identify associations between molecular targets, diseases, and drugs. The Molecular Targets Platform builds upon the data and functionality of the Open Targets Platform while also including:

<ul>
  <li>The FDA Pediatric Molecular Target Lists (FDA PMTL)</li>
  <li>Analyses of pediatric oncology datasets from the Open Pediatric Cancer (OpenPedCan) project at the Children's Hospital of Philadelphia:
     <ol>
      <li>Therapeutically Applicable Research to Generate Effective Treatments (TARGET)</li>
      <li>Open Pediatric Brain Tumor Atlas (OpenPBTA)</li>
      <li>Gabriella Miller Kids First (Kids First) Neuroblastoma</li>
    </ol>
  </li>
</ul>

As the project matures, new pediatric cancer data and additional functionality will be added to the Molecular Targets Platform.

## Development environment

To start developing, follow these steps:

1. Install [NodeJS](https://nodejs.org/en/) version 14 or greater and [Yarn](https://classic.yarnpkg.com/en/docs/install) version ^1.22.
2. Install dependencies by running `yarn`.
3. Start the development server by running `yarn dev:platform`.

# Molecular Targets Platform

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

## Required stack

- [NodeJS >= v14](https://nodejs.org/en/)
- [Yarn package manager](https://yarnpkg.com/)

## Running development

To run [Molecular Targets Platform](https://moleculartargets.ccdi.cancer.gov/) in development mode, you can run: `yarn dev:platform` in the root directory.

## Building production-ready bundle

From the root directory run: `yarn build:platform`. This will build a production-ready bundle for Molecular Targets Platform.
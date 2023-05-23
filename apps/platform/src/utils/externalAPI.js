import axios from 'axios';
import config from '../config';

const BASE_URL = config.chopRServer;

/*
 * Define the URLs for the different API endpoints
 * API DOC: https://openpedcan-api-dev.d3b.io/__docs__/#/
 */
const url = {
  targetPage: {
    geneAllCancer: {
      json: '/tpm/gene-all-cancer/json',
      plot: '/tpm/gene-all-cancer/plot'
    },
    geneAllCancerTCGA: {
      json: '/tpm/gene-all-cancer-tcga/json',
      plot: '/tpm/gene-all-cancer-tcga/plot'
    },
    geneAllCancerGtexDiffExp: {
      json: '/dge/gene-all-cancer-gtex-diff-exp/json',
      plot: '/dge/gene-all-cancer-gtex-diff-exp/plot'
    },
  },
  diseasePage: {
    topGeneDiseaseGtexDiffExp: {
      json: '/dge/top-gene-disease-gtex-diff-exp/json',
      plot: '/dge/top-gene-disease-gtex-diff-exp/plot'
    },
  },
  evidencePage: {
    geneDiseaseGtex: {
      json: '/tpm/gene-disease-gtex/json',
      plot: '/tpm/gene-disease-gtex/plot'
    },
    geneDiseaseTcga: {
      json: '/tpm/gene-disease-tcga/json',
      plot: '/tpm/gene-disease-tcga/plot'
    },
  },
};

/*
  Function to fetch JSON data from the CHoP R server
  @params: 
    - params: Object containing parameters to be passed to the API endpoint
    - endpoint: String representing the API endpoint to fetch from
    - callback: Function to handle successful API response
    - errorHandler: Function to handle API errors
*/
const fetchJson = ( params, endpoint, callback, errorHandler ) => {
  axios
    .get(endpoint, { params })
    .then(function(response) {
      if (response.status && response.status === 200) {
        callback(response.data);
      } else if (
        response.status &&
        (response.status === 404 || response.status === 500)
      ) {
        callback(null);
      } else {
        errorHandler('Error occurred while fetching data.');
      }
    })
    .catch(function(error) {
      errorHandler(error);
    });
};

/*
  Function to fetch plot data from the CHoP R server
  @params: 
    - fullEndpoint: String representing the full API endpoint to fetch from
    - callback: Function to handle successful API response
    - errorHandler: Function to handle API errors
*/
const fetchPlot = (fullEndpoint, callback, errorHandler) => {
  axios
    .get(fullEndpoint, { responseType: 'arraybuffer' })
    .then(function(response) {
      if (response.status && response.status === 200) {
        callback(response.data);
      } else {
        errorHandler('Error occurred while fetching plot.');
      }
    })
    .catch(function(error) {
      errorHandler(error);
    });
};
const logError = (error) => console.log(error);

/*
  Get a table of one disease and top differentially expressed genes      : Disease Page (Gtex Diff Exp - JSON)
*/
export const getTopGeneDiseaseGtexDiffExpJson = async ({ id: efoId, rankGenesBy, callback, errorHandler = logError}) => {
  const params = { efoId, rankGenesBy };
  const endpoint = BASE_URL.concat(url.diseasePage.topGeneDiseaseGtexDiffExp.json);

  fetchJson(params, endpoint, callback, errorHandler);
};

/*
  Get a heatmap of one disease and top differentially expressed genes   : Disease Page (Gtex Diff Exp - PLOT)
*/
export const getTopGeneDiseaseGtexDiffExpPlot = async ( { id: efoId, rankGenesBy, includeBoxplot, boxplotYAxisScale, callback, errorHandler }) => {
  const params = { efoId, rankGenesBy, includeBoxplot, boxplotYAxisScale, };
  const urlParams = new URLSearchParams(params).toString();
  const endpoint = `${BASE_URL}${url.diseasePage.topGeneDiseaseGtexDiffExp.plot}`;
  const fullEndpoint = `${endpoint}?${urlParams}`;

  fetchPlot(fullEndpoint, callback, errorHandler);
};

/*
  Get a differential gene expression table of one gene and all diseases          : Target Page (Gtex Diff Exp - JSON)
*/
export const getGeneAllCancerGtexDiffExpJson = async ({ id: ensemblId, callback, errorHandler = logError}) => {
  const params = { ensemblId };
  const endpoint = BASE_URL.concat(url.targetPage.geneAllCancerGtexDiffExp.json);

  fetchJson(params, endpoint, callback, errorHandler);
};

/*
  Get a differential gene expression heatmap of one gene and all diseases   : Target Page (Gtex Diff Exp - PLOT)
*/
export const getGeneAllCancerGtexDiffExpPlot = async ( { id: ensemblId, includeBoxplot, boxplotYAxisScale, callback, errorHandler }) => {
  const params = { ensemblId, includeBoxplot, boxplotYAxisScale, };
  const urlParams = new URLSearchParams(params).toString();
  const endpoint = `${BASE_URL}${url.targetPage.geneAllCancerGtexDiffExp.plot}`;
  const fullEndpoint = `${endpoint}?${urlParams}`;

  fetchPlot(fullEndpoint, callback, errorHandler);
};

/*
  Get a single-gene all-diseases all-TCGA TPM summary table          : Target Page (TCGA - JSON)
 */
export const getGeneAllCancerTcgaJson = async ( ensemblId, callback, errorHandler = logError ) => {
  const params = { ensemblId, includeTumorDesc: 'primaryOnly' };
  const endpoint = BASE_URL.concat(url.targetPage.geneAllCancerTCGA.json);

  fetchJson(params, endpoint, callback, errorHandler);
};

/*
  Get a single-gene all-diseases all-TCGA TPM boxplot                : Target Page (TCGA - PLOT)
*/
export const getGeneAllCancerTcgaPlot = async ( ensemblId, yAxisScale, callback, errorHandler ) => {
  const params = { ensemblId, yAxisScale, includeTumorDesc: 'primaryOnly' };
  const urlParams = new URLSearchParams(params).toString();
  const endpoint = `${BASE_URL}${url.targetPage.geneAllCancerTCGA.plot}`;
  const fullEndpoint = `${endpoint}?${urlParams}`;

  fetchPlot(fullEndpoint, callback, errorHandler);
};

/*
  Get a single-gene all-diseases TPM summary table                   : Evidence Page (TCGA - JSON)
 */
export const getGeneDiseaseTcgaJson = async ( ensemblId, efoId, callback, errorHandler = logError ) => {
  const params = { ensemblId, efoId, includeTumorDesc: 'primaryOnly' };
  const endpoint = BASE_URL.concat(url.evidencePage.geneDiseaseTcga.json);

  fetchJson(params, endpoint, callback, errorHandler);
};

/*  
  Get a single-gene single-disease all-TCGA TPM boxplot              : Evidence Page (TCGA - PLOT)
 */
export const getGeneDiseaseTcgaPlot = async ( ensemblId, efoId, yAxisScale, callback, errorHandler ) =>{
  const params = { ensemblId, efoId, yAxisScale, includeTumorDesc: 'primaryOnly' };
  const urlParams = new URLSearchParams(params).toString();
  const endpoint = `${BASE_URL}${url.evidencePage.geneDiseaseTcga.plot}`;
  const fullEndpoint = `${endpoint}?${urlParams}`;

  fetchPlot(fullEndpoint, callback, errorHandler);
};

/*
  Get a single-gene all-diseases TPM summary table                   : Evidence Page (GTEx - JSON)
 */
export const getGeneDiseaseGtexJson = async ( ensemblId, efoId, callback, errorHandler = logError ) => {
  const params = { ensemblId, efoId, includeTumorDesc: 'primaryOnly' };
  const endpoint = BASE_URL.concat(url.evidencePage.geneDiseaseGtex.json);

  fetchJson(params, endpoint, callback, errorHandler);
};

/*
  Get a single-gene all-diseases TPM boxplot                         : Evidence Page (GTEx - PLOT)
 */
export const getGeneDiseaseGtexPlot = async ( ensemblId, efoId, yAxisScale, callback, errorHandler ) => {
  const params = { ensemblId, efoId, yAxisScale, includeTumorDesc: 'primaryOnly' };
  const urlParams = new URLSearchParams(params).toString();
  const endpoint = `${BASE_URL}${url.evidencePage.geneDiseaseGtex.plot}`;
  const fullEndpoint = `${endpoint}?${urlParams}`;

  fetchPlot(fullEndpoint, callback, errorHandler);
};

/*
  Get a single-gene all-diseases TPM summary table                   : Target Page (GTEx - JSON)
 */
export const getGeneAllCancerJson = async ( ensemblId, callback, errorHandler = logError ) => {
  const params = { ensemblId, includeTumorDesc: 'primaryOnly' };
  const endpoint = `${BASE_URL}${url.targetPage.geneAllCancer.json}`;

  fetchJson(params, endpoint, callback, errorHandler);
};

/*  
  Get a single-gene all-diseases TPM boxplot                         : Target Page (GTEx - PLOT)
 */
export const getGeneAllCancerPlot = async ( ensemblId, yAxisScale, callback, errorHandler ) => {
  const params = { ensemblId, yAxisScale, includeTumorDesc: 'primaryOnly' };
  const urlParams = new URLSearchParams(params).toString();
  const endpoint = `${BASE_URL}${url.targetPage.geneAllCancer.plot}`;
  const fullEndpoint = `${endpoint}?${urlParams}`;

  fetchPlot(fullEndpoint, callback, errorHandler);
};

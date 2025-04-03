// ReviewBanner.js
import React from 'react';
import {} from './style.css';

function ReviewBanner() {
  return (
    <section aria-label="Site Information" class="usa-site-alert usa-site-alert--slim usa-site-alert--info mtp-section">
      <div class="usa-alert">
        <div class="usa-alert__body">
          <div class="usa-alert__text">
            This repository is under review for potential modification in compliance with Administration directives.
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReviewBanner;

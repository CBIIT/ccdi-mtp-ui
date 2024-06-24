// ShutdownBanner.js
import React from 'react';
import {} from './style.css';

function ShutdownBanner() {
  return (
    <section className="nci-shutdown-banner" aria-label="Government Funding Lapse">
      <div className="nci-shutdown-banner__body">
        <p style={{ margin: 0 }}>
          The Molecular Targets Platform (MTP) will be undergoing maintenance Monday, June 24, starting at 3:00 PM Eastern Daylight Time (EDT) through Tuesday, June 25, at approximately 12:00 PM EDT. During this period, MTP may be unavailable or unstable.
        </p>
      </div>
    </section>
  );
}

export default ShutdownBanner;

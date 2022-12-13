import React, { useState } from 'react';
import { gql } from '@apollo/client';

import { createSummaryFragment } from '../../components/Summary/utils';
import PlatformApiProvider from '../../contexts/PlatformApiProvider';
import ProfileHeader from './ProfileHeader';
import SectionContainer from '../../components/Section/SectionContainer';
import SectionOrderProvider from '../../contexts/SectionOrderProvider';
import SummaryContainer from '../../components/Summary/SummaryContainer';

import sections from './sections';

const EVIDENCE_PROFILE_SUMMARY_FRAGMENT = createSummaryFragment(
  sections,
  'Disease',
  'EvidenceProfileSummaryFragment'
);

const EVIDENCE_PROFILE_QUERY = gql`
  query EvidenceProfileQuery($ensgId: String!, $efoId: String!) {
    target(ensemblId: $ensgId) {
      id
      approvedSymbol
      approvedName
      functionDescriptions
      synonyms {
        label
        source
      }
    }
    disease(efoId: $efoId) {
      id
      name
      description
      synonyms {
        terms
        relation
      }
      ...EvidenceProfileSummaryFragment
    }
  }
  ${EVIDENCE_PROFILE_SUMMARY_FRAGMENT}
`;

function Profile({ ensgId, efoId, symbol, name }) {
  /*
   * For Any data coming through non GraphQl API, displaySettingsForExternal will keep tract the ids
   * of sections that has available data. This Array will be used under SectionOrderProvider to
   * determine if a section should be render or not.
   */
  const [displaySettingsForExternal, setDisplaySettingsForExternal] = useState([]);
  return (
    <PlatformApiProvider
      lsSectionsField="evidence"
      entity="disease"
      query={EVIDENCE_PROFILE_QUERY}
      variables={{ ensgId, efoId }}
    >
      <SectionOrderProvider
        sections={sections}
        displaySettingsForExternal={displaySettingsForExternal}
      >
        <ProfileHeader />

        <SummaryContainer>
          {sections.map(({ Summary, definition }) => (
            <Summary
              key={definition.id}
              id={{ ensgId, efoId }}
              label={{ symbol, name }}
              definition={definition}
              displaySettingsForExternal={displaySettingsForExternal}
              updateDisplaySettingsForExternal={setDisplaySettingsForExternal}
            />
          ))}
        </SummaryContainer>

        <SectionContainer>
          {sections.map(({ Body, definition }) => (
            <Body
              key={definition.id}
              id={{ ensgId, efoId }}
              label={{ symbol, name }}
              definition={definition}
            />
          ))}
        </SectionContainer>
      </SectionOrderProvider>
    </PlatformApiProvider>
  );
}

export default Profile;

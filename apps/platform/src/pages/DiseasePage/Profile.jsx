import React, { useState } from 'react';
import { gql } from '@apollo/client';

import { createSummaryFragment } from '../../components/Summary/utils';
import PlatformApiProvider from '../../contexts/PlatformApiProvider';
import ProfileHeader from './ProfileHeader';
import SectionContainer from '../../components/Section/SectionContainer';
import SectionOrderProvider from '../../contexts/SectionOrderProvider';
import SummaryContainer from '../../components/Summary/SummaryContainer';

import sections from './sections';

const DISEASE_PROFILE_SUMMARY_FRAGMENT = createSummaryFragment(
  sections,
  'Disease'
);
const DISEASE_PROFILE_QUERY = gql`
  query DiseaseProfileQuery($efoId: String!) {
    disease(efoId: $efoId) {
      id
      ...DiseaseProfileHeaderFragment
      ...DiseaseProfileSummaryFragment
    }
  }
  ${ProfileHeader.fragments.profileHeader}
  ${DISEASE_PROFILE_SUMMARY_FRAGMENT}
`;

function Profile({ efoId, name }) {
  /*
   * For Any data coming through non GraphQl API, displaySettingsForExternal will keep tract the ids
   * of sections that has available data. This Array will be used under SectionOrderProvider to
   * determine if a section should be render or not.
   */
  const [displaySettingsForExternal, setDisplaySettingsForExternal] = useState([]);
  return (
    <PlatformApiProvider
      entity="disease"
      query={DISEASE_PROFILE_QUERY}
      variables={{ efoId }}
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
              id={efoId}
              label={name}
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
              id={efoId}
              label={name}
              definition={definition}
            />
          ))}
        </SectionContainer>
      </SectionOrderProvider>
    </PlatformApiProvider>
  );
}

export default Profile;
